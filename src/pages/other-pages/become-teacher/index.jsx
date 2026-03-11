import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Testimonials from "@/components/homes/home-1/Testimonials";
import Banner from "@/components/otherPages/become-teacher/Banner";
import Facts from "@/components/otherPages/become-teacher/Facts";
import Features from "@/components/otherPages/become-teacher/Features";
import Process from "@/components/otherPages/become-teacher/Process";
import React from "react";
import { Link } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Become Teacher || UpSkill - Education Online Courses LMS Reactjs Template",
  description: "UpSkill - Education Online Courses LMS Reactjs Template",
};
export default function BecomeTeacherPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div id="wrapper">
        <div className="tf-top-bar flex items-center justify-center">
          <p>Intro price. Get UpSkill for Big Sale -95% off.</p>
        </div>
        <Header1 />
        <div className="page-title basic page-become-teacher">
          <div className="tf-container full">
            <div className="row">
              <div className="col-12">
                <div className="content text-center">
                  <ul className="breadcrumbs flex items-center justify-center gap-10">
                    <li>
                      <Link to={`/`} className="flex">
                        <i className="icon-home" />
                      </Link>
                    </li>
                    <li>
                      <i className="icon-arrow-right" />
                    </li>
                    <li>Pages</li>
                    <li>
                      <i className="icon-arrow-right" />
                    </li>
                    <li>About Us</li>
                  </ul>
                  <h2 className="font-cardo fw-7">Become A Teacher</h2>
                  <h6>
                    Become an instructor and change lives — including your own
                  </h6>
                  <div className="d-flex justify-center">
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
          </div>
        </div>

        <div className="main-content pt-0">
          <Features />
          <Process />
          <Facts />
          <Testimonials parentClass="tf-spacing-5 pt-0 widget-saying bg-4 bg-white" />
          <Banner />
        </div>
        <Footer1 parentClass="footer has-border-top" />
      </div>
    </>
  );
}
