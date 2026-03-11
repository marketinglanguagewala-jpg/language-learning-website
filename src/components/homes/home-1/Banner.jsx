import React from "react";

export default function Banner() {
  return (
    <section className="section-get-started tf-spacing-3 pt-0">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="get-started-wrap flex">
              {/* LEFT CONTENT */}
              <div className="wrap-content">
                <h2 className="font-cardo fw-7 wow fadeInUp" data-wow-delay="0s">
                  Build Real Confidence In a New Language
                  
                </h2>

                <p className="fs-15 wow fadeInUp" data-wow-delay="0.1s">
                  With right guidance, language learning can become smoother and more easy to understand complex language concepts. By Chocsing right language course you can.

                  
                  <ul className="fs-15 wow fadeInUp" data-wow-delay="0.1s">
                    <li>•	 Improve reading and writing fluency</li>
                    <li>•	 Gain confidence in real time conversation</li>
                    <li>•	 Overcome hesitation and fear of mistakes</li>
                  </ul>
                  
                </p>

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

                {/* ✅ TAGS — NOW BELOW GET STARTED */}
                <div className="tags-list style2 mt-20">
                  <ul className="tag-list">
                    <li className="tag-list-item wow fadeInUp" data-wow-delay="0.3s">
                      <a className="font-outfit" href="#">
                        Expert Trainers
                      </a>
                    </li>
                    <li className="tag-list-item wow fadeInUp" data-wow-delay="0.4s">
                      <a className="font-outfit" href="#">
                        Online Remote Learning
                      </a>
                    </li>
                    <li className="tag-list-item wow fadeInUp" data-wow-delay="0.5s">
                      <a className="font-outfit" href="#">
                        Lifetime Access
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div className="img-right">
                <img
                  className="lazyload"
                  src="/images/section/learn_latest_things.svg"
                  alt=""
                  width={1370}
                  height={1201}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
