import React from 'react';

const Image = ({
  classname,
  styleObj,
  altText,
  src,
  clickAction,
  ...props
}) => {
  const handleClick = e => {
    if (clickAction) clickAction(e);
    else return null;
  };
  return (
    <img
      className={classname}
      style={styleObj}
      alt={altText}
      src={src}
      onClick={e => {
        handleClick(e);
      }}
      {...props}
    />
  );
};

export default Image;
