import gql from "graphql-tag";

export const HOUSE_TABLE_DATA = gql`
  query Data(
    $committee: String!
    $field: String!
    $query: String!
    $offset: Int!
  ) {
    data: houseHearings(
      input: {
        committee: $committee
        field: $field
        query: $query
        offset: $offset
      }
    ) {
      docs {
        title
        link
        location
        time
        date
        witnesses
        type
        _id
      }
      totalDocs
      limit
      totalPages
      page
      offset
      pagingCounter
      hasPrevPage
      hasNextPage
      prevPage
      nextPage
    }
    meta: houseHearingsMeta(committee: $committee) {
      fields
    }
  }
`;

export const SENATE_TABLE_DATA = gql`
  query Data(
    $committee: String!
    $field: String!
    $query: String!
    $offset: Int!
  ) {
    data: senateHearings(
      input: {
        committee: $committee
        field: $field
        query: $query
        offset: $offset
      }
    ) {
      docs {
        title
        link
        location
        time
        date
        type
        witnesses
        type
        _id
      }
      totalDocs
      limit
      totalPages
      page
      offset
      pagingCounter
      hasPrevPage
      hasNextPage
      prevPage
      nextPage
    }
    meta: senateHearingsMeta(committee: $committee) {
      fields
    }
  }
`;
