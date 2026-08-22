import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // Fetch Carbon History
  // =========================
  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/carbon"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch carbon data");
      }

      const data = await response.json();

      console.log("Dashboard data:", data);

      setHistory(data);
    } catch (error) {
      console.error("Dashboard error:", error);
      setError(
        "Unable to load carbon data. Please check the backend."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // =========================
  // Calculations
  // =========================

  const totalCarbon = history.reduce(
    (sum, item) => sum + Number(item.total || 0),
    0
  );

  const averageCarbon =
    history.length > 0
      ? totalCarbon / history.length
      : 0;

  const latestCarbon =
    history.length > 0
      ? Number(history[0].total || 0)
      : 0;

  const maxCarbon =
    history.length > 0
      ? Math.max(
          ...history.map(
            (item) => Number(item.total || 0)
          )
        )
      : 0;

  // =========================
  // Impact Status
  // =========================

  let impactStatus = "No Data";
  let impactMessage = "Start calculating your footprint.";

  if (averageCarbon > 0 && averageCarbon <= 20) {
    impactStatus = "Low Impact";
    impactMessage =
      "Great! Keep following eco-friendly habits.";
  } else if (
    averageCarbon > 20 &&
    averageCarbon <= 50
  ) {
    impactStatus = "Moderate Impact";
    impactMessage =
      "Good start! Try reducing travel and electricity usage.";
  } else if (averageCarbon > 50) {
    impactStatus = "High Impact";
    impactMessage =
      "Consider making more sustainable daily choices.";
  }

  return (
    <div style={styles.container}>

      {/* =========================
          Header
      ========================== */}

      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            🌱 AI Carbon Footprint Tracker
          </h1>

          <p style={styles.subtitle}>
            Monitor your environmental impact and
            make eco-friendly choices.
          </p>
        </div>

        <button
          style={styles.profileButton}
          onClick={() => navigate("/profile")}
        >
          👤 Profile
        </button>
      </div>

      {/* =========================
          Loading
      ========================== */}

      {loading && (
        <div style={styles.messageCard}>
          ⏳ Loading your carbon data...
        </div>
      )}

      {/* =========================
          Error
      ========================== */}

      {!loading && error && (
        <div style={styles.errorCard}>
          ⚠️ {error}

          <br />

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

      {!loading && !error && (
        <>
          <div style={styles.statsContainer}>

            {/* Total */}
            <div style={styles.card}>
              <div style={styles.cardIcon}>
                🌍
              </div>

              <p style={styles.cardLabel}>
                Total Carbon
              </p>

              <h2 style={styles.cardValue}>
                {totalCarbon.toFixed(2)} kg
              </h2>

              <p style={styles.cardDescription}>
                All calculations
              </p>
            </div>

            {/* Average */}
            <div style={styles.card}>
              <div style={styles.cardIcon}>
                📊
              </div>

              <p style={styles.cardLabel}>
                Average
              </p>

              <h2 style={styles.cardValue}>
                {averageCarbon.toFixed(2)} kg
              </h2>

              <p style={styles.cardDescription}>
                Average footprint
              </p>
            </div>

            {/* Latest */}
            <div style={styles.card}>
              <div style={styles.cardIcon}>
                🕒
              </div>

              <p style={styles.cardLabel}>
                Latest
              </p>

              <h2 style={styles.cardValue}>
                {latestCarbon.toFixed(2)} kg
              </h2>

              <p style={styles.cardDescription}>
                Latest calculation
              </p>
            </div>

            {/* Highest */}
            <div style={styles.card}>
              <div style={styles.cardIcon}>
                📈
              </div>

              <p style={styles.cardLabel}>
                Highest
              </p>

              <h2 style={styles.cardValue}>
                {maxCarbon.toFixed(2)} kg
              </h2>

              <p style={styles.cardDescription}>
                Highest footprint
              </p>
            </div>

          </div>

          {/* =========================
              Impact Status
          ========================== */}

          <div style={styles.impactCard}>

            <div>
              <p style={styles.impactLabel}>
                🌱 Environmental Impact
              </p>

              <h2 style={styles.impactTitle}>
                {impactStatus}
              </h2>

              <p style={styles.impactMessage}>
                {impactMessage}
              </p>
            </div>

            <div style={styles.impactNumber}>
              {averageCarbon.toFixed(1)}
              <span> kg</span>
            </div>

          </div>

          {/* =========================
              Graph
          ========================== */}

          <div style={styles.graphCard}>

            <div style={styles.graphHeader}>
              <div>
                <h2 style={styles.graphTitle}>
                  📊 Carbon Footprint Comparison
                </h2>

                <p style={styles.graphSubtitle}>
                  Your previous calculation results
                </p>
              </div>

              <button
                style={styles.historyButton}
                onClick={() =>
                  navigate("/history")
                }
              >
                View History →
              </button>
            </div>

            {history.length === 0 ? (
              <div style={styles.noData}>
                <div style={styles.noDataIcon}>
                  🌱
                </div>

                <h3>
                  No calculation data available
                </h3>

                <p>
                  Calculate your carbon footprint to
                  see the comparison graph.
                </p>

                <button
                  style={styles.primaryButton}
                  onClick={() =>
                    navigate("/Calculator")
                  }
                >
                  🧮 Calculate Now
                </button>
              </div>
            ) : (
              <div style={styles.graphWrapper}>

                <div style={styles.graph}>

                  {history
                    .slice()
                    .reverse()
                    .map((item, index) => {

                      const value = Number(
                        item.total || 0
                      );

                      const height =
                        maxCarbon > 0
                          ? (value / maxCarbon) *
                            220
                          : 0;

                      return (
                        <div
                          key={item._id}
                          style={
                            styles.barContainer
                          }
                        >

                          <div
                            style={styles.value}
                          >
                            {value.toFixed(1)}
                          </div>

                          <div
                            title={`${value.toFixed(
                              2
                            )} kg CO₂`}
                            style={{
                              ...styles.bar,
                              height: `${Math.max(
                                height,
                                10
                              )}px`,
                            }}
                          />

                          <div
                            style={styles.label}
                          >
                            #{index + 1}
                          </div>

                        </div>
                      );
                    })}

                </div>

                <p style={styles.graphText}>
                  Each bar represents one carbon
                  footprint calculation.
                </p>

              </div>
            )}

          </div>

          {/* =========================
              Quick Actions
          ========================== */}

          <h2 style={styles.sectionTitle}>
            ⚡ Quick Actions
          </h2>

          <div style={styles.buttonContainer}>

            <button
              style={styles.primaryButton}
              onClick={() =>
                navigate("/Calculator")
              }
            >
              🌱 Calculate Carbon
            </button>

            <button
              style={styles.secondaryButton}
              onClick={() =>
                navigate("/history")
              }
            >
              📊 View History
            </button>

            <button
              style={styles.secondaryButton}
              onClick={() =>
                navigate("/EcoTips")
              }
            >
              💡 Eco Tips
            </button>

            <button
              style={styles.secondaryButton}
              onClick={() =>
                navigate("/profile")
              }
            >
              👤 My Profile
            </button>

          </div>

        </>
      )}

    </div>
  );
}

// =====================================================
// Styles
// =====================================================

const styles = {
  container: {
    minHeight: "100vh",
    padding: "30px",
    boxSizing: "border-box",
    background:
      "linear-gradient(135deg, #eef7ef, #f7faf7)",
  },

  header: {
    maxWidth: "1100px",
    margin: "0 auto 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },

  title: {
    margin: 0,
    color: "#1b5e20",
    fontSize: "32px",
  },

  subtitle: {
    color: "#666",
    fontSize: "16px",
    marginTop: "8px",
  },

  profileButton: {
    padding: "12px 18px",
    border: "1px solid #2e7d32",
    borderRadius: "9px",
    background: "white",
    color: "#2e7d32",
    cursor: "pointer",
    fontWeight: "600",
  },

  statsContainer: {
    maxWidth: "1100px",
    margin: "0 auto 25px",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(210px, 1fr))",
    gap: "18px",
  },

  card: {
    background: "white",
    padding: "22px",
    borderRadius: "16px",
    boxShadow:
      "0 5px 18px rgba(0,0,0,0.08)",
  },

  cardIcon: {
    fontSize: "30px",
  },

  cardLabel: {
    color: "#777",
    marginBottom: "5px",
  },

  cardValue: {
    color: "#2e7d32",
    margin: "5px 0",
    fontSize: "27px",
  },

  cardDescription: {
    color: "#888",
    fontSize: "13px",
  },

  impactCard: {
    maxWidth: "1056px",
    margin: "0 auto 25px",
    padding: "22px",
    background: "white",
    borderRadius: "16px",
    boxShadow:
      "0 5px 18px rgba(0,0,0,0.08)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },

  impactLabel: {
    color: "#777",
    margin: 0,
  },

  impactTitle: {
    color: "#2e7d32",
    margin: "7px 0",
  },

  impactMessage: {
    color: "#666",
    margin: 0,
  },

  impactNumber: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#2e7d32",
  },

  impactNumberSpan: {
    fontSize: "14px",
  },

  graphCard: {
    maxWidth: "1056px",
    margin: "0 auto 30px",
    background: "white",
    padding: "25px",
    borderRadius: "16px",
    boxShadow:
      "0 5px 18px rgba(0,0,0,0.08)",
  },

  graphHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
  },

  graphTitle: {
    margin: 0,
  },

  graphSubtitle: {
    color: "#777",
    fontSize: "14px",
  },

  historyButton: {
    padding: "10px 15px",
    border: "1px solid #2e7d32",
    borderRadius: "8px",
    background: "white",
    color: "#2e7d32",
    cursor: "pointer",
    fontWeight: "600",
  },

  graphWrapper: {
    overflowX: "auto",
  },

  graph: {
    height: "280px",
    minWidth: "500px",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: "25px",
    padding: "20px",
    marginTop: "20px",
    borderBottom: "2px solid #ddd",
  },

  barContainer: {
    height: "250px",
    minWidth: "45px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  bar: {
    width: "38px",
    background: "#4caf50",
    borderRadius: "8px 8px 0 0",
    transition: "height 0.4s",
  },

  value: {
    fontSize: "12px",
    marginBottom: "5px",
    color: "#444",
  },

  label: {
    marginTop: "8px",
    fontWeight: "bold",
    fontSize: "12px",
  },

  graphText: {
    color: "#777",
    textAlign: "center",
    marginTop: "15px",
  },

  noData: {
    textAlign: "center",
    padding: "40px 20px",
  },

  noDataIcon: {
    fontSize: "45px",
  },

  sectionTitle: {
    maxWidth: "1100px",
    margin: "0 auto 15px",
    color: "#333",
  },

  buttonContainer: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
  },

  primaryButton: {
    padding: "13px 20px",
    border: "none",
    borderRadius: "9px",
    cursor: "pointer",
    background: "#2e7d32",
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
  },

  secondaryButton: {
    padding: "13px 20px",
    border: "1px solid #ddd",
    borderRadius: "9px",
    cursor: "pointer",
    background: "#ffffff",
    color: "#333",
    fontSize: "15px",
    fontWeight: "600",
  },

  messageCard: {
    maxWidth: "1056px",
    margin: "0 auto",
    padding: "30px",
    textAlign: "center",
    background: "white",
    borderRadius: "15px",
  },

  errorCard: {
    maxWidth: "1056px",
    margin: "0 auto 25px",
    padding: "20px",
    textAlign: "center",
    background: "#ffebee",
    color: "#c62828",
    borderRadius: "12px",
  },

  retryButton: {
    marginTop: "12px",
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    background: "#c62828",
    color: "white",
    cursor: "pointer",
  },
};

export default Dashboard;