import { gql } from "apollo-server-express";

import { typeDef as taskType } from "./task";
import { typeDef as userType } from "./user";
import { typeDef as hearingType } from "./hearing";

// Shared types
import { HearingDoc, HearingInput, RangeInput, Meta } from "./shared/types";

const typeDefs = gql`
  # Types reused across multiple components
  ${HearingDoc}
  ${HearingInput}
  ${RangeInput}
  ${Meta}

  scalar Date

  type Query {
    _: String!
  }

  type Mutation {
    _: String!
  }
`;

export default [typeDefs, taskType, userType, hearingType];
