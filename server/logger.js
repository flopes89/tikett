const winston = require("winston");

const formatter = winston.format.printf((info) => {
    let metaObject = "";

    if (info.meta) {
        metaObject = "\r\n" + JSON.stringify(info.meta, null, 2);
    }

    return `${info.timestamp} ${info.level} [${info.label}] ${info.message}${metaObject}`;
});

module.exports = (name) => winston.createLogger({
    level: "silly",
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.timestamp(),
        winston.format.cli(),
        winston.format.label({ label: name }),
        formatter,
    ),
    transports: [new winston.transports.Console({
        label: name,
    })]
});
