import React from "react";

export default function OurVisions() {
  return (
    <section className="section-vison tf-spacing-8 pt-0 page-about">
      <div className="tf-container">
        <div className="row align-items-center">
          
          {/* Image */}
          <div className="col-lg-7">
            <div className="images wow fadeInLeft">
              <img
                src="/images/section/how_its_work.svg"
                alt="How it works"
                className="vision-image"
              />
            </div>
          </div>

          {/* Content */}
          <div className="col-lg-5">
            <div className="vision-content">
              <h2 className="fw-7 font-cardo wow fadeInUp">
                How LanguageWala Works
              </h2>

              <p className="vision-intro wow fadeInUp">
                Our platform enables language learners and tutors to connect identify the most suitable matches based on their specific preferences and requirements.
              </p>
              <br></br>
              <div className="steps">
                <div className="step wow fadeInUp">
                  <h3>1. Select your language & requirements</h3>
                  <p>
                    Browse different foreign language and filter institutes and tutors based on your city, budget, course type and learning preference.
                  </p>
                </div>
                <br></br>
                <div className="step wow fadeInUp">
                  <h3>2. Compare course & providers</h3>
                  <p>
                    Get detailed view of institute and tutor profiles, including course structure, duration, fees and student feedback. 
                  </p>
                </div>
                <br></br>
                <div className="step wow fadeInUp">
                  <h3>3. Choose the right option</h3>
                  <p>
                    Find best matches based on your learning goal – career growth, exam preparation or foundational learning.
                  </p>
                </div>
                <br></br>
                <div className="step wow fadeInUp">
                  <h3>4. Connect directly with institutes</h3>
                  <p>
                    Reach out institutes or tutors directly and begin your language learning journey with clarity and confidence.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
