import React, { useState, useEffect } from "react";
import Api from "../apis/Api";

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  title: {
    color: "#333",
    marginBottom: "2rem",
    textAlign: "center",
  },
  patientGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "2rem",
  },
  patientCard: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "1.5rem",
    transition: "transform 0.2s",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-5px)",
    },
  },
  patientName: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#007bff",
  },
  detail: {
    marginBottom: "0.5rem",
    color: "#555",
  },
  treatmentSection: {
    marginTop: "1rem",
  },
  treatmentTitle: {
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    color: "#666",
  },
  treatmentList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  treatmentItem: {
    backgroundColor: "#f8f9fa",
    padding: "0.5rem",
    marginBottom: "0.25rem",
    borderRadius: "4px",
    fontSize: "0.9rem",
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
};

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const doctorName = localStorage.getItem("userName");
        const response = await Api.getDoctorPatients(doctorName);
        console.log(response.data);
        if (response.data.success) {
          setPatients(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch patients");
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Error fetching patients"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return <div style={styles.noData}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.errorMessage}>{error}</div>;
  }

  if (!patients.length) {
    return <div style={styles.noData}>No patients assigned</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Patients</h1>
      <div style={styles.patientGrid}>
        {patients.map((patient) => (
          <div key={patient._id} style={styles.patientCard}>
            <div style={styles.patientName}>{patient.name}</div>
            <div style={styles.detail}>Room: {patient.roomno}</div>

            <div style={styles.treatmentSection}>
              <div style={styles.treatmentTitle}>Morning Treatments</div>
              <ul style={styles.treatmentList}>
                {patient.morning && patient.morning.length > 0 ? (
                  patient.morning.map((treatment, index) => (
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
              <div style={styles.treatmentTitle}>Evening Treatments</div>
              <ul style={styles.treatmentList}>
                {patient.evening && patient.evening.length > 0 ? (
                  patient.evening.map((treatment, index) => (
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
              <div style={styles.treatmentTitle}>Night Treatments</div>
              <ul style={styles.treatmentList}>
                {patient.night && patient.night.length > 0 ? (
                  patient.night.map((treatment, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default DoctorDashboard;
