import { useEffect, useState } from "react";
import Api from "../apis/Api";
import Loader from "../components/Loader";
import sharedStyles from "../styles/shared";

export default function DocsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await Api.details();
        if (response.data.success) {
          setPatients(response.data.data);
        } else {
          setError("Failed to fetch patients");
        }
      } catch (err) {
        setError("Error loading patients");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return (
      <div style={sharedStyles.loadingContainer}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div style={sharedStyles.errorMessage}>{error}</div>;
  }

  return (
    <div style={sharedStyles.pageContainer}>
      <h1 style={sharedStyles.pageTitle}>All Patients</h1>

      <div style={sharedStyles.card}>
        <div style={{ overflowX: "auto" }}>
          <table style={sharedStyles.table}>
            <thead>
              <tr>
                <th style={sharedStyles.th}>Name</th>
                <th style={sharedStyles.th}>Room</th>
                <th style={sharedStyles.th}>Doctor</th>
                <th style={sharedStyles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id}>
                  <td style={sharedStyles.td}>{patient.name}</td>
                  <td style={sharedStyles.td}>{patient.roomno}</td>
                  <td style={sharedStyles.td}>
                    {patient.assignedDoctor || "Unassigned"}
                  </td>
                  <td style={sharedStyles.td}>
                    <span
                      style={{
                        padding: "0.25rem 0.75rem",
                        borderRadius: "9999px",
                        fontSize: "0.875rem",
                        backgroundColor:
                          patient.roomno === "Unassigned"
                            ? "#fed7d7"
                            : "#c6f6d5",
                        color:
                          patient.roomno === "Unassigned"
                            ? "#c53030"
                            : "#2f855a",
                      }}
                    >
                      {patient.roomno === "Unassigned" ? "Pending" : "Admitted"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
