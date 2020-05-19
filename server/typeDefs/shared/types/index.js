import { gql } from "apollo-server-express";

// Hearings
export const HearingDoc = gql`
  type HearingDoc {
    title: String!
    link: String!
    location: String
    time: String
    date: String
    witnesses: [String!]
    type: String
    _id: ID!
  }
`;

export const HearingInput = gql`
  input HearingInput {
    committee: String!
    query: String!
    field: String!
    offset: Int!
  }
`;

// General purpose
export const Meta = gql`
  type Meta {
    fields: [String!]!
  }
`;
