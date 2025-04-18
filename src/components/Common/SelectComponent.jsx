import React from "react";
// import IoIosInformationCircleCustom from './IoIosInformationCircleCustom';

const SelectComponent = ({
  inputClass,
  options,
  optionsImgClass,
  optionsImgSrc,
  imgSrc,
  value,
  placeholder,
  ...props
}) => {

  return (
    <>
      <select className={`form-control ${inputClass || ""}`} {...props}>
        {placeholder && <option disabled selected>{placeholder}</option>}
        {options?.map((option) => (
          <option key={option.value} value={`${option.id || "12"}_${option.value}`} className="">
            {(option.optionImgSrc || optionsImgSrc) &&
              (option.optionImgSrc !== "none" || optionsImgSrc) && (
                <img
                  src={option.optionImgSrc || optionsImgSrc}
                  alt="option-img"
                  className={`img-fluid me-2 option-img ${
                    optionsImgClass || ""
                  } ${option.optionImgClass || ""}`}
                  onError={(e) => {
                    e.target.src = "noIMGpng";
                  }}
                />
              )}
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectComponent;
