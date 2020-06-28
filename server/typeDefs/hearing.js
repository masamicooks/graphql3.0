import { gql } from "apollo-server-express";
import { pagination } from "./shared/fields";

export const typeDef = gql`

  type Hearing {
    docs: [HearingDoc!]!
    ${pagination}
  }

  extend type Query {
    houseHearings(input: HearingInput): Hearing!
    hearingsRange(input: RangeInput): [HearingDoc!]
    senateHearings(input: HearingInput): Hearing!
    senateHearingsRange(input: RangeInput): [HearingDoc!]
    houseHearingsMeta: Meta!
    senateHearingsMeta: Meta!
  }
`;
