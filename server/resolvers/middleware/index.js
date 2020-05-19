import { Task } from "../../mongodb/models";
import { skip } from "graphql-resolvers";
import { isValidObjectId } from "../../mongodb/util";
import { logger } from "../../loggers/winston";

export const isAuthenticated = (parent, args, context) => {
  if (!context.email) {
    throw new Error("Access denied. Please login to continue.");
  }
  return skip;
};

export const isTaskOwner = async (parent, args, context) => {
  try {
    if (!isValidObjectId(args.id)) {
      throw new Error("Invalid Task id");
    }
    const task = await Task.findById(args.id);
    if (!task) {
      throw new Error("Task not found");
    } else if (task.user.toString() !== context.loggedInUserId) {
      throw new Error("Not authorized as task owner");
    }
    return skip;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
