import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

if (!process.env.NEXT_PUBLIC_APPSYNC_API_URL || !process.env.NEXT_PUBLIC_APPSYNC_API_KEY) {
  throw new Error('Required environment variables are missing');
}

// HTTP link for queries and mutations
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_APPSYNC_API_URL,
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_APPSYNC_API_KEY
  }
});

// WebSocket link for subscriptions
const wsLink = typeof window !== 'undefined'
  ? new GraphQLWsLink(
      createClient({
        url: process.env.NEXT_PUBLIC_APPSYNC_API_URL.replace('https://', 'wss://'),
        connectionParams: {
          'x-api-key': process.env.NEXT_PUBLIC_APPSYNC_API_KEY
        }
      })
    )
  : null;

// Split links for different operation types
const splitLink = typeof window !== 'undefined' && wsLink
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink
    )
  : httpLink;

// Create Apollo Client instance
export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    }
  }
});