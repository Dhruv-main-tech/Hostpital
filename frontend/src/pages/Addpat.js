import { useState, useEffect } from "react";
import Api from "../apis/Api";
import Loader from "../components/Loader";
import sharedStyles from "../styles/shared";

export default function AddPat() {
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [patients, setPatients] = useState([]);
  const [data, setData] = useState({
    name: "",
    roomno: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await Api.details();
        if (response.data.success) {
          // Filter out patients who already have rooms assigned
          const unassignedPatients = response.data.filter(
            (patient) => patient.roomno === "Unassigned"
          );
          setPatients(unassignedPatients);
        }
      } catch (err) {
        setError("Failed to fetch patients");
      }
    };

    fetchPatients();
  }, []);

  const handler = async () => {
    setLoading(true);
    setMsg("");
    setError("");

    if (!data.name || !data.roomno) {
      setError("Please select a patient and enter a room number");
      setLoading(false);
      return;
    }

    try {
      const response = await Api.updateRoom(data);
      if (response.data.success) {
        setMsg(response.data.message);
        setData({ name: "", roomno: "" }); // Reset form
        // Remove assigned patient from the list
        setPatients(patients.filter((patient) => patient.name !== data.name));
      } else {
        setError(response.data.message || "Failed to assign room");
      }
    } catch (err) {
      setError(err.response?.data?.data?.message || "Error assigning room");
    }
    setLoading(false);
  };

  return (
    <div style={sharedStyles.pageContainer}>
      <h1 style={sharedStyles.pageTitle}>Assign Room to Patient</h1>
      <div style={sharedStyles.card}>
        <div style={sharedStyles.formGroup}>
          <label style={sharedStyles.label}>Select Patient</label>
          <select
            style={sharedStyles.select}
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          >
            <option value="">Choose a patient...</option>
            {patients.map((patient) => (
              <option key={patient._id} value={patient.name}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>

        <div style={sharedStyles.formGroup}>
          <label style={sharedStyles.label}>Room Number</label>
          <input
            type="text"
            value={data.roomno}
            onChange={(e) => setData({ ...data, roomno: e.target.value })}
            placeholder="Enter room number"
            style={sharedStyles.input}
          />
        </div>

        <button
          onClick={handler}
          style={{
            ...sharedStyles.button,
            width: "100%",
          }}
          disabled={loading}
        >
          {loading ? "Assigning..." : "Assign Room"}
        </button>

        {loading && (
          <div style={sharedStyles.loadingContainer}>
            <Loader />
          </div>
        )}
        {msg && <div style={sharedStyles.successMessage}>{msg}</div>}
        {error && <div style={sharedStyles.errorMessage}>{error}</div>}
      </div>
    </div>
  );
}
