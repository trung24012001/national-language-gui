import React from "react";

const Card = props => {
  const { imgSource, imgDesc, className, onClick, content } = props;
  if (content) {
    return (
      <div className={`grid-card ${className}`} onClick={onClick}>
        <div className="grid-div grid-text">
          {content}
        </div>
      </div>
    );
  }
  return (
    <div className={`grid-card ${className}`} onClick={onClick}>
      <img
        className={`img-thumbnail img-fluid grid-img`}
        src={imgSource}
        alt={imgDesc}
      />
    </div>
  );
};

export default Card;
