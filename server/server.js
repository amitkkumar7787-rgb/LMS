import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDb from "./config/mongodb.js";
import { clerkwebhooks } from "./controllers/webhooks.js"; // <-- small w

dotenv.config();

const app = express();

// Database Connection
await ConnectDb();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("API Working");
});

app.post("/clerk", clerkWebhooks);

// Port
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});