import { gql } from "apollo-server-express";
import { pagination } from "./shared/fields";

export const typeDef = gql`

  type Hearing {
    docs: [HearingDoc!]!
    ${pagination}
  }

  extend type Query {
    houseHearings(input: HearingInput): Hearing!
    houseHearingsMeta(committee: String!): Meta!
    senateHearings(input: HearingInput): Hearing!
    senateHearingsMeta(input: HearingInput): Hearing!
  }
`;
