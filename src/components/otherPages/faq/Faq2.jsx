// import Accordions from "@/components/common/Accordions";
import React from "react";

export default function Faqs2() {
  return (
    <section className="tf-spacing-26 section-faq pt-0">
      <div className="tf-container">
        <div className="row justify-center">
          <div className="col-xl-10 col-sm-12">
            <div className="heading-section text-center">
              <h2
                className="fw-7 font-cardo wow fadeInUp"
                data-wow-delay="0.2s"
              >
                For Institutes & Tutors 
              </h2>
              <div className="sub fs-15 wow fadeInUp" data-wow-delay="0.3s">
                Here are the questions about this template.
              </div>
            </div>
            <div
              className="tf-accordion-default tf-accordion w-800"
              id="accordionExample"
            >
              {/* <Accordions /> */}
                  <>
      <div className="tf-accordion-item">
        <h3 className="tf-accordion-header">
          <span
            className="tf-accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="false"
            aria-controls="collapseOne"
          >
            <span className="rectangle-314" />
            How can my institute get listed on languagewala?
          </span>
        </h3>
        <div
          id="collapseOne"
          className="tf-accordion-collapse collapse show"
          data-bs-parent="#accordionExample"
        >
          <div className="tf-accordion-content">
            <p>
              Institutes and tutors can simply register and create their profile by submitting course details, location, fee structure and contact information.
            </p>
          </div>
        </div>
      </div>
      <div className="tf-accordion-item">
        <h3 className="tf-accordion-header">
          <span
            className="tf-accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <span className="rectangle-314" />
            How do institutes receive student inquiries?
          </span>
        </h3>
        <div
          id="collapseTwo"
          className="tf-accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className="tf-accordion-content">
            <p>
              Interested student can reach course directly through the platform via clicking inquiry forms or provided contact details by institutes.
            </p>
            

          </div>
        </div>
      </div>
      <div className="tf-accordion-item">
        <h3 className="tf-accordion-header">
          <span
            className="tf-accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="true"
            aria-controls="collapseThree"
          >
            <span className="rectangle-314" />
            How does languagewala ensure fair competition?
          </span>
        </h3>
        <div
          id="collapseThree"
          className="tf-accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className="tf-accordion-content">
            <p>
              Languagewala promotes transparency through authentic structured listing, clear information display, and student feedback systems to encourage quality – driven competition.
            </p>
            
          </div>
        </div>
      </div>

    </>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
