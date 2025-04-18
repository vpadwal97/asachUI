import React from "react";
import Select, { components } from "react-select";

// Custom Option Component
const Option = ({ optionsImgSrc, optionsImgClass, ...props }) => {
  const { data } = props; // Access the option's data
  const { optionImgClass, optionImgSrc } = data; // Extract optionImgSrc
  return (
    <components.Option {...props} className={`d-flex align-items-center `}>
      {(optionImgSrc || optionsImgSrc) &&
        (optionImgSrc !== "none" || optionsImgSrc) && (
          <img
            src={optionImgSrc || optionsImgSrc}
            alt="option-img"
            className={`img-fluid me-2 option-img ${optionsImgClass} ${optionImgClass}`}
          />
        )}
      <span>{props.children}</span>
    </components.Option>
  );
};

// Custom Input Component
const Input = (props) => (
  <components.Input {...props} className="p-0 m-0">
    {props.children}
  </components.Input>
);

// Custom ValueContainer Component
const ValueContainer = ({ ...props }) => (
  <components.ValueContainer {...props} className="p-0 m-0">
    {props.children}
  </components.ValueContainer>
);

// Custom Control Component
const Control = ({ inputClass, value, required, ...props }) => (
  <components.Control
    {...props}
    className={`form-select ${inputClass} ${
      value ? " valuethere" : " valueNotThere"
    } ${required ? "required" : ""}`}
  >
    {props.children}
  </components.Control>
);

// Custom Dropdown Indicator
const DropdownIndicator = ({ imgSrc,actionIcon, ...props }) => (
  <components.DropdownIndicator
    {...props}
    className="form-logo-img position-absolute top-50 start-0 translate-middle-y bg-none border-0 w-100 d-flex justify-content-center align-items-center"
  >
    {imgSrc && imgSrc !== "none" && (
      <img src={imgSrc} alt="indicator-img" className="img-fluid" />
    )}
    {actionIcon && actionIcon !== "none" && (
      {actionIcon}
    )}
    {props.children}
  </components.DropdownIndicator>
);

// Reusable ReactSelect Component
const ReactSelect = ({
  optionsImgClass = "",
  inputClass = "",
  optionsImgSrc,
  imgSrc,
  actionIcon,
  required,
  ...props // Any additional props
}) => (
  <Select
    classNamePrefix="select"
    {...props} // Spread any additional props
    components={{
      IndicatorSeparator: null, // Hides the separator
      Control: (customProps) => (
        <Control
          {...customProps}
          inputClass={inputClass}
          value={props.value}
          required={required}
          noOptionsMessage={()=> null}
        />
      ),
      DropdownIndicator: (customProps) => (
        <DropdownIndicator {...customProps} imgSrc={imgSrc} actionIcon={actionIcon} />
      ),
      ValueContainer: (customProps) => (
        <ValueContainer {...customProps} />
      ),
      // ValueContainer,
      Input,
      Option: (customProps) => (
        <Option
          optionsImgSrc={optionsImgSrc}
          optionsImgClass={optionsImgClass}
          {...customProps}
        />
      )
    }}
  />
);

export default ReactSelect;
