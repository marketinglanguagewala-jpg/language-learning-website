
import { courses3 } from "@/data/courese";
import {
  categories,
  durations,
  features,
  instractors,
  languages,
  locations,
  levels,
  prices,
} from "@/data/filterOptions";

import React, { useEffect, useMemo } from "react";

export default function Sidebar(props) {
  const {
    courses = [],
    selectedCategories,
    selectedDurations,
    selectedFeatures,
    selectedInstructors,
    selectedLanguages,
    selectedLocations,
    selectedLevels,
    selectedPrices,
    setSelectedCategories,
    setSelectedDurations,
    setSelectedFeatures,
    setSelectedInstructors,
    setSelectedLocations,
    setSelectedLanguages,
    setSelectedLevels,
    setSelectedPrices,
    rating,
    setRating,
  } = props;

  const instructorList = useMemo(() => {
    return [
      ...new Set(
        courses.flatMap(c => c.instractors || [])
      )
    ];
  }, [courses]);

  const levelList = useMemo(() => {
    return [
      ...new Set(
        courses
          .map(c => c.level)
          .filter(Boolean)
      )
    ];
  }, [courses]);


  const languageList = useMemo(() => {
    return [
      ...new Set(
        courses.flatMap(c => {
          if (!c.medium || typeof c.medium !== "string") return [];

          return c.medium
            .split("&")
            .map(l => l.trim());
        })
      )
    ];
  }, [courses]);


  const clearFilter = () => {
    setSelectedCategories([]);
    setSelectedDurations([]);
    setSelectedFeatures([]);
    setSelectedInstructors([]);
    setSelectedLanguages([]);
    setSelectedLocations([]);
    setSelectedLevels([]);
    setSelectedPrices([]);

    setRating([]);
  };
  useEffect(() => {
    // Select all buttons with the .btn-showmore class
    const showMoreButtons = document.querySelectorAll(".btn-showmore");

    // Loop through each button
    showMoreButtons.forEach((button) => {
      // Add a click event listener to each button
      button.addEventListener("click", () => {
        // Check if the button has a previous sibling element
        if (button.previousElementSibling) {
          const previousElement = button.previousElementSibling;

          // Get the computed style of the previous element
          const previousElementStyle = window.getComputedStyle(previousElement);

          // Check if the height is not 0px
          if (previousElementStyle.height !== "0px") {
            // Apply styles to the previous element if height is not 0px
            previousElement
              .querySelectorAll(".d-none")
              .forEach((el) => el.classList.remove("d-none"));

            previousElement.style.height = previousElement.scrollHeight + "px";
            button.style.display = "none";
          }
        }
      });
    });

    // Cleanup: remove event listeners when component unmounts
    return () => {
      showMoreButtons.forEach((button) => {
        button.removeEventListener("click", () => {});
      });
    };
  }, []);
  return (
    <div className="tf-sidebar course">
      <div className="sidebar-item widget wg-categorie tf-collapse-item">
        <div className="sidebar-title tf-collapse-title">
          <h5 className="fw-5">Categories</h5>
          <i className="tf-collapse-icon icon-arrow-top" />
        </div>
        <ul className="tf-collapse-content showmore-item">
          {categories.map((elm, i) => (
            <li
              key={i}
              className={`checkbox-item fl-item2 ${i > 4 ? "d-none" : ""}`}
            >
              <label>
                <p>{elm}</p>
                <input
                  readOnly
                  onClick={(event) => {
                    event.stopPropagation(); // Prevent event bubbling
                    setSelectedCategories((pre) =>
                      pre.includes(elm)
                        ? pre.filter((el) => el !== elm)
                        : [...pre, elm]
                    );
                  }}
                  checked={selectedCategories.includes(elm)}
                  type="radio"
                />
                <span className="btn-checkbox" />
              </label>
              <span>
                (
                  {
                    courses.filter(c =>
                      c.filterCategories?.includes(elm)
                    ).length
                  }
                )

                {/* (
                {
                  courses3.filter((el) => el.filterCategories.includes(elm))
                    .length
                }
                ) */}
              </span>
            </li>
          ))}
        </ul>
        <div className="btn-showmore showmore view-more-button">
          <span className="title">
            Show More <i className="icon icon-arrow-bottom" />
          </span>
        </div>
      </div>
      
      <div className="sidebar-item widget wg-categorie tf-collapse-item">
  <div className="sidebar-title tf-collapse-title">
    <h5 className="fw-5">Institute</h5>
    <i className="tf-collapse-icon icon-arrow-top" />
  </div>

  <ul className="tf-collapse-content showmore-item2">
    {instructorList.map((elm, i) => (
      <li
        key={i}
        className={`checkbox-item fl-item3 ${i > 2 ? "d-none" : ""}`}
      >
        <label>
          <p>{elm}</p>
          <input
            readOnly
            onClick={(event) => {
              event.stopPropagation();
              setSelectedInstructors((pre) =>
                pre.includes(elm)
                  ? pre.filter((el) => el !== elm)
                  : [...pre, elm]
              );
            }}
            checked={selectedInstructors.includes(elm)}
            type="radio"
          />
          <span className="btn-checkbox" />
        </label>

        <span>
          (
          {
            courses.filter(c =>
              c.instractors?.includes(elm)
            ).length
          }
          )
        </span>
      </li>
    ))}
  </ul>
</div>


      <div className="sidebar-item widget wg-categorie tf-collapse-item">
        <div className="sidebar-title tf-collapse-title">
          <h5 className="fw-5">Location</h5>
          <i className="tf-collapse-icon icon-arrow-top" />
        </div>

        <ul className="tf-collapse-content">
          {locations.map((elm, index) => (
            <li key={index} className="checkbox-item">
              <label>
                <p>{elm}</p>
                <input
                  type="checkbox"
                  readOnly
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedLocations((pre = []) =>
                      pre.includes(elm)
                        ? pre.filter((el) => el !== elm)
                        : [...pre, elm]
                    );
                  }}
                  checked={selectedLocations?.includes(elm) || false}
                />
                <span className="btn-checkbox" />
              </label>
              <span>
                (
                  {
                    courses.filter(c =>
                      c.locations?.includes(elm)
                    ).length
                  }
                )

              </span>
            </li>
          ))}
        </ul>
      </div>


      <div className="sidebar-item widget wg-categorie tf-collapse-item">
        <div className="sidebar-title tf-collapse-title">
          <h5 className="fw-5">Level</h5>
          <i className="tf-collapse-icon icon-arrow-top" />
        </div>
        <ul className="tf-collapse-content">
          {levelList.map((elm, index) => (
            <li key={index} className="checkbox-item">
              <label>
                <p>{elm}</p>
                <input
                  type="checkbox"
                  readOnly
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedLevels((pre) =>
                      pre.includes(elm)
                        ? pre.filter(l => l !== elm)
                        : [...pre, elm]
                    );
                  }}
                  checked={selectedLevels.includes(elm)}
                />
                <span className="btn-checkbox" />
              </label>

              <span>
                ({courses.filter(c => c.level === elm).length})
              </span>
            </li>
          ))}
        </ul>

      </div>
      
      <div className="sidebar-item widget wg-categorie tf-collapse-item">
        <div className="sidebar-title tf-collapse-title">
          <h5 className="fw-5">Language</h5>
          <i className="tf-collapse-icon icon-arrow-top" />
        </div>
        <ul className="tf-collapse-content showmore-item3">
          {languageList.map((elm, index) => (
            <li
              key={index}
              className={`checkbox-item fl-item4  ${index > 5 ? "d-none" : ""}`}
            >
              <label>
                <p>{elm}</p>
                <input
                  readOnly
                  onClick={(event) => {
                    event.stopPropagation(); // Prevent event bubbling
                    setSelectedLanguages((pre) =>
                      pre.includes(elm)
                        ? pre.filter((el) => el !== elm)
                        : [...pre, elm]
                    );
                  }}
                  checked={selectedLanguages.includes(elm)}
                  type="radio"
                />
                <span className="btn-checkbox" />
              </label>
              <span>
                (
                  {
                    courses.filter(c => {
                      if (!c.medium || typeof c.medium !== "string") return false;

                      const mediums = c.medium
                        .toLowerCase()
                        .split("&")
                        .map(m => m.trim());

                      return mediums.includes(elm.toLowerCase());
                    }).length
                  }
                )
              </span>

            </li>
          ))}
        </ul>
        
      </div>
      
      <a onClick={clearFilter} data-bs-dismiss="offcanvas" className="tf-btn">
        Clear Filter
      </a>
    </div>
  );
}
