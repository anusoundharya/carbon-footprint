import React from "react";
import { useNavigate } from "react-router-dom";

function EcoTips() {
  const navigate = useNavigate();

  const tips = [
    {
      icon: "🌱",
      title: "Plant More Trees",
      text: "Trees absorb carbon dioxide and help improve air quality.",
    },
    {
      icon: "🚌",
      title: "Use Public Transport",
      text: "Choose buses, trains or shared transport to reduce emissions.",
    },
    {
      icon: "💡",
      title: "Save Electricity",
      text: "Switch off lights, fans and devices when they are not needed.",
    },
    {
      icon: "🔋",
      title: "Use Energy Efficient Devices",
      text: "Energy-efficient appliances can help reduce electricity consumption.",
    },
    {
      icon: "🚴",
      title: "Walk or Cycle",
      text: "Walking or cycling for short distances is an eco-friendly choice.",
    },
    {
      icon: "♻️",
      title: "Recycle and Reuse",
      text: "Reuse useful materials and recycle waste whenever possible.",
    },
    {
      icon: "🚿",
      title: "Save Water",
      text: "Avoid unnecessary water usage and close taps properly.",
    },
    {
      icon: "🥗",
      title: "Choose Sustainable Food",
      text: "Include more plant-based food choices in your regular meals.",
    },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.icon}>🌍</div>

          <h1 style={styles.title}>
            AI Eco Tips
          </h1>

          <p style={styles.subtitle}>
            Simple actions that can help reduce your
            environmental impact.
          </p>
        </div>

        {/* Tips */}
        <div style={styles.grid}>
          {tips.map((tip, index) => (
            <div
              key={index}
              style={styles.card}
            >
              <div style={styles.tipIcon}>
                {tip.icon}
              </div>

              <h2 style={styles.tipTitle}>
                {tip.title}
              </h2>

              <p style={styles.tipText}>
                {tip.text}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div style={styles.message}>
          <div style={styles.messageIcon}>
            🌱
          </div>

          <div>
            <h2 style={styles.messageTitle}>
              Every Small Step Matters
            </h2>

            <p style={styles.messageText}>
              Sustainable habits in our daily life can
              contribute to a healthier environment.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div style={styles.buttons}>

          <button
            style={styles.primaryButton}
            onClick={() =>
              navigate("/Calculator")
            }
          >
            🧮 Calculate Carbon
          </button>

          <button
            style={styles.secondaryButton}
            onClick={() =>
              navigate("/dashboard")
            }
          >
            ← Dashboard
          </button>

        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "35px 20px",
    boxSizing: "border-box",
    background:
      "linear-gradient(135deg, #e8f5e9, #f1f8e9)",
  },

  container: {
    maxWidth: "1050px",
    margin: "0 auto",
  },

  header: {
    textAlign: "center",
    marginBottom: "35px",
  },

  icon: {
    fontSize: "50px",
    marginBottom: "5px",
  },

  title: {
    margin: "0",
    fontSize: "32px",
    color: "#1b5e20",
  },

  subtitle: {
    color: "#666",
    fontSize: "16px",
    maxWidth: "600px",
    margin: "10px auto 0",
    lineHeight: "1.6",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "white",
    padding: "25px",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow:
      "0 6px 20px rgba(0,0,0,0.08)",
    transition: "transform 0.2s",
  },

  tipIcon: {
    fontSize: "42px",
    marginBottom: "10px",
  },

  tipTitle: {
    color: "#2e7d32",
    fontSize: "20px",
    margin: "5px 0 10px",
  },

  tipText: {
    color: "#666",
    fontSize: "14px",
    lineHeight: "1.6",
    margin: "0",
  },

  message: {
    marginTop: "30px",
    padding: "22px",
    background: "white",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    gap: "18px",
    boxShadow:
      "0 6px 20px rgba(0,0,0,0.08)",
  },

  messageIcon: {
    fontSize: "40px",
  },

  messageTitle: {
    margin: "0 0 5px",
    color: "#1b5e20",
  },

  messageText: {
    margin: "0",
    color: "#666",
  },

  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "30px",
    flexWrap: "wrap",
  },

  primaryButton: {
    padding: "13px 20px",
    border: "none",
    borderRadius: "9px",
    background: "#2e7d32",
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },

  secondaryButton: {
    padding: "13px 20px",
    border: "1px solid #2e7d32",
    borderRadius: "9px",
    background: "white",
    color: "#2e7d32",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default EcoTips;