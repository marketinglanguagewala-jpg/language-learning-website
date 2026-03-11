import MetaComponent from "@/components/common/MetaComponent";
import Lesson from "@/components/otherPages/Lesson";
import React from "react";
const metadata = {
  title: "Lesson || UpSkill - Education Online Courses LMS Reactjs Template",
  description: "UpSkill - Education Online Courses LMS Reactjs Template",
};
export default function LessonPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Lesson />
    </>
  );
}
