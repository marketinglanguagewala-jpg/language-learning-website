import React from "react";
import Reviews from "../course-single/Reviews";
import Replay from "../course-single/Replay";
import InstituteCourses from "./InstituteCourses";

export default function InstractorSingle({courses = []}) {
  return (
    <div className="tf-container">
      <div className="row">
        <div className="col-lg-8">
          <div className="instructor-single-inner">
            <div className="instructor-about">
              <h2 className="text-22 fw-5 wow fadeInUp" data-wow-delay="0s">
                About Me
              </h2>
              <p className="text-1 fs-15">
                Professional Training Institute
              </p>
            </div>
            <div className="instructor-my-course">
              {/* <MyCourses /> */}
              <InstituteCourses courses={courses} />
            </div>
            <div className="instructor-review-wrap review-wrap">
              <Reviews />
            </div>
            <div className="instructor-add-review add-review-wrap">
              <Replay />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="sidebar-instructor">
            <div className="instructor-img">
              <img
                className="ls-is-cached lazyloaded"
                data-src="/images/instructors/instructors-03.jpg"
                alt=""
                src="/images/instructors/instructors-03.jpg"
                width={520}
                height={521}
              />
            </div>
            <div className="sidebar-instructor-content">
              <h5 className="fw-5">Contact Me</h5>
              <ul>
                <li>
                  <i className="flaticon-location" />
                  <a className="fs-15" href="#">
                    4th Floor, Building no – H-4, Hudson Lane, Near G.T.B. Nagar Metro Station , North Campus, Delhi University, Delhi.
                  </a>
                </li>
                <li className="item-contact">
                  <i className="flaticon-mail-1" />
                  <a href="mailto:info@linguapol.com">info@linguapol.com</a>
                </li>
                <li className="item-contact">
                  <i className="flaticon-call" />
                  <a href="tel:+917300920554">(+91) - 73009 20554</a>
                </li>
                <li className="item-contact">
                  <i className="flaticon-programming" />
                  <a href="#">https://www.linguapol.com/</a>
                </li>
              </ul>
            </div>
            <div className="instructor-social">
              <h6 className="fw-5">Flow me</h6>
              <ul>
                <li>
                  <a href="#">
                    {" "}
                    <i className="flaticon-facebook-1" />
                  </a>
                </li>
                <li className="course-social-item">
                  <a href="#">
                    <i className="icon-twitter" />
                  </a>
                </li>
                <li className="course-social-item">
                  <a href="#">
                    <i className="flaticon-instagram" />
                  </a>
                </li>
                <li className="course-social-item">
                  <a href="#">
                    <i className="flaticon-linkedin-1" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
