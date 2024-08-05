import app from "../app.js";
import colors from "colors";
import { ENVIRONMENT } from "./config/environment.js";
import { connectDB } from "./config/database.js";
import winston from "winston";
import redis from "./integrations/redis.js";
import startCronJob from "../src/crons/cronjob.js";

const port = ENVIRONMENT.APP.PORT; 
const appName = ENVIRONMENT.APP.NAME;
redis.connect(); // Connect to Redis


app.listen(port, async () => {
  new winston.transports.Console(`==> "${appName}" listening on port: ${port}!`.white.bgMagenta);
  await connectDB();
  // Start Cron Job
startCronJob();
});
