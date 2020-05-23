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

// Loggers
import { morganToWinston } from "./loggers/morgan";
app.use(morganToWinston);

// Setup path for apollo server
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

// Apply middleware on specific api route
apolloServer.applyMiddleware({ app, path: process.env.GRAPHQL_ENDPOINT });

// Other middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

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
