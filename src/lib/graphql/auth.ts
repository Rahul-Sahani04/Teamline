import { gql } from '@apollo/client';

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    teamId: string;
  };
}

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
        teamId
      }
    }
  }
`;

export const VERIFY_TOKEN = gql`
  query VerifyToken {
    verifyToken {
      id
      username
      email
      teamId
    }
  }
`;