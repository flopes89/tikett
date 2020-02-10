import winston from "winston";

const formatter = winston.format.printf((info) => {
    let metaObject = "";

    if (info.meta) {
        metaObject = "\r\n" + JSON.stringify(info.meta, null, 2);
    }

    let label = info.label;

    if (label.length > 8) {
        label = label.substring(label.length - 8);
    } else {
        label = label.padStart(8, " ");
    }

    return `${info.timestamp} ${label} ${info.level} ${info.message}${metaObject}`;
});

export const createLogger = (name: string) => winston.createLogger({
    level: "silly",
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.timestamp({
            format: "HH:mm:ss.SSS"
        }),
        winston.format.label({ label: name }),
        winston.format.cli(),
        formatter,
    ),
    transports: [new winston.transports.Console()]
});
