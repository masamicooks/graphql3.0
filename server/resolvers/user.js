import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { combineResolvers } from "graphql-resolvers";

import { User, Task } from "../mongodb/models";
import { logger } from "../loggers/winston";
import { isAuthenticated } from "./middleware";

export const resolver = {
  Query: {
    user: combineResolvers(isAuthenticated, async (parent, args, context) => {
      try {
        const user = await User.findOne({ email: context.email });
        if (!user) {
          throw new Error("User not found.");
        }
        return user;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }),
  },
  Mutation: {
    signup: async (parent, { input }) => {
      try {
        let user = await User.findOne({ email: input.email });
        if (user) {
          throw new Error("Email is already in use.");
        }
        let hashedPassword = await bcryptjs.hash(input.password, 12);
        let newUser = new User({ ...input, password: hashedPassword });
        let result = await newUser.save();
        return result;
      } catch (err) {
        logger.error("Error fetching user. ", err);
        throw err; // This will throw the error to GraphQL
      }
    },
    login: async (parent, { input }) => {
      try {
        const user = await User.findOne({ email: input.email });
        if (!user) {
          throw new Error("User not found.");
        }
        const isPasswordValid = bcryptjs.compare(input.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Incorrect password.");
        }
        const token = jwt.sign(
          { email: user.email },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1d" }
        );
        return { token };
      } catch (err) {
        logger.error("Could not sign in. ", err);
        throw err;
      }
    },
  },
  // Field level resolvers (priority) (rather than using .populate() method w/ mongoose)
  User: {
    tasks: combineResolvers(isAuthenticated, async (parent, args, context) => {
      try {
        const tasks = await Task.find({ user: context.loggedInUserId }); // Find tasks by based on logged in user's id from context
        return tasks;
      } catch (err) {
        console.log(err);
        throw new Error("Could not find tasks.");
      }
    }),
  },
};
