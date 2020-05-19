import { GraphQLDateTime } from "graphql-iso-date";

export const resolver = {
  Date: GraphQLDateTime, // Adding a custom resolver for the date scalar type
};
