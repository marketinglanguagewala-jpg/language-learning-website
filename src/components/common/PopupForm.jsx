import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { auth } from "../../../firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

export default function PopupForm({ brochure = null, instituteId }) {
  const [currentInstitute, setCurrentInstitute] = useState(instituteId || null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [confirmObj, setConfirmObj] = useState(null);
  const [verified, setVerified] = useState(false);
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  useEffect(() => {
  if (instituteId) {
    // console.log("POPUP GOT INSTITUTE:", instituteId);
    setCurrentInstitute(instituteId);
  }
}, [instituteId]);

useEffect(() => {

  let url = "https://admin.languagewala.in/backend-php/get_courses.php";

  // HOME PAGE
  if (location.pathname === "/") {

    url += "?type=languages";

  }

  // COURSE PAGE
  else {

    let instId = currentInstitute;

    // fallback from localStorage
    if (!instId) {
      instId = localStorage.getItem("current_institute_id");
    }

    if (instId) {
      url += "?institute_id=" + instId;
    }
  }

  // console.log("FETCH URL:", url);

  fetch(url, { credentials: "include" })
    .then(res => res.json())
    .then(data => {
      // console.log("POPUP COURSES:", data);
      setCourses(data);
    });

}, [location.pathname, currentInstitute]);

  // useEffect(() => {

  //   let url = "https://admin.languagewala.in/backend-php/get_courses.php";

  //   // HOME PAGE
  //   if (location.pathname === "/") {
  //     url += "?type=languages";
  //   }

  //   // COURSE PAGE
  //   else if (location.pathname.startsWith("/course/")) {

  //     const instituteId = localStorage.getItem("current_institute_id");

  //     if (instituteId) {
  //       url += "?institute_id=" + instituteId;
  //     }
  //   }

  //   // INSTITUTE PAGE
  //   else if (location.pathname.startsWith("/institute/")) {

  //     const id = location.pathname.split("/")[2];
  //     url += "?institute_id=" + id;
  //   }

  //   fetch(url, { credentials: "include" })
  //     .then(res => res.json())
  //     .then(data => {
  //       setCourses(data);
  //     });

  // }, [location.pathname]);

  

  // useEffect(() => {

  //   fetch("https://admin.languagewala.in/backend-php/get_courses.php", {
  //     credentials: "include"
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       setCourses(data);
  //     });

  // }, []);

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

  if (sendingOtp) return; // double click block

  setSendingOtp(true);

  try {

    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
    }

    // ✅ CORRECT ORDER (auth FIRST)
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
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
    // console.error("OTP Error:", err);
    alert(err.message);
  }
};


  /* ---------------- Verify OTP ---------------- */

  const verifyOTP = async () => {

    if (!otp) {
      alert("Enter OTP");
      return;
    }

    if (!confirmObj) {
      alert("Please resend OTP");
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
  };


  /* ---------------- Submit Form ---------------- */

const handleSubmit = async (e) => {

  e.preventDefault();
// please enable this part
  if (!verified) {
    alert("Please verify phone first");
    return;
  }

  setLoading(true);

  try {

    const user_id = localStorage.getItem("user_id") || 0;

    // ✅ Create FormData
    const formDataObj = new FormData();

    formDataObj.append("name", formData.name);
    formDataObj.append("email", formData.email);
    formDataObj.append("phone", formData.phone);
    if (formData.course) {
      formDataObj.append("course_id", formData.course);
    }

    formDataObj.append("source", "Course Pop Up");
    formDataObj.append("form_type", "popup_form");
    formDataObj.append("page_url", window.location.href);

    formDataObj.append("user_id", user_id);
    formDataObj.append("verified", 1);

    // ✅ DEBUG (optional – dekhne ke liye)
    // console.log("Sending Popup Lead:", Object.fromEntries(formDataObj));

    // ✅ Send Request
    const res = await fetch("https://languagewala.in/save-lead.php", {
      method: "POST",
      body: formDataObj,
    });

    const data = await res.json();

    // console.log("Server Response:", data);

    // ✅ Success
    if (data.status) {

      alert("Lead submitted successfully ✅");

      setShow(false);

      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "",
      });

      setOtp("");
      setOtpSent(false);
      setConfirmObj(null);
      setVerified(false);

      if (brochure?.startsWith("http")) {
        window.open(brochure, "_blank");
      }

      navigate("/thank-you");

    } 
    // ❌ Error from backend
    else {

      alert("Error: " + (data.message || "Something went wrong"));

    }

  } catch (err) {

    // console.error("Submit Error:", err);
    alert("Server Error ❌");

  } finally {

    setLoading(false);

  }

};


  /* ---------------- Popup Logic ---------------- */

useEffect(() => {

  window.openPopupForm = (instId = null) => {

    // console.log("OPEN POPUP WITH:", instId);

    if (instId) {
      setCurrentInstitute(instId);
      localStorage.setItem("current_institute_id", instId);
    }

    setShow(true);
  };

  return () => delete window.openPopupForm;

}, []);



  if (!show) return null;


  /* ---------------- UI ---------------- */

  return (
    <div style={overlayStyle}>

      <div style={popupStyle}>

        {/* Close */}
        <div onClick={() => setShow(false)} style={closeBtn}>
          ×
        </div>


        <h3 style={titleStyle}>Get Free Consultation</h3>


        <form onSubmit={handleSubmit}>


          {/* Name */}

          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />


          {/* Email */}

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
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select Course</option>

            {courses.map((c, i) => (
              <option
                key={`course-${i}`}
                // value={c.id || c.language}
                value={c.id}
              >
                {c.title || c.language}
              </option>
            ))}
          </select>

          {/* Phone */}

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


          {/* Send OTP */}
{/* please enable this part */}
          {!otpSent && (

            <button
              type="button"
              onClick={sendOTP}
              disabled={sendingOtp}
              style={{
                    ...otpBtn,
                opacity: sendingOtp ? 0.6 : 1,
                cursor: sendingOtp ? "not-allowed" : "pointer"
              }}
            >
              {sendingOtp ? "Sending..." : "Send OTP"}
            </button>

          )}


          {/* OTP Box */}
          {/* please enable this part */}

          {otpSent && !verified && confirmObj && (

            <>
              <input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={inputStyle}
              />

              <button
                type="button"
                onClick={verifyOTP}
                disabled={verifyingOtp}
                style={{
                  ...otpBtn,
                  opacity: verifyingOtp ? 0.6 : 1,
                  cursor: verifyingOtp ? "not-allowed" : "pointer"
                }}
              >
                {verifyingOtp ? "Verifying..." : "Verify OTP"}
              </button>
            </>

          )}


          {/* Verified Msg */}
{/* please enable this part */}
          {verified && (

            <p style={{ color: "green", marginBottom: 10 }}>
              ✔ Phone Verified
            </p>

          )}


          {/* Submit */}

          {/* <button
            type="submit"
            disabled={loading}
            style={submitBtn}
          >
            {loading ? "Submitting..." : "Submit"}
          </button> */}
{/* please enable this part */}
          {verified && (
            <button
              type="submit"
              disabled={loading}
              style={submitBtn}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          )}

        </form>


        {/* Recaptcha */}
        <div id="recaptcha-container"></div>

      </div>
    </div>
  );
}


/* ---------------- Styles ---------------- */

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