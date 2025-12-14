import mongoose from "mongoose";

const roomScheme = new mongoose.Schema(
  {
    hotel: { type: String, required: true, ref: "Hotel " },
    roomType: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    amenities: { type: Array, required: true },
    images: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomScheme);
export default Room;
