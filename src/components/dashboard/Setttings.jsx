import React, { useState, useEffect } from "react";

export default function Setttings() {

  const [form, setForm] = useState({
    fname: "",
    lname: "",
    username: "",
    phone: "",
    skill: "",
    bio: "",
    profile_image: ""
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("fname", form.fname);
    data.append("lname", form.lname);
    data.append("username", form.username);
    data.append("phone", form.phone);
    data.append("skill", form.skill);
    data.append("bio", form.bio);

    if (image) {
      data.append("image", image);
    }

    try {
      const res = await fetch(
        "https://languagewala.in/save_profile.php",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      if (result.status === "success") {
        alert("Profile Updated Successfully");
      } else {
        alert("Error Saving Profile");
      }

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {

  const uname = localStorage.getItem("username");
    if (!uname) return;

    fetch(`https://languagewala.in/get_profile.php?username=${uname}`)
      .then(res => res.json())
      .then(result => {

        if (result.status === "success") {

          setForm({
            fname: result.data.first_name || "",
            lname: result.data.last_name || "",
            username: result.data.username || "",
            phone: result.data.phone || "",
            skill: result.data.skill || "",
            bio: result.data.bio || "",
            profile_image: result.data.profile_image || ""
          });

        }

      });

  }, []);



  return (
    <div className="col-xl-9 col-lg-12">
      <div className="section-setting-right section-right">
        <div className="box">
          <div className="widget-tabs style-small">
            <ul className="widget-menu-tab overflow-x-auto">
              <li className="item-title active">Profile</li>
              {/* <li className="item-title">Password</li>
              <li className="item-title">Social</li> */}
            </ul>
            <div className="widget-content-tab">
              <div className="widget-content-inner active">
                <form onSubmit={handleSubmit} className="shop-checkout">
                  <div className="row">
                    <div className="profile-wrap">

                      <div className="profile-img">
                        <img
                          src={
                            image
                              ? URL.createObjectURL(image)
                              : form.profile_image
                              ? `https://languagewala.in/uploads/${form.profile_image}`
                              : "/images/avatar/review-1.png"
                          }
                          alt="Profile"
                          width={101}
                          height={100}
                          style={{ borderRadius: "50%" }}
                        />
                      </div>

                      <div className="profile-info">
                        <h4>Your avatar</h4>
                        <label>PNG or JPG (Max 800px)</label>
                      </div>

                      <div className="profile-btn">

                        {/* REAL FILE INPUT */}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImage}
                          style={{ display: "block" }}   // 👈 IMPORTANT
                        />

                      </div>

                    </div>
                  </div>

                  <div className="cols">
                    <fieldset className="tf-field">
                      <input
                        className="tf-input style-1"
                        id="field1"
                        type="text"
                        placeholder=""
                        name="fname"
                        value={form.fname}
                        onChange={handleChange}
                        tabIndex={2}
                        
                        aria-required="true"
                        required
                      />
                      <label className="tf-field-label fs-15" htmlFor="field1">
                        First Name
                      </label>
                    </fieldset>
                    <fieldset className="tf-field">
                      <input
                        className="tf-input style-1"
                        id="field2"
                        type="text"
                        placeholder=""
                        name="lname"
                        value={form.lname}
                        onChange={handleChange}
                        tabIndex={2}
                        
                        aria-required="true"
                        required
                      />
                      <label className="tf-field-label fs-15" htmlFor="field2">
                        Last Name
                      </label>
                    </fieldset>
                  </div>
                  <div className="cols">
                    <fieldset className="tf-field">
                      <input
                        className="tf-input style-1"
                        id="field1"
                        type="text"
                        name="username"
                        value={form.username}
                        readOnly   // 👈 IMPORTANT
                        tabIndex={2}
                      />
                      <label className="tf-field-label fs-15" htmlFor="field1">
                        User Name
                      </label>
                    </fieldset>
                    <fieldset className="tf-field">
                      <input
                        className="tf-input style-1"
                        id="field2"
                        type="text"
                        placeholder=""
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        tabIndex={2}
                        
                        aria-required="true"
                        required
                      />
                      <label className="tf-field-label fs-15" htmlFor="field2">
                        Phone Number
                      </label>
                    </fieldset>
                  </div>
                  <fieldset className="tf-field">
                    <input
                      className="tf-input style-1"
                      id="field4"
                      type="text"
                      placeholder=""
                      name="skill"
                      value={form.skill}
                      onChange={handleChange}
                      tabIndex={2}
                      
                      aria-required="true"
                      required
                    />
                    <label className="tf-field-label fs-15" htmlFor="field4">
                      Skill/Occupation
                    </label>
                  </fieldset>
                  <fieldset className="tf-field">
                    <textarea
                      className="tf-input style-1"
                      name="bio"
                      value={form.bio}
                      onChange={handleChange}
                      rows={4}
                      placeholder=""
                      tabIndex={2}
                      aria-required="true"
                      required
                      
                    />
                    <label
                      className="tf-field-label type-textarea fs-15"
                      htmlFor=""
                    >
                      Message
                    </label>
                  </fieldset>

                  <button type="submit" className="tf-btn">
                    Update Profile <i className="icon-arrow-top-right" />
                  </button>
                </form>
                
              </div>
              <div className="widget-content-inner">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="shop-checkout"
                >
                  <fieldset className="tf-field">
                    <input
                      className="tf-input style-1"
                      id="field4"
                      type="password"
                      placeholder=""
                      name="password"
                      tabIndex={2}
                      
                      aria-required="true"
                      required
                    />
                    <label className="tf-field-label fs-15" htmlFor="field4">
                      Current Password
                    </label>
                  </fieldset>
                  <fieldset className="tf-field">
                    <input
                      className="tf-input style-1"
                      id="field4"
                      type="password"
                      placeholder=""
                      name="text"
                      tabIndex={2}
                      
                      aria-required="true"
                      required
                    />
                    <label className="tf-field-label fs-15" htmlFor="field4">
                      New Password
                    </label>
                  </fieldset>
                  <fieldset className="tf-field">
                    <input
                      className="tf-input style-1"
                      id="field4"
                      type="password"
                      placeholder=""
                      name="text"
                      tabIndex={2}
                      
                      aria-required="true"
                      required
                    />
                    <label className="tf-field-label fs-15" htmlFor="field4">
                      Re-Type New Password
                    </label>
                  </fieldset>
                </form>
                {/* <a href="" type="submit" className="tf-btn">
                  Update Password <i className="icon-arrow-top-right" />
                </a> */}
              </div>
              <div className="widget-content-inner">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="shop-checkout"
                >
                  <fieldset className="tf-field">
                    <input
                      className="tf-input style-1"
                      id="field4"
                      type="text"
                      placeholder=""
                      name="text"
                      tabIndex={2}
                      
                      aria-required="true"
                      required
                    />
                    <label className="tf-field-label fs-15" htmlFor="field4">
                      Facebook
                    </label>
                  </fieldset>
                  <fieldset className="tf-field">
                    <input
                      className="tf-input style-1"
                      id="field4"
                      type="text"
                      placeholder=""
                      name="text"
                      tabIndex={2}
                      
                      aria-required="true"
                      required
                    />
                    <label className="tf-field-label fs-15" htmlFor="field4">
                      Twitter
                    </label>
                  </fieldset>
                  <fieldset className="tf-field">
                    <input
                      className="tf-input style-1"
                      id="field4"
                      type="text"
                      placeholder=""
                      name="text"
                      tabIndex={2}
                      
                      aria-required="true"
                      required
                    />
                    <label className="tf-field-label fs-15" htmlFor="field4">
                      Linkedin
                    </label>
                  </fieldset>
                  <fieldset className="tf-field">
                    <input
                      className="tf-input style-1"
                      id="field4"
                      type="text"
                      placeholder=""
                      name="text"
                      tabIndex={2}
                      
                      aria-required="true"
                      required
                    />
                    <label className="tf-field-label fs-15" htmlFor="field4">
                      Instagram
                    </label>
                  </fieldset>
                  <fieldset className="tf-field">
                    <input
                      className="tf-input style-1"
                      id="field4"
                      type="text"
                      placeholder=""
                      name="text"
                      tabIndex={2}
                      
                      aria-required="true"
                      required
                    />
                    <label className="tf-field-label fs-15" htmlFor="field4">
                      Website
                    </label>
                  </fieldset>
                  <fieldset className="tf-field">
                    <input
                      className="tf-input style-1"
                      id="field4"
                      type="text"
                      placeholder=""
                      name="text"
                      tabIndex={2}
                      
                      aria-required="true"
                      required
                    />
                    <label className="tf-field-label fs-15" htmlFor="field4">
                      Github
                    </label>
                  </fieldset>
                  <fieldset className="tf-field">
                    <input
                      className="tf-input style-1"
                      id="field4"
                      type="text"
                      placeholder=""
                      name="text"
                      tabIndex={2}
                      
                      aria-required="true"
                      required
                    />
                    <label className="tf-field-label fs-15" htmlFor="field4">
                      Twitter
                    </label>
                  </fieldset>
                </form>
                {/* <a href="" type="submit" className="tf-btn">
                  Update Social <i className="icon-arrow-top-right" />
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
