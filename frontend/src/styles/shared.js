const sharedStyles = {
  // Layout
  pageContainer: {
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    minHeight: "calc(100vh - 64px)", // Account for navbar
  },
  card: {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "2rem",
    marginBottom: "2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "2rem",
    marginTop: "2rem",
  },

  // Typography
  pageTitle: {
    fontSize: "2.5rem",
    color: "#2c3e50",
    marginBottom: "2rem",
    textAlign: "center",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: "1.8rem",
    color: "#34495e",
    marginBottom: "1.5rem",
    fontWeight: "500",
  },

  // Forms
  formGroup: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    color: "#2c3e50",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    transition: "border-color 0.2s ease",
    outline: "none",
    "&:focus": {
      borderColor: "#4299e1",
    },
  },
  select: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    backgroundColor: "white",
    transition: "border-color 0.2s ease",
    outline: "none",
    cursor: "pointer",
    "&:focus": {
      borderColor: "#4299e1",
    },
  },

  // Buttons
  button: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    fontWeight: "500",
    color: "white",
    backgroundColor: "#4299e1",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#3182ce",
      transform: "translateY(-1px)",
    },
    "&:disabled": {
      backgroundColor: "#a0aec0",
      cursor: "not-allowed",
    },
  },
  secondaryButton: {
    backgroundColor: "#718096",
    "&:hover": {
      backgroundColor: "#4a5568",
    },
  },
  dangerButton: {
    backgroundColor: "#f56565",
    "&:hover": {
      backgroundColor: "#e53e3e",
    },
  },

  // Messages
  successMessage: {
    backgroundColor: "#c6f6d5",
    color: "#2f855a",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "1rem",
    textAlign: "center",
    fontWeight: "500",
  },
  errorMessage: {
    backgroundColor: "#fed7d7",
    color: "#c53030",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "1rem",
    textAlign: "center",
    fontWeight: "500",
  },

  // Tables
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "1rem",
  },
  th: {
    padding: "1rem",
    textAlign: "left",
    backgroundColor: "#f7fafc",
    color: "#2d3748",
    fontWeight: "600",
    borderBottom: "2px solid #e2e8f0",
  },
  td: {
    padding: "1rem",
    borderBottom: "1px solid #e2e8f0",
  },

  // Cards
  itemCard: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "1.5rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: "1rem",
  },
  cardContent: {
    color: "#4a5568",
  },

  // Loading
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "200px",
  },
};

export default sharedStyles; 