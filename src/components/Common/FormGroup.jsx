import React from "react";
import { Form } from "react-bootstrap";
import Input from "./Input";
import ErrorIcon from "./ErrorIcon";

const FormGroup = (
  {
    inputClass,
    label,
    required,
    controlId,
    validationText,
    formGroupClass,
    noFormGroupClass,
    formLabelClass,
    imgSrc,
    actionIcon,
    errorMessage,
    placeholder,
    ...props
  },
  ref
) => {
  return (
    <Form.Group
      className={`${noFormGroupClass ? "" : "formGroup"} ${
        formGroupClass || ""
      }${errorMessage ? " highlight-error" : ""}${required ? " required" : ""}`}
      controlId={controlId}
    >
      {label && (
        <Form.Label htmlFor={props.id || ""} className={`${formLabelClass}`}>
          {label}
        </Form.Label>
      )}
      <div className="position-relative">
        <Input
          // id={id}
          // controlId={controlId}
          inputClass={`${imgSrc || actionIcon ? "ps-5" : ""} ${inputClass}`}
          id={props.id || ""}
          required={required}
          // placeholder={
          //   errorMessage && errorMessage !== "" ? errorMessage : placeholder
          // }
          placeholder={placeholder}
          ref={ref} // Forward the ref here
          {...props} // Spread the rest of the props to pass to the input element
        />
        {imgSrc && (
          <Form.Label
            htmlFor={props.id || ""}
            className="form-logo-img position-absolute top-50 start-0 translate-middle-y bg-none border-0 h-100 w-100 d-flex justify-content-center align-items-center"
          >
            <img className="img-fluid" src={imgSrc} alt={controlId} />
          </Form.Label>
        )}
        {actionIcon && (
          <Form.Label
            htmlFor={props.id || ""}
            className="form-logo-img position-absolute top-50 start-0 translate-middle-y bg-none border-0 h-100 w-100 d-flex justify-content-center align-items-center"
          >
            {actionIcon}
          </Form.Label>
        )}
        {errorMessage && (
          <span className="tooltipErrorMessage top-50 end-0  translate-middle position-absolute text-danger lh-1 z-1">
            <ErrorIcon errorMessage={errorMessage} />
          </span>
        )}
      </div>
      {/* {errorMessage && <small className="mt-2">{errorMessage}</small>} */}
      {/* {validationText && (
        <Form.Control.Feedback>{validationText}</Form.Control.Feedback>
      )} */}
    </Form.Group>
  );
};

export default React.forwardRef(FormGroup); // Forward ref to FormGroup
