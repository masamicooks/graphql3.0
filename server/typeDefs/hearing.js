import { gql } from "apollo-server-express";
import { pagination } from "./shared/fields";

export const typeDef = gql`

  type Hearing {
    docs: [HearingDoc!]!
    ${pagination}
  }

  extend type Query {
    houseHearings(input: HearingInput): Hearing!
    senateHearings(input: HearingInput): Hearing!
    houseHearingsMeta: Meta!
    senateHearingsMeta: Meta!
  }
`;
