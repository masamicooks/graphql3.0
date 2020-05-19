export const task = `
  id: ID!
  name: String!
  completed: Boolean!
  user: User!
`;

export const pagination = `
  totalDocs: Int!
  limit: Int!
  totalPages: Int!
  page: Int!
  offset: Int!
  pagingCounter: Int!
  hasPrevPage: Boolean!
  hasNextPage: Boolean!
  prevPage: Int
  nextPage: Int
`;
