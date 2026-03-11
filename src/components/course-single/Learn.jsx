import React from "react";

export default function Learn({ items }) {
  if (!items || items.length === 0) return null;

  const mid = Math.ceil(items.length / 2);
  const leftItems = items.slice(0, mid);
  const rightItems = items.slice(mid);

  const liStyle = {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    marginBottom: "12px",
    color: "#4a4a4a"
  };

  const iconStyle = {
    fontSize: "16px",
    marginTop: "3px",
    flexShrink: 0,
    color: "#4a4a4a"
  };

  const textStyle = {
    lineHeight: "1.6",
  };

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
        What you'll learn
      </h2>

      <div className="learn-inner">
        {/* LEFT COLUMN */}
        <ul className="learn-list">
          {leftItems.map((item, i) => (
            <li className="item" key={`left-${i}`} style={liStyle}>
              <i className="flaticon-check" style={iconStyle} />
              <span style={textStyle}>{item}</span>
            </li>
          ))}
        </ul>

        {/* RIGHT COLUMN */}
        <ul className="learn-list">
          {rightItems.map((item, i) => (
            <li className="item" key={`right-${i}`} style={liStyle}>
              <i className="flaticon-check" style={iconStyle} />
              <span style={textStyle}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
