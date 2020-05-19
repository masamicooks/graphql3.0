import mongoose from "mongoose";
import { logger } from "../../loggers/winston";

export const connect = async () => {
  let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
  };

  // Set password options if in development and mongoose logging
  if (process.env.NODE_ENV === "development") {
    options.user = process.env.MONGODB_USER;
    options.pass = process.env.MONGO_PASS;
    mongoose.set("debug", true);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, options);
  } catch (err) {
    logger.error("Could not connect to DB.");
    logger.error(err);
    process.exit(1);
  }

  const db = mongoose.connection;

  db.on("error", (err) => {
    logger.error("Error occured in MongoDB.", err);
  });

  db.on("disconnected", () => {
    logger.error("Connection to MongoDB closed.");
  });

  db.once("open", () => {
    logger.info("Connection to MongoDB opened.");
  });

  return db;
};
