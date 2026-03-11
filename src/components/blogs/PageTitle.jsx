import React from "react";
import { Link } from "react-router-dom";
export default function PageTitle({ title = "Blog" }) {
  return (
    <div className="page-title basic">
      <div className="tf-container full">
        <div className="row">
          <div className="col-12">
            <div className="content text-center">
              <ul className="breadcrumbs flex items-center justify-center gap-10">
                <li>
                  <Link to={`/`} className="flex">
                    <i className="icon-home" />
                  </Link>
                </li>
                <li>
                  <i className="icon-arrow-right" />
                </li>
                <li>Blog</li>
                {/* <li>
                  <i className="icon-arrow-right" />
                </li>
                <li>Shop</li> */}
              </ul>
              <h2 className="font-cardo fw-7">{title}</h2>
              <h6>
                Products that help beginner designers become true unicorns.
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
