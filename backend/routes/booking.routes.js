import { checkAvailabilityAPI, createBooking, getHotelBookings, getUserBookings } from "../controllers/booking.controller.js";
import express from "express";
import protect from "../middlewares/auth.middleware.js";
// !Start Building
const bookingRouter = express.Router();
// !Post
bookingRouter.post("/check-availability",checkAvailabilityAPI)
bookingRouter.post("/book",protect,createBooking)
// !Get
bookingRouter.get("/user",protect,getUserBookings)
bookingRouter.get("/hotel",protect,getHotelBookings)

export default bookingRouter ;