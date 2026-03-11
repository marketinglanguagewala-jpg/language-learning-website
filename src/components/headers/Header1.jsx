import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Nav from "./Nav";
import Categories from "./Categories";
import MobileNav from "./MobileNav";

export default function Header1() {

  
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const instructorName = localStorage.getItem("instructor_name");

  const location = useLocation();
  const navigate = useNavigate();

  const isRegisterPage = location.pathname === "/register";
  const isLoginPage = location.pathname === "/login";

  /* 🔥 SEARCH STATES */
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const staticPages = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/Courses" },
    { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
    { name: "Pricing", path: "/pricing" },
    { name: "Help Center", path: "/help-center" },
  ];

  useEffect(() => {

    if (search.length < 2) {
      setResults([]);
      return;
    }

    Promise.all([

      // Courses API
      fetch("https://admin.languagewala.in/backend-php/get_courses.php")
        .then(res => res.json()),

    ]).then(([courses]) => {

      const query = search.toLowerCase();

      /* 🔹 Filter Courses (Title + Category) */
      const courseResults = courses.filter(item =>
        item.title?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query) ||
        item.language?.toLowerCase().includes(query) ||
        item.medium?.toLowerCase().includes(query) ||
        item.level?.toLowerCase().includes(query)    
      ).map(item => ({
        type: "course",
        title: item.title,
        url: `/course/${item.slug || item.title
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "")
        }`
      }));


      /* 🔹 Filter Static Pages */
      const pageResults = staticPages
        .filter(page =>
          page.name.toLowerCase().includes(query)
        )
        .map(page => ({
          type: "page",
          title: page.name,
          url: page.path
        }));


      /* 🔹 Merge All */
      setResults([
        ...courseResults,
        ...pageResults
      ]);

    });

  }, [search]);




  /* 🔥 FETCH & FILTER COURSES */
  // useEffect(() => {

  //   if (search.length < 2) {
  //     setResults([]);
  //     return;
  //   }

  //   fetch("https://admin.languagewala.in/backend-php/get_courses.php")
  //     .then(res => res.json())
  //     .then(data => {

  //       const filtered = data.filter(item =>
  //         item.title
  //           .toLowerCase()
  //           .includes(search.toLowerCase())
  //       );

  //       setResults(filtered);

  //     });

  // }, [search]);


  /* 🔥 SUBMIT HANDLER */
  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim() !== "") {
      // navigate(`/search?query=${search}`);
      if (results.length > 0) {
        navigate(results[0].url);
      }
    }
  };


  return (
    <header id="header_main" className="header">
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


            {/* ✅ CATEGORIES (UNCHANGED) */}
            <div className="header-catalog">
              <a href="#" className="header-text">
                Languages
                <i className="icon-arrow-bottom" />
              </a>
              <Categories />
            </div>


            {/* ✅ SEARCH (ONLY LOGIC ADDED) */}
            <div
              className="header-search flex-grow"
              style={{ position: "relative" }}
            >

              <form
                onSubmit={handleSearch}
                className="form-search"
              >
                <fieldset>

                  <input
                    className=""
                    type="text"
                    placeholder="Search for anything"
                    name="text"
                    tabIndex={2}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoComplete="off"
                    required
                  />

                </fieldset>

                <div className="button-submit">
                  <button className="" type="submit">
                    <i className="icon-search fs-20" />
                  </button>
                </div>

              </form>


              {/* 🔥 RESULT DROPDOWN (NEW) */}
              {results.length > 0 && (

                <div className="header-search-results">

                  {results.map((item) => (

                    <Link
                      key={item.url}
                      to={item.url}
                      className="header-search-item"
                      onClick={() => {
                        setSearch("");
                        setResults([]);
                      }}
                    >
                      {item.title}

                      <span style={{ fontSize: "12px", color: "#777" }}>
                        {" "}({item.type})
                      </span>

                    </Link>

                  ))}

                </div>

              )}

            </div>

          </div>


          {/* RIGHT */}
          <div className="header-right">

            <nav className="main-menu">
              <ul className="navigation">
                <Nav />
              </ul>
            </nav>


            <div className="header-btn flex gap-10">

              {/* <div className="header-register">
                <Link
                  to="/register"
                  className="tf-button-default active header-text"
                >
                  List Your Course
                </Link>
              </div> */}
              <div className="header-register">

                {!isLoggedIn ? (

                  // ❌ Not Logged In
                  <Link
                    to="/login"
                    className="tf-button-default active header-text"
                  >
                    List Your Course
                  </Link>

                ) : (

                  // ✅ Logged In (Instructor)
                  <div className="user-menu">

                    <Link
                      to="/instructor-dashboard"
                      className="tf-button-default active header-text"
                    >
                      Dashboard
                    </Link>

                    {/* <button
                      className="tf-button-default header-text"
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        localStorage.clear();
                        navigate("/login");
                      }}
                    >
                      Logout
                    </button> */}

                  </div>

                )}

              </div>

            </div>

          </div>
        </div>
      </div>

      <MobileNav />
    </header>
  );
}
