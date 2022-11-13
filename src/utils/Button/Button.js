import React from "react";
import "./Button.scss";

const Button = ({
  className,
  clickAction,
  btnValue,
  textClass,
  styleObj,
  buttonText,
}) => {
  const handleClick = (e) => {
    if (clickAction) clickAction(e);
    else return null;
  };
  return (
    <button
      className={`${className}`}
      onClick={(e) => handleClick(e)}
      style={styleObj}
    >
      <span className={`flex ${textClass ? textClass : ""} perfectCenter`}>
        {!btnValue ? (
          buttonText
        ) : btnValue ? (
          {btnValue}
        ) : (
          ""
        )}
      </span>
    </button>
  );
};

export default Button;
