import { gql } from "apollo-server-express";

import { typeDef as taskType } from "./task";
import { typeDef as userType } from "./user";

const typeDefs = gql`
  scalar Date

  type Query {
    _: String!
  }

  type Mutation {
    _: String!
  }
`;

export default [typeDefs, taskType, userType];
