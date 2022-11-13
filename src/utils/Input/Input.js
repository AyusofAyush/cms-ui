import React, { useEffect, useState } from "react";

import "./Input.scss";

const Input = ({
  id,
  onChange,
  text = "",
  type = "text",
  maxChars,
  placeholder = "",
  autoComplete = false,
  field = "",
  activeHelpState = null,
  formInfo = null,
}) => {
  const [value, setValue] = useState(text);

  useEffect(() => {
    setValue(text);
  }, [text]);

  useEffect(() => {
    if (formInfo) {
      setValue(formInfo[field]);
    }
  }, [activeHelpState]);

  const onChangeHandler = (e) => {
    let value = e.target.value || "";
    if (value.length > maxChars) {
      value = value.substr(0, maxChars);
    }

    setValue(value);

    if (typeof onChange === "function") {
      onChange(field, value);
    }
  };

  return (
    <input
      id={id}
      className="input"
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChangeHandler}
      autoComplete={autoComplete ? "on" : "off"}
    />
  );
};

export default Input;
