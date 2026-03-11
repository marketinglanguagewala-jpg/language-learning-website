import React from "react";

export default function Banner2() {
  return (
    <section className="section-start-banner">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="main-section">
              <div className="heading-section style-white mb-0">
                <h2 className="font-cardo wow fadeInUp" data-wow-delay="0.1s">
                  All In One Place, Quality <br /> Learning Options
                </h2>
                <p className="sub wow fadeInUp" data-wow-delay="0.2s">
                  {" "}
                  Find better institutes and tutors that offer:
                  <ul>
                    <li>•	 High quality video-based courses</li>
                    <li>•	 Structured and well-defined learning modules</li>
                    <li>•	 Mind maps for tracking progress</li>
                  </ul>
                </p>
                
              </div>
              <button
                  type="button"
                  className="tf-btn"
                  onClick={() => {
                    if (window.openHomePopupForm) {
                      window.openHomePopupForm();
                    }
                  }}
                >
                  Get Started <i className="icon-arrow-top-right" />
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
