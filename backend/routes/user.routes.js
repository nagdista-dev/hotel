import express from "express";
import { getUserData, storeRecentSearchedCities } from "../controllers/user.controller.js";
import protect from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.get("/",protect, getUserData);
userRouter.post("/store-recent-search",protect, storeRecentSearchedCities);

export default userRouter;
