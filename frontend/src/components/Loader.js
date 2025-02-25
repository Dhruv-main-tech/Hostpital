import React from "react";

const Loader = ({ size = 60, color = "#3498db", borderThickness = 8 }) => {
  const loaderStyle = {
    border: `${borderThickness}px solid #f3f3f3`,
    borderTop: `${borderThickness}px solid ${color}`,
    borderRadius: "50%",
    width: `${size}px`,
    height: `${size}px`,
    animation: "spin 2s linear infinite",
  };

  return (
    <div style={styles.loaderContainer}>
      <div style={loaderStyle}></div>
    </div>
  );
};

const styles = {
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const spinAnimation = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(spinAnimation, styleSheet.cssRules.length);

export default Loader;
