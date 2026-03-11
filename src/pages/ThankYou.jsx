import React from "react";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <>
      <Header1 />

      <section style={styles.wrapper}>
        <div style={styles.container}>
          <div style={styles.card}>
            <h1 style={styles.heading}>Thank You!</h1>

            <p style={styles.text}>
              Your form has been submitted successfully.
              <br />
              Our team will contact you shortly.
            </p>

            <Link to="/" style={styles.button}>
              Go Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer1 parentClass="footer has-border-top" />
    </>
  );
};

const styles = {
  wrapper: {
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    backgroundColor: "#f9fafb",
  },
  container: {
    width: "100%",
    maxWidth: "600px",
  },
  card: {
    background: "#ffffff",
    padding: "50px 40px",
    borderRadius: "16px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "42px",
    color: "#28a745",
    fontWeight: "600",
  },
  text: {
    marginBottom: "30px",
    fontSize: "18px",
    color: "#555",
    lineHeight: "1.6",
  },
  button: {
    display: "inline-block",
    padding: "12px 28px",
    backgroundColor: "#1e40af",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "500",
    transition: "0.3s",
  },
};

export default ThankYou;