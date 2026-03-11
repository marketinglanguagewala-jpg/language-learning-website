import React from "react";

import { counters } from "@/data/facts";
import Counter from "@/components/common/Counter";
export default function Facts() {
  return (
    <section className="section-key tf-spacing-3 pt-0">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="key-wrap flex">
              <div className="key-image">
                <img
                  className="lazyload"
                  data-src="/images/section/top_Secret.jpeg"
                  alt=""
                  src="/images/section/top_Secret.jpeg"
                  width={1370}
                  height={1301}
                />
              </div>
              <div className="content">
                <h2
                  className="font-cardo fw-7 wow fadeInUp"
                  data-wow-delay="0s"
                >
                  Learn From Experts Who Make Language Easy
                </h2>
                <p className="h6 fw-4 wow fadeInUp" data-wow-delay="0.1s">
                  {" "}
                  Languagewala connects you with experienced institutes and tutors who not only focus on building vocabulary but teach you how to connect with language in real conversations.
                  <ul className="fs-15 wow fadeInUp" data-wow-delay="0.1s">
                    <li>•	 Understanding cultural context</li>
                    <li>•	 Correct pronunciation</li>
                    <li>•	 Real life usage and conversations</li>
                  </ul>
                </p>
                <div className="counter style-2 text-white">
                  {counters.map((counter, index) => (
                    <div
                      key={index}
                      className="number-counter wow fadeInUp"
                      data-wow-delay={counter.delay}
                    >
                      <div className="counter-content">
                        <span className="number">
                          <Counter max={counter.number} />
                        </span>
                        {counter.suffix}
                      </div>
                      <p>{counter.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
