import React from "react";

export default function Accordions() {
  return (
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
            What is languagewala?
          </span>
        </h3>
        <div
          id="collapseOne"
          className="tf-accordion-collapse collapse show"
          data-bs-parent="#accordionExample"
        >
          <div className="tf-accordion-content">
            <p>
              Langugaewala is a listing and comparison platform that helps student to find best foreign language course from recognised institutes and professionals tutors in their city or online. Student can find and compare course based on ratings, fees, and learning mode.
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
            PersonaliDoes langaugewala offer language courses directly?
          </span>
        </h3>
        <div
          id="collapseTwo"
          className="tf-accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className="tf-accordion-content">
            <p>
              No. Languagewala does not offer language course directly. It helps students, institutes and tutors to get their perfect matches based on their preferences. 
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
            Are the reviews on langaugewala verified?
          </span>
        </h3>
        <div
          id="collapseThree"
          className="tf-accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className="tf-accordion-content">
            <p>
              Langaugewala encourages authentic student feedback that words toward maintaining transparency in reviews to help future students to choose course confidently.  
            </p>
            
          </div>
        </div>
      </div>

    </>
  );
}
