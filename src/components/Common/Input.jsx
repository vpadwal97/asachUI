import React, { forwardRef } from "react";
import { Form } from "react-bootstrap";

const Input = forwardRef(({
  required,
  onKeyDown,
  onPaste,
  onCopy,
  onCut,
  inputClass = "", 
  preventSpaces = false,  
  numOnly = false,  
  preventNum = false,  
  preventSpecialCharacters = false,  
  preventPaste = false,
  preventCopyCut = false,
  ...props
}, ref) => {
  
  // Handle keydown event
  const handleKeyDown = (e) => {
    if (preventSpaces && e.key === " ") {
      e.preventDefault();
    }
    if (numOnly && !/^[0-9\b]$/.test(e.key) && !["ArrowLeft", "ArrowRight", "Delete", "Backspace", "Enter","Tab"].includes(e.key)) {
      e.preventDefault();
    }
    if (preventNum && /^[0-9\b]$/.test(e.key)) {
      e.preventDefault();
    }
    if (preventSpecialCharacters && !/^[a-zA-Z0-9]+$/.test(e.key)) {
      e.preventDefault();
    }
    if (onKeyDown) onKeyDown(e);
  };

  const handlePaste = (e) => {
    if (preventPaste) {
      e.preventDefault();
    }
    if (onPaste) onPaste(e);
  };

  const handleClipboardEvents = (e) => {
    if (preventCopyCut) {
      e.preventDefault();
    }
    if (onCopy) onCopy(e);
    if (onCut) onCut(e);
  };

  return (
    <Form.Control
      ref={ref}  // Pass the ref here
      className={`${inputClass}${required ? " required" : "" }`}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onCopy={handleClipboardEvents}
      onCut={handleClipboardEvents}
      required={required}
      {...props}  
    />
  );
});

export default Input;
