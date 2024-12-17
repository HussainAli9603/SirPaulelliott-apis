import winston from 'winston';
// Import 'winston-daily-rotate-file' only if local logs are needed.

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Remove or replace this with a Console or Cloud logging transport
    // new winston.transports.DailyRotateFile({
    //   filename: 'logs/%DATE%.log',
    //   datePattern: 'YYYY-MM-DD',
    //   maxFiles: '14d',
    // }),
    new winston.transports.Console() // Logs directly to the Vercel console
  ],
});

export default logger;
