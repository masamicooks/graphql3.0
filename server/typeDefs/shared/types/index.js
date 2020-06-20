import { gql } from "apollo-server-express";

// Hearings
export const HearingDoc = gql`
  type HearingDoc {
    title: String!
    link: String!
    location: String
    time: String
    date: String
    committee: String
    text: String
    _id: ID!
  }
`;

export const HearingInput = gql`
  input HearingInput {
    committee: String # Null returns all committees
    query: String!
    field: String!
    offset: Int!
    sortField: String!
    sortDirection: Int!
  }
`;

export const RangeInput = gql`
  input RangeInput {
    start: Date
    end: Date
  }
`;

// General purpose
export const Meta = gql`
  type Meta {
    fields: [String!]!
  }
`;
