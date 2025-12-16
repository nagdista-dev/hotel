import React from "react";
import { roomsDummyData } from "../assets/assets";
import HotelCard from "./HotelCard";
import TitleComponent from "./TitleComponent";
import { useNavigate } from "react-router-dom";
const FeaturedDestinations = () => {
  const navigate = useNavigate();
  const titleText = "Featured Destination";
  const description =
    "Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences.";
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
      <TitleComponent titleText={titleText} description={description} />
      <div className="flex  flex-wrap items-center justify-center gap-6 mt-20">
        {roomsDummyData.slice(0, 4).map((room, idx) => (
          <HotelCard key={room._id} room={room} idx={idx} />
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/rooms");
          scrollTo(0, 0);
        }}
        className="my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer"
      >
        Show All
      </button>
    </div>
  );
};

export default FeaturedDestinations;
