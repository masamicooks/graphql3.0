import morgan from "morgan";
import chalk from "chalk";
import { logger } from "../winston";

morgan.token("body", function (req, res) {
  return "body:".concat(JSON.stringify(req.body).replace(/\\n/g, ""));
});

// Send colorized errors to console...
export const morganConsoleErr = morgan(
  (tokens, req, res) => {
    return [
      chalk.bold(tokens.method(req, res)),
      tokens["remote-addr"](req, res),
      tokens["remote-user"](req, res),
      chalk.yellow(tokens.url(req, res)),
      chalk.red(tokens.status(req, res)),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      chalk.grey(tokens["body"](req, res)),
    ].join(" ");
  },
  {
    skip: function (req, res) {
      return res.statusCode < 400 || process.env.SILENT === "true";
    },
    stream: process.stderr,
  }
);

// Send colorized res to console
export const morganConsoleRes = morgan(
  (tokens, req, res) => {
    return [
      chalk.bold(tokens.method(req, res)),
      tokens["remote-addr"](req, res),
      tokens["remote-user"](req, res),
      chalk.yellow(tokens.url(req, res)),
      chalk.green(tokens.status(req, res)),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      chalk.grey(tokens["body"](req, res)),
    ].join(" ");
  },
  {
    skip: function (req, res) {
      return (
        res.statusCode >= 400 ||
        process.env.SILENT === "true" ||
        (req.body.operationName === "IntrospectionQuery" &&
          process.env.NODE_ENV === "development")
      );
    },
    stream: process.stdout,
  }
);

// Send non-colorized to winston stream for writing (bypassing console)...
export const morganToWinston = morgan(
  (tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens["remote-addr"](req, res),
      tokens["remote-user"](req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens["body"](req, res),
    ].join(" ");
  },
  {
    skip: function (req, res) {
      return (
        req.body.operationName === "IntrospectionQuery" &&
        process.env.NODE_ENV === "development"
      );
    },
    stream: logger.stream,
  }
);
