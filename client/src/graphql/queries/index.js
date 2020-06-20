import gql from "graphql-tag";

export const HOUSE_CAL_DATA = gql`
  query Data($start: Date, $end: Date) {
    data: houseHearingsRange(input: { start: $start, end: $end }) {
      title
      committee
      link
      date
      time
      _id
    }
  }
`;

export const HOUSE_TABLE_DATA = gql`
  query Data(
    $committee: String
    $field: String!
    $query: String!
    $offset: Int!
    $sortField: String!
    $sortDirection: Int!
  ) {
    data: houseHearings(
      input: {
        committee: $committee
        field: $field
        query: $query
        offset: $offset
        sortField: $sortField
        sortDirection: $sortDirection
      }
    ) {
      docs {
        title
        link
        location
        date
        time
        committee
        text
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
    meta: houseHearingsMeta {
      fields
    }
  }
`;

export const SENATE_TABLE_DATA = gql`
  query Data(
    $committee: String
    $field: String!
    $query: String!
    $offset: Int!
    $sortField: String!
    $sortDirection: Int!
  ) {
    data: senateHearings(
      input: {
        committee: $committee
        field: $field
        query: $query
        offset: $offset
        sortField: $sortField
        sortDirection: $sortDirection
      }
    ) {
      docs {
        title
        link
        location
        date
        time
        committee
        text
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
    meta: senateHearingsMeta {
      fields
    }
  }
`;
