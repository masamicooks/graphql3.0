import { gql } from "apollo-server-express";
import { pagination } from "./shared/fields";

export const typeDef = gql`

  type Hearing {
    docs: [HearingDoc!]!
    ${pagination}
  }

  input HearingMetaInput {
    committee: String!
  }

  extend type Query {
    houseHearings(input: HearingInput): Hearing!
    senateHearings(input: HearingInput): Hearing!
    houseHearingsMeta(input: HearingMetaInput): Meta!
    senateHearingsMeta(input: HearingMetaInput): Meta!
  }
`;
