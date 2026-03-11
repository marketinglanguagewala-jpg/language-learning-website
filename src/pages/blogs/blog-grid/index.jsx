import Blogs1 from "@/components/blogs/Blogs1";
import PageTitle from "@/components/blogs/PageTitle";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Blog | LanguageWala – Learning Tips, Language & Career Insights",
  description:
    "Read expert articles on language learning, communication skills, career growth, and online education insights from LanguageWala."
};

export default function BlogGridPage() {
  return (
    <>
      <MetaComponent meta={metadata} />

      <div id="wrapper">
        <div className="tf-top-bar flex items-center justify-center">
          <p>Intro price. Get UpSkill for Big Sale -95% off.</p>
        </div>

        <Header1 />
        <PageTitle />
        <Blogs1 />
        <Footer1 parentClass="footer has-border-top" />
      </div>
    </>
  );
}
