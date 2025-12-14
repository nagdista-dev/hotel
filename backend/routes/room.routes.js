import express from "express";
import upload from "../middlewares/upload.middleware.js";
import protect from "../middlewares/auth.middleware.js";
import {
  createRoom,
  getOwnerRooms,
  getRooms,
  toggleRoomAvailability,
} from "../controllers/room.controller.js";
// !Start Building
const roomRouter = express.Router();
// !Post
roomRouter.post("/", upload.array("images", 4), protect, createRoom);
roomRouter.post("/toggle-availability", protect, toggleRoomAvailability);
// !GET
roomRouter.get("/", getRooms);
roomRouter.get("/owner", protect, getOwnerRooms);

export default roomRouter;
