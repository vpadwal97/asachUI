import React, { useState, useEffect } from "react";
import ReactSlider from "react-slider";

const MultiRangeSlider = ({
  min,
  max,
  gap,
  onValueChange,
  initialValue,
  unit,
  ...props
}) => {
  const [values, setValues] = useState([min || 0, max || 100]);

  useEffect(() => {
    if (initialValue && Array.isArray(initialValue)) {
      setValues(initialValue);
    }
  }, [initialValue]);

  const handleInputChange = (newValues) => {
    setValues(newValues);
    onValueChange(newValues);
  };

  return (
    <div className="multi-range-slider">
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="thumb"
        trackClassName="track"
        value={values}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        pearling
        min={min}
        max={max}
        minDistance={gap}
        onChange={(newValues) => handleInputChange(newValues)}
        {...props}
      />
      {/* Optional: Display unit next to the values */}
      {unit && (
        <div className="d-flex justify-content-between mt-2 slider-values">
          <span>{values[0]}{unit} </span><span> {values[1]}{unit}</span>
        </div>
      )}
    </div>
  );
};

export default MultiRangeSlider;
