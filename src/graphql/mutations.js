/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBusiness = /* GraphQL */ `
  mutation CreateBusiness(
    $input: CreateBusinessInput!
    $condition: ModelBusinessConditionInput
  ) {
    createBusiness(input: $input, condition: $condition) {
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
export const updateBusiness = /* GraphQL */ `
  mutation UpdateBusiness(
    $input: UpdateBusinessInput!
    $condition: ModelBusinessConditionInput
  ) {
    updateBusiness(input: $input, condition: $condition) {
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
export const deleteBusiness = /* GraphQL */ `
  mutation DeleteBusiness(
    $input: DeleteBusinessInput!
    $condition: ModelBusinessConditionInput
  ) {
    deleteBusiness(input: $input, condition: $condition) {
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
export const createMultiposts = /* GraphQL */ `
  mutation CreateMultiposts(
    $input: CreateMultipostsInput!
    $condition: ModelMultipostsConditionInput
  ) {
    createMultiposts(input: $input, condition: $condition) {
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
export const updateMultiposts = /* GraphQL */ `
  mutation UpdateMultiposts(
    $input: UpdateMultipostsInput!
    $condition: ModelMultipostsConditionInput
  ) {
    updateMultiposts(input: $input, condition: $condition) {
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
export const deleteMultiposts = /* GraphQL */ `
  mutation DeleteMultiposts(
    $input: DeleteMultipostsInput!
    $condition: ModelMultipostsConditionInput
  ) {
    deleteMultiposts(input: $input, condition: $condition) {
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
export const createAnalytics = /* GraphQL */ `
  mutation CreateAnalytics(
    $input: CreateAnalyticsInput!
    $condition: ModelAnalyticsConditionInput
  ) {
    createAnalytics(input: $input, condition: $condition) {
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
export const updateAnalytics = /* GraphQL */ `
  mutation UpdateAnalytics(
    $input: UpdateAnalyticsInput!
    $condition: ModelAnalyticsConditionInput
  ) {
    updateAnalytics(input: $input, condition: $condition) {
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
export const deleteAnalytics = /* GraphQL */ `
  mutation DeleteAnalytics(
    $input: DeleteAnalyticsInput!
    $condition: ModelAnalyticsConditionInput
  ) {
    deleteAnalytics(input: $input, condition: $condition) {
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
