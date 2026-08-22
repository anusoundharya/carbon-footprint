import React from "react";
import { useNavigate } from "react-router-dom";

function Result() {
  const navigate = useNavigate();

  const result = JSON.parse(
    localStorage.getItem("carbonResult")
  );

  if (!result) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.icon}>🌱</div>

          <h2>No Result Available</h2>

          <p style={styles.text}>
            Please calculate your carbon footprint first.
          </p>

          <button
            style={styles.primaryButton}
            onClick={() => navigate("/Calculator")}
          >
            🧮 Calculate Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.icon}>🌱</div>

          <h1 style={styles.title}>
            Your Carbon Footprint
          </h1>

          <p style={styles.subtitle}>
            Here is your estimated environmental impact.
          </p>
        </div>

        {/* Total */}
        <div style={styles.totalCard}>
          <p style={styles.totalLabel}>
            Total Carbon Footprint
          </p>

          <h2 style={styles.total}>
            {result.total} kg CO₂
          </h2>

          <p style={styles.totalText}>
            Estimated carbon emissions
          </p>
        </div>

        {/* Breakdown */}
        <h2 style={styles.sectionTitle}>
          📊 Calculation Breakdown
        </h2>

        <div style={styles.details}>

          <div style={styles.detailCard}>
            <div style={styles.detailIcon}>🚗</div>

            <div>
              <p style={styles.detailTitle}>
                Travel
              </p>

              <strong>
                {result.travel} km
              </strong>
            </div>
          </div>

          <div style={styles.detailCard}>
            <div style={styles.detailIcon}>⚡</div>

            <div>
              <p style={styles.detailTitle}>
                Electricity
              </p>

              <strong>
                {result.electricity} kWh
              </strong>
            </div>
          </div>

          <div style={styles.detailCard}>
            <div style={styles.detailIcon}>🍽️</div>

            <div>
              <p style={styles.detailTitle}>
                Food
              </p>

              <strong>
                {result.food === "Veg"
                  ? "Vegetarian"
                  : "Non-Vegetarian"}
              </strong>
            </div>
          </div>

        </div>

        {/* Message */}
        <div style={styles.tip}>
          💡 Small changes in daily travel,
          electricity usage and food choices can
          help reduce environmental impact.
        </div>

        {/* Buttons */}
        <div style={styles.buttons}>

          <button
            style={styles.primaryButton}
            onClick={() => navigate("/Calculator")}
          >
            🔄 Calculate Again
          </button>

          <button
            style={styles.secondaryButton}
            onClick={() => navigate("/history")}
          >
            📊 View History
          </button>

          <button
            style={styles.secondaryButton}
            onClick={() => navigate("/dashboard")}
          >
            🏠 Dashboard
          </button>

        </div>

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
    maxWidth: "650px",
    background: "#ffffff",
    padding: "35px",
    borderRadius: "22px",
    boxSizing: "border-box",
    boxShadow:
      "0 10px 35px rgba(0, 0, 0, 0.12)",
  },

  header: {
    textAlign: "center",
    marginBottom: "25px",
  },

  icon: {
    fontSize: "48px",
    marginBottom: "8px",
  },

  title: {
    margin: "0",
    color: "#1b5e20",
    fontSize: "30px",
  },

  subtitle: {
    color: "#666",
    marginTop: "10px",
  },

  totalCard: {
    textAlign: "center",
    padding: "25px",
    borderRadius: "16px",
    background: "#e8f5e9",
    marginBottom: "30px",
  },

  totalLabel: {
    margin: "0",
    color: "#555",
    fontWeight: "600",
  },

  total: {
    fontSize: "38px",
    color: "#2e7d32",
    margin: "10px 0",
  },

  totalText: {
    margin: "0",
    color: "#666",
    fontSize: "14px",
  },

  sectionTitle: {
    fontSize: "20px",
    marginBottom: "15px",
  },

  details: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(170px, 1fr))",
    gap: "15px",
  },

  detailCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    background: "#fafafa",
  },

  detailIcon: {
    fontSize: "28px",
  },

  detailTitle: {
    margin: "0 0 5px",
    color: "#666",
    fontSize: "14px",
  },

  tip: {
    marginTop: "25px",
    padding: "15px",
    borderRadius: "10px",
    background: "#f1f8e9",
    color: "#4e5d4f",
    fontSize: "14px",
    lineHeight: "1.5",
  },

  buttons: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "25px",
  },

  primaryButton: {
    flex: "1",
    minWidth: "170px",
    padding: "13px 18px",
    border: "none",
    borderRadius: "9px",
    background: "#2e7d32",
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },

  secondaryButton: {
    flex: "1",
    minWidth: "150px",
    padding: "13px 18px",
    border: "1px solid #2e7d32",
    borderRadius: "9px",
    background: "white",
    color: "#2e7d32",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },

  text: {
    color: "#666",
    marginBottom: "20px",
  },
};

export default Result;