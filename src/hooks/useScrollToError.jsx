import { useEffect } from "react";

const useScrollToError = (condition,setCondition, errorClass = "highlight-error") => {
  useEffect(() => {
    if (condition) {
      // Select all elements with the error class
      const elements = document.querySelectorAll(`.${errorClass} input`);
      if (elements.length > 0) {
        elements[0].scrollIntoView({ behavior: "smooth", block: "center" }); // Scroll to first error
        elements[0].focus();
      }
      setCondition(!condition);
    }
  }, [condition, errorClass]);
};

export default useScrollToError;
