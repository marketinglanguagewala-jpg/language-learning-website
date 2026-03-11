import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://languagewala.in/forgot_password.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

    //   const data = await res.json();
    const text = await res.text();
    console.log("Server:", text); // debug
    const data = JSON.parse(text);

      alert(data.message);

      if (data.status === "success") {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
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
              <div className="img-left wow fadeInLeft">
                <img
                  src="images/page-title/page-title-home2-1.jpg"
                  alt=""
                  width={591}
                  height={680}
                />
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="col-lg-6">
              <div className="content-right">

                <h2 className="login-title fw-7 wow fadeInUp">
                  Forgot Password
                </h2>

                

                <form onSubmit={handleSubmit} className="form-login">

                  <div className="cols">
                    <fieldset className="tf-field wow fadeInUp">

                      <input
                        className="tf-input style-1"
                        type="email"
                        name="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      <label className="tf-field-label fs-15">
                        Email Address
                      </label>

                    </fieldset>
                  </div>
                  <br></br>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="button-submit tf-btn w-100 wow fadeInUp"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                    <i className="icon-arrow-top-right" />
                  </button>

                  {/* Back to login */}
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
                    Back to Login
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