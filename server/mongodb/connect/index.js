import mongoose from "mongoose";
import { logger } from "../../loggers/winston";

export const connect = async () => {
  let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    user: process.env.MONGODB_USER,
    pass: process.env.MONGO_PASS,
  };

  if (process.env.NODE_ENV === "development") {
    mongoose.set("debug", true);
  }

  try {
    let connectionString =
      process.env.NODE_ENV === "production"
        ? `mongodb://127.0.0.1:27017/admin`
        : process.env.MONGODB_URI;
    await mongoose.connect(connectionString, options);
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
