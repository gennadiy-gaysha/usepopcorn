import { useState } from "react";
import Star from "./Star";

const outerContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  // gap: "4px",
};

const textStyle = {
  lineHeight: "1",
  margin: "0",
};

function StarRating({ maxRating = 5 }) {
  const [rating, setRating] = useState(0);

  // If the logic is simple, directly using setRating in <Star key={i} onRating={() => setRating(i+1)} /> is fine and can be preferred for brevity. However, if the logic inside handleRating becomes more complex, it's better to keep it separate for clarity.
  function handleRating(rating) {
    setRating(rating + 1);
  }
  return (
    <div style={outerContainerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          // <span>S{i + 1}</span>
          <Star key={i} onRating={() => handleRating(i)} />
        ))}
      </div>
      <p style={textStyle}>{rating || ""}</p>
    </div>
  );
}

export default StarRating;
