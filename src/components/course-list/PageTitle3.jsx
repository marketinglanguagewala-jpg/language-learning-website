import React from "react";
import { Link } from "react-router-dom";
export default function PageTitle3({ title, description }) {
  return (
    <div className="page-title all-course categories">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="content">
              <ul className="breadcrumbs flex items-center gap-10">
                <li>
                  <Link to={`/`} className="flex">
                    <i className="icon-home" />
                  </Link>
                </li>
                <li>
                  <i className="icon-arrow-right" />
                </li>
                <li>Categories</li>
              </ul>

              <h2 className="font-cardo fw-7">
                {title}
              </h2>

              <h6 className="letter-spacing-2">
                {description}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

