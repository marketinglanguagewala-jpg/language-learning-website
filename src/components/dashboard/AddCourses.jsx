import React, { useState } from "react";

export default function AddCourses() {
  const [form, setForm] = useState({
    course_name: "",
    category_id: "",
    instructor_name: "",
    enrolled_students: "",
    start_date: "",
    end_date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://admin.languagewala.in/backend-php/add_course.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const data = await response.json();
    console.log(data);
    alert(data.message);
  };

  return (
    <div className="col-xl-9">
      <section className="section-add-course-right section-right">
        <div className="box">
          <div className="widget-tabs style-small">
            <ul className="widget-menu-tab overflow-x-auto pd-40">
              <li className="item-title active">Basic Info</li>
            </ul>

            <div className="widget-content-tab">
              <div className="widget-content-inner active">
                <form onSubmit={handleSubmit} className="shop-checkout">

                  {/* COURSE NAME */}
                  <fieldset className="tf-field">
                    <input
                      className="tf-input style-1"
                      type="text"
                      name="course_name"
                      value={form.course_name}
                      onChange={handleChange}
                      required
                    />
                    <label className="tf-field-label fs-15">Course Title</label>
                  </fieldset>

                  {/* CATEGORY ID */}
                  <fieldset className="tf-field">
                    <input
                      className="tf-input style-1"
                      type="number"
                      name="category_id"
                      value={form.category_id}
                      onChange={handleChange}
                      required
                    />
                    <label className="tf-field-label fs-15">Category ID</label>
                  </fieldset>

                  {/* INSTRUCTOR NAME */}
                  <fieldset className="tf-field">
                    <input
                      className="tf-input style-1"
                      type="text"
                      name="instructor_name"
                      value={form.instructor_name}
                      onChange={handleChange}
                      required
                    />
                    <label className="tf-field-label fs-15">Instructor Name</label>
                  </fieldset>

                  {/* ENROLLED STUDENTS */}
                  <fieldset className="tf-field">
                    <input
                      className="tf-input style-1"
                      type="number"
                      name="enrolled_students"
                      value={form.enrolled_students}
                      onChange={handleChange}
                    />
                    <label className="tf-field-label fs-15">Enrolled Students</label>
                  </fieldset>

                  {/* START DATE */}
                  <fieldset className="tf-field">
                    <input
                      className="tf-input style-1"
                      type="date"
                      name="start_date"
                      value={form.start_date}
                      onChange={handleChange}
                      required
                    />
                    <label className="tf-field-label fs-15">Start Date</label>
                  </fieldset>

                  {/* END DATE */}
                  <fieldset className="tf-field">
                    <input
                      className="tf-input style-1"
                      type="date"
                      name="end_date"
                      value={form.end_date}
                      onChange={handleChange}
                      required
                    />
                    <label className="tf-field-label fs-15">End Date</label>
                  </fieldset>

                  {/* PRICE */}
                  {/* <fieldset className="tf-field">
                    <input
                      className="tf-input style-1"
                      type="number"
                      step="0.01"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      required
                    />
                    <label className="tf-field-label fs-15">Course Price</label>
                  </fieldset> */}

                  <button type="submit" className="tf-btn style-secondary mt-4">
                    Create Course
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
