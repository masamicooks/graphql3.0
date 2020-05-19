import { logger } from "../loggers/winston";
import { combineResolvers } from "graphql-resolvers";
import { Task, User } from "../mongodb/models";
import { isAuthenticated, isTaskOwner } from "./middleware";

export const resolver = {
  // Query level resolver
  Query: {
    tasks: combineResolvers(isAuthenticated, async (parent, args, context) => {
      try {
        const tasks = await Task.find({ user: context.loggedInUserId });
        return tasks;
      } catch (error) {
        throw new Error("Could not find user tasks.");
      }
    }),
    task: combineResolvers(
      isAuthenticated,
      isTaskOwner,
      async (parent, args) => {
        try {
          const task = await Task.findById(args.id);
          return task;
        } catch (error) {
          logger.error(error);
          throw error;
        }
      }
    ),
  },
  Mutation: {
    createTask: combineResolvers(
      isAuthenticated,
      async (parent, { input }, context) => {
        try {
          const user = await User.findById(context.loggedInUserId);
          const task = new Task({ ...input, user: user.id });
          const result = await task.save();
          user.tasks.push(result.id);
          await user.save();
          return task;
        } catch (error) {
          logger.error(error);
          throw error;
        }
      }
    ),
  },
  // Field level resolvers (priority)
  Task: {
    user: combineResolvers(isAuthenticated, async (parent, args, context) => {
      try {
        // let user = User.findById(parent.user);
        // This is not a good solution, because it pings the server once for
        // every task that is returned from the query (if we are hitting the tasks endpoint)
        // Instead, this is where data-loaders comes into play

        // Instead, use a dataloader, which prevents overfetching
        // Pass in the user as a string so that dataloader can eliminate redundant requests
        const user = await context.loaders.user.load(parent.user.toString());
        return user;
      } catch (err) {
        logger.error(err);
        throw err;
      }
    }),
  },
};
