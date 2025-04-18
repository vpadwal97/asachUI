import React, { useState } from "react";
import Input from "./Input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import FormGroup from "./FormGroup";

const InputPassword = React.memo((props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // const handleToggle = () => {
  //   setIsPasswordVisible(true); // Immediately show the password
  //   setTimeout(() => {
  //     setIsPasswordVisible(false); // Hide after 3 seconds
  //   }, 2000);
  // };
  const { type, ...restProps } = props;

  return (
    <>
      {/* <span className="position-relative"> */}
      <FormGroup type={isPasswordVisible ? "text" : "password"} {...restProps} />
      <button
        type="button" // Prevents the button from submitting a form
        className="position-absolute top-50 transform translate-middle end-0 bg-none border-0 h-100 me-2"
        aria-label={isPasswordVisible ? "Hide password" : "Show password"} // Improves accessibility
        // onClick={handleToggle}
      >
        <span
          className="cursor-pointer"
          onMouseDown={() => {
            setIsPasswordVisible(true);
          }}
          onMouseLeave={() => {
            setIsPasswordVisible(false);
          }}
          onMouseUp={() => {
            setIsPasswordVisible(false);
          }}
        >
          {isPasswordVisible ? (
            <FaEye className="text-primary" />
          ) : (
            <FaEyeSlash className="text-secondary" />
          )}
        </span>
      </button>
      {/* </span> */}
    </>
  );
});

export default InputPassword;
