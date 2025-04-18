import React from "react";
import DateTimePickerWrapper from "./DateTimePickerWrapper";
import FormSelect from "./FormSelect";
import FormGroup from "./FormGroup";

const RenderField = ({ field, formData, handleChange }) => {
  const handleFieldChange = (id, value) => {
    handleChange(id, value);
  };

  const { nlabel,type, ...fieldProps } = field;

  switch (type) {
    case "date":
      return (
        <DateTimePickerWrapper
          {...fieldProps}
          type="text"
          selected={formData[fieldProps.id] || ""}
          onChange={(e) => handleFieldChange(fieldProps.id, e)}
          placeholder={fieldProps.placeholder}
        />
      );

    case "select":
      return (
        <FormSelect
          {...fieldProps}
          value={formData[fieldProps.id] || ""}
          onChange={(e) => handleFieldChange(fieldProps.id, e)}
        />
      );

    default:
      return (
        <FormGroup
          {...fieldProps}
          value={formData[fieldProps.id] || ""}
          onChange={(e) => handleFieldChange(fieldProps.id, e.target.value)}
        />
      );
  }
};

export default RenderField;
