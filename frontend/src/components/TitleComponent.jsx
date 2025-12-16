import React from "react";

const TitleComponent = ({
  titleText = "",
  description = "",
  align = "",
  font = "play-fair",
}) => {
  return (
    <div
      className={`${
        align === "left" && "md:items-start md:text-left"
      } flex flex-col justify-center items-center text-center`}
    >
      <h1 className={`text-4xl md:text-[40px] ${font}`}>{titleText}</h1>
      <p className={`text-sm md:text-base text-gray-500/90 mt-2 max-w-174 `}>
        {description}
      </p>
    </div>
  );
};

export default TitleComponent;
