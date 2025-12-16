import React, { Fragment } from "react";
import { assets } from "../assets/assets";

const StarRating = ({ rating = 4 }) => {
  return (
    <Fragment>
      {Array(5)
        .fill("")
        .map((_, idx) => (
          <img
            src={rating > idx ? assets.starIconFilled : assets.starIconOutlined}
            alt="star-icon"
            className="h-4.5 w-4.5"
          ></img>
        ))}
    </Fragment>
  );
};

export default StarRating;
