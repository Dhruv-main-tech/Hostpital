import { useEffect, useState } from "react";
import Api from "../apis/Api";
import Loader from "../components/Loader";
import sharedStyles from "../styles/shared";

export default function LogPage() {
  const [logData, setLogData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const response = await Api.log();
        if (response.data.success) {
          setLogData(response.data.data);
        } else {
          setError("Failed to fetch log data");
        }
      } catch (err) {
        setError("Error loading log data");
      } finally {
        setLoading(false);
      }
    };

    fetchLog();
  }, []);

  const formatLogEntries = (logString) => {
    return logString.split("\n\n").filter((entry) => entry.trim());
  };

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

  const logEntries = formatLogEntries(logData);

  return (
    <div style={sharedStyles.pageContainer}>
      <h1 style={sharedStyles.pageTitle}>Treatment Log</h1>

      <div style={sharedStyles.card}>
        {logEntries.map((entry, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#f7fafc",
              padding: "1.5rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              whiteSpace: "pre-wrap",
              fontFamily: "monospace",
              fontSize: "0.875rem",
              color: "#4a5568",
              border: "1px solid #e2e8f0",
            }}
          >
            {entry}
          </div>
        ))}
      </div>
    </div>
  );
}
