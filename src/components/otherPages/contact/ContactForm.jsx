import React, { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState("");

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const sendMail = (e) => {

    e.preventDefault();

    const user_id = localStorage.getItem("user_id") || 0;

    if (!selectedInterest) {
      alert("Please select interest");
      return;
    }

    if (!name || !email || !message) {
      alert("Please fill all fields");
      return;
    }

    const formDataObj = new FormData();

    formDataObj.append("name", name);
    formDataObj.append("email", email);
    formDataObj.append("interest", selectedInterest);
    formDataObj.append("message", message);

    formDataObj.append("source", "contact");
    formDataObj.append("form_type", "contact_form");
    formDataObj.append("page_url", window.location.href);
    formDataObj.append("user_id", user_id);

    console.log("Sending Contact Lead:", Object.fromEntries(formDataObj));

    fetch("https://languagewala.in/save-lead.php", {
      method: "POST",
      body: formDataObj,
    })
      .then((res) => res.json())
      .then((data) => {

        console.log("Server Response:", data);

        if (data.status) {

          setSuccess(true);

          // Reset
          setName("");
          setEmail("");
          setMessage("");
          setSelectedInterest("");

        } else {

          setSuccess(false);
          alert(data.message || "Failed to save");

        }

        handleShowMessage();

      })
      .catch((err) => {

        console.error("DB error:", err);

        setSuccess(false);
        handleShowMessage();

      });
  };

  return (
    <div className="contact-wrap bg-white tf-spacing-26 pt-0">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-6">
            <div className="img-left">
              <img
                src="/images/page-title/page-title-home2-1.jpg"
                width={591}
                height={680}
                alt="contact"
              />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="content-right">
              <h2 className="fw-7">How Can We Help?</h2>

              <form onSubmit={sendMail} className="contact-form">

                {/* Name */}
                <div className="cols">
                  <input
                    className="tf-input style-1"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                  />
                </div>

                {/* Email */}
                <div className="cols">
                  <input
                    className="tf-input style-1"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                </div>


                {/* Interested In */}
                {/* Interested In Custom Dropdown */}
<div className="cols">
  <fieldset
    className="tf-field wow fadeInUp"
    data-wow-delay={0}
    style={{ position: "relative" }}
  >

    <div
      style={{
        position: "relative",
        borderBottom: "1px solid #e5e5e5",
        padding: "12px 0",
        cursor: "pointer"
      }}
      onClick={() =>
        setDropdownOpen(!dropdownOpen)
      }
    >
      {selectedInterest || "Interested In"}

      <span
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "12px"
        }}
      >
        ▼
      </span>
    </div>

    {dropdownOpen && (
      <div
        style={{
          position: "absolute",
          width: "100%",
          background: "#fff",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          zIndex: 10,
          marginTop: "5px"
        }}
      >
        {[
          "Nihongomax - Japanese",
          "Languagewala - Portuguese",
          "Marketing Raisers - German"
        ].map((item) => (
          <div
            key={item}
            onClick={() => {
              setSelectedInterest(item);
              setDropdownOpen(false);
            }}
            style={{
              padding: "10px",
              borderBottom: "1px solid #f1f1f1",
              cursor: "pointer"
            }}
            onMouseEnter={(e) =>
              (e.target.style.background = "#f7f7f7")
            }
            onMouseLeave={(e) =>
              (e.target.style.background = "#fff")
            }
          >
            {item}
          </div>
        ))}
      </div>
    )}
      <input
        type="hidden"
        name="interest"
        value={selectedInterest}
      />
  </fieldset>
</div>

                {/* Message */}
                <div className="cols">
                  <textarea
                    className="tf-input style-1"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Message"
                    required
                  />
                </div>

                {/* Success Message */}
                <div className={`tfSubscribeMsg ${showMessage ? "active" : ""}`}>
                  {success ? (
                    <p style={{ color: "green" }}>
                      Message sent successfully
                    </p>
                  ) : (
                    <p style={{ color: "red" }}>
                      Something went wrong
                    </p>
                  )}
                </div>

                <button
                  className="button-submit tf-btn w-100"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}