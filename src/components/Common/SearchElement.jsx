import React from "react";
import { Form } from "react-bootstrap";
import { components } from "react-select";
import AsyncSelect from "react-select/async";
import ErrorIcon from "./ErrorIcon";

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
    {/* {value} */}
  </components.ValueContainer>
);

// Custom Control Component
const Control = ({
  imgSrc,
  actionIcon,
  inputClass,
  value,
  required,
  ddIndicator,
  ...props
}) => (
  <components.Control
    {...props}
    className={`form-select ${
      imgSrc || actionIcon ? "flex-row-reverse ps-5  form-control" : "px-2"
    } py-2 ${inputClass} ${value ? " valuethere" : " valueNotThere"} ${
      required ? "required" : ""
    }${ddIndicator === null ? " noselect-bg-img" : " sss "}`}
  >
    {props.children}
  </components.Control>
);

// Custom Dropdown Indicator
const DropdownIndicator = ({ imgSrc, actionIcon, ...props }) => (
  <components.DropdownIndicator
    {...props}
    className="form-logo-img position-absolute top-50 start-0 translate-middle-y bg-none border-0 w-100 d-flex justify-content-center align-items-center"
  >
    {imgSrc && imgSrc !== "none" && (
      <img src={imgSrc} alt="indicator-img" className="img-fluid" />
    )}
    {actionIcon && actionIcon !== "none" && { actionIcon }}
    {props.children}
  </components.DropdownIndicator>
);

const SearchElement = ({
  label,
  controlId,
  validationText,
  imgSrc,
  actionIcon,
  formGroupClass,
  formLabelClass,
  inputClass,
  selectedOption,
  dropdownlist,
  ddIndicator,

  getSearchData,
  optionsImgClass = "",
  optionsImgSrc,
  required,
  placeholder,
  errorMessage,
  ...props
}) => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const loadOptions = async (inputValue, callback) => {
    //   // setTimeout(() => {
    //   try {
    //     await delay(1000); // Simulate the 1-second delay
    //     const results = (await getSearchData(inputValue)) || [];
    //     callback(results);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    //   // }, 1000); // Simulate a 1-second delay
    // };
    if (inputValue.length >= 3) {
      try {
        await delay(1000);
        const results = (await getSearchData(inputValue)) || [];
        callback(results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      // If less than 3 characters, return an empty array to prevent unnecessary requests
      callback([]);
    }
  };

  return (
    <>
      <Form.Group
        className={`formGroup ${formGroupClass} ${
          errorMessage ? " highlight-error " : ""
        }`}
        controlId={controlId}
      >
        {label && (
          <Form.Label className={`${formLabelClass}`}>{label}</Form.Label>
        )}
        <div className="position-relative">
          <AsyncSelect
            noOptionsMessage={() => null}
            classNamePrefix="select"
            cacheOptions
            // placeholder={
            //   errorMessage && errorMessage !== "" ? errorMessage : placeholder
            // }
            placeholder={placeholder}
            loadOptions={loadOptions}
            inputClass={`${
              imgSrc || actionIcon
                ? "flex-row-reverse ps-5  form-control"
                : "px-2"
            } py-2 ${inputClass}`}
            // value={searchValue}
            {...props}
            components={{
              IndicatorSeparator: null, // Hides the separator
              Control: (customProps) => (
                <Control
                  {...customProps}
                  ddIndicator={ddIndicator}
                  inputClass={inputClass}
                  imgSrc={imgSrc}
                  value={props.value}
                  required={required}
                />
              ),
              DropdownIndicator: (customProps) => (
                <DropdownIndicator
                  {...customProps}
                  imgSrc={imgSrc}
                  actionIcon={actionIcon}
                />
              ),
              ValueContainer: (customProps) => (
                <ValueContainer {...customProps} />
              ),
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

          {imgSrc && (
            <div className="form-logo-img position-absolute top-50 start-0 translate-middle-y bg-none border-0 h-100 w-100 d-flex justify-content-center align-items-center">
              <img className="img-fluid" src={imgSrc} alt={controlId} />
            </div>
          )}
          {actionIcon && (
            <div className="form-logo-img position-absolute top-50 start-0 translate-middle-y bg-none border-0 h-100 w-100 d-flex justify-content-center align-items-center">
              {actionIcon}
            </div>
          )}
          {errorMessage && (
            <span className="tooltipErrorMessage top-50 end-0  translate-middle position-absolute text-danger lh-1 z-1">
              <ErrorIcon errorMessage={errorMessage} />
            </span>
          )}
        </div>

        {/* Render validation feedback if provided */}
        {/* {errorMessage && <small className="mt-2">{errorMessage}</small>} */}
        {/* {validationText && (
          <Form.Control.Feedback>{validationText}</Form.Control.Feedback>
        )} */}
      </Form.Group>
    </>
  );
};

export default React.memo(SearchElement);
