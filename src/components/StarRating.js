import React, { useState } from "react";
import "./StarRating.css";
const StarRating = () => {
  const [rating, setRating] = useState(0); // 초기 별점
  const stars = [1, 2, 3, 4, 5]; // 0.5 단위로 별점 범위

  const handleStarClick = (newRating) => {
    // 클릭한 별점을 설정합니다.
    setRating(newRating);

    // 여기에서 서버에 별점을 보내거나 다른 작업을 수행할 수 있습니다.
  };
  return (
    <div className="container">
      <div>
        {stars.map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? "active" : ""}`}
            onClick={() => handleStarClick(star)}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default StarRating;
