import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {

  const [params] = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Invalid link");
      return;
    }

    if (password !== confirm) {
      alert("Passwords not match");
      return;
    }

    setLoading(true);

    try {

      const res = await fetch(
        "https://languagewala.in/reset_password.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            password
          }),
        }
      );

      const data = await res.json();

      alert(data.message);

      if (data.status === "success") {
        navigate("/login");
      }

    } catch (err) {
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="main-content page-login">
      <section className="section-page-login login-wrap tf-spacing-4">
        <div className="tf-container">
          <div className="row">

            {/* LEFT IMAGE */}
            <div className="col-lg-6">
              <div className="img-left">
                <img
                  src="images/page-title/page-title-home2-1.jpg"
                  width={591}
                  height={680}
                  alt=""
                />
              </div>
            </div>

            {/* FORM */}
            <div className="col-lg-6">
              <div className="content-right">

                <h2 className="login-title fw-7">
                  Reset Password
                </h2>

                <form onSubmit={handleSubmit} className="form-login">

                  <fieldset className="tf-field">
                    <input
                      className="tf-input style-1"
                      type="password"
                      placeholder="New Password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </fieldset>

                  <fieldset className="tf-field">
                    <input
                      className="tf-input style-1"
                      type="password"
                      placeholder="Confirm Password"
                      required
                      onChange={(e) => setConfirm(e.target.value)}
                    />
                  </fieldset>

                  <button
                    className="button-submit tf-btn w-100"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Reset Password"}
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