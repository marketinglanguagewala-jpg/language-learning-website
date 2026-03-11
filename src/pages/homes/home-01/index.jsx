import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Banner from "@/components/homes/home-1/Banner";
import Banner2 from "@/components/homes/home-1/Banner2";
import BecomeInstactor from "@/components/homes/home-1/BecomeInstactor";
// import Blogs from "@/components/homes/home-1/Blogs";
import Brands from "@/components/common/Brands";
import Courses from "@/components/common/Courses";
import Facts from "@/components/homes/home-1/Facts";
import Features from "@/components/homes/home-1/Features";
import Hero from "@/components/homes/home-1/Hero";
import Instractors from "@/components/homes/home-1/Instractors";
import Testimonials from "@/components/homes/home-1/Testimonials";
// import Languages from "@/components/homes/home-8/Languages";
import { useEffect } from "react";
// import { usePopup } from "@/context/PopupContext";


import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "LanguageWala – Learn Languages & Skills with 2500+ Online Courses",
  description: "Learn English and other in-demand skills with 2500+ expert-led online courses on LanguageWala. Upgrade your career with flexible, affordable learning.",
};
export default function HomePage1() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div id="wrapper">
        <div className="tf-top-bar flex items-center justify-center">
          <p>Intro price. Get UpSkill for Big Sale -95% off.</p>
        </div>

        <Header1 />
        <Hero />
        <div className="main-content pb-63">
          <Courses />
          {/* <Languages /> */}
          <Features />
          <Facts />
          <Testimonials />
          <Banner />
          <Instractors />
          <BecomeInstactor />
          {/* <Blogs /> */}
          <Brands />
          <Banner2 />
        </div>
        <Footer1 />
      </div>
    </>
  );
}
