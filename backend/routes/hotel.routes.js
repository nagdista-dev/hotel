import express from "express";
import { registerHotel } from "../controllers/hotel.controller.js";
import protect from "../middlewares/auth.middleware.js";
// !Start Building
const hotelRouter = express.Router();

hotelRouter.post("/register", protect, registerHotel);

export default hotelRouter;
