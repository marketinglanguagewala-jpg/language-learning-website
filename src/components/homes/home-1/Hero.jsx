import { languages } from "@/data/language";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "./Hero.css";

export default function Hero() {
  // === MOVE UNDERLINE FUNCTION ===
  const moveUnderline = (e) => {
    const box = e.currentTarget;
    const section = document.querySelector(".languages-section");

    const boxRect = box.getBoundingClientRect();
    const secRect = section.getBoundingClientRect();

    const underlineWidth = 80; // MUST MATCH CSS
    const underlineX = boxRect.left + boxRect.width / 2 - secRect.left - underlineWidth / 2;

    section.style.setProperty("--hover-x", `${underlineX}px`);
  };

  const swiperOptions = {
    spaceBetween: 20,
    loop: false,
    breakpoints: {
      0: { slidesPerView: 3 },
      480: { slidesPerView: 4 },
      768: { slidesPerView: 6 },
      1024: { slidesPerView: 8 },
      1440: { slidesPerView: 10 },
    },
  };

  return (
    <div className="page-title-home1">
      {/* ---- Header Section (same as your site) ---- */}
      <div className="tf-container">
        <div className="row items-center">
          <div className="col-lg-7">
            <div className="content">
              <div className="box-sub-tag">
                <div className="sub-tag-icon">
                  <i className="icon-flash" />
                </div>
                <div className="sub-tag-title">
                  <p>The Leader in Online Learning</p>
                </div>
              </div>

              <h1 className="fw-7 font-cardo">
                Get <span className="tf-secondary-color">2500+</span> Language Courses <br /> 
                  By Trusted Experts.
              </h1>

              <h6>Learning a new language doesn't have to feel overwhelming. Languagewala simplifies the journey by helping you to find best expert - led language courses and tutors that match your learning style, preferences and goals.</h6>

              <div className="bottom-btns">
              <button
                type="button"
                className="tf-btn"
                onClick={() => {
                  if (window.openHomePopupForm) {
                    window.openHomePopupForm();
                  }
                }}
              >
                Get Started <i className="icon-arrow-top-right" />
              </button>


                <a href="/courses" className="tf-btn style-third">
                  Explore courses <i className="icon-arrow-top-right" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="col-lg-5">
            <div className="image">
              <img
                src="/images/page-title/Home-Page-Banner.png"
                alt=""
                width={960}
                height={1161}
              />
              <img
                className="item1 animate-cir45"
                alt=""
                width={242}
                height={242}
                src="/images/item/item-1.png"
              />
              <img
                className="item2 animate-dot-anim-2"
                alt=""
                width={216}
                height={216}
                src="/images/item/item-2.png"
              />
              <img
                className="item3 animate-dot-anim-3"
                alt=""
                width={230}
                height={230}
                src="/images/item/item-3.png"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ==== LANGUAGES SECTION ==== */}
      <div
        className="languages-section"
        onMouseLeave={() => {
          const section = document.querySelector(".languages-section");
          section.style.setProperty("--hover-x", `-200px`);
        }}
      >
        <div className="tf-container">
          <Swiper className="slider-language" {...swiperOptions} modules={[Navigation, Pagination]}>
            {languages.map((lang) => (
              <SwiperSlide key={lang.id}>
                <div className="lang-box" onMouseEnter={moveUnderline}>
                  <div className="hover-flag">
                    <img src={lang.imgSrc} alt={lang.name} className="lang-flag" />
                    <h6>{lang.name}</h6>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
