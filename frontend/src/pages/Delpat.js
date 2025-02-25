import { useState } from "react";
import Api from "../apis/Api";
import Loader from "../components/Loader";
import sharedStyles from "../styles/shared"; // Import shared styles

export default function DelPat() {
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const [data, setData] = useState(""); // Initialize as an empty string
  const [loading, setLoading] = useState(false);

  const handler = async () => {
    setLoading(true);
    setError(""); // Reset error message before making the API call
    try {
      const res = await Api.del({ name: data });
      setLoading(false);
      if (res.data.success) {
        setMsg(res.data.message); // Set success message
        setData(""); // Clear the input field after successful deletion
      } else {
        setError(res.data.message || "Failed to delete patient");
      }
    } catch (err) {
      setLoading(false);
      setError("Error deleting patient. Please try again.");
    }
  };

  const handleInputChange = (event) => {
    setData(event.target.value); // Update data with the input value
  };

  return (
    <div style={sharedStyles.pageContainer}>
      <h1 style={sharedStyles.pageTitle}>Delete Patient</h1>
      <div style={sharedStyles.card}>
        <input
          type="text"
          value={data}
          onChange={handleInputChange}
          placeholder="Enter patient name"
          style={sharedStyles.input} // Use shared styles for input
        />
        {error && <div style={sharedStyles.errorMessage}>{error}</div>}{" "}
        {/* Display error message */}
        <button
          onClick={handler}
          style={sharedStyles.button} // Use shared styles for button
        >
          Delete Patient
        </button>
        <div>
          {loading && <Loader />}
          {!loading && msg && (
            <div style={sharedStyles.successMessage}>{msg}</div>
          )}
        </div>
      </div>
    </div>
  );
}
