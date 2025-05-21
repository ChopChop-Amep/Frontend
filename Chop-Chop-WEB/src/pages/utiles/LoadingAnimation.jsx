import React from "react";

function LoadingAnimation() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
    >
      <div className="spinner" />
      <style>
        {`
            .spinner {
            width: 48px;
            height: 48px;
            border: 6px solid #ccc;
            border-top: 6px solid #0078d4;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            }
            @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
            }
        `}
      </style>
    </div>
  );
}

export default LoadingAnimation;
