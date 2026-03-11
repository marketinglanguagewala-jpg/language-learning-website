import React, { useState } from "react";

export default function About({ text }) {
  if (!text) return null;

  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ marginTop: "20px" }}>
      {/* Heading */}

      <div
        style={{
          borderTop: "1px solid #e6e6e6",
          
        }}
      ></div>

      <h2
        style={{
          fontSize: "22px",
          fontWeight: "500",
          marginBottom: "16px",
          marginTop: "16px"
        }}
      >
        About This Course
      </h2>

      {/* Visible Text */}
      <p
        style={{
          fontSize: "15px",
          lineHeight: "26px",
          color: "#4a4a4a",
          marginBottom: "0",
          whiteSpace: "pre-line",
        }}
      >
        {expanded ? text : text.slice(0, 350)}
        {!expanded && text.length > 350 && " ..."}
      </p>

      {/* Hidden / Expandable Part */}
      {text.length > 350 && (
        <div style={{ marginTop: "12px" }}>
          {!expanded ? (
            <span
              onClick={() => setExpanded(true)}
              style={{
                cursor: "pointer",
                fontWeight: "500",
                color: "#ff6b35",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Show More <i className="icon-arrow-bottom" />
            </span>
          ) : (
            <span
              onClick={() => setExpanded(false)}
              style={{
                cursor: "pointer",
                fontWeight: "500",
                color: "#ff6b35",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Hide <i className="icon-arrow-top" />
            </span>
          )}
        </div>
      )}
    </div>
  );
}
