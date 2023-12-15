/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBusiness = /* GraphQL */ `
  query GetBusiness($id: ID!) {
    getBusiness(id: $id) {
      id
      name
      about
      phone
      address
      image
      website
      multiposts {
        nextToken
      }
      analytics {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listBusinesses = /* GraphQL */ `
  query ListBusinesses(
    $filter: ModelBusinessFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBusinesses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        about
        phone
        address
        image
        website
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getMultiposts = /* GraphQL */ `
  query GetMultiposts($id: ID!) {
    getMultiposts(id: $id) {
      id
      title
      fb_id
      inst_id
      twit_id
      createdAt
      updatedAt
      businessMultipostsId
      owner
    }
  }
`;
export const listMultiposts = /* GraphQL */ `
  query ListMultiposts(
    $filter: ModelMultipostsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMultiposts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        fb_id
        inst_id
        twit_id
        createdAt
        updatedAt
        businessMultipostsId
        owner
      }
      nextToken
    }
  }
`;
export const getAnalytics = /* GraphQL */ `
  query GetAnalytics($id: ID!) {
    getAnalytics(id: $id) {
      id
      rate_weekFB
      rate_monthFB
      rate_weekIns
      rate_monthIns
      date_generated
      createdAt
      updatedAt
      businessAnalyticsId
      owner
    }
  }
`;
export const listAnalytics = /* GraphQL */ `
  query ListAnalytics(
    $filter: ModelAnalyticsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnalytics(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        rate_weekFB
        rate_monthFB
        rate_weekIns
        rate_monthIns
        date_generated
        createdAt
        updatedAt
        businessAnalyticsId
        owner
      }
      nextToken
    }
  }
`;
