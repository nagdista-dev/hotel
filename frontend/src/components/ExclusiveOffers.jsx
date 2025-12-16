import React from "react";
import TitleComponent from "./TitleComponent";
import { assets, exclusiveOffers } from "../assets/assets";

const ExclusiveOffers = () => {
  // !Texts
  const title = {
    align: "left",
    text: "Exclusive Offers",
    description:
      "Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.",
  };
  const MainBtnTxt = "View All Offers";
  const secondaryBtnTxt = "View Offers";
  // !Icons
  const arrowIcon = assets.arrowIcon;
  // !Return
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-30">
      <div className="w-full flex flex-col md:flex-row justify-between items-center">
        <TitleComponent
          align={title.align}
          titleText={title.text}
          description={title.description}
        />
        <button className="group gap-2 cursor-pointer font-medium max-md:mt-12 flex items-center justify-between">
          {MainBtnTxt}
          <img
            src={arrowIcon}
            alt="arrowIcon"
            className="group-hover:translate-x-1 transition-all"
          />
        </button>
      </div>
      {/* Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {exclusiveOffers.map((offer) => (
          <div
            className="group relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 p-4 rounded-xl text-white bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${offer.image})` }}
            key={offer._id}
          >
            <p className="px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full">
              {offer.priceOff}% OFF
            </p>
            <div className="">
              <p className="text-2xl font-medium font-playfair">
                {offer.title}
              </p>
              <p className="">{offer.description}</p>
              <p className="text-xs text-white/70 mt-3">{offer.expiryDate}</p>
            </div>
            <button className="flex items-center gap-2 font-medium cursor-pointer mt-4 mb-5">
              {secondaryBtnTxt}
              <img
                src={arrowIcon}
                alt="arrow-icon"
                className="invert group-hover:translate-x-1 transition-all"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveOffers;
