import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PageTitle1() {

  const [username, setUsername] = useState("Instructor");
  const [approved, setApproved] = useState(false);
  const [profileImg, setProfileImg] = useState("");

  // 🔹 Stats state
  const [stats, setStats] = useState({
    students: 0,
    total_courses: 0,
  });

  // Username
  useEffect(() => {
    const storedName = localStorage.getItem("instructor_name");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  // Approval
  useEffect(() => {
    const approvalState = localStorage.getItem("isApproved");
    setApproved(approvalState === "1" || approvalState === "true");
  }, []);

  // 🔹 Dashboard API Call (SIMPLE WAY)
  useEffect(() => {

    const institute = localStorage.getItem("instructor_name");

    if (!institute) return;

    fetch(
      `https://admin.languagewala.in/backend-php/get_instructor_dashboard.php?institute=${institute}`
    )
      .then(res => res.json())
      .then(data => {

        console.log("Dashboard API:", data); // debug

        if (!data.error) {
          setStats(data);
          if (data.profile_image) {
            setProfileImg(
              "https://languagewala.in/uploads/" + data.profile_image
            );
          }
        }

      })
      .catch(err => console.log("API Error:", err));

  }, []);


  return (
    <div className="page-title style-9">
      <div className="tf-container">
        <div className="row items-center">

          <div className="col-lg-8">
            <div className="content">

              <div className="author-item">
                <div className="author-item-img">
                  <img
                    alt=""
                    src={
                      profileImg
                        ? profileImg
                        : "/images/avatar/review-1.png"
                    }
                    width={101}
                    height={100}
                    style={{ borderRadius: "50%" }}
                  />
                </div>
              </div>

              <div className="title">

                <h2 className="font-cardo fw-7">
                  Welcome, {username}
                </h2>

                <ul className="entry-meta mt-4 mb-4">

                  <li>
                    <div className="ratings">
                      <div className="number">4.9</div>
                      <i className="icon-star-1" />
                      <i className="icon-star-1" />
                      <i className="icon-star-1" />
                      <i className="icon-star-1" />
                      <svg
                        width={12}
                        height={11}
                        viewBox="0 0 12 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.54831 7.10382L3.58894 6.85477L3.41273 6.67416L1.16841 4.37373L4.24914 3.90314L4.51288 3.86286L4.62625 3.62134L5.99989 0.694982L7.37398 3.62182L7.48735 3.86332L7.75108 3.9036L10.8318 4.37419L8.58749 6.67462L8.41128 6.85523L8.4519 7.10428L8.98079 10.3465L6.24201 8.8325L6.00014 8.69879L5.75826 8.83247L3.01941 10.3461L3.54831 7.10382ZM11.0444 4.15626L11.0442 4.15651L11.0444 4.15626Z"
                          stroke="#131836"
                        />
                      </svg>
                      <div className="total">315,475 rating</div>
                    </div>
                  </li>

                  {/* Students */}
                  <li>
                    <i className="flaticon-user" />
                    {stats.students} Enrolled Students
                  </li>

                  {/* Courses */}
                  <li>
                    <i className="flaticon-play-1" />
                    {stats.total_courses} Courses
                  </li>

                </ul>

              </div>
            </div>
          </div>


          <div className="col-lg-4">
            <div className="right-content">

              {approved ? (
                <a
                  className="tf-btn style-secondary"
                  href="https://admin.languagewala.in/admin-panel/sign-in.html"
                >
                  Create a New Course <i className="icon-arrow-top-right" />
                </a>
              ) : (
                <button
                  className="tf-btn style-secondary"
                  disabled
                  style={{
                    opacity: 0.5,
                    cursor: "not-allowed",
                  }}
                >
                  Waiting for Approval
                </button>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}