import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    identifier: "", // username or email
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://languagewala.in/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: form.identifier, // ✅ username or email
          password: form.password,
        }),
      });

      const data = await response.json();
      if (data.status === "success") {
        localStorage.setItem("instructor_id", data.user.id);
        localStorage.setItem("isApproved", data.user.is_approved);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("user_id",data.user.id);
        // ✅ Save logged-in user info
        localStorage.setItem("instructor_name", data.user.username);
        localStorage.setItem("instructor_email", data.user.email);
        localStorage.setItem("isLoggedIn", "true");

        alert("✅ Login successful!");
        navigate("/instructor-dashboard"); // redirect after login
      } else {
        alert("⚠️ " + data.message);
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      alert("Something went wrong during login.");
    }

    setLoading(false);
  };

  return (
    <div className="main-content page-login">
      <section className="section-page-login login-wrap tf-spacing-4">
        <div className="tf-container">
          <div className="row">
            {/* LEFT SIDE IMAGE */}
            <div className="col-lg-6">
              <div className="img-left wow fadeInLeft" data-wow-delay="0s">
                <img
                  src="images/page-title/page-title-home2-1.jpg"
                  alt=""
                  width={591}
                  height={680}
                />
                <div className="blockquite wow fadeInLeft" data-wow-delay="0.1s">
                  <p>
                    Happiness prosperous impression had conviction For every
                    delay <br />
                    in they
                  </p>
                  <p className="author">Ali Tufan</p>
                  <p className="sub-author">Founder & CEO</p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE LOGIN FORM */}
            <div className="col-lg-6">
              <div className="content-right">
                <h2 className="login-title fw-7 wow fadeInUp" data-wow-delay="0s">
                  Sign In To Your Account
                </h2>

                <form onSubmit={handleLogin} className="form-login">
                  <div className="cols">
                    <fieldset className="tf-field field-username wow fadeInUp" data-wow-delay="0s">
                      <input
                        className="tf-input style-1"
                        id="identifier"
                        type="text"
                        name="identifier"
                        value={form.identifier}
                        onChange={handleChange}
                        required
                      />
                      <label className="tf-field-label fs-15" htmlFor="identifier">
                        Username or Email
                      </label>
                    </fieldset>
                  </div>

                  <div className="cols">
                    <fieldset className="tf-field field-pass wow fadeInUp" data-wow-delay="0s">
                      <input
                        className="tf-input style-1"
                        id="password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                      />
                      <label className="tf-field-label fs-15" htmlFor="password">
                        Password
                      </label>
                    </fieldset>
                  </div>

                  <div style={{ textAlign: "right", marginBottom: "15px" }}>
                    <span
                      style={{ color: "#4b49ac", cursor: "pointer", fontSize: "14px" }}
                      onClick={() => navigate("/forgot-password")}
                    >
                      Forgot Password?
                    </span>
                  </div>

                  <button
                    className="button-submit tf-btn w-100 wow fadeInUp"
                    data-wow-delay="0s"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Logging In..." : "Log In"}
                    <i className="icon-arrow-top-right" />
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
                    onClick={() => navigate("/register")}
                  >
                    List Your Course
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
