import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";

import { auth } from "../../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function Register() {

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const [phoneOtp, setPhoneOtp] = useState("");
  const [confirmObj, setConfirmObj] = useState(null);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [verifiedMsg, setVerifiedMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });


  const sendPhoneOtp = async (e) => {

    e.preventDefault();
    if (sendingOtp) return;

    if (!form.phone || form.phone.length !== 10) return;

    try {

      setSendingOtp(true);

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
        "+91" + form.phone,
        window.recaptchaVerifier
      );

      setConfirmObj(confirmation);
      setOtpSent(true);

    } catch (err) {
      console.log(err);
    }

    setSendingOtp(false);
  };


  const verifyPhoneOtp = async () => {

    if (verifyingOtp) return;

    if (!phoneOtp || !confirmObj) return;

    try {

      setVerifyingOtp(true);

      await confirmObj.confirm(phoneOtp);

      setPhoneVerified(true);
      setVerifiedMsg("Phone verified ✓");

    } catch {

      setVerifiedMsg("Invalid OTP");

    }

    setVerifyingOtp(false);
  };


  const handleRegister = async () => {

    if (!phoneVerified || registering) return;

    try {

      setRegistering(true);

      const response = await fetch("https://languagewala.in/signup.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          phone: form.phone,
          location: form.location,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {

        localStorage.setItem("instructor_name", form.username);
        localStorage.setItem("instructor_email", form.email);
        localStorage.setItem("isApproved", "false");

        await emailjs.send(
          "service_qxw05ve",
          "template_ntjvlw8",
          {
            instructor_name: form.username,
            instructor_email: form.email,
            company_email: "info@languagewala.in",
            approval_link: `https://languagewala.in/approve_instructor.php?email=${form.email}`,
          },
          "YXiQOOpb8sFENZKqe"
        );

        window.location.href = "https://languagewala.in/instructor-dashboard";

      }

    } catch (err) {

      console.log(err);

    }

    setRegistering(false);
  };


  return (
    <div className="main-content page-register">
      <section className="section-page-register login-wrap tf-spacing-4">
        <div className="tf-container">
          <div className="row">

            <div className="col-lg-6">
              <div className="img-left">
                <img
                  src="images/page-title/page-title-home2-2.jpg"
                  alt=""
                  width={592}
                  height={681}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="content-right">

                <h2 className="login-title fw-7">
                  Create A New Account
                </h2>

                {!otpSent ? (

                  <form onSubmit={sendPhoneOtp} className="form-login">

                    <input
                      className="tf-input style-1"
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={form.username}
                      onChange={handleChange}
                      required
                    />

                    <input
                      className="tf-input style-1"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />

                    <input
                      className="tf-input style-1"
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />

                    <input
                      className="tf-input style-1"
                      type="text"
                      name="location"
                      placeholder="Location"
                      value={form.location}
                      onChange={handleChange}
                      required
                    />

                    <input
                      className="tf-input style-1"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />

                    <input
                      className="tf-input style-1"
                      type="password"
                      name="confirmPassword"
                      placeholder="Repeat Password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                    />

                    <button className="tf-btn w-100" type="submit">
                      {sendingOtp ? "Sending..." : "Send OTP"}
                    </button>

                    <button
                      type="button"
                      className="tf-btn w-100"
                      style={{
                        marginTop: "15px",
                        background: "transparent",
                        color: "#4b49ac",
                        border: "1px solid #4b49ac",
                      }}
                      onClick={() => navigate("/login")}
                    >
                      Sign In
                    </button>

                  </form>

                ) : (

                  <form className="form-login">

                    <h4 style={{ marginBottom: "20px" }}>
                      Verify Your Phone
                    </h4>

                    <input
                      className="tf-input style-1"
                      type="text"
                      placeholder="Enter Phone OTP"
                      value={phoneOtp}
                      onChange={(e) => setPhoneOtp(e.target.value)}
                    />

                    {verifiedMsg && (
                      <p style={{color:"#4CAF50",marginTop:"10px"}}>
                        {verifiedMsg}
                      </p>
                    )}

                    <button
                      type="button"
                      className="tf-btn w-100"
                      onClick={verifyPhoneOtp}
                    >
                      {verifyingOtp ? "Verifying..." : "Verify Phone"}
                    </button>

                    <button
                      type="button"
                      className="tf-btn w-100"
                      onClick={handleRegister}
                      disabled={!phoneVerified}
                      style={{
                        marginTop: "20px",
                        opacity: phoneVerified ? 1 : 0.6,
                      }}
                    >
                      {registering ? "Processing..." : "Register"}
                    </button>

                  </form>

                )}

                <div id="recaptcha-container"></div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}