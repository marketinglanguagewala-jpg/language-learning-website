import { brandLogos } from "@/data/brands";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Brands({
  title = "Learn From The World's Leading Experts",
  spacing = "tf-spacing-1",
}) {
  const options = {
    spaceBetween: 30,

    observer: true,
    observeParents: true,
    slidesPerView: 6,
    loop: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    speed: 10000,
    breakpoints: {
      0: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      450: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      868: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
      1400: {
        slidesPerView: 6,
        spaceBetween: 90,
      },
    },
  };
  return (
    <section className={`section-logo ${spacing} pt-0`}>
      <div className="tf-container">
        <div className="row">
          <div
            className="col-12 text-center wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <h6>{title}</h6>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="wrap-brand">
              <Swiper
                {...options}
                modules={[Autoplay]}
                className="slide-brand swiper-container"
              >
                {brandLogos.map((logo, index) => (
                  <SwiperSlide className="swiper-slide" key={index}>
                    <div className="slogan-logo">
                      <img
                        className="lazyload"
                        src={logo.imgSrc}
                        alt={logo.alt}
                        width={logo.width}
                        height={logo.height}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
