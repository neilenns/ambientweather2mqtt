// A lot of this was inspired by https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/
import winston from "winston";
import env from "./env.js";

// This way of extending the logger to support a .trace() function
// comes from https://github.com/winstonjs/winston/issues/1523#issuecomment-436365549
export interface CustomLevelsLogger extends winston.Logger {
  trace: winston.LeveledLogMethod;
}

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
  trace: 5,
};

const level = () => {
  if (env().LOG_LEVEL) {
    return env().LOG_LEVEL;
  }

  return env().NODE_ENV === "development" ? "debug" : "warn";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
  trace: "grey",
};

winston.addColors(colors);

const consoleFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf((info) => {
    const message = `[${info.service}] ${info.message}`;
    // This method of applying colour comes from https://stackoverflow.com/a/63104828
    return `${info.timestamp} ${winston.format.colorize().colorize(info.level, message)}`;
  }),
);

const Logger = winston.createLogger({
  level: level(),
  levels,
  transports: [new winston.transports.Console({ format: consoleFormat })],
}) as CustomLevelsLogger;

export default Logger;
