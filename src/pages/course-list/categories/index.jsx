import CourseList3 from "@/components/course-list/CourseList3";
import Courses from "@/components/course-list/Courses";
import Instractors from "@/components/course-list/Instractors";
import PageTitle3 from "@/components/course-list/PageTitle3";
import Topics from "@/components/course-list/Topics";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import React from "react";
import { useLocation } from "react-router-dom";


import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Course Category || UpSkill - Education Online Courses LMS Reactjs Template",
  description: "UpSkill - Education Online Courses LMS Reactjs Template",
};
export default function CategoriesPage() {
  const location = useLocation();

  const courseTitle =
    location.state?.courseTitle || "Web Development Courses";

  const courseDescription =
    location.state?.courseDescription ||
    "With one of our online web development courses, you can explore different areas of this in-demand field.";

  return (
    <>
      <MetaComponent
        meta={{
          title: courseTitle,
          description: courseDescription,
        }}
      />

      <div id="wrapper">
        <div className="tf-top-bar flex items-center justify-center">
          <p>Intro price. Get UpSkill for Big Sale -95% off.</p>
        </div>

        <Header1 />

        <PageTitle3
          title={courseTitle}
          description={courseDescription}
        />

        <div className="main-content pt-0">
          <Courses />
          <Topics />
          <Instractors />
          <CourseList3 />
        </div>

        <Footer1 />
      </div>
    </>
  );
}

