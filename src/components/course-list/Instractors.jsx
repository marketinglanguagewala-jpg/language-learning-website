import React, { useEffect, useState } from "react";

export default function Instractors() {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetch("https://admin.languagewala.in/backend-php/get_courses.php")
      .then((res) => res.json())
      .then((courses) => {
        const map = {};

        courses.forEach((c) => {
          if (!c.instructor_name) return;

          if (!map[c.instructor_name]) {
            map[c.instructor_name] = {
              name: c.instructor_name,
              students: 0,
              courses: 0,
            };
          }

          map[c.instructor_name].courses += 1;
          map[c.instructor_name].students += Number(
            c.total_students || 0
          );
        });

        setInstructors(Object.values(map));
      })
      .catch((err) => {
        console.error("Instructor fetch error:", err);
      });
  }, []);

  // 🔒 safety: agar data abhi load nahi hua
  if (!instructors.length) return null;

  return (
    <section className="section-categories-instructors">
      <div className="tf-container">
        <div className="row justify-center">
          <div className="col-12">
            <div className="heading-section">
              <h3 className="fw-5 wow fadeInUp">
                Popular&nbsp;Institute
              </h3>
              <div className="sub fs-15 wow fadeInUp">
                These real-world experts are highly rated by learners like you.
              </div>
            </div>

            <div className="wrap-instructor">
              {instructors.map((inst, index) => (
                <div
                  key={inst.name}
                  className="instructors-item wow fadeInUp"
                  data-wow-delay={`${index * 0.1}s`}
                >
                  <div className="image-wrapper">
                    <img
                      className="lazyload"
                      src={`/images/instructors/instructors-0${(index % 4) + 1}.jpg`}
                      alt={inst.name}
                      width={520}
                      height={521}
                    />
                  </div>

                  <div className="entry-content">
                    <ul className="entry-meta">
                      <li>
                        <i className="flaticon-user" />
                        {inst.students} Students
                      </li>
                      <li>
                        <i className="flaticon-play" />
                        {inst.courses} Course
                      </li>
                    </ul>

                    <h6 className="entry-title">
                      <a href="#">{inst.name}</a>
                    </h6>

                    <p className="short-description">
                      Professional Language Instructor
                    </p>

                    <div className="ratings">
                      <div className="number">4.9</div>
                      <i className="icon-star-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
