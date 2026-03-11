import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";

import React from "react";
import { Link } from "react-router-dom";
import Faqs1 from "@/components/otherPages/faq/Faq1";
import Faqs2 from "@/components/otherPages/faq/Faq2";
import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Faq || UpSkill - Education Online Courses LMS Reactjs Template",
  description: "UpSkill - Education Online Courses LMS Reactjs Template",
};
export default function FaqPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div id="wrapper">
        <div className="tf-top-bar flex items-center justify-center">
          <p>Intro price. Get UpSkill for Big Sale -95% off.</p>
        </div>

        <Header1 />
        <div className="page-title page-pricing-title">
          <div className="tf-container">
            <div className="row">
              <div className="col-12">
                <div className="content text-center">
                  <ul className="breadcrumbs flex items-center justify-center gap-10">
                    <li>
                      <Link to={`/`} className="flex">
                        <i className="icon-home" />
                      </Link>
                    </li>
                    {/* <li>
                      <i className="icon-arrow-right" />
                    </li>
                    <li>Pages</li> */}
                    <li>
                      <i className="icon-arrow-right" />
                    </li>
                    <li>FAQs</li>
                  </ul>
                  {/* <h2 className="font-cardo fw-7">
                    Frequently Asked Questions
                  </h2> */}
                  <h6 style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontStyle: "italic",
                  }}>
                    We’re on a mission to deliver engaging, curated courses with reasonable price which will not bother you to upskill yourself.
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="main-content ">
          <Faqs1 />
          <Faqs2 />
        </div>
        <Footer1 parentClass="footer has-border-top" />
      </div>
    </>
  );
}
