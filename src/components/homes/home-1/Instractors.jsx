import { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Instractors() {

  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Institutes
  useEffect(() => {

    fetch("https://admin.languagewala.in/backend-php/get_institutes.php")
      .then(res => res.json())
      .then(data => {
        setInstitutes(data);
        setLoading(false);
      })
      .catch(err => {
        console.log("API Error:", err);
        setLoading(false);
      });

  }, []);

  const options = {
    spaceBetween: 25,
    observer: true,
    observeParents: true,
    breakpoints: {
      425: { slidesPerView: 1.5 },
      700: { slidesPerView: 2.3 },
      1000: { slidesPerView: 3 },
      1440: { slidesPerView: 5 },
    },
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  return (
    <section className="section-instructor tf-spacing-3 pt-0">
      <div className="tf-container">

        {/* Heading */}
        <div className="heading-section">

          <h2 className="fw-7 font-cardo">
            Learn From The Best Institute
          </h2>

          <div className="flex items-center justify-between flex-wrap gap-10">

            <div className="sub fs-15">
              Industries top institutes provide you better assistance
            </div>

            <Link to="/institute-list" className="tf-btn-arrow">
              See All Institutes <i className="icon-arrow-top-right" />
            </Link>

          </div>
        </div>

        {/* Slider */}
        <Swiper {...options} modules={[Navigation, Pagination]}>

          {institutes.map((item, index) => (

            <SwiperSlide key={index}>

              <div className="instructors-item hover-img style-column">

                {/* Logo (Static for now) */}
                <div className="image-wrap">
                  <img
                    src={
                      item.profile_image
                        ? `https://languagewala.in/uploads/${encodeURIComponent(item.profile_image)}`
                        : "/images/default-avatar.png"
                    }
                    alt={item.institute_name}
                  />
                </div>

                <div className="entry-content">

                  {/* Meta */}
                  <ul className="entry-meta">

                    <li>
                      <i className="flaticon-user" />
                      {item.total_students} Students
                    </li>

                    <li>
                      <i className="flaticon-play" />
                      {item.total_courses} Courses
                    </li>

                  </ul>

                  {/* Name */}
                  {/* <h6 className="entry-title">
                    {item.institute_name}
                  </h6> */}
                  <h6 className="entry-title">
                    <Link to={`/institute/${encodeURIComponent(item.institute_name)}`}>
                      {item.institute_name}
                    </Link>
                  </h6>

                  {/* Desc */}
                  <p className="short-description">
                    Professional Training Institute
                  </p>

                  {/* Rating */}
                  <div className="ratings">
                    <div className="number">4.9</div>
                    <i className="icon-star-1" />
                  </div>

                </div>

              </div>

            </SwiperSlide>

          ))}

        </Swiper>

      </div>
    </section>
  );
}
