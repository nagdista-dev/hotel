import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";

// !Start Building
await connectDB();
const app = express();
// !Middlewares
app.use(cors());
app.use(clerkMiddleware());
app.use(express.json());

const port = process.env.PORT || 3001;
app.use("/api/clerk", clerkWebhooks);

app.get("/", (_, res) => {
  res.send("API is Working");
});

app.listen(port, () => {
  console.log("Server Start : ", port);
});
