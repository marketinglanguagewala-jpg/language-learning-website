import React from "react";

export default function Instractors({ instructor, courseInstructorImage }) {
  if (!instructor) return null;

  const defaultImage =
    "https://demoapus2.com/upskill/wp-content/uploads/2024/05/user2.jpg";

  const imageUrl = courseInstructorImage
    ? `https://admin.languagewala.in/uploads/instructors/${courseInstructorImage}`
    : defaultImage;

  console.log(instructor);

  return (
    <div style={{ marginTop: "10px" }}>
      <h2 className="text-22 fw-5 wow fadeInUp">
        Instructor
      </h2>

      <div className="instructors-item style-2">
        <div className="image-wrapper">
          <img
            src={imageUrl}
            alt={instructor.name}
            width={520}
            height={521}
          />
        </div>

        <div className="entry-content">
          <h5 className="entry-title">
            By {instructor.name}
          </h5>

          {instructor.designation && (
            <p className="short-description">
              {instructor.designation}
            </p>
          )}

          {instructor.bio && (
            <p className="description">
              {instructor.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
