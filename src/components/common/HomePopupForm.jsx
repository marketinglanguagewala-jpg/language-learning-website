import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

export default function HomePopupForm() {

  const [show, setShow] = useState(false);
  const [languages, setLanguages] = useState([]);

  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [confirmObj, setConfirmObj] = useState(null);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    language: "",
  });

  /* ---------------- Fetch Languages ---------------- */

  useEffect(() => {
    fetch("https://admin.languagewala.in/backend-php/get_courses.php?type=languages")
      .then(res => res.json())
      .then(data => setLanguages(data));
  }, []);

  /* ---------------- Form Change ---------------- */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------------- Send OTP ---------------- */

  const sendOTP = async () => {

    if (!formData.phone || formData.phone.length !== 10) {
      alert("Enter valid phone number");
      return;
    }

    if (sendingOtp) return;
    setSendingOtp(true);

    try {

      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );

      const confirmation = await signInWithPhoneNumber(
        auth,
        "+91" + formData.phone,
        window.recaptchaVerifier
      );

      setConfirmObj(confirmation);
      setOtpSent(true);
      alert("OTP Sent ✅");

    } catch (err) {
      alert(err.message);
    }

    setSendingOtp(false);
  };

  /* ---------------- Verify OTP ---------------- */

  const verifyOTP = async () => {

    if (!otp || !confirmObj) {
      alert("Enter valid OTP");
      return;
    }

    if (verifyingOtp) return;
    setVerifyingOtp(true);

    try {
      await confirmObj.confirm(otp);
      setVerified(true);
      alert("Phone verified ✅");
    } catch {
      alert("Invalid OTP ❌");
    }

    setVerifyingOtp(false);
  };

  /* ---------------- Submit ---------------- */

  const handleSubmit = async (e) => {

    e.preventDefault();
      // please enable this part
    if (!verified) {
      alert("Please verify phone first");
      return;
    }

    setLoading(true);

    try {

      const formDataObj = new FormData();

      formDataObj.append("name", formData.name);
      formDataObj.append("email", formData.email);
      formDataObj.append("phone", formData.phone);
      formDataObj.append("course_name", formData.language);
      formDataObj.append("source", "Home Pop Up");
      formDataObj.append("form_type", "popup_form");
      formDataObj.append("page_url", window.location.href);
      formDataObj.append("verified", 1);

      const res = await fetch("https://languagewala.in/save-lead.php", {
        method: "POST",
        body: formDataObj,
      });

      const data = await res.json();

      if (data.status) {

        alert("Lead submitted successfully ✅");

        setShow(false);
        setOtp("");
        setOtpSent(false);
        setConfirmObj(null);
        setVerified(false);

        setFormData({
          name: "",
          email: "",
          phone: "",
          language: "",
          
        });
        navigate("/thank-you");

      } else {
        alert(data.message || "Something went wrong");
      }

    } catch {
      alert("Server Error ❌");
    }

    setLoading(false);
  };

  /* ---------------- Global Open ---------------- */

  useEffect(() => {
    window.openHomePopupForm = () => setShow(true);
    return () => delete window.openHomePopupForm;
  }, []);

  if (!show) return null;

  /* ---------------- UI ---------------- */

  return (
    <div style={overlayStyle}>
      <div style={popupStyle}>

        <div onClick={() => setShow(false)} style={closeBtn}>×</div>

        <h3 style={titleStyle}>Get Free Consultation</h3>

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select Language</option>
            {languages.map((l, i) => (
              <option key={i} value={l.language}>
                {l.language}
              </option>
            ))}
          </select>

          <input
            name="phone"
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            // please enable this part
            disabled={otpSent}
            required
            style={inputStyle}
          />
{/* please enable this part */}
          {!otpSent && (
            <button type="button" onClick={sendOTP} style={otpBtn}>
              {sendingOtp ? "Sending..." : "Send OTP"}
            </button>
          )}

          {otpSent && !verified && (
            <>
              <input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={inputStyle}
              />
              <button type="button" onClick={verifyOTP} style={otpBtn}>
                {verifyingOtp ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          )}

          {verified && (

            <p style={{ color: "green", marginBottom: 10 }}>
              ✔ Phone Verified
            </p>

          )}

          {/* <button type="submit" disabled={loading} style={submitBtn}>
            {loading ? "Submitting..." : "Submit"}
          </button> */}
{/* please enable this part */}
          {verified && (
            <button type="submit" disabled={loading} style={submitBtn}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          )}

        </form>

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}

/* -------- Styles -------- */

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const popupStyle = {
  background: "#fff",
  width: "90%",
  maxWidth: "400px",
  padding: "22px",
  borderRadius: "14px",
  textAlign: "center",
  position: "relative",
};

const closeBtn = {
  position: "absolute",
  top: 10,
  right: 12,
  fontSize: 22,
  cursor: "pointer",
  fontWeight: 700,
};

const titleStyle = {
  marginBottom: 18,
  fontSize: 20,
};

const inputStyle = {
  width: "100%",
  padding: 11,
  marginBottom: 10,
  borderRadius: 8,
  border: "1px solid #ddd",
};

const otpBtn = {
  width: "100%",
  padding: 10,
  marginBottom: 10,
  background: "#3B4AFE",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
};

const submitBtn = {
  width: "100%",
  padding: 12,
  background: "#3B4AFE",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontWeight: 600,
};