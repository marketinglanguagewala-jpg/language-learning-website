import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import EventSingle from "@/components/otherPages/EventSingle";

import React from "react";
import { Link, useParams } from "react-router-dom";
import { allevents } from "@/data/events";
import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Event Single || UpSkill - Education Online Courses LMS Reactjs Template",
  description: "UpSkill - Education Online Courses LMS Reactjs Template",
};
export default function EventSinglePage() {
  let params = useParams();
  const event =
    allevents.filter((elm) => elm.id == params.id)[0] || allevents[0];
  return (
    <>
      <MetaComponent meta={metadata} />
      <div id="wrapper">
        <div className="tf-top-bar flex items-center justify-center">
          <p>Intro price. Get UpSkill for Big Sale -95% off.</p>
        </div>
        <Header1 />
        <div className="event-single-page-title page-title style-5">
          <div className="tf-container">
            <div className="row">
              <div className="col-lg-8">
                <div className="content">
                  <ul className="breadcrumbs flex items-center justify-start gap-10 mb-60">
                    <li>
                      <Link to={`/`} className="flex">
                        <i className="icon-home" />
                      </Link>
                    </li>
                    <li>
                      <i className="icon-arrow-right" />
                    </li>
                    <li>Pages</li>
                    <li>
                      <i className="icon-arrow-right" />
                    </li>
                    <li>Instructor</li>
                  </ul>
                  <h2 className="font-cardo fw-7">{event.title}</h2>
                  <p className="except">
                    Supposing so be resolving breakfast am or perfectly. It drew
                    a hill from me.
                  </p>
                  <ul className="entry-meta mb-30">
                    <li>
                      <i className="flaticon-location fs-16" />
                      <p className="fs-15">United States</p>
                    </li>
                    <li>
                      <i className="flaticon-calendar fs-16" />
                      <p className="fs-15">December 4, 2024 - June 30, 2024</p>
                    </li>
                    <li>
                      <i className="flaticon-clock fs-16" />
                      <p className="fs-15">1:30 pm - 3:30 pm</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section-page-event-single">
          <EventSingle event={event} />
        </div>
        <Footer1 parentClass="footer has-border-top" />
      </div>
    </>
  );
}
