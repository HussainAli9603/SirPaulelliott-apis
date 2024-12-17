import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize } = format;

// Log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Daily Rotate File Transport
const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: 'logs/application-%DATE%.log', // Logs will rotate daily
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true, // Compress old logs
  maxSize: '20m', // Max log file size
  maxFiles: '14d', // Keep logs for 14 days
});

export const logger = createLogger({
  level: 'info', // Default log level
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    new transports.Console({ format: combine(colorize(), logFormat) }), // Logs to console with color
    dailyRotateFileTransport, // Logs to daily rotating file
  ],
});

// Log uncaught exceptions and unhandled rejections
logger.exceptions.handle(
  new transports.Console(),
  dailyRotateFileTransport
);

logger.rejections.handle(
  new transports.Console(),
  dailyRotateFileTransport
);

export default logger;