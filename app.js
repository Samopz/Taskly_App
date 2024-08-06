import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import morgan from "morgan";
import cors from "cors";
// import pkg from "express-openid-connect";
import path from "path";
import { fileURLToPath } from "url";
import { logger } from "./src/utils/logger.js";
import { httpLogger } from "./src/utils/httpLogger.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
// import auth0Middleware from "./src/middlewares/auth0/auth0.js";

// Construct __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default app configurations
const app = express();
app.use(httpLogger);

// Auth0 Middleware
// app.use(auth0Middleware);
// const { requiresAuth } = pkg;


// Defaults to in-memory store.
// You can use redis or any other store.
const limiter = rateLimit({
  windowMs: 0.5 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: true, // Disable the `X-RateLimit-*` headers
});

// Adds security middleware
app.use(helmet());

// middlewares
app.use(express.static(path.join(__dirname, "./my-frontend/public"))); // serve static files
app.use(cors()); // enable cors
app.use(express.json()); // parse application/json
app.use(bodyParser.json()); // parse application/json
app.use(passport.initialize()); // initialize passport

// Apply the rate limiting middleware to all requests
app.use(limiter);
app.use(morgan("dev")); // log requests to the console

// Load routes
(async () => {
  try {
    const taskRoutes = await import("./src/routes/taskRoutes.js");
    app.use("/api/v1/task", taskRoutes.default);
  } catch (error) {
    console.error("Failed to load task routes:", error);
  }
})();

(async () => {
  try {
    const taskStatusRoutes = await import("./src/routes/taskRoutes.js");
    app.use("/api/v1/taskStatus", taskStatusRoutes.default);
  } catch (error) {
    console.error("Failed to load task status routes:", error);
  }
})();

(async () => {
  try {
    const userRoutes = await import("./src/routes/userRoutes.js");
    app.use("/api/v1/user", userRoutes.default);
  } catch (error) {
    console.error("Failed to load user routes:", error);
  }
})();

(async () => {
  try {
    const authRoutes = await import("./src/routes/authRoutes.js");
    app.use("/api/v1/auth", authRoutes.default);
  } catch (error) {
    console.error("Failed to load auth routes:", error);
  }
})();

(async () => {
  try {
    const boardRoutes = await import("./src/routes/boardRoutes.js");
    app.use("/api/v1/board", boardRoutes.default);
  } catch (error) {
    console.error("Failed to load board routes:", error);
  }
})();

(async () => {
  try {
    const orgRoutes = await import("./src/routes/orgRoutes.js");
    app.use("/api/v1/org", orgRoutes.default);
  } catch (error) {
    console.error("Failed to load org routes:", error);
  }
})();

(async () => {
  try {
    const invitRoutes = await import("./src/routes/invitRoutes.js");
    app.use("/api/v1/invite", invitRoutes.default);
  } catch (error) {
    console.error("Failed to load invitation routes:", error);
  }
})();

(async () => {
  try {
    const reportRoutes = await import("./src/routes/reportRoutes.js")
    app.use("/api/v1/report", reportRoutes.default)
  } catch (error) {
    console.error("Failed to load reports routes:", error)
  }
})();

app.get("/", (req, res) => {
  logger.info("Welcome to Taskly!");
  return res
    .status(200)
    .send("<h1> Welcome to Taskly Capstone Project @ AltSchool Africa! </h1>");
});

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "./my-frontend/public/index.html"));
});


// // import/catch all routes
// app.all("*", (req, res) => {
//   logger.error("Route not found");
//   res.status(404).json({ message: "Route not found" });
// });


export default app;
