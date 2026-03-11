import { menuItems } from "@/data/menu";
import { Link, useLocation } from "react-router-dom";
import React from "react";

export default function Nav() {
  const { pathname } = useLocation();

  const isMenuActive = (menu) => {
    let isActive = false;
    if (menu.href && menu.href !== "#") {
      if (pathname.split("/")[1] === menu.href?.split("/")[1]) {
        isActive = true;
      }
    }
    if (menu.subItems) {
      menu.subItems.forEach((el) => {
        if (el.href && el.href !== "#") {
          if (pathname.split("/")[1] === el.href?.split("/")[1]) {
            isActive = true;
          }
        }
        if (el.subItems) {
          el.subItems.forEach((elm) => {
            if (elm.href && elm.href !== "#") {
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
      {menuItems.map((item, index) => (
        <li
          key={index}
          className={
            item.subItems && item.subItems.length > 0
              ? item.isActive
                ? "has-children current"
                : "has-children"
              : item.isActive
              ? "current"
              : ""
          }
        >
          {/* ✅ Fix: Use <Link> for parent item if href exists */}
          {item.href && item.href !== "#" ? (
            <Link
              to={item.href}
              className={isMenuActive(item) ? "parent-active activeMenu" : ""}
            >
              {item.title}
            </Link>
          ) : (
            <a
              href="#"
              className={isMenuActive(item) ? "parent-active activeMenu" : ""}
            >
              {item.title}
            </a>
          )}

          {item.subItems && (
            <ul className={item.hasMega ? "mega-menu" : ""}>
              {item.subItems.map((subItem, subIndex) => (
                <li
                  key={subIndex}
                  className={subItem.subItems ? "has-item-children" : ""}
                >
                  {subItem.title && !subItem.href && (
                    <span
                      className={`title ${
                        isMenuActive(subItem) ? "activeMenu" : ""
                      }`}
                    >
                      {subItem.title}
                    </span>
                  )}

                  {subItem.href ? (
                    <Link
                      to={subItem.href}
                      className={`${isMenuActive(subItem) ? "activeMenu" : ""}`}
                    >
                      {subItem.title}
                    </Link>
                  ) : (
                    subItem.subItems && (
                      <ul>
                        {subItem.subItems.map((subSubItem, subSubIndex) => (
                          <li key={subSubIndex}>
                            <Link
                              to={subSubItem.href}
                              className={`${
                                isMenuActive(subSubItem) ? "activeMenu" : ""
                              }`}
                            >
                              {subSubItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </>
  );
}
