import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../apis/Api";

const styles = {
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  loginBox: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#333",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  loginButton: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
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

const Login = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home if already logged in
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Clean the input data
    const cleanedCredentials = {
      name: credentials.name.trim().toLowerCase(),
      password: credentials.password.trim(),
    };

    // Basic validation
    if (!cleanedCredentials.name || !cleanedCredentials.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await Api.login(cleanedCredentials);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userName", response.data.user.name);
        localStorage.setItem("userRole", response.data.user.role);

        setSuccessMessage(`Welcome ${response.data.user.name}! Redirecting...`);

        // Redirect based on role
        setTimeout(() => {
          if (response.data.user.role === "patient") {
            navigate("/patient-dashboard", { replace: true });
          } else if (response.data.user.role === "doctor") {
            navigate("/doctor-dashboard", { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        }, 1500);
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Login</h2>
        {error && <div style={styles.errorMessage}>{error}</div>}
        {successMessage && (
          <div style={styles.successMessage}>{successMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="name">
              Name
            </label>
            <input
              style={styles.input}
              type="text"
              id="name"
              name="name"
              value={credentials.name}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="password">
              Password
            </label>
            <input
              style={styles.input}
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              ...styles.loginButton,
              ":hover": {
                backgroundColor: "#0056b3",
              },
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
