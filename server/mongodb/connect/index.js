import mongoose from "mongoose";
import { logger } from "../../loggers/winston";

export const connect = async () => {
  try {
    // Set password options if in development and mongoose logging
    if (process.env.NODE_ENV === "development") {
      let options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: true,
        user: process.env.MONGODB_USER,
        pass: process.env.MONGO_PASS,
      };
      mongoose.set("debug", true);
      await mongoose.connect(process.env.MONGODB_URI, options);
    }

    // Otherwise connect to cloud string
    if (process.env.NODE_ENV === "production") {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    //await mongoose.connect(process.env.MONGODB_URI, options);
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
