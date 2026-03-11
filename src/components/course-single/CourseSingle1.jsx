import React, { useState, useEffect } from "react";
import Learn from "./Learn";
import RequireMents from "./RequireMents";
import About from "./About";
import CourseContent from "./CourseContent";
import Instractors from "./Instractors";
// import MyCourses from "./MyCourses";
import Reviews from "./Reviews";
import Replay from "./Replay";
import { Link } from "react-router-dom";
import ModalVideo from "react-modal-video";


export default function CourseSingle1({ courseItem }) {
  const [showModal, setShowModal] = useState(false);
  // const [playVideo, setPlayVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // console.log("COURSE ITEM:", courseItem);
  const [isOpen, setOpen] = useState(false);

  if (!courseItem) return null;
  // console.log(courseItem);

useEffect(() => {
  if (courseItem?.institute_id) {

    // console.log("SAVING INSTITUTE:", courseItem.institute_id);

    localStorage.setItem(
      "current_institute_id",
      courseItem.institute_id
    );
  }
}, [courseItem?.institute_id]);

  return (
    <>
      {/* ================= PAGE TITLE ================= */}
      <section className="section-page-title page-title style-4">
        <div className="tf-container">
          <div className="row" style={{
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
  }}>
            <div className="col-lg-8" style={{
    order: isMobile ? 1 : 1,
  }}>
              <div className="content">
                {/* Breadcrumb */}
                <ul className="breadcrumbs flex items-center gap-10 mb-60">
                  <li>
                    <Link to="/">
                      <i className="icon-home" />
                    </Link>
                  </li>
                  <li><i className="icon-arrow-right" /></li>
                  <li>
                    <Link to="/courses">Courses</Link>
                  </li>
                  <li><i className="icon-arrow-right" /></li>
                  <li>{courseItem.title}</li>
                </ul>

                {/* Title */}
                <h2 className="font-cardo fw-7">
                  {courseItem.title}
                </h2>

                {/* Short description */}
                <p className="except">
                  {courseItem.shortDescription}
                </p>

                {/* Meta */}
                <ul className="entry-meta">
                  <li>
                    <div className="ratings">
                      <div className="number">{courseItem.rating}</div>
                      {[...Array(4)].map((_, i) => (
                        <i key={i} className="icon-star-1" />
                      ))}
                      <p className="total fs-15">
                        {courseItem.students} Students
                      </p>
                    </div>
                  </li>

                  <li>
                    <i className="flaticon-book" />
                    <p>{courseItem.lessons} Lessons</p>
                  </li>

                  <li>
                    <i className="flaticon-user" />
                    <p>{courseItem.students} Students</p>
                  </li>

                  <li>
                    <i className="flaticon-clock" />
                    <p>Last updated {courseItem.updatedAt}</p>
                  </li>

                  <li style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3E4095"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
                  </svg>

                  <p>{courseItem.locationName}</p>
                </li>
                </ul>

                {/* Instructor */}
                <div className="author-item">
                  <div className="author-item-img">
                    <img
                      src={
                        courseItem.course_instructor_image
                          ? `https://admin.languagewala.in/uploads/instructors/${courseItem.course_instructor_image}`
                          : "https://demoapus2.com/upskill/wp-content/uploads/2024/05/user2.jpg"
                      }
                      alt={courseItem.instructor.name}
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="text">
                    <span>By </span>
                    <strong>{courseItem.instructor.name}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PAGE BODY ================= */}
      <section className="section-page-course">
        <div className="tf-container">
          <div className="row" style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
          }}>

            {/* LEFT CONTENT */}
            <div className="col-lg-8" style={{
              order: isMobile ? 1 : 1,
            }}>
              <div className="course-single-inner">
                <Learn items={courseItem.whatYouLearn} />
                <RequireMents items={courseItem.requirements} />
                <About text={courseItem.aboutCourse} />
                <CourseContent sections={courseItem.courseContent} />
                <Instractors 
                instructor={courseItem.instructor} 
                courseInstructorImage={courseItem.course_instructor_image}
                />
                {/* <MyCourses /> */}
                <Reviews />
                <Replay />
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="col-lg-4" style={{
              order: isMobile ? -1 : 2,
              marginBottom: isMobile ? "20px" : "0px",
              marginTop: "60px"
            }}>
              <div className="sidebar-course course-single-v1">

                {/* Video */}
                <div className="widget-video" style={{ position: "relative" }}>
                  <img
                    src={`https://admin.languagewala.in/uploads/courses/${courseItem.image}`}
                    alt={courseItem.title}
                    width="100%"
                    height="380"
                    style={{ borderRadius: "10px", objectFit: "cover" }}
                  />

                  {courseItem.video_link && (
                    <button
                      onClick={() => setShowModal(true)}
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "rgba(0,0,0,0.6)",
                        border: "none",
                        borderRadius: "50%",
                        width: "70px",
                        height: "70px",
                        cursor: "pointer",
                      }}
                    >
                      <i
                        className="flaticon-play"
                        style={{ color: "#fff", fontSize: "24px" }}
                      />
                    </button>
                  )}
                </div>

                {/* Price */}
                <div className="sidebar-course-content">
                  <div className="course-price">
                    <div className="price">
                      <h3 className="fw-5">₹{courseItem.price}</h3>
                    </div>
                  </div>

                  
                  <button
                    type="button"
                    className="tf-btn"
                    onClick={() => {
                      if (window.openPopupForm) {
                        console.log("OPEN POPUP WITH:", courseItem.institute_id);
                        window.openPopupForm(courseItem.institute_id);
                      }
                    }}
                  >
                    Enroll Now <i className="icon-arrow-top-right" />
                  </button>

                  <h6 className="course-text">
                    30-Day Money-Back Guarantee
                  </h6>

                  {/* Includes */}
                  <div className="course-list">
                    <h5>This course includes:</h5>
                    <ul className="course-benefit-list">
                      <li>✔ Expert-led training</li>
                      <li>✔ Practical lessons</li>
                      <li>✔ Lifetime access</li>
                      <li>✔ Certificate</li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "90%",
              maxWidth: "900px",
              aspectRatio: "16/9",
              backgroundColor: "#000",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: "-45px",
                right: "0",
                background: "transparent",
                border: "none",
                fontSize: "32px",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              ×
            </button>

            {/* Video Area */}
            {courseItem.video_link?.includes("youtube") ? (
              <iframe
                src={courseItem.video_link.replace("watch?v=", "embed/")}
                title="Course Video"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            ) : (
              <video
                controls
                autoPlay
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <source src={courseItem.video_link} />
              </video>
            )}
          </div>
        </div>
      )}

      {/* VIDEO MODAL */}
      {/* <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="MLpWrANjFbI"
        onClose={() => setOpen(false)}
      /> */}
    </>
  );
}
