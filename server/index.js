import dotenv from "dotenv";
dotenv.config({ path: `./envs/.env.${process.env.NODE_ENV}` });

import { logger } from "./loggers/winston";
import { connect } from "./mongodb/connect";
import { app } from "./app";

(async () => {
  await connect();
  logger.info(`Databases connected.`);

  try {
    app.listen(process.env.PORT);
    logger.info(
      `Running app in ${process.env.NODE_ENV} on port ${process.env.PORT}`
    );
    logger.info(`GraphQL server listening at ${process.env.GRAPHQL_ENDPOINT}`);
  } catch (err) {
    logger.error("Could not run application", err);
  }
})();
