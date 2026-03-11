import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Pagination from "../common/Pagination";
import { Link } from "react-router-dom";
import SortDropdown from "../common/SortDropdown";
import { useContextElement } from "@/context/Context";
import FilterDropdown from "./FilterDropdown";

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

export default function CourseList3() {
  const { toggleWishlist, isAddedtoWishlist } = useContextElement();

  /* ===============================
     STATES
  =============================== */
  const [allCourses, setAllCourses] = useState([]);

  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sorted, setSorted] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedInstractors, setSelectedInstractors] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [rating, setRating] = useState([]);

  const [sortingOption, setSortingOption] = useState("Default");
  const [currentPage, setCurrentPage] = useState(1);

  /* ===============================
     FETCH COURSES FROM API
  =============================== */
    useEffect(() => {
      fetch("https://admin.languagewala.in/backend-php/get_courses.php")
        .then((res) => res.json())
        .then((data) => {
          const formattedCourses = data.map((c) => ({
            id: Number(c.id),
            title: c.title,
            price: Number(c.price),
            students: Number(c.total_students),
            author: c.institute_name,

            // 👇 default / required fields
            imgSrc: c.image
            ? `https://admin.languagewala.in/uploads/courses/${c.image}`
            : "",
            lessons: 10,
            hours: 20,
            rating: 4.5,
            totalReviews: 0,

            // 👇 VERY IMPORTANT (filters ke liye)
            filterCategories: [c.language],
            instractors: [c.institute_name],
            level: c.level,
            medium: c.medium?.trim() || "",
            duration: ["10-20 Hours"],
            features: ["Certificate"],
            locations: [c.location],
          }));

          setAllCourses(formattedCourses);
          setCourses(formattedCourses);
          setFiltered(formattedCourses);
          setSorted(formattedCourses);
        })
        .catch((err) => console.error("API Error:", err));
    }, []);


  /* ===============================
     FILTER LOGIC
  =============================== */
  useEffect(() => {
    if (!courses.length) {
      setFiltered([]);
      return;
    }

    let filteredArrays = [];

    if (selectedCategories.length) {
      filteredArrays.push(
        courses.filter((c) =>
          selectedCategories.some((el) =>
            c.filterCategories?.includes(el)
          )
        )
      );
    }

    if (selectedInstractors.length) {
      filteredArrays.push(
        courses.filter((c) =>
          selectedInstractors.some((el) =>
            c.instractors?.includes(el)
          )
        )
      );
    }

    // if (selectedLevels.length) {
    //   filteredArrays.push(
    //     courses.filter((c) =>
    //       selectedLevels.every((el) => c.level?.includes(el))
    //     )
    //   );
    // }

    if (selectedLevels.length) {
      filteredArrays.push(
        courses.filter((c) =>
          selectedLevels.some((el) =>
            c.level?.includes(el)
          )
        )
      );
    }
    
    if (selectedLanguages.length) {
      filteredArrays.push(
        courses.filter(c => {
          if (!c.medium || typeof c.medium !== "string") return false;

          const mediums = c.medium
            .toLowerCase()
            .split("&")
            .map(m => m.trim());

          return selectedLanguages.some(lang =>
            mediums.includes(lang.toLowerCase())
          );
        })
      );
    }

      

    if (selectedLocations.length) {
      filteredArrays.push(
        courses.filter((c) =>
          selectedLocations.some((el) => c.locations?.includes(el))
        )
      );
    }

    if (selectedDurations.length) {
      filteredArrays.push(
        courses.filter((c) =>
          selectedDurations.every((el) =>
            c.duration?.includes(el)
          )
        )
      );
    }

    if (selectedFeatures.length) {
      filteredArrays.push(
        courses.filter((c) =>
          selectedFeatures.every((el) =>
            c.features?.includes(el)
          )
        )
      );
    }

    if (rating.length) {
      filteredArrays.push(
        courses.filter((c) =>
          rating.includes(Math.round(c.rating))
        )
      );
    }

    if (selectedPrices.length) {
      filteredArrays.push(
        courses.filter((c) =>
          selectedPrices.includes(c.price === 0 ? "Free" : "Paid")
        )
      );
    }

    const result =
      filteredArrays.length > 0
        ? courses.filter((item) =>
            filteredArrays.every((arr) => arr.includes(item))
          )
        : courses;

    setFiltered(result);
  }, [
    courses,
    selectedCategories,
    selectedDurations,
    selectedFeatures,
    selectedInstractors,
    selectedLanguages,
    selectedLocations,
    selectedLevels,
    selectedPrices,
    rating,
  ]);

  /* ===============================
     SORTING
  =============================== */
  useEffect(() => {
    if (!filtered.length) {
      setSorted([]);
      return;
    }

    let sortedArray = [...filtered];

    if (sortingOption === "Title (A-Z)") {
      sortedArray.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortingOption === "Title (Z-A)") {
      sortedArray.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortingOption === "Price (Low to High)") {
      sortedArray.sort((a, b) => a.price - b.price);
    } else if (sortingOption === "Price (High to Low)") {
      sortedArray.sort((a, b) => b.price - a.price);
    } else if (sortingOption === "Rating (Low to High)") {
      sortedArray.sort((a, b) => a.rating - b.rating);
    } else if (sortingOption === "Rating (High to Low)") {
      sortedArray.sort((a, b) => b.rating - a.rating);
    }

    setSorted(sortedArray);
    setCurrentPage(1);
  }, [filtered, sortingOption]);

  /* ===============================
     RENDER
  =============================== */
  return (
    <>
      <div className="main-content pt-0">
        <div className="page-inner tf-spacing-1 pt-0">
          <div className="tf-container">
            <div className="row">
              <div className="col-xl-3">
                <Sidebar
                  courses={allCourses}
                  selectedCategories={selectedCategories}
                  selectedDurations={selectedDurations}
                  selectedFeatures={selectedFeatures}
                  selectedInstructors={selectedInstractors}
                  selectedLanguages={selectedLanguages}
                  selectedLocations={selectedLocations}
                  selectedLevels={selectedLevels}
                  selectedPrices={selectedPrices}
                  setSelectedCategories={setSelectedCategories}
                  setSelectedDurations={setSelectedDurations}
                  setSelectedFeatures={setSelectedFeatures}
                  setSelectedInstructors={setSelectedInstractors}
                  setSelectedLanguages={setSelectedLanguages}
                  setSelectedLocations={setSelectedLocations}
                  setSelectedLevels={setSelectedLevels}
                  setSelectedPrices={setSelectedPrices}
                  rating={rating}
                  setRating={setRating}
                />
              </div>


              <div className="col-xl-9">
                <div className="grid-list-items-3">
                {sorted
                  .slice((currentPage - 1) * 12, currentPage * 12)
                  .map((c) => (
                    <div key={c.id} className="course-item">
                      <div
                        style={{
                          width: "100%",
                          height: "220px",
                          overflow: "hidden",
                          borderRadius: "8px",
                          marginBottom: "10px"
                        }}
                      >
                        <img
                          src={c.imgSrc}
                          alt={c.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block"
                          }}
                        />
                      </div>
                      <br></br>
                      <br></br>
                      <h5>
                        <Link to={`/course/${slugify(c.title)}-${c.id}`}>
                          {c.title}
                        </Link>
                      </h5>

                      <p>By {c.author}</p>
                      <p>₹{c.price}</p>
                    </div>
                ))}
                </div>
                <div className="sort-by-wrap mb-30">
                  <p>
                    {sorted.length
                      ? `Showing ${(currentPage - 1) * 12 + 1} – ${Math.min(
                          currentPage * 12,
                          sorted.length
                        )} of ${sorted.length} Courses`
                      : "No courses found"}
                  </p>

                  {/* <SortDropdown
                    onChange={(v) => setSortingOption(v)}
                    options={[
                      "Default",
                      "Title (A-Z)",
                      "Title (Z-A)",
                      "Price (Low to High)",
                      "Price (High to Low)",
                      "Rating (Low to High)",
                      "Rating (High to Low)",
                    ]}
                  /> */}
                </div>

                

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    margin: "40px 0"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      background: "#f7f8fc",
                      padding: "10px 18px",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                    }}
                  >
                    <Pagination
                      itemLength={sorted.length}
                      itemPerPage={12}
                      setPage={setCurrentPage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FilterDropdown
        selectedCategories={selectedCategories}
        selectedDurations={selectedDurations}
        selectedFeatures={selectedFeatures}
        selectedInstructors={selectedInstractors}
        selectedLanguages={selectedLanguages}
        selectedLocations={selectedLocations}
        selectedLevels={selectedLevels}
        selectedPrices={selectedPrices}
        setSelectedCategories={setSelectedCategories}
        setSelectedDurations={setSelectedDurations}
        setSelectedFeatures={setSelectedFeatures}
        setSelectedInstructors={setSelectedInstractors}
        setSelectedLanguages={setSelectedLanguages}
        setSelectedLocations={setSelectedLocations}
        setSelectedLevels={setSelectedLevels}
        setSelectedPrices={setSelectedPrices}
        rating={rating}
        setRating={setRating}
      />
    </>
  );
}
