import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
      savedBooks {
          bookId
          authors
          description
          bookId
          title
          image
          link
      }
    }
  }
`;