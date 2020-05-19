import { gql } from "apollo-server-express";

export const typeDef = gql`
  type Task {
    id: ID!
    name: String!
    completed: Boolean!
    user: User!
  }

  input CreateTaskInput {
    name: String!
    completed: Boolean!
  }

  extend type Mutation {
    createTask(input: CreateTaskInput!): Task!
  }

  extend type Query {
    tasks: [Task!]!
    task(id: ID!): Task
  }
`;
