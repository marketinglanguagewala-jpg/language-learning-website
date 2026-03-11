import React, { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Courses({ titleFont = "font-cardo" }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const makeSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };


useEffect(() => {
  fetch("https://admin.languagewala.in/backend-php/get_courses.php", {
    credentials: "include",   // 👈 YE ADD KARNA HAI
  })
    .then((res) => res.json())
    .then((data) => {
      setCourses(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("API Error:", error);
      setLoading(false);
    });
}, []);

  return (
    <section className="tf-spacing-6 section-course pt-0">
      <div className="tf-container">
        <div className="row ss-1">
          <div className="col-12">
            {/* 🔹 Heading */}
            <div className="heading-section">
              <h2 className={`fw-7 ${titleFont} wow fadeInUp`}>
                Explore Language Courses Programs
              </h2>

              <div className="flex items-center justify-between flex-wrap gap-10">
                <div className="sub fs-15 wow fadeInUp">
                  Top-rated programs designed to build skills and confidence.
                </div>

                <Link
                  to="/courses"
                  className="tf-btn-arrow wow fadeInUp"
                >
                  Show More Courses <i className="icon-arrow-top-right" />
                </Link>
              </div>
            </div>

            {/* 🔹 Loading */}
            {loading && <p>Loading courses...</p>}

            {/* 🔹 Swiper */}
            {!loading && (
              <Swiper
                className="swiper-container slider-courses-5 wow fadeInUp"
                modules={[Navigation, Pagination]}
                pagination={{
                  el: ".spc1",
                  clickable: true,
                }}
                navigation={{
                  nextEl: ".snbn1",
                  prevEl: ".snbp1",
                }}
                spaceBetween={25}
                breakpoints={{
                  425: { slidesPerView: 1.5 },
                  700: { slidesPerView: 2.3 },
                  1000: { slidesPerView: 3 },
                  1440: { slidesPerView: 5 },
                }}
              >
                {courses.map((course) => (
                  <SwiperSlide key={course.id}>
                    <div className="course-item hover-img title-small">
                      {/* 🔹 Image */}
                      <div className="features image-wrap"
                      style={{
                        height: "200px",
                        overflow: "hidden",
                        borderRadius: "8px",
                      }}
                      >
                        <img
                          src={
                            course.image
                              ? `https://admin.languagewala.in/uploads/courses/${course.image}`
                              : ""
                          }
                          alt={course.alt || course.title}
                          width={520}
                          height={380}
                        />

                        {course.tag && (
                          <div className="box-tags">
                            <span className="item best-seller">
                              {course.tag}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* 🔹 Content */}
                      <div className="content">
                        <div className="meta">
                          <div className="meta-item">
                            <i className="flaticon-calendar" />
                            <p>{course.lectures} Lectures</p>
                          </div>
                          <div className="meta-item">
                            <i className="flaticon-clock" />
                            <p>{course.duration} Weeks</p>
                          </div>
                        </div>

                        <h6 className="fw-5 line-clamp-2">
                          <Link to={`/course/${makeSlug(course.title)}-${course.id}`}>
                            {course.title}
                          </Link>
                        </h6>

                        <div className="author">
                          By:{" "}
                          <span className="author">{course.institute_name}</span>
                        </div>

                        <div className="bottom">
                          <div className="h6 price fw-5">
                            ₹{course.price}
                          </div>

                          <Link
                            to={`/course/${makeSlug(course.title)}-${course.id}`}
                            className="tf-btn-arrow"
                          >
                            <span className="fw-5 fs-15">
                              Enroll Course
                            </span>
                            <i className="icon-arrow-top-right" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}

                {/* Pagination */}
                {/* <div className="swiper-pagination pagination-slider pagination-courses5 pt-32 spc1" /> */}
                <div
                  className="swiper-pagination pagination-slider pagination-courses5 pt-32 spc1"
                  style={{ display: "flex", gap: "16px", justifyContent: "center", alignItems: "center", width: "100%" }}
                />

              </Swiper>
            )}

            {/* Navigation buttons */}
            {/* <div className="swiper-button-prev btns-style-arrow courses5-prev snbp1" />
            <div className="swiper-button-next btns-style-arrow courses5-next snbn1" /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
