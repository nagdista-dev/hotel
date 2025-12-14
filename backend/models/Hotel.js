import mongoose from "mongoose";

const hotelScheme = new mongoose.Schema(
  {
    owner: { type: String, required: true, ref: "User" },
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    contact: { type: String, required: true },
  },
  { timestamps: true }
);

const Hotel = mongoose.model("Hotel", hotelScheme);
export default Hotel;
