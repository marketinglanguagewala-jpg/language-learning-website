import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { menuItems, socialLinks } from "@/data/footerLinks";

export default function Footer1({ parentClass = "footer" }) {
  const formRef = useRef();
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  /* Detect Mobile */
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  const sendMail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_noj8796", "template_fs3xchn", formRef.current, {
        publicKey: "iG4SCmR-YtJagQ4gV",
      })
      .then((res) => {
        if (res.status === 200) {
          setSuccess(true);
          handleShowMessage();
          formRef.current.reset();
        } else {
          setSuccess(false);
          handleShowMessage();
        }
      });
  };

  return (
    <footer id="footer" className={parentClass}>
      <div className="footer-wrap">

        {/* ================= BODY ================= */}
        <div className="footer-body">
          <div className="tf-container">
            <div className="row">
              <div className="col-12">

                {/* MAIN WRAPPER */}
                <div
                  className="footer-body-wrap flex justify-between"
                  style={
                    isMobile
                      ? {
                          flexDirection: "column",
                          gap: "35px",
                        }
                      : {}
                  }
                >

                  {/* ================= LEFT INFO ================= */}
                  <div
                    className="footer-more-infor wow fadeInUp"
                    data-wow-delay="0s"
                    style={isMobile ? { width: "100%" } : {}}
                  >
                    <div className="footer-logo">
                      <Link to="/">
                        <img
                          alt=""
                          src="/images/logo/logo.svg"
                          width={123}
                          height={36}
                          className="footer-logo-1"
                        />
                        <img
                          className="footer-logo-2"
                          src="/images/logo/logo-text-white.svg"
                          alt=""
                        />
                      </Link>
                    </div>

                    <ul className="address">
                      <li className="flex gap-10 items-center">
                        <i className="flaticon-call" />
                        <p>+91-7300920554</p>
                      </li>

                      <li className="flex gap-10 items-center">
                        <i className="flaticon-mail-1" />
                        <p>info@languagewala.in</p>
                      </li>

                      <li className="flex gap-10 items-center">
                        <i className="flaticon-location" />
                        <p>
                          4th Floor, Building no – H-4, Hudson Lane,
                          Near G.T.B. Nagar Metro Station,
                          North Campus, Delhi University,
                          Delhi.
                        </p>
                      </li>
                    </ul>

                    {/* Social Icons */}
                    <ul
                      className="tf-social-icon flex items-center gap-10"
                      style={
                        isMobile
                          ? {
                              justifyContent: "center",
                              marginTop: "15px",
                            }
                          : {}
                      }
                    >
                      {socialLinks.map((link, index) => (
                        <li key={index}>
                          <a href={link.href}>
                            <i className={link.icon} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* ================= MENUS ================= */}
                  {isMobile ? (
                    /* MOBILE = GRID */
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "25px",
                        width: "100%",
                      }}
                    >
                      {menuItems.map((menu, index) => (
                        <div
                          key={index}
                          className="footer-menu-list wow fadeInUp"
                          data-wow-delay={menu.delay}
                          style={{ width: "100%" }}
                        >
                          <h5 className="fw-5">{menu.title}</h5>

                          <ul>
                            {menu.links.map((link, i) => (
                              <li key={i}>
                                {link.href.startsWith("/") ? (
                                  <Link to={link.href}>{link.name}</Link>
                                ) : (
                                  <a href={link.href}>{link.name}</a>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* DESKTOP = ORIGINAL */
                    <>
                      {menuItems.map((menu, index) => (
                        <div
                          key={index}
                          className="footer-menu-list wow fadeInUp"
                          data-wow-delay={menu.delay}
                        >
                          <h5 className="fw-5">{menu.title}</h5>

                          <ul>
                            {menu.links.map((link, i) => (
                              <li key={i}>
                                {link.href.startsWith("/") ? (
                                  <Link to={link.href}>{link.name}</Link>
                                ) : (
                                  <a href={link.href}>{link.name}</a>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </>
                  )}

                  {/* ================= SUBSCRIBE ================= */}
                  <div
                    className="footer-subscribe wow fadeInUp"
                    data-wow-delay="0.5s"
                    style={isMobile ? { width: "100%" } : {}}
                  >
                    <h5 className="fw-5 footer-sub-element">Subscribe</h5>

                    <p className="footer-sub-element">
                      2000+ Our students are subscribe Around the World.
                      Don’t be shy introduce yourself!
                    </p>

                    <div
                      className={`tfSubscribeMsg footer-sub-element ${
                        showMessage ? "active" : ""
                      }`}
                    >
                      {success ? (
                        <p style={{ color: "rgb(52,168,83)" }}>
                          You have successfully subscribed.
                        </p>
                      ) : (
                        <p style={{ color: "red" }}>
                          Something went wrong
                        </p>
                      )}
                    </div>

                    <form
                      className="form-subscribe style-line-bottom footer-sub-element"
                      onSubmit={sendMail}
                      ref={formRef}
                    >
                      <fieldset className="email">
                        <input
                          type="email"
                          placeholder="Your e-mail"
                          className="style-default"
                          name="email"
                          required
                        />
                      </fieldset>

                      <div className="button-submit">
                        <button className="tf-btn-arrow" type="submit">
                          Send
                          <i className="icon-arrow-top-right" />
                        </button>
                      </div>
                    </form>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="footer-bottom wow fadeInUp">
          <div className="tf-container">
            <div className="row">
              <div className="col-12">

                <div
                  className="footer-bottom-wrap flex justify-center items-center"
                  style={isMobile ? { textAlign: "center" } : {}}
                >
                  <p>
                    © 2025 Languagewala. All Rights Reserved | Managed by{" "}
                    <a
                      href="https://marketingraisers.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Marketing Raisers
                    </a>
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}