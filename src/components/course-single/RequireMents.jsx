import React from "react";

export default function RequireMents({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <>
      <h2
        style={{
          fontSize: "22px",
          fontWeight: "500",
          marginBottom: "16px",
          marginTop: "16px"
          
        }}
      >
        Requirements
      </h2>

      <ul
        style={{
          // paddingLeft: "22px",
          margin: 0,
          color: "#4a4a4a",
        }}
      >
        {items.map((item, i) => (
          <li
            key={i}
            style={{
              fontSize: "16px",
              lineHeight: "1.6",
              marginBottom: "12px"
            }}
          >
            • {item}
          </li>
        ))}
      </ul>
    </>
  );
}
