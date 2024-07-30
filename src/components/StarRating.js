import { useState } from "react";
import Star from "./Star";
import PropTypes from "prop-types";

const outerContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  // gap: "4px",
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
};

function StarRating({ maxRating = 5, color = "#fcc419", size = 24 }) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.3}px`,
  };

  // If the logic is simple, directly using setRating in <Star key={i} onRating={() => setRating(i+1)} /> is fine and can be preferred for brevity. However, if the logic inside handleRating becomes more complex, it's better to keep it separate for clarity.
  function handleRating(rating) {
    setRating(rating + 1);
  }

  return (
    <div style={outerContainerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          // <span>S{i + 1}</span>
          <Star
            key={i}
            onRating={() => handleRating(i)}
            rating={rating}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            // The primary reason to use an arrow function in this context is to ensure that the state-setting function (setRating) is only called when the user interacts with the component, not when the component renders
            onMouseIn={() => setTempRating(i + 1)}
            onMouseOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>{tempRating || rating || ""}</p>
    </div>
  );
}

export default StarRating;
