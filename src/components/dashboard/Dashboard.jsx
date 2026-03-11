import React, { useEffect, useState } from "react";

export default function Dashboard() {

  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    pending: 0,
    students: 0,
  });

  useEffect(() => {

    const institute = localStorage.getItem("instructor_name");

    if (!institute) return;

    fetch(
      `https://admin.languagewala.in/backend-php/get_instructor_dashboard.php?institute=${institute}`
    )
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setStats(data);
        }
      })
      .catch(err => console.error(err));

  }, []);


  return (
    <div className="col-xl-9 col-lg-12">
      <div className="section-dashboard-right">
        <div className="section-icons">
          <div className="row">
            <div className="icons-items">

              {/* Total */}
              <div className="icons-box style-4">
                <div className="icons">
                  <i className="flaticon-play-2" />
                </div>
                <div className="content">
                  <h6>Total Course</h6>
                  <span className="num-count fs-26 fw-5">
                    {stats.total_courses}
                  </span>
                </div>
              </div>

              {/* Published */}
              <div className="icons-box style-4">
                <div className="icons">
                  <i className="flaticon-alarm" />
                </div>
                <div className="content">
                  <h6>Published Course</h6>
                  <span className="num-count fs-26 fw-5">
                    {stats.published}
                  </span>
                </div>
              </div>

              {/* Pending */}
              {/* <div className="icons-box style-4">
                <div className="icons">
                  <i className="flaticon-video" />
                </div>
                <div className="content">
                  <h6>Pending Course</h6>
                  <span className="num-count fs-26 fw-5">
                    {stats.pending}
                  </span>
                </div>
              </div> */}

              {/* Students */}
              <div className="icons-box style-4">
                <div className="icons">
                  <i className="flaticon-user" />
                </div>
                <div className="content">
                  <h6>Total Students</h6>
                  <span className="num-count fs-26 fw-5">
                    {stats.students}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
