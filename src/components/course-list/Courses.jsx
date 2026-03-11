import React, { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

const tabTitles = ["Most Popular", "New", "Trending"];

export default function Courses({ selectedCourseId }) {
  const swiperOptions = {
    spaceBetween: 25,
    observer: true,
    observeParents: true,
    breakpoints: {
      425: { slidesPerView: 1.5, spaceBetween: 15 },
      700: { slidesPerView: 2.3 },
      1000: { slidesPerView: 3 },
      1440: { slidesPerView: 5 },
    },
    pagination: { el: ".spd1", clickable: true },
    navigation: {
      nextEl: ".snbn2",
      prevEl: ".snbp2",
    },
  };

  const [allCourses, setAllCourses] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(tabTitles[0]);
  const [filtered, setFiltered] = useState([]);

  // 🔥 FETCH COURSES
  useEffect(() => {
    fetch("https://admin.languagewala.in/backend-php/get_courses.php")
      .then((res) => res.json())
      .then((data) => {
        let courses = data;

        // 🔥 clicked course first
        if (selectedCourseId) {
          const selected = courses.find(
            (c) => String(c.id) === String(selectedCourseId)
          );
          const rest = courses.filter(
            (c) => String(c.id) !== String(selectedCourseId)
          );
          courses = selected ? [selected, ...rest] : courses;
        }

        setAllCourses(courses);
      });
  }, [selectedCourseId]);

  // 🔥 TAB FILTER (same behavior as template)
  useEffect(() => {
    if (currentCategory === "Most Popular") {
      setFiltered(allCourses.slice(0, 6));
    }
    if (currentCategory === "New") {
      setFiltered([...allCourses].reverse().slice(0, 6));
    }
    if (currentCategory === "Trending") {
      setFiltered(allCourses.slice(0, 4));
    }
  }, [currentCategory, allCourses]);

  return (
    <section className="section-categories-course">
      <div className="tf-container">
        <div className="row justify-center">
          <div className="col-12">
            <div className="heading-section">
              <h3 className="fw-5">Courses to get you started</h3>
              <div className="sub fs-15">
                Explore courses from experienced, real-world experts.
              </div>
            </div>

            <div className="tabs-with-filter style-small">
              <ul className="widget-menu-tab overflow-x-auto">
                {tabTitles.map((tab) => (
                  <li
                    key={tab}
                    onClick={() => setCurrentCategory(tab)}
                    className={`item-title ${
                      currentCategory === tab ? "active" : ""
                    }`}
                  >
                    {tab}
                  </li>
                ))}
              </ul>

              <div className="widget-content-tab">
                <Swiper
                  className="swiper-container slider-courses-5"
                  {...swiperOptions}
                  modules={[Navigation, Pagination]}
                >
                  {filtered.map((course) => (
                    <SwiperSlide key={course.id}>
                      <div className="course-item hover-img title-small">
                        <div className="features image-wrap">
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
                        </div>

                        <div className="content">
                          <h6 className="fw-5 line-clamp-2">
                            <Link to={`/course-single-v1/${course.id}`}>
                              {course.title}
                            </Link>
                          </h6>

                          <div className="author">
                            By: {course.institute_name}
                          </div>

                          <div className="bottom">
                            <div className="h6 price fw-5">
                              ₹{course.price}
                            </div>
                            <Link
                              to={`/course-single-v1/${course.id}`}
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

                  <div className="swiper-pagination pagination-slider pagination-courses5 spd1" />
                </Swiper>

                <div className="swiper-button-prev btns-style-arrow courses2-prev snbp2" />
                <div className="swiper-button-next btns-style-arrow courses2-next snbn2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
