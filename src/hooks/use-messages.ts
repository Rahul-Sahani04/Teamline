import { ApolloCache, OperationVariables } from '@apollo/client/core';
import { useMutation, useQuery, useSubscription } from '@apollo/client/react';
import { useCallback } from 'react';
import {
  GET_MESSAGES,
  SEND_MESSAGE,
  ON_MESSAGE_SENT,
  GetMessagesQuery,
  SendMessageMutation,
  MessageSubscription,
  Message
} from '@/lib/graphql/schema';
import { apolloClient } from '@/lib/apollo-client';

export function useMessages(channelId: string) {
  // Query messages
  const { data, loading: loadingMessages, error: messagesError } = useQuery<GetMessagesQuery>(
    GET_MESSAGES,
    {
      variables: { channelId },
      fetchPolicy: 'cache-and-network'
    }
  );

  // Send message mutation
  const [sendMessageMutation, { loading: sendingMessage }] = useMutation<SendMessageMutation>(
    SEND_MESSAGE,
    {
      update: (cache, { data }) => {
        if (!data?.sendMessage) return;

        // Update cache with new message
        const existing = cache.readQuery<GetMessagesQuery, OperationVariables>({
          query: GET_MESSAGES,
          variables: { channelId }
        });

        if (existing) {
          cache.writeQuery<GetMessagesQuery>({
            query: GET_MESSAGES,
            variables: { channelId },
            data: {
              getMessages: [...existing.getMessages, data.sendMessage]
            }
          });
        }
      }
    }
  );

  // Message subscription
  useSubscription<MessageSubscription>(
    ON_MESSAGE_SENT,
    {
      variables: { channelId },
      onData: ({ data: subscriptionData }) => {
        const message = subscriptionData?.data?.onMessageSent;
        if (!message) return;

        // Update cache with subscribed message
        const existing = apolloClient.cache.readQuery<GetMessagesQuery, OperationVariables>({
          query: GET_MESSAGES,
          variables: { channelId }
        });

        if (existing) {
          apolloClient.cache.writeQuery<GetMessagesQuery>({
            query: GET_MESSAGES,
            variables: { channelId },
            data: {
              getMessages: [...existing.getMessages, message]
            }
          });
        }
      }
    }
  );

  // Send message handler
  const sendMessage = useCallback(
    async (content: string) => {
      try {
        await sendMessageMutation({
          variables: {
            channelId,
            content
          }
        });
        return true;
      } catch (error) {
        console.error('Error sending message:', error);
        return false;
      }
    },
    [channelId, sendMessageMutation]
  );

  return {
    messages: data?.getMessages || [],
    loadingMessages,
    messagesError,
    sendMessage,
    sendingMessage
  };
}