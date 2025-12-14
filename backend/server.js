import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.controller.js";
import userRouter from "./routes/user.routes.js";
import hotelRouter from "./routes/hotel.routes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/room.routes.js";
import bookingRouter from "./routes/booking.routes.js";

// !Start Building
await connectDB();
await connectCloudinary();
// !Variables
const app = express();
const port = process.env.PORT || 3001;
// !Middlewares
app.use(cors());
app.use(clerkMiddleware());
app.use(express.json());
// !Test API
app.get("/", (_, res) => {
  res.send("API is Working");
});
// !Webhook Router
app.use("/api/clerk", clerkWebhooks);
// !User Router
app.use("/api/user", userRouter);
// !Hotel Router
app.use("/api/hotels", hotelRouter);
// !Room Router
app.use("/api/rooms", roomRouter);
// !Booking Router
app.use("/api/bookings", bookingRouter);

// !Start Server
app.listen(port, () => {
  console.log("Server Start : ", port);
});
