import Brands from "@/components/common/Brands";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Instractors from "@/components/homes/home-1/Instractors";
import Testimonials from "@/components/homes/home-1/Testimonials";
import About from "@/components/otherPages/about/About";
import Banner from "@/components/otherPages/about/Banner";
import Facts from "@/components/otherPages/about/Facts";
import Features from "@/components/otherPages/about/Features";
import OurVisions from "@/components/otherPages/about/OurVisions";
import { Link } from "react-router-dom";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "About Us | LanguageWala – Learn Languages & Skills Online",
  description: "Learn about LanguageWala, a global online learning platform helping learners build real communication skills for career growth through expert-led courses.",
};
export default function AboutPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div id="wrapper">
        <div className="tf-top-bar flex items-center justify-center">
          <p>Intro price. Get UpSkill for Big Sale -95% off.</p>
        </div>

        <Header1 />
        <div className="page-title basic">
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
                    {/* <li>
                      <i className="icon-arrow-right" />
                    </li>
                    <li>Pages</li> */}
                    <li>
                      <i className="icon-arrow-right" />
                    </li>
                    <li>About Us</li>
                  </ul>
                  <h2 className="font-cardo fw-7">About Us</h2>
                  <h6>
                    Become an instructor and change lives — including your own
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="main-content pt-0">
          <About />
          <Features />
          <OurVisions />
          <Facts />
          <Testimonials parentClass="tf-spacing-5 widget-saying bg-4 page-about" />
          <div className="tf-spacing-5 pt-0"></div>
          <Instractors />
          <Brands />
          <Banner />
        </div>
        <Footer1 />
      </div>
    </>
  );
}
