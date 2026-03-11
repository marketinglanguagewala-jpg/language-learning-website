import React from "react";

export default function About() {
  return (
    <section className="flat-about ">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-7">
            <div className="heading-content">
              <div className="widget box-sub-tag wow fadeInUp">
                <div className="sub-tag-icon">
                  <i className="icon-flash" />
                </div>
                <div className="sub-tag-title">
                  <p>About Us</p>
                </div>
              </div>

              <h2 className="font-cardo wow fadeInUp">
                Building Real Communication Skills for Career Growth
              </h2>

              <p className="about-desc wow fadeInUp">
                LanguageWala is globally trusted brand for foreign language course listing and comparison platform that designed to help leaners to find the right language or private tutor with our trust. We bring together multiple language institutes and individuals tutors on one platform, making it easier for students to get better options that suits on their learning goals.
                <br></br>
                <br></br>
                Our platform empowers leaners to discover the perfect foreign language courses with the filtering option like - location, fees, learning mode (online or offline), and proficiency level. With our transparent listings, authentic student rating, and in-depth course details, LanguageWala removes the guesswork and helps student to make better decision before choosing any courses. 

              </p>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="content-right wow fadeInUp">
              <p className="about-desc">
                Not at all but LanguageWala also supports language tutors and institutes by providing them visibility, credibility, and access to genuine student enquiries for their courses. Our aim is to build trust between student and their learning and standardisation in the growing foreign language education market.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="inner">
              <div className="about-item item-1 wow fadeInUp">
                <img
                  className="lazyload"
                  data-src="/images/section/about_9.svg"
                  alt=""
                  width={895}
                  height={520}
                  src="/images/section/about_9.svg"
                />
              </div>
              <div className="about-item item-2 wow fadeInUp">
                <img
                  className="lazyload"
                  data-src="/images/section/about_10.svg"
                  alt=""
                  width={893}
                  height={1100}
                  src="/images/section/about_10.svg"
                />
              </div>
              <div className="about-item item-3 wow fadeInUp">
                <img
                  className="lazyload"
                  alt=""
                  src="/images/page-title/page_title_home2-1.svg"
                  width="591"
                  height="680"
                />
              </div>
              <div className="about-item item-4 wow fadeInUp">
                <img
                  className="lazyload"
                  data-src="/images/courses/courses_04.svg"
                  alt=""
                  width={520}
                  height={380}
                  src="/images/courses/courses_04.svg"
                />
              </div>
              <div className="about-item item-5 wow fadeInUp">
                <img
                  className="lazyload"
                  data-src="/images/section/about_1.svg"
                  alt=""
                  width={681}
                  height={681}
                  src="/images/section/about_1.svg"
                />
              </div>
              <div className="about-item item-6 wow fadeInUp">
                <img
                  className="lazyload"
                  data-src="/images/courses/course_01.svg"
                  alt=""
                  width={520}
                  height={380}
                  src="/images/courses/course_01.svg"
                />
              </div>
              <div className="about-item item-7 wow fadeInUp">
                <p>
                  “Be open to new ideas and approaches. Develop your
                  problem-solving skills.”{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
