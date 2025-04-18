import React, { useEffect, useState } from "react";
import IoIosInformationCircleCustom from "./IoIosInformationCircleCustom";
import ErrorIcon from "./ErrorIcon";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FormGroup = ({ ...props }) => {
  const {
    onKeyDown,
    onPaste,
    onCopy,
    onCut,
    inputClass,
    preventSpaces,
    numOnly,
    preventNum,
    preventSpecialCharacters,
    preventPaste,
    preventcopyCut,
    ...restProps
  } = props;

  const handleKeyDown = (e) => {
    if (props.preventSpaces && e.key === " ") {
      e.preventDefault();
    }
    if (props.numOnly) {
      if (
        !/^[0-9\b]$/.test(e.key) &&
        !(e.key === "ArrowLeft" || e.key === "ArrowRight") &&
        !(e.key === "Delete" || e.key === "Backspace")
      ) {
        e.preventDefault();
      }
    }
    if (props.preventNum) {
      if (/^[0-9\b]$/.test(e.key)) {
        e.preventDefault();
      }
    }
    if (props.preventSpecialCharacters && !/^[a-zA-Z0-9]+$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    if (props.preventPaste) {
      e.preventDefault();
    }
    if (props.preventcopyCut) {
      e.preventDefault();
    }
  };

  return (
    <>
      <div
        className={`form-group position-relative ${
          props.preventcopyCut && props.disabled ? " disabled-input " : ""
        } ${props.errorMessage ? " highlight-error " : ""} ${
          (props.conClassName && props.conClassName) || ""
        }`}
      >
        <input
          className={`form-control ${
            (props.inputClassName && props.inputClassName) || ""
          }`}
          id={props.label && props.label.replaceAll(/[^a-zA-Z0-9]/g, "_")}
          type={props.type}
          value={props.value}
          defaultValue={props.defaultValue}
          onClick={props.onClick}
          onChange={props.onChange}
          maxLength={props.maxLength}
          disabled={props.disabled}
          name={props.name}
          placeholder={props.placeholder || ""}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onCopy={handlePaste}
          onCut={handlePaste}
          autoComplete={props.autoComplete}
          ref={props.uref}
          {...restProps}
        />
        <label
          htmlFor={props.label && props.label.replaceAll(/[^a-zA-Z0-9]/g, "_")}
          className="body-bg px-2 lh-1 d-flex align-items-center"
        >
          <span className="label overflow-hidden">{props.label}</span>
          {props.required && <span className="required"></span>}
          {props.tooltipMessage && (
            <IoIosInformationCircleCustom
              tooltipMessage={props.tooltipMessage}
            />
          )}
        </label>

        {props.errorMessage && (
          <span className="tooltipErrorMessage top-50 translate-middle-y position-absolute text-danger lh-1">
            <ErrorIcon errorMessage={props.errorMessage} />
          </span>
        )}
        {props.isPasswordField == "1" ? (
          <span
            className={`password-toggle-icon1 `}
            onClick={props.handleChangedVisibility}
          >
            {props.type == "text" ? (
              <FaEyeSlash className="position-absolute cursor-pointer top-50 translate-middle-y text-primary-secondary" />
            ) : (
              <FaEye className="position-absolute cursor-pointer top-50 translate-middle-y text-primary-secondary" />
            )}
          </span>
        ) : (
          ""
        )}
      </div>
      {/* {props.validMessage && (
        <>
          {props.validMessage.span1 ? <>{props.validMessage.span1} </> : ""}
          {props.validMessage.span2 ? <>{props.validMessage.span2} </> : ""}
          {props.validMessage.span3 ? <>{props.validMessage.span3} </> : ""}
          {props.validMessage.span4 ? <>{props.validMessage.span4} </> : ""}
          {props.validMessage.span5 ? <>{props.validMessage.span5} </> : ""}
        </>
      )} */}
    </>
  );
};

export default FormGroup;
