import winston, { format } from "winston";
import "winston-daily-rotate-file"; // Attaches new transport to winston.transports

// Define the custom settings for each transport (file, console)
let consoleOptions = {
  level: "info",
  handleExceptions: true,
  stderrLevels: ["error"],
  silent: process.env.SILENT === "true",
  format: format.combine(
    format.colorize(),
    format.align(),
    format.printf((info) => {
      const { level, message } = info;
      return `[${level}]: ${message}`;
    })
  ),
};

let consoleTransport = new winston.transports.Console(consoleOptions);

// Log rotation
const transport = new winston.transports.DailyRotateFile({
  filename: `API_${process.env.NODE_ENV}.log`,
  dirname: `./${
    process.env.NODE_ENV === "production" ? "dist" : "server"
  }/logs`,
  frequency: null, // Rely on date pattern, rotate daily
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "10m",
  maxFiles: "14d",
  format: format.combine(format.timestamp(), format.json()),
});

transport.on("rotate", (oldFileName, newFilename) => {
  console.log(`ROTATING LOGS. OLD: ${oldFileName}  -- NEW: ${newFilename}`);
});

// Handles input from Morgan.
var writer = new winston.createLogger({
  transports: [transport],
});

// Handles logger.XX calls from within app.
export const logger = new winston.createLogger({
  transports: [consoleTransport, transport],
  exitOnError: false, // do not exit on handled exceptions
});

// Recieves message from morganToWinston
logger.stream = {
  write: function (message) {
    writer.info(message);
  },
};

