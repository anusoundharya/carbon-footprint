import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function History() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // Fetch History
  // =========================
  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/carbon"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch history");
      }

      const data = await response.json();

      console.log("History Data:", data);

      setHistory(data);
    } catch (err) {
      console.error("History Error:", err);

      setError(
        "Unable to load history. Please check whether backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Load History on Page Open
  // =========================
  useEffect(() => {
    fetchHistory();
  }, []);

  // =========================
  // Delete One Record
  // =========================
  const deleteRecord = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this calculation?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/carbon/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete record"
        );
      }

      // Remove deleted record from frontend
      setHistory((previousHistory) =>
        previousHistory.filter(
          (item) => item._id !== id
        )
      );

      alert("Calculation deleted successfully!");
    } catch (err) {
      console.error("Delete Error:", err);

      alert(
        "Unable to delete calculation. Please try again."
      );
    }
  };

  // =========================
  // Delete All History
  // =========================
  const clearAllHistory = async () => {
    if (history.length === 0) {
      alert("There is no history to clear.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete ALL carbon history?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/carbon",
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to clear history"
        );
      }

      // Clear frontend history
      setHistory([]);

      alert(
        `All history deleted successfully!\nDeleted records: ${data.deletedCount}`
      );
    } catch (err) {
      console.error("Clear History Error:", err);

      alert(
        "Unable to clear history. Please try again."
      );
    }
  };

  // =========================
  // Calculate Total
  // =========================
  const totalCarbon = history.reduce(
    (sum, item) =>
      sum + Number(item.total || 0),
    0
  );

  // =========================
  // Calculate Average
  // =========================
  const averageCarbon =
    history.length > 0
      ? totalCarbon / history.length
      : 0;

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* =========================
            Header
        ========================== */}
        <div style={styles.header}>

          <div>
            <h1 style={styles.title}>
              📊 Carbon Footprint History
            </h1>

            <p style={styles.subtitle}>
              Track and manage your previous
              carbon footprint calculations.
            </p>
          </div>

          <div style={styles.headerButtons}>

            <button
              style={styles.calculateButton}
              onClick={() =>
                navigate("/Calculator")
              }
            >
              ➕ New Calculation
            </button>

            <button
              style={styles.clearButton}
              onClick={clearAllHistory}
            >
              🗑️ Clear All
            </button>

          </div>

        </div>

        {/* =========================
            Loading
        ========================== */}
        {loading && (
          <div style={styles.messageCard}>
            <div style={styles.loadingIcon}>
              ⏳
            </div>

            <h3>Loading History...</h3>

            <p>
              Please wait while we fetch your
              calculations.
            </p>
          </div>
        )}

        {/* =========================
            Error
        ========================== */}
        {!loading && error && (
          <div style={styles.errorCard}>
            <h3>⚠️ Unable to Load History</h3>

            <p>{error}</p>

            <button
              style={styles.retryButton}
              onClick={fetchHistory}
            >
              🔄 Try Again
            </button>
          </div>
        )}

        {/* =========================
            Statistics
        ========================== */}
        {!loading &&
          !error &&
          history.length > 0 && (
            <div style={styles.statsContainer}>

              <div style={styles.statCard}>
                <div style={styles.statIcon}>
                  📋
                </div>

                <div>
                  <p style={styles.statLabel}>
                    Calculations
                  </p>

                  <h2 style={styles.statValue}>
                    {history.length}
                  </h2>
                </div>
              </div>

              <div style={styles.statCard}>
                <div style={styles.statIcon}>
                  🌍
                </div>

                <div>
                  <p style={styles.statLabel}>
                    Total Carbon
                  </p>

                  <h2 style={styles.statValue}>
                    {totalCarbon.toFixed(2)} kg
                  </h2>
                </div>
              </div>

              <div style={styles.statCard}>
                <div style={styles.statIcon}>
                  📈
                </div>

                <div>
                  <p style={styles.statLabel}>
                    Average
                  </p>

                  <h2 style={styles.statValue}>
                    {averageCarbon.toFixed(2)} kg
                  </h2>
                </div>
              </div>

            </div>
          )}

        {/* =========================
            Empty History
        ========================== */}
        {!loading &&
          !error &&
          history.length === 0 && (
            <div style={styles.emptyCard}>

              <div style={styles.emptyIcon}>
                🌱
              </div>

              <h2>
                No Calculations Yet
              </h2>

              <p>
                Your carbon footprint calculations
                will appear here.
              </p>

              <button
                style={styles.calculateButton}
                onClick={() =>
                  navigate("/Calculator")
                }
              >
                🧮 Calculate Now
              </button>

            </div>
          )}

        {/* =========================
            History List
        ========================== */}
        {!loading &&
          !error &&
          history.length > 0 && (
            <div style={styles.list}>

              {history.map((item, index) => (

                <div
                  key={item._id}
                  style={styles.card}
                >

                  {/* Card Header */}
                  <div style={styles.cardHeader}>

                    <div>
                      <h3 style={styles.cardTitle}>
                        Calculation #
                        {history.length - index}
                      </h3>

                      <p style={styles.date}>
                        📅{" "}
                        {item.createdAt
                          ? new Date(
                              item.createdAt
                            ).toLocaleString()
                          : "Date unavailable"}
                      </p>
                    </div>

                    <div style={styles.totalBox}>

                      <span style={styles.totalLabel}>
                        Total Carbon
                      </span>

                      <strong
                        style={styles.totalValue}
                      >
                        {Number(item.total).toFixed(2)}
                        {" "}kg CO₂
                      </strong>

                    </div>

                  </div>

                  {/* =========================
                      Details
                  ========================== */}
                  <div style={styles.details}>

                    {/* Travel */}
                    <div style={styles.detail}>

                      <div style={styles.icon}>
                        🚗
                      </div>

                      <div>
                        <p style={styles.detailLabel}>
                          Travel Distance
                        </p>

                        <strong>
                          {item.travel} km
                        </strong>
                      </div>

                    </div>

                    {/* Electricity */}
                    <div style={styles.detail}>

                      <div style={styles.icon}>
                        ⚡
                      </div>

                      <div>
                        <p style={styles.detailLabel}>
                          Electricity Usage
                        </p>

                        <strong>
                          {item.electricity} kWh
                        </strong>
                      </div>

                    </div>

                    {/* Food */}
                    <div style={styles.detail}>

                      <div style={styles.icon}>
                        🍽️
                      </div>

                      <div>
                        <p style={styles.detailLabel}>
                          Food Preference
                        </p>

                        <strong>
                          {item.food === "Veg"
                            ? "Vegetarian"
                            : "Non-Vegetarian"}
                        </strong>
                      </div>

                    </div>

                  </div>

                  {/* =========================
                      Delete Button
                  ========================== */}
                  <div style={styles.cardFooter}>

                    <button
                      style={styles.deleteButton}
                      onClick={() =>
                        deleteRecord(item._id)
                      }
                    >
                      🗑️ Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>
          )}

        {/* =========================
            Bottom Buttons
        ========================== */}
        <div style={styles.bottomButtons}>

          <button
            style={styles.secondaryButton}
            onClick={() =>
              navigate("/dashboard")
            }
          >
            ← Dashboard
          </button>

          <button
            style={styles.secondaryButton}
            onClick={() =>
              navigate("/Calculator")
            }
          >
            🌱 New Calculation
          </button>

        </div>

      </div>
    </div>
  );
}

// ======================================================
// Styles
// ======================================================

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #e8f5e9, #f1f8e9)",
    padding: "30px 20px",
    boxSizing: "border-box",
  },

  container: {
    maxWidth: "1050px",
    margin: "0 auto",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "30px",
  },

  title: {
    margin: "0",
    color: "#1b5e20",
    fontSize: "30px",
  },

  subtitle: {
    color: "#666",
    marginTop: "8px",
  },

  headerButtons: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  calculateButton: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "9px",
    background: "#2e7d32",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },

  clearButton: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "9px",
    background: "#c62828",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },

  statsContainer: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "18px",
    marginBottom: "25px",
  },

  statCard: {
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    boxShadow:
      "0 5px 18px rgba(0,0,0,0.08)",
  },

  statIcon: {
    fontSize: "32px",
  },

  statLabel: {
    margin: "0",
    color: "#777",
    fontSize: "13px",
  },

  statValue: {
    margin: "5px 0 0",
    color: "#2e7d32",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  card: {
    background: "white",
    padding: "22px",
    borderRadius: "16px",
    boxShadow:
      "0 6px 20px rgba(0,0,0,0.08)",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },

  cardTitle: {
    margin: "0",
    color: "#333",
  },

  date: {
    color: "#777",
    fontSize: "13px",
    marginTop: "7px",
  },

  totalBox: {
    background: "#e8f5e9",
    padding: "12px 18px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  totalLabel: {
    color: "#666",
    fontSize: "12px",
  },

  totalValue: {
    color: "#2e7d32",
    marginTop: "4px",
  },

  details: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginTop: "20px",
  },

  detail: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "15px",
    background: "#fafafa",
    border: "1px solid #eeeeee",
    borderRadius: "10px",
  },

  icon: {
    fontSize: "28px",
  },

  detailLabel: {
    margin: "0 0 5px",
    color: "#777",
    fontSize: "13px",
  },

  cardFooter: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "18px",
  },

  deleteButton: {
    padding: "9px 15px",
    border: "none",
    borderRadius: "8px",
    background: "#ffebee",
    color: "#c62828",
    cursor: "pointer",
    fontWeight: "600",
  },

  messageCard: {
    background: "white",
    padding: "40px",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow:
      "0 6px 20px rgba(0,0,0,0.08)",
  },

  loadingIcon: {
    fontSize: "35px",
  },

  errorCard: {
    background: "#ffebee",
    color: "#c62828",
    padding: "25px",
    borderRadius: "12px",
    textAlign: "center",
  },

  retryButton: {
    marginTop: "10px",
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    background: "#c62828",
    color: "white",
    cursor: "pointer",
  },

  emptyCard: {
    background: "white",
    padding: "50px 20px",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow:
      "0 6px 20px rgba(0,0,0,0.08)",
  },

  emptyIcon: {
    fontSize: "50px",
  },

  bottomButtons: {
    display: "flex",
    gap: "12px",
    marginTop: "25px",
    flexWrap: "wrap",
  },

  secondaryButton: {
    padding: "12px 18px",
    border: "1px solid #2e7d32",
    borderRadius: "9px",
    background: "white",
    color: "#2e7d32",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default History;