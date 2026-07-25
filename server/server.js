import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDb from "./config/mongodb.js";
import { clerkwebhooks } from "./controllers/webhooks.js";

dotenv.config();

const app = express();

await ConnectDb();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Working");
});

app.post("/clerk", clerkwebhooks);

// ❌ app.listen(...) mat karo

export default app;