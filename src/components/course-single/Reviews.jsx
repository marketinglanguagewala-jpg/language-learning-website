import React from "react";

export default function Reviews() {
  const reviews = [
    {
      name: "Theresa Edin",
      rating: 4.9,
      time: "2 months ago",
      title: "Excellent Course",
      comment:
        "LanguageWala helped me improve my speaking skills with practical lessons and expert guidance. The course structure is simple, engaging, and very effective.",
      avatar: "/images/avatar/user-2.png",
    },
    {
      name: "Theresa Edin",
      rating: 4.9,
      time: "2 months ago",
      title: "Excellent Course",
      comment:
        "The instructors are very supportive and knowledgeable. I gained confidence in English communication within a few weeks of joining.",
      avatar: "/images/avatar/user-3.png",
    },
  ];

  return (
    <>
      {/* ---------- HEADER ---------- */}
      <div
        className="review-title flex justify-between items-center"
        style={{
          borderBottom: "none",
          marginBottom: "24px",
        }}
      >
        <div className="text-22 fw-5">Review</div>

        {/* ❌ rating class REMOVED */}
        <div
          className="review-rating"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <i className="icon-star-1" />
            <span className="fs-15">4.9 course rating</span>
          </div>

          <span className="fs-15">4K ratings</span>
        </div>
      </div>

      {/* ---------- REVIEWS ---------- */}
      <div>
        {reviews.map((review, index) => {
          const isLast = index === reviews.length - 1;

          return (
            <div
              key={index}
              className="review-item"
              style={{
                borderBottom: !isLast ? "1px solid #e6e6e6" : "none",
                paddingBottom: "24px",
                marginBottom: !isLast ? "24px" : "0",
              }}
            >
              <div className="avatar">
                <img
                  src={review.avatar}
                  alt={review.name}
                  width={101}
                  height={100}
                />
              </div>

              <div className="comment-box">
                <h5 className="author-name">{review.name}</h5>

                <div className="ratings">
                  <div className="number">{review.rating}</div>
                  <i className="icon-star-1" />
                  <i className="icon-star-1" />
                  <i className="icon-star-1" />
                  <i className="icon-star-1" />
                  <div className="total">{review.time}</div>
                </div>

                <p className="evaluate">{review.title}</p>
                <p className="comment">{review.comment}</p>

                <ul className="reaction">
                  <li className="btn-like">
                    <i className="icon-like" /> Helpful
                  </li>
                  <li className="btn-dislike">
                    <i className="icon-dislike" /> Not helpful
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------- BUTTON ---------- */}
      <a
        href="#"
        className="tf-btn style-third w-100"
        style={{ marginTop: "24px" }}
      >
        View More Reviews
        <i className="icon-arrow-top-right" />
      </a>
    </>
  );
}
