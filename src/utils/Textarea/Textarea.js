import React, { useEffect, useState } from "react";

import "./Textarea.scss";

const Textarea = ({
  id,
  onChange,
  text = "",
  maxChars,
  showCount,
  placeholder = "",
  field = "",
  activeHelpState,
  formInfo = null,
}) => {
  const [count, setCount] = useState(text.length);
  const [value, setValue] = useState(text);

  useEffect(() => {
    setCount(text.length);
    setValue(text);
  }, [text]);

  useEffect(() => {
    if (formInfo) {
      if (formInfo[field]) {
        setValue(formInfo[field]);
        setCount(formInfo[field].length);
      }
    }
  }, [activeHelpState]);

  const onChangeHandler = (e) => {
    let value = e.target.value || "";
    if (value.length > maxChars) {
      value = value.substr(0, maxChars);
    }
    setValue(value);

    setCount(value.length);

    if (typeof onChange === "function") {
      onChange(field, value);
    }
  };

  return (
    <div className="textarea">
      <textarea
        id={id}
        onChange={onChangeHandler}
        value={value}
        placeholder={placeholder}
      />
      {showCount ? (
        <span className="max-count">
          {count} / {maxChars}
        </span>
      ) : null}
    </div>
  );
};

export default Textarea;
