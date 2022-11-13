import React from "react";
import "./ContentBox.scss";
import Image from "../../utils/Image/Image";
import Button from "../../utils/Button/Button";

const ContentBox = ({
  id,
  activeState,
  title,
  description,
  subtitle,
  img,
  altText,
  para,
  handleUpdate,
  handleDelete,
}) => {
  return (
    <div
      className={`flex column content-box-parent ${
        activeState !== "faq" ? "help" : ""
      }`}
      key={id}
    >
      <p className="content-type"> {activeState} </p>
      <Button
        className="Button update-btn content-btn update"
        buttonText="Update"
        clickAction={() => handleUpdate(id, activeState)}
      />
      <Button
        className="Button delete-btn content-btn delete"
        buttonText="Delete"
        clickAction={() => handleDelete(id, activeState)}
      />
      {activeState !== "faq" ? (
        <Image
          classname="flex center content-image"
          src={img}
          altText={altText}
        />
      ) : null}
      <h1 className="title">{title}</h1>
      {activeState !== "faq" ? <h2 className="subtitle">{subtitle}</h2> : null}
      <div className="divider"></div>
      <p className="description">{description}</p>
      {activeState !== "faq" ? <p className="paragraph">{para}</p> : null}
    </div>
  );
};

export default ContentBox;
