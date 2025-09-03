import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks.js";

dotenv.config({ debug: false });

const app = express();
const PORT = process.env.PORT || 5000;

// Database connect
connectDB();

// JSON middleware for normal routes
app.use(express.json());

// Webhook route requires raw body for signature verification
app.post("/webhooks", express.raw({ type: "*/*" }), clerkWebhooks);

// Normal routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Safe Sentry test route
app.get("/debug-sentry", (req, res) => {
  try {
    throw new Error("My first Sentry error!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Sentry test error logged!");
  }
});

// Sentry error handler
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 