import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import CourseSingle1 from "@/components/course-single/CourseSingle1";
import MetaComponent from "@/components/common/MetaComponent";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CourseSinglePage1() {
  const { slug } = useParams();


  const [courseItem, setCourseItem] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(courseItem);

  useEffect(() => {
    setLoading(true);

    fetch(
      `https://admin.languagewala.in/backend-php/get_course_detail.php?slug=${slug}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.error) {
          console.error("Course not found");
          setLoading(false);
          return;
        }

        setCourseItem({
          id: data.id,
          institute_id: data.institute_id,
          title: data.title,
          image: data.image,

          price: Number(data.price),
          students: Number(data.total_students),
          lessons: Number(data.lectures),
          updatedAt: data.created_at
            ? data.created_at.split(" ")[0]
            : "",

          shortDescription: data.short_description,

          // ✅ NEW – VERY IMPORTANT
          aboutCourse: data.about_course,

          whatYouLearn: JSON.parse(data.what_you_learn || "[]"),
          requirements: JSON.parse(data.requirements || "[]"),
          courseContent: JSON.parse(data.course_content || "[]"),

          duration: data.duration,
          language: data.language,
          medium: data.medium,
          video_link: data.video_link,
          locationId: data.location_id,
          locationName: data.location_name,
          course_instructor_image: data.course_instructor_image,

          instructor: {
            id: data.instructor_id,
            name: data.instructor_name,
            designation: data.instructor_designation,
            bio: data.instructor_bio,
            image: data.instructor_image
              ? `https://admin.languagewala.in/uploads/${data.instructor_image}`
              : "/images/instructors/instructors-01.jpg",
          },
        });

console.log("course_instructor_image :", data.course_instructor_image);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!courseItem) return <p>Course not found</p>;

  return (
    <>
      <MetaComponent
        meta={{
          title: courseItem.title,
          description: courseItem.shortDescription,
        }}
      />

      <div id="wrapper">
        <Header1 />
        <CourseSingle1 courseItem={courseItem} />
        <Footer1 />
      </div>
    </>
  );
}
