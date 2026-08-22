import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [name, setName] = useState("Anu");
  const [email, setEmail] = useState("anu@gmail.com");
  const [phone, setPhone] = useState("9876543210");

  const [saved, setSaved] = useState(false);

  // Load saved profile
  useEffect(() => {
    const savedProfile = JSON.parse(
      localStorage.getItem("profile")
    );

    if (savedProfile) {
      setName(savedProfile.name || "");
      setEmail(savedProfile.email || "");
      setPhone(savedProfile.phone || "");
    }
  }, []);

  // Save profile
  const saveProfile = () => {
    const profile = {
      name,
      email,
      phone,
    };

    localStorage.setItem(
      "profile",
      JSON.stringify(profile)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.avatar}>
            {name ? name.charAt(0).toUpperCase() : "U"}
          </div>

          <h1 style={styles.title}>
            My Profile
          </h1>

          <p style={styles.subtitle}>
            Manage your personal information
          </p>
        </div>

        {/* Profile Card */}
        <div style={styles.card}>

          {/* Name */}
          <div style={styles.field}>
            <label style={styles.label}>
              👤 Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter your name"
              style={styles.input}
            />
          </div>

          {/* Email */}
          <div style={styles.field}>
            <label style={styles.label}>
              📧 Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              style={styles.input}
            />
          </div>

          {/* Phone */}
          <div style={styles.field}>
            <label style={styles.label}>
              📱 Phone Number
            </label>

            <input
              type="tel"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              placeholder="Enter your phone number"
              style={styles.input}
            />
          </div>

          {/* Save */}
          <button
            style={styles.saveButton}
            onClick={saveProfile}
          >
            💾 Save Profile
          </button>

          {/* Success */}
          {saved && (
            <div style={styles.success}>
              ✅ Profile Updated Successfully!
            </div>
          )}
        </div>

        {/* Info Card */}
        <div style={styles.infoCard}>
          <div style={styles.infoIcon}>
            🌱
          </div>

          <div>
            <h3 style={styles.infoTitle}>
              About Your Profile
            </h3>

            <p style={styles.infoText}>
              Your profile information is stored in
              your browser and can be updated anytime.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div style={styles.buttons}>

          <button
            style={styles.primaryButton}
            onClick={() =>
              navigate("/dashboard")
            }
          >
            🏠 Dashboard
          </button>

          <button
            style={styles.secondaryButton}
            onClick={() =>
              navigate("/history")
            }
          >
            📊 View History
          </button>

        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px 20px",
    boxSizing: "border-box",
    background:
      "linear-gradient(135deg, #e8f5e9, #f1f8e9)",
  },

  container: {
    maxWidth: "650px",
    margin: "0 auto",
  },

  header: {
    textAlign: "center",
    marginBottom: "25px",
  },

  avatar: {
    width: "85px",
    height: "85px",
    margin: "0 auto 15px",
    borderRadius: "50%",
    background: "#2e7d32",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "36px",
    fontWeight: "bold",
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

  card: {
    background: "white",
    padding: "30px",
    borderRadius: "18px",
    boxShadow:
      "0 7px 25px rgba(0,0,0,0.09)",
  },

  field: {
    marginBottom: "20px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    color: "#333",
    fontWeight: "600",
  },

  input: {
    width: "100%",
    padding: "13px",
    boxSizing: "border-box",
    border: "1px solid #ddd",
    borderRadius: "9px",
    fontSize: "15px",
    outline: "none",
  },

  saveButton: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "9px",
    background: "#2e7d32",
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },

  success: {
    marginTop: "15px",
    padding: "12px",
    borderRadius: "8px",
    background: "#e8f5e9",
    color: "#2e7d32",
    textAlign: "center",
    fontWeight: "600",
  },

  infoCard: {
    marginTop: "20px",
    padding: "20px",
    background: "white",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    boxShadow:
      "0 5px 18px rgba(0,0,0,0.07)",
  },

  infoIcon: {
    fontSize: "35px",
  },

  infoTitle: {
    margin: "0 0 5px",
    color: "#1b5e20",
  },

  infoText: {
    margin: "0",
    color: "#666",
    fontSize: "14px",
    lineHeight: "1.5",
  },

  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "25px",
  },

  primaryButton: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "9px",
    background: "#2e7d32",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },

  secondaryButton: {
    padding: "12px 20px",
    border: "1px solid #2e7d32",
    borderRadius: "9px",
    background: "white",
    color: "#2e7d32",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Profile;