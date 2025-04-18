import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import ReactSelect from "./ReactSelect ";
import ErrorIcon from "./ErrorIcon";
// import SelectComponent from "./SelectComponent";

const FormSelect = ({
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
  placeholder,
  errorMessage,
  ...props
}) => {
  return (
    <Form.Group
      className={`formGroup ${formGroupClass}${
        errorMessage ? " highlight-error " : ""
      } `}
      controlId={controlId}
    >
      {label && (
        <Form.Label className={`${formLabelClass}`}>{label}</Form.Label>
      )}
      <div className="position-relative">
        <ReactSelect
          // <SelectComponent
          inputClass={`${
            imgSrc || actionIcon
              ? "flex-row-reverse ps-5  form-control"
              : "px-2"
          } py-2 ${inputClass}`}
          // placeholder={
          //   errorMessage && errorMessage !== "" ? errorMessage : placeholder
          // }
          placeholder={placeholder}
          {...props}
        />
        {/* <Form.Select
          className={`form-select form-control ${inputClass || ""} ${
            imgSrc ? "ps-5" : ""
          }`}
          value={selectedOption || value || ""}
          {...props} // Spread the rest of the props
        >
          {!noPleaseSelect && <option value="">Please Select</option>}

          {dropdownlist?.map((option) => (
            <option key={option.optionValue} value={option.optionValue}>
              {option.optionLabel}
            </option>
          ))}
        </Form.Select> */}

        {/* Render the image if imgSrc is provided */}
        {imgSrc && (
          <div className="form-logo-img position-absolute top-50 start-0 translate-middle-y bg-none border-0 h-100 w-100 d-flex justify-content-center align-items-center">
            <img className="img-fluid " src={imgSrc} alt={controlId} />
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
      {/* {errorMessage && <small className="text-danger mt-2">{errorMessage}</small>} */}
      {validationText && (
        <Form.Control.Feedback>{validationText}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};
export default FormSelect;
