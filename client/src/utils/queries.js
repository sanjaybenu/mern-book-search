import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      email
      savedBooks {
        bookID
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userID: $userID) {
      _id
      username
      email
      savedBooks {
        bookID
        authors
        description
        title
        image
        link
      }
    }
  }
`;
