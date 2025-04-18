import { getMonth, getYear } from "date-fns";
import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormGroup from "./FormGroup";

const DateTimePickerWrapper = ({
  formGroupClass,
  strictParsing,
  onChange,
  selectsStart,
  selectsEnd,
  placeholder,
  validationText,
  Form,
  startDate,
  endDate,
  formats = "dd-MM-yyyy",
  yearsRange = [getYear(new Date()) - 100, getYear(new Date()) + 100],
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  minDate,
  maxDate,
  label,
  // inputClassName,
  // conClassName,
  // disabled,
  ...props
}) => {
  const years = Array.from(
    { length: yearsRange[1] - yearsRange[0] + 1 },
    (_, i) => yearsRange[0] + i
  );

  const ExampleCustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
    <>
      <FormGroup
        // inputClassName={inputClassName}
        onChange={onChange}
        onClick={onClick}
        ref={ref}
        value={value}
        label={label}
        // placeholder={""}
        // placeholder={
        //   errorMessage && errorMessage !== "" ? errorMessage : placeholder
        // }
        placeholder={placeholder}
        // conClassName={conClassName}
        autoComplete="off"
        preventSpaces
        {...props}
      />
    </>
  ));

  return (
    <div
      className={`datePicker ${formGroupClass || ""} ${
        props.errorMessage ? " highlight-error " : ""
      }`}
    >
      <DatePicker
        // className={`form-control ${props.inputClassName && props.inputClassName}`}
        customInput={<ExampleCustomInput />}
        // value={props.value}
        // className="form-control"
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled
        }) => (
          <div className="m-2 mt-0 d-flex justify-content-between align-items-center">
            <button
              className="btn btn-link p-0 btn-prev"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            >
              {/* {"<"} */}
            </button>
            <select
              className="form-select p-1 mx-1 lh-1 yearPicker"
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(Number(value))}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              className="form-select p-1 mx-1 lh-1 monthPicker"
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              className="btn btn-link p-0 btn-next"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
            >
              {/* {">"} */}
            </button>
          </div>
        )}
        selected={props.selected}
        onChange={(date) => onChange(date)}
        dateFormat={formats}
        startDate={startDate}
        endDate={endDate}
        selectsStart
        selectsEnd
        minDate={minDate}
        maxDate={maxDate}
        {...props}
      />
      {/* {errorMessage && <small className="text-danger mt-2">{errorMessage}</small>} */}
      {validationText && (
        <Form.Control.Feedback>{validationText}</Form.Control.Feedback>
      )}
    </div>
  );
};

export default DateTimePickerWrapper;
