import React from "react";
import Nav from "./Nav";

import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
export default function Header9() {
  return (
    <div className="relative">
      <header
        id="header_main"
        className="header type-absolute style-2 style-8 style-9"
      >
        <div className="header-inner">
          <div className="header-inner-wrap">
            <div className="header-left flex-grow">
              <a
                className="mobile-nav-toggler mobile-button d-lg-none flex"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasMenu"
                aria-controls="offcanvasMenu"
              />
              <div id="site-logo">
                <Link to={`/`} rel="home">
                  <img
                    id="logo-header"
                    alt=""
                    src="/images/logo/logo.svg"
                    width={123}
                    height={36}
                  />
                </Link>
              </div>
            </div>
            <div className="header-right">
              <nav className="main-menu">
                <ul className="navigation">
                  <Nav />
                </ul>
              </nav>
              <a
                className="header-search-icon d-lg-none flex"
                href="#canvasSearch"
                data-bs-toggle="offcanvas"
                aria-controls="offcanvasLeft"
              >
                <i className="icon-search fs-20" />
              </a>
              <Link
                to={`/shop-cart`}
                className="header-cart flex items-center justify-center"
              >
                <i className="icon-shopcart fs-18" />
              </Link>
              <div className="header-btn">
                <div className="header-login">
                  <Link to={`/login`} className="tf-button-default header-text">
                    Log In
                  </Link>
                </div>
                <div className="header-register">
                  <Link
                    to={`/register`}
                    className="tf-button-default active header-text"
                  >
                    Sign Up
                  </Link>
                </div>
                <div className="header-join d-lg-none flex">
                  <Link to={`/login`} className="fs-15">
                    Join
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MobileNav />
      </header>
    </div>
  );
}
