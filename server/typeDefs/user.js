import { gql } from "apollo-server-express";

export const typeDef = gql`
  type User {
    id: ID!
    tasks: [Task!]
    email: String!
    createdAt: Date!
    updatedAt: Date!
  }

  input SignupInput {
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Token {
    token: String!
  }

  extend type Mutation {
    signup(input: SignupInput!): User
    login(input: LoginInput!): Token
  }

  extend type Query {
    user: User
  }
`;
