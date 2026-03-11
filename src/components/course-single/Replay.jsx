import React, { useState } from "react";
import { useParams } from "react-router-dom";
/* ================= FLOATING INPUT FIELD ================= */

function FloatingField({
  label,
  type = "text",
  textarea = false,
  value,
  onChange,
}) {
  const [focused, setFocused] = useState(false);

  const isActive = focused || value.length > 0;

  return (
    <div style={{ position: "relative", marginBottom: "32px", width: "100%" }}>
      <label
        style={{
          position: "absolute",
          left: 0,
          top: isActive ? "-10px" : "12px",
          fontSize: isActive ? "13px" : "15px",
          color: "#131836",
          transition: "all 0.25s ease",
          background: "#fff",
          padding: isActive ? "0 6px" : "0",
          pointerEvents: "none",
        }}
      >
        {label}
      </label>

      {textarea ? (
        <textarea
          rows={4}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            border: "none",
            borderBottom: "1px solid #e6e6e6",
            padding: "16px 0 8px",
            fontSize: "15px",
            outline: "none",
            resize: "none",
            background: "transparent",
          }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            border: "none",
            borderBottom: "1px solid #e6e6e6",
            padding: "16px 0 8px",
            fontSize: "15px",
            outline: "none",
            background: "transparent",
          }}
        />
      )}
    </div>
  );
}

/* ================= MAIN REPLAY COMPONENT ================= */

export default function Replay() {

  const { slug } = useParams();

  // Get course id from URL
  const courseId = slug ? slug.split("-").pop() : 0;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");
  const [message, setMessage] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");

  // Submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    console.log("Slug:", slug);
    console.log("Course ID:", courseId);

    try {

      const user_id = localStorage.getItem("user_id") || 0;

      // ✅ FormData
      const formDataObj = new FormData();

      formDataObj.append("name", name);
      formDataObj.append("email", email);
      formDataObj.append("phone", phone);
      formDataObj.append("course", course);
      formDataObj.append("message", message);

      formDataObj.append("source", "Reply");
      formDataObj.append("form_type", "course_reply");
      formDataObj.append("page_url", window.location.href);

      formDataObj.append("course_id", courseId);
      formDataObj.append("user_id", user_id);

      // DEBUG
      console.log("Sending Reply Lead:", Object.fromEntries(formDataObj));

      // ✅ Send
      const res = await fetch("https://languagewala.in/save-lead.php", {
        method: "POST",
        body: formDataObj,
      });

      const data = await res.json();

      console.log("Server Response:", data);

      if (data.status) {

        setPopupMsg("✅ Lead saved successfully!");
        setShowPopup(true);

        // Reset
        setName("");
        setEmail("");
        setPhone("");
        setCourse("");
        setMessage("");

      } else {

        setPopupMsg("❌ " + (data.message || "Failed to save lead"));
        setShowPopup(true);

      }

    } catch (err) {

      console.error("Reply Error:", err);

      setPopupMsg("❌ Server error");
      setShowPopup(true);

    }

    setLoading(false);
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   setLoading(true);
  //   console.log("Slug:", slug);
  //   console.log("Course ID:", courseId);
  //   // console.log("Institute ID:", institute_id);

  //   try {
  //     const user_id = localStorage.getItem("user_id");
  //     const res = await fetch(
  //       "https://languagewala.in/save-lead.php",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           name,
  //           email,
  //           phone,
  //           course,
  //           message,

  //           source: "website",
  //           form_type: "course_reply",
  //           page_url: window.location.href,

  //           course_id: courseId,
  //           user_id: localStorage.getItem("user_id"),

  //           institute_id: 0
  //         })
  //       }
  //     );

  //     const data = await res.json();

  //     if (data.status) {
  //       // ✅ Show Popup
  //       setPopupMsg("Lead saved successfully!");
  //       setShowPopup(true);

  //       // Clear form
  //       setName("");
  //       setEmail("");
  //       setPhone("");
  //       setCourse("");
  //       setMessage("");
  //     } else {
  //       setPopupMsg("❌ Failed to save lead");
  //       setShowPopup(true);
  //     }
  //   } catch (err) {
  //     console.error(err);

  //     setPopupMsg("❌ Server error");
  //     setShowPopup(true);
  //   }

  //   setLoading(false);
  // };

  return (
    <>
      {/* ================= POPUP ================= */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "25px 30px",
              borderRadius: "12px",
              minWidth: "280px",
              textAlign: "center",
              position: "relative",
            }}
          >
            {/* Close Button */}
            <span
              onClick={() => setShowPopup(false)}
              style={{
                position: "absolute",
                top: "8px",
                right: "12px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              ✖
            </span>

            <p style={{ fontSize: "16px", margin: 0 }}>{popupMsg}</p>
          </div>
        </div>
      )}

      {/* ================= FORM ================= */}

      <div
        style={{
          border: "1px solid #e6e6e6",
          borderRadius: "14px",
          padding: "32px",
          marginTop: "40px",
        }}
      >
        <h3 style={{ fontSize: "22px", fontWeight: 500, marginBottom: "10px" }}>
          Leave A Reply
        </h3>

        <p style={{ fontSize: "15px", marginBottom: "28px" }}>
          Your email address will not be published.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "30px" }}>
            <FloatingField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <FloatingField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", gap: "30px" }}>
            <FloatingField
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <FloatingField
              label="Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </div>

          <FloatingField
            label="Message"
            textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "30px",
              width: "100%",
              padding: "16px",
              background: "#131836",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "15px",
              cursor: "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Saving..." : "Post Comment"}
          </button>
        </form>
      </div>
    </>
  );
}
