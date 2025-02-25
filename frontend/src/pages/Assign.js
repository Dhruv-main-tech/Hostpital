import React, { useState, useEffect } from "react";
import Api from "../apis/Api";

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "800px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "2rem",
  },
  assignmentForm: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  formGroup: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    color: "#555",
    fontWeight: "bold",
  },
  select: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  errorMessage: {
    backgroundColor: "#fff3f3",
    color: "#dc3545",
    padding: "0.75rem",
    borderRadius: "4px",
    marginBottom: "1rem",
    textAlign: "center",
  },
  successMessage: {
    backgroundColor: "#d4edda",
    color: "#155724",
    padding: "0.75rem",
    borderRadius: "4px",
    marginBottom: "1rem",
    textAlign: "center",
  },
};

const Assign = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch doctors (users with role "doctor")
        const doctorsResponse = await Api.getDoctors();
        if (doctorsResponse.data.success) {
          setDoctors(doctorsResponse.data.data);
        }

        // Fetch all patients
        const patientsResponse = await Api.details();
        if (patientsResponse.data.success) {
          setPatients(patientsResponse.data.data);
        }
      } catch (err) {
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!selectedDoctor || !selectedPatient) {
      setError("Please select both a doctor and a patient");
      return;
    }

    try {
      const response = await Api.assignDoctor({
        doctorName: selectedDoctor,
        patientName: selectedPatient,
      });
      console.log(response.data);
      if (response.data.success) {
        setSuccess("Patient successfully assigned to doctor");

        // Refresh the patient list
        const patientsResponse = await Api.details();
        if (patientsResponse.data.success) {
          setPatients(patientsResponse.data.data);
        }

        // Reset selections
        setSelectedDoctor("");
        setSelectedPatient("");
      } else {
        setError(response.data.message || "Failed to assign patient");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Error assigning patient to doctor"
      );
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Assign Patients to Doctors</h1>
      <div style={styles.assignmentForm}>
        {error && <div style={styles.errorMessage}>{error}</div>}
        {success && <div style={styles.successMessage}>{success}</div>}
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="doctor">
              Select Doctor
            </label>
            <select
              id="doctor"
              style={styles.select}
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              <option value="">Choose a doctor...</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor.name}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="patient">
              Select Patient
            </label>
            <select
              id="patient"
              style={styles.select}
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
            >
              <option value="">Choose a patient...</option>
              {patients.map((patient) => (
                <option key={patient._id} value={patient.name}>
                  {patient.name} - Room {patient.roomno}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" style={styles.button}>
            Assign Patient to Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default Assign;
