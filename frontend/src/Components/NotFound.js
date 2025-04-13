import React from 'react';

const NotFound = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/e-learning-theme.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem"
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          padding: "2rem",
          borderRadius: "12px",
          textAlign: "center",
          maxWidth: "500px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}
      >
        <h2>404 - Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default NotFound;
