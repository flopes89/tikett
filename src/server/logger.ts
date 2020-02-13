import winston from "winston";

export const createLogger = (name: string) => winston.createLogger({
    level: process.env.LOGLEVEL || "info",
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.align(),
        winston.format.label({ label: name, message: true }),
        winston.format.cli(),
        winston.format.simple(),
    ),
    transports: [new winston.transports.Console()]
});
