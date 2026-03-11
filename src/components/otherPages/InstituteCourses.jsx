import React from "react";
import { Link } from "react-router-dom";

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

export default function InstituteCourses({ courses = [] }) {

  if (!Array.isArray(courses)) {
    return <p>No courses found</p>;
  }

  if (courses.length === 0) {
    return <p>No courses available</p>;
  }

  return (
    <div className="grid-list-items-3">

      {courses.map((c) => (

        <div key={c.id} className="course-item">

          {/* Image */}
          <img
            src={`https://admin.languagewala.in/uploads/courses/${c.image}`}
            alt={c.title}
          />

          <br /><br />

          {/* Title */}
          <h5>
            <Link to={`/course/${slugify(c.title)}-${c.id}`}>
              {c.title}
            </Link>
          </h5>

          {/* Author */}
          <p>By {c.institute_name}</p>

          {/* Price */}
          <p>₹{c.price}</p>

        </div>

      ))}

    </div>
  );
}
