import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";

import ConnectDb from "./config/mongodb.js";
import { clerkwebhooks } from "./controllers/webhooks.js";
import educatorRouter from "./routes/educatorRoutes.js";
import connectCloudinary from "./config/cloudinary.js";

dotenv.config();

const app = express();


await connectCloudinary()

// Database Connection
await ConnectDb()


// Middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());


// Routes
app.get("/", (req, res) => {
  res.send("API Working");
});

app.post("/clerk", clerkwebhooks);

app.use("/api/educator", educatorRouter);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});