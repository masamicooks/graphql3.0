import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import { ApolloServer } from "apollo-server-express";

import dataLoader from "dataloader";
import { batchUsers } from "./loaders";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import { verifyUser } from "./helpers/context";
import { logger } from "./loggers/winston";

// App
const app = express();
app.use(bodyParser.json());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    await verifyUser(req); // Context passed to resolvers for authentication.
    return {
      email: req.email,
      loggedInUserId: req.loggedInUserId,
      loaders: {
        user: new dataLoader((keys) => batchUsers(keys)),
      },
    };
  },
});

apolloServer.applyMiddleware({ app, path: process.env.GRAPHQL_ENDPOINT });

// Loggers
import {
  morganConsoleErr,
  morganConsoleRes,
  morganToWinston,
} from "./loggers/morgan";

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

// Colorize morgan status-codes and print to console, write all requests  with winston's stream.
app.use(morganConsoleErr);
app.use(morganConsoleRes);
app.use(morganToWinston);

// If in production
const projectPath = `${process.env.PROJECT_PATH}/current/client/build`;
if (process.env.NODE_ENV === "production") {
  logger.info(`Launching assets from ${projectPath}`);
  app.use(express.static(projectPath));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(projectPath, "index.html"));
  });
}

export { app };
