import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Calculator() {
  const navigate = useNavigate();

  const [travel, setTravel] = useState("");
  const [electricity, setElectricity] = useState("");
  const [food, setFood] = useState("Veg");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const calculateCarbon = async (e) => {
    e.preventDefault();

    if (travel === "" || electricity === "") {
      setError("Please enter travel distance and electricity usage.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const travelCO2 = Number(travel) * 0.21;
      const electricityCO2 = Number(electricity) * 0.5;
      const foodCO2 = food === "Veg" ? 2 : 5;

      const total = (
        travelCO2 +
        electricityCO2 +
        foodCO2
      ).toFixed(2);

      const resultData = {
        travel: Number(travel),
        electricity: Number(electricity),
        food: food,
        total: Number(total),
      };

      // Save to backend
      const response = await fetch(
        "http://localhost:5000/api/carbon",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resultData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save carbon data"
        );
      }

      console.log("Saved successfully:", data);

      // Save latest result
      localStorage.setItem(
        "carbonResult",
        JSON.stringify(resultData)
      );

      // Go to result page
      navigate("/result");

    } catch (err) {
      console.error("Error:", err);

      setError(
        err.message ||
          "Unable to save data. Please check the backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.icon}>🌱</div>

          <h1 style={styles.title}>
            Carbon Footprint Calculator
          </h1>

          <p style={styles.subtitle}>
            Calculate your estimated carbon footprint
            from your daily activities.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={calculateCarbon}>

          {/* Travel */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              🚗 Travel Distance
            </label>

            <div style={styles.inputBox}>
              <input
                type="number"
                min="0"
                placeholder="Enter distance"
                value={travel}
                onChange={(e) =>
                  setTravel(e.target.value)
                }
                style={styles.input}
              />

              <span style={styles.unit}>km</span>
            </div>
          </div>

          {/* Electricity */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              ⚡ Electricity Usage
            </label>

            <div style={styles.inputBox}>
              <input
                type="number"
                min="0"
                placeholder="Enter electricity usage"
                value={electricity}
                onChange={(e) =>
                  setElectricity(e.target.value)
                }
                style={styles.input}
              />

              <span style={styles.unit}>kWh</span>
            </div>
          </div>

          {/* Food */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              🍽️ Food Preference
            </label>

            <select
              value={food}
              onChange={(e) =>
                setFood(e.target.value)
              }
              style={styles.select}
            >
              <option value="Veg">
                Vegetarian
              </option>

              <option value="Non-Veg">
                Non-Vegetarian
              </option>
            </select>
          </div>

          {/* Error */}
          {error && (
            <div style={styles.error}>
              ⚠️ {error}
            </div>
          )}

          {/* Calculate */}
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? "⏳ Calculating..."
              : "🌍 Calculate Carbon Footprint"}
          </button>

        </form>

        {/* Information */}
        <div style={styles.info}>
          <span>💡</span>

          <p>
            Your result is an estimated carbon footprint
            based on the information you provide.
          </p>
        </div>

        {/* History button */}
        <button
          onClick={() => navigate("/history")}
          style={styles.historyButton}
        >
          📊 View Calculation History
        </button>

      </div>

    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px 20px",
    boxSizing: "border-box",
    background:
      "linear-gradient(135deg, #e8f5e9, #f1f8e9)",
  },

  card: {
    width: "100%",
    maxWidth: "520px",
    background: "#ffffff",
    padding: "35px",
    borderRadius: "22px",
    boxSizing: "border-box",
    boxShadow:
      "0 10px 35px rgba(0, 0, 0, 0.12)",
  },

  header: {
    textAlign: "center",
    marginBottom: "30px",
  },

  icon: {
    fontSize: "45px",
    marginBottom: "10px",
  },

  title: {
    margin: "0",
    fontSize: "28px",
    color: "#1b5e20",
  },

  subtitle: {
    marginTop: "10px",
    color: "#666",
    lineHeight: "1.6",
  },

  formGroup: {
    marginBottom: "22px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#333",
  },

  inputBox: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "10px",
    overflow: "hidden",
    background: "#fafafa",
  },

  input: {
    flex: 1,
    padding: "14px",
    border: "none",
    outline: "none",
    fontSize: "15px",
    background: "transparent",
  },

  unit: {
    padding: "0 14px",
    color: "#666",
    fontWeight: "600",
  },

  select: {
    width: "100%",
    padding: "14px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    fontSize: "15px",
    outline: "none",
    background: "#fafafa",
  },

  error: {
    padding: "12px",
    marginBottom: "18px",
    borderRadius: "8px",
    background: "#ffebee",
    color: "#c62828",
    fontSize: "14px",
  },

  button: {
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "10px",
    background: "#2e7d32",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },

  info: {
    display: "flex",
    gap: "10px",
    alignItems: "flex-start",
    marginTop: "22px",
    padding: "14px",
    borderRadius: "10px",
    background: "#f1f8e9",
    color: "#4e5d4f",
    fontSize: "13px",
    lineHeight: "1.5",
  },

  historyButton: {
    width: "100%",
    marginTop: "18px",
    padding: "12px",
    border: "1px solid #2e7d32",
    borderRadius: "10px",
    background: "white",
    color: "#2e7d32",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Calculator;