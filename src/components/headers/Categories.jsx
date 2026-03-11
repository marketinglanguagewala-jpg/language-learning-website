import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://admin.languagewala.in/backend-php/get_courses.php")
      .then((res) => res.json())
      .then((data) => {
        // 🔥 GROUP BY LANGUAGE
        const grouped = {};

        data.forEach((course) => {
          const lang = course.language?.trim();

          if (!lang) return;

          if (!grouped[lang]) {
            grouped[lang] = {
              title: lang,
              courses: [],
            };
          }

          grouped[lang].courses.push(course);
        });

        setCategories(Object.values(grouped));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="categories-menu">Loading...</div>;
  }

  return (
    <ul className="categories-menu">
      <li className="item title">COURSE CATEGORIES</li>

      {categories.map((cat, i) => (
        <li
          key={i}
          className={`category-item ${
            cat.courses.length ? "has-children" : ""
          }`}
        >
          <span className="item">
            {cat.title}
            {cat.courses.length > 0 && <span className="arrow">›</span>}
          </span>

          {cat.courses.length > 0 && (
            <ul className="sub-menu">
              <li className="item title">View Top Courses</li>

              {cat.courses.map((course) => (
                <li key={course.id}>
                  {/* <Link
                    className="item"
                    to={`/course/${course.id}`}
                  >
                    {course.title}
                  </Link> */}
                  <Link
                    className="item"
                    to="/categories"
                    state={{
                      courseTitle: course.title,
                      courseDescription: `With our ${course.title} course, you can explore real-world skills taught by industry experts.`,
                    }}
                  >
                    {course.title}
                  </Link>

                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
