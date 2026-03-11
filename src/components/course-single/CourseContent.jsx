import React, { useState } from "react";

export default function CourseContent({ sections }) {
  if (!sections || sections.length === 0) return null;

  return (
    <div style={{ marginTop: "10px" }}>
      <h2 style={{ fontSize: "22px", fontWeight: 500, marginBottom: "20px" }}>
        Course Content
      </h2>

      <div
        style={{
          border: "1px solid #e6e6e6",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {sections.map((sec, i) => (
          <AccordionSection key={i} sec={sec} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- ACCORDION SECTION ---------------- */

function AccordionSection({ sec }) {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ borderBottom: "1px solid #e6e6e6" }}>
      {/* HEADER */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 20px",
          cursor: "pointer",
        }}
      >
        {/* LEFT : ARROW + TITLE */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.25s ease",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <i className="icon-arrow-bottom" style={{ fontSize: "14px" }} />
          </span>

          <span style={{ fontSize: "16px", fontWeight: 500 }}>
            {sec.section}
          </span>
        </div>

        {/* RIGHT : META */}
        <div style={{ display: "flex", gap: "10px", fontSize: "14px" }}>
          <span>{sec.lectures.length} lectures</span>
          <span>•</span>
          <span>{sec.duration}</span>
        </div>
      </div>

      {/* CONTENT */}
      {open && (
        <div style={{ padding: "6px 20px 16px" }}>
          {sec.lectures.map((lec, j) => (
            <div
              key={j}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom:
                  j !== sec.lectures.length - 1
                    ? "1px solid #f0f0f0"
                    : "none",
              }}
            >
              {/* LEFT */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <i className="flaticon-play-1" />
                <span style={{ fontSize: "15px" }}>{lec}</span>
              </div>

              {/* RIGHT */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span
                  style={{
                    border: "1px solid #ff6b35",
                    color: "#ff6b35",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    fontSize: "13px",
                  }}
                >
                  Preview
                </span>
                <i className="flaticon-lock" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

