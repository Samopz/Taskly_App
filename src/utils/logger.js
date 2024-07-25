import winston from "winston";

const options = {
  file: {
    level: "info",
    filename: "./logs/app.log",
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ level, message, timestamp }) => {
      const logEntry = `${timestamp} ${level}: ${message}`;
      return logEntry.replace(/\u001b\[0m/g, "");
    })
  ),
  transports: [
    new winston.transports.Console(options.console),
    new winston.transports.File(options.file),
    new winston.transports.File({ filename: "logs/info.log", level: "info" }),
  ],
  exitOnError: false,
});

export const stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};
