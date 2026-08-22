const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// =======================
// Middleware
// =======================
app.use(cors());
app.use(express.json());

// =======================
// Carbon Schema
// =======================
const carbonSchema = new mongoose.Schema(
  {
    travel: {
      type: Number,
      required: true,
    },

    electricity: {
      type: Number,
      required: true,
    },

    food: {
      type: String,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Carbon = mongoose.model("Carbon", carbonSchema);

// =======================
// Test API
// =======================
app.get("/api/test", (req, res) => {
  res.json({
    message: "Carbon Footprint Backend is working!",
  });
});

// =======================
// Home API
// =======================
app.get("/", (req, res) => {
  res.send("AI Carbon Footprint Tracker Backend is Running!");
});

// =======================
// Save Carbon Data
// =======================
app.post("/api/carbon", async (req, res) => {
  console.log("POST /api/carbon received");
  console.log("Data:", req.body);

  try {
    const {
      travel,
      electricity,
      food,
      total,
    } = req.body;

    const carbon = new Carbon({
      travel,
      electricity,
      food,
      total,
    });

    const savedCarbon = await carbon.save();

    console.log("Carbon data saved successfully!");

    res.status(201).json({
      message: "Carbon data saved successfully!",
      data: savedCarbon,
    });
  } catch (error) {
    console.error("SAVE ERROR:", error);

    res.status(500).json({
      message: "Error saving carbon data",
      error: error.message,
    });
  }
});

// =======================
// Get Carbon History
// =======================
app.get("/api/carbon", async (req, res) => {
  try {
    const data = await Carbon.find().sort({
      createdAt: -1,
    });

    res.json(data);
  } catch (error) {
    console.error("HISTORY ERROR:", error);

    res.status(500).json({
      message: "Error fetching carbon history",
      error: error.message,
    });
  }
});

// =======================
// Delete One Carbon Record
// =======================
app.delete("/api/carbon/:id", async (req, res) => {
  try {
    const deletedCarbon =
      await Carbon.findByIdAndDelete(req.params.id);

    if (!deletedCarbon) {
      return res.status(404).json({
        message: "Carbon record not found",
      });
    }

    console.log(
      "Deleted carbon record:",
      req.params.id
    );

    res.json({
      message: "Carbon record deleted successfully!",
      data: deletedCarbon,
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    res.status(500).json({
      message: "Error deleting carbon record",
      error: error.message,
    });
  }
});

// =======================
// Delete All Carbon History
// =======================
app.delete("/api/carbon", async (req, res) => {
  try {
    const result = await Carbon.deleteMany({});

    console.log(
      "Deleted records:",
      result.deletedCount
    );

    res.json({
      message:
        "All carbon history deleted successfully!",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("DELETE ALL ERROR:", error);

    res.status(500).json({
      message: "Error deleting carbon history",
      error: error.message,
    });
  }
});

// =======================
// Start Server
// =======================
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(
      "MongoDB Connected Successfully!"
    );

    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "MongoDB Connection Error:",
      error.message
    );
  }
}

startServer();