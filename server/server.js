import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDb from "./config/mongodb.js";
import { clerkwebhooks } from "./controllers/webhooks.js";

dotenv.config();

const app = express();

try {
  await ConnectDb();
  console.log("Database Connected Successfully");
} catch (err) {
  console.error("Database Connection Failed:", err);
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Working");
});

app.post("/clerk", clerkwebhooks);

export default app;