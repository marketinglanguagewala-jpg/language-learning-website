import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { menuItems } from "@/data/menu";

export default function MobileMenu() {
  const { pathname } = useLocation();

  /* 🔥 Dynamic Categories State */
  const [dynamicCategories, setDynamicCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 🔥 Fetch Categories from API */
  useEffect(() => {
    fetch("https://admin.languagewala.in/backend-php/get_courses.php")
      .then((res) => res.json())
      .then((data) => {
        const grouped = {};

        data.forEach((course) => {
          const lang = course.language?.trim();

          if (!lang) return;

          if (!grouped[lang]) {
            grouped[lang] = {
              title: lang,
              subItems: [],
            };
          }
console.log("checking slug", course);
          grouped[lang].subItems.push({
            title: course.title,
            href: `/course/${course.slug}`,
          });
        });

        setDynamicCategories(Object.values(grouped));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading categories:", err);
        setLoading(false);
      });
  }, []);

  /* 🔥 Active Menu Checker */
  const isMenuActive = (menu) => {
    let isActive = false;

    if (menu.href !== "#") {
      if (pathname.split("/")[1] === menu.href?.split("/")[1]) {
        isActive = true;
      }
    }

    if (menu.subItems) {
      menu.subItems.forEach((el) => {
        if (el.href !== "#") {
          if (pathname.split("/")[1] === el.href?.split("/")[1]) {
            isActive = true;
          }
        }

        if (el.subItems) {
          el.subItems.forEach((elm) => {
            if (elm.href !== "#") {
              if (pathname.split("/")[1] === elm.href?.split("/")[1]) {
                isActive = true;
              }
            }
          });
        }
      });
    }

    return isActive;
  };

  return (
    <>
      {/* 🔥 Offcanvas Mobile Menu */}
      <div
        className="offcanvas offcanvas-start mobile-menu"
        tabIndex={-1}
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel"
      >
        {/* HEADER */}
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasMenuLabel">
            Menu
          </h5>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>

        {/* BODY */}
        <div className="offcanvas-body">
          <ul className="list-group">

            {/* 🔥 Loading */}
            {loading && (
              <li className="list-group-item text-center">
                Loading Categories...
              </li>
            )}

            {[
              {
                title: "Languages",
                subItems: dynamicCategories,
                noActive: true,
              },
              ...menuItems,
            ].map((item, index) => (
              <li
                className={`list-group-item ${
                  item.noActive ? "disabled-active-menu" : ""
                }`}
                key={index}
              >
                {/* 🔥 Has Sub Menu */}
                {item.subItems ? (
                  <>
                    <a
                      href="#!"
                      className={`submenu-toggle collapsed ${
                        isMenuActive(item) ? "activeMenu" : ""
                      }`}
                      data-bs-toggle="collapse"
                      data-bs-target={`#menu${index}`}
                    >
                      {item.title}
                    </a>

                    <ul
                      id={`menu${index}`}
                      className="list-group collapse"
                    >
                      {item.subItems.map((subItem, subIndex) => (
                        <li
                          className="list-group-item"
                          key={subIndex}
                        >
                          {/* 🔥 Sub Sub Menu */}
                          {subItem.subItems ? (
                            <>
                              <a
                                href="#!"
                                className={`submenu-toggle collapsed ${
                                  isMenuActive(subItem)
                                    ? "activeMenu"
                                    : ""
                                }`}
                                data-bs-toggle="collapse"
                                data-bs-target={`#submenu${index}-${subIndex}`}
                              >
                                {subItem.title}
                              </a>

                              <ul
                                id={`submenu${index}-${subIndex}`}
                                className="list-group collapse"
                              >
                                {subItem.subItems.map(
                                  (subSubItem, subSubIndex) => (
                                    <li
                                      className="list-group-item"
                                      key={subSubIndex}
                                    >
                                      <Link
                                        className={`nav-link-mobile ${
                                          isMenuActive(subSubItem)
                                            ? "activeMenu"
                                            : ""
                                        }`}
                                        to={subSubItem.href}
                                      >
                                        {subSubItem.title}
                                      </Link>
                                    </li>
                                  )
                                )}
                              </ul>
                            </>
                          ) : (
                            /* 🔥 Normal Link */
                            <Link
                              className={`nav-link-mobile ${
                                isMenuActive(subItem)
                                  ? "activeMenu"
                                  : ""
                              }`}
                              to={subItem.href}
                            >
                              {subItem.title}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  /* 🔥 Normal Item */
                  <Link
                    className={`nav-link-mobile ${
                      isMenuActive(item) ? "activeMenu" : ""
                    }`}
                    to={item.href}
                  >
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}