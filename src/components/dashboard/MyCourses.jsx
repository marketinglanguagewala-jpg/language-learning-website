import { useEffect, useState } from "react";

export default function MyCourses() {

  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 6;

  const institute = localStorage.getItem("instructor_name");


  useEffect(() => {
    fetchCourses();
  }, [page]);


  const fetchCourses = () => {

    if (!institute) return;

    fetch(
      `https://admin.languagewala.in/backend-php/get_instructor_courses.php?institute=${institute}&page=${page}`
    )
      .then(res => res.json())
      .then(data => {

        if (!data.error) {
          setCourses(data.courses);
          setTotal(data.total);
        }

      })
      .catch(err => console.error(err));
  };


  const totalPages = Math.ceil(total / limit);


  return (
    <div className="col-xl-9 col-lg-12">

      <div className="section-my-courses-right section-right">

        {/* COURSES */}
        <div className="row">

          {courses.length === 0 ? (
            <p>No courses found</p>
          ) : (
            courses.map(course => (

              <div key={course.id} className="col-xl-4">

                <div className="course-item hover-img">

                  <div className="features image-wrap">
                    <img
                      src={course.image}
                      alt={course.title}
                      width={520}
                      height={380}
                    />
                  </div>

                  <div className="content">

                    <h6 className="fw-5">
                      {course.title}
                    </h6>

                    <p>
                      {course.lectures} Lessons | {course.duration} hrs
                    </p>

                    <p>
                      Students: {course.total_students}
                    </p>

                  </div>

                </div>

              </div>

            ))
          )}

        </div>


        {/* PAGINATION */}
        {totalPages > 1 && (

          <ul className="wg-pagination justify-center">

            {/* PREV */}
            <li
              className={page === 1 ? "disabled" : ""}
              onClick={() => page > 1 && setPage(page - 1)}
            >
              ‹
            </li>


            {/* PAGE NUMBERS */}
            {[...Array(totalPages)].map((_, i) => (

              <li
                key={i}
                className={page === i + 1 ? "active" : ""}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </li>

            ))}


            {/* NEXT */}
            <li
              className={page === totalPages ? "disabled" : ""}
              onClick={() => page < totalPages && setPage(page + 1)}
            >
              ›
            </li>

          </ul>

        )}

      </div>

    </div>
  );
}
