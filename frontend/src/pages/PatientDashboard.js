import React, { useState, useEffect } from "react";
import Api from "../apis/Api";

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "800px",
    margin: "0 auto",
  },
  title: {
    color: "#333",
    marginBottom: "2rem",
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "2rem",
    marginBottom: "2rem",
  },
  detailRow: {
    display: "flex",
    borderBottom: "1px solid #eee",
    padding: "1rem 0",
  },
  label: {
    fontWeight: "bold",
    width: "200px",
    color: "#555",
  },
  value: {
    flex: 1,
  },
  treatmentSection: {
    marginTop: "1rem",
  },
  treatmentTitle: {
    color: "#333",
    marginBottom: "1rem",
    fontSize: "1.2rem",
  },
  treatmentList: {
    listStyle: "none",
    padding: 0,
  },
  treatmentItem: {
    backgroundColor: "#f8f9fa",
    padding: "0.5rem 1rem",
    marginBottom: "0.5rem",
    borderRadius: "4px",
  },
  noData: {
    textAlign: "center",
    color: "#666",
    padding: "2rem",
  },
  errorMessage: {
    backgroundColor: "#fff3f3",
    color: "#dc3545",
    padding: "1rem",
    borderRadius: "4px",
    marginBottom: "1rem",
    textAlign: "center",
  },
  doctorInfo: {
    marginBottom: "1.5rem",
    padding: "1rem",
    backgroundColor: "#e8f4ff",
    borderRadius: "8px",
    border: "1px solid #b3d7ff",
  },
  doctorLabel: {
    fontWeight: "bold",
    color: "#0056b3",
    marginRight: "0.5rem",
  },
  doctorName: {
    color: "#333",
  },
};

const PatientDashboard = () => {
  const [patientData, setPatientData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const userName = localStorage.getItem("userName");
        if (!userName) {
          throw new Error("User name not found");
        }

        const response = await Api.spatient({ name: userName });

        if (response.data.success) {
          setPatientData(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch patient data");
        }
      } catch (err) {
        setError(
          err.response?.data?.data?.message ||
            err.message ||
            "Error fetching patient data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  if (loading) {
    return <div style={styles.noData}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.errorMessage}>{error}</div>;
  }

  if (!patientData) {
    return <div style={styles.noData}>No patient data found</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Patient Dashboard</h1>

      <div style={styles.card}>
        <div style={styles.detailRow}>
          <span style={styles.label}>Name:</span>
          <span style={styles.value}>{patientData.name}</span>
        </div>
        <div style={styles.detailRow}>
          <span style={styles.label}>Room Number:</span>
          <span style={styles.value}>{patientData.roomno}</span>
        </div>
        <div style={styles.doctorInfo}>
          <span style={styles.doctorLabel}>Assigned Doctor:</span>
          <span style={styles.doctorName}>
            {patientData.assignedDoctor === "Unassigned"
              ? "Not yet assigned"
              : patientData.assignedDoctor}
          </span>
        </div>

        <div style={styles.treatmentSection}>
          <h3 style={styles.treatmentTitle}>Morning Treatments</h3>
          <ul style={styles.treatmentList}>
            {patientData.morning && patientData.morning.length > 0 ? (
              patientData.morning.map((treatment, index) => (
                <li key={index} style={styles.treatmentItem}>
                  {treatment}
                </li>
              ))
            ) : (
              <li style={styles.treatmentItem}>No morning treatments</li>
            )}
          </ul>
        </div>

        <div style={styles.treatmentSection}>
          <h3 style={styles.treatmentTitle}>Evening Treatments</h3>
          <ul style={styles.treatmentList}>
            {patientData.evening && patientData.evening.length > 0 ? (
              patientData.evening.map((treatment, index) => (
                <li key={index} style={styles.treatmentItem}>
                  {treatment}
                </li>
              ))
            ) : (
              <li style={styles.treatmentItem}>No evening treatments</li>
            )}
          </ul>
        </div>

        <div style={styles.treatmentSection}>
          <h3 style={styles.treatmentTitle}>Night Treatments</h3>
          <ul style={styles.treatmentList}>
            {patientData.night && patientData.night.length > 0 ? (
              patientData.night.map((treatment, index) => (
                <li key={index} style={styles.treatmentItem}>
                  {treatment}
                </li>
              ))
            ) : (
              <li style={styles.treatmentItem}>No night treatments</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
