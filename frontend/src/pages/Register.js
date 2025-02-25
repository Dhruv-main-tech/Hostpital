import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../apis/Api";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  formBox: {
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
  select: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    backgroundColor: "white",
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
  loginLink: {
    textAlign: "center",
    marginTop: "1rem",
  },
  linkText: {
    color: "#007bff",
    textDecoration: "none",
    cursor: "pointer",
  },
  errorMessage: {
    backgroundColor: "#fff3f3",
    color: "#dc3545",
    padding: "0.75rem",
    borderRadius: "4px",
    marginBottom: "1rem",
    textAlign: "center",
  },
};

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    role: "patient",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home if already logged in
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Trim whitespace from all fields
    const cleanedFormData = {
      name: formData.name.trim().toLowerCase(), // Normalize name to lowercase
      password: formData.password.trim(),
      confirmPassword: formData.confirmPassword.trim(),
      role: formData.role,
    };

    // Basic validation
    if (cleanedFormData.name.length < 3) {
      setError("Name must be at least 3 characters long");
      return;
    }

    if (cleanedFormData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (cleanedFormData.password !== cleanedFormData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await Api.register({
        name: cleanedFormData.name,
        password: cleanedFormData.password,
        role: cleanedFormData.role,
      });
      console.log(response);
      if (response.data.success) {
        navigate("/login");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(
        err.response?.data?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.title}>Register</h2>
        {error && <div style={styles.errorMessage}>{error}</div>}
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
              value={formData.name}
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
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              style={styles.input}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="role">
              Role
            </label>
            <select
              style={styles.select}
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
        <div style={styles.loginLink}>
          Already have an account?{" "}
          <span style={styles.linkText} onClick={() => navigate("/login")}>
            Login here
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
