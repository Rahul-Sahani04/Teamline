import { ApolloCache, OperationVariables } from '@apollo/client/core';
import { useMutation, useQuery, useSubscription } from '@apollo/client/react';
import { useCallback } from 'react';
import {
  GET_CHANNELS,
  CREATE_CHANNEL,
  ON_CHANNEL_CREATED,
  GetChannelsQuery,
  CreateChannelMutation,
  ChannelSubscription,
} from '@/lib/graphql/schema';
import { apolloClient } from '@/lib/apollo-client';

export function useChannels() {
  // Query channels
  const { data, loading: loadingChannels, error: channelsError } = useQuery<GetChannelsQuery>(
    GET_CHANNELS,
    {
      fetchPolicy: 'cache-and-network'
    }
  );

  // Create channel mutation
  const [createChannelMutation, { loading: creatingChannel }] = useMutation<CreateChannelMutation>(
    CREATE_CHANNEL,
    {
      update: (cache, { data }) => {
        if (!data?.createChannel) return;

        // Update cache with new channel
        const existing = cache.readQuery<GetChannelsQuery, OperationVariables>({
          query: GET_CHANNELS
        });

        if (existing) {
          cache.writeQuery<GetChannelsQuery>({
            query: GET_CHANNELS,
            data: {
              getChannels: [...existing.getChannels, data.createChannel]
            }
          });
        }
      }
    }
  );

  // Channel subscription
  useSubscription<ChannelSubscription>(
    ON_CHANNEL_CREATED,
    {
      onData: ({ data: subscriptionData }) => {
        const channel = subscriptionData?.data?.onChannelCreated;
        if (!channel) return;

        // Update cache with subscribed channel
        const existing = apolloClient.cache.readQuery<GetChannelsQuery, OperationVariables>({
          query: GET_CHANNELS
        });

        if (existing) {
          apolloClient.cache.writeQuery<GetChannelsQuery>({
            query: GET_CHANNELS,
            data: {
              getChannels: [...existing.getChannels, channel]
            }
          });
        }
      }
    }
  );

  // Create channel handler
  const createChannel = useCallback(
    async (name: string, type: 'DIRECT' | 'GROUP', participants: string[]) => {
      try {
        await createChannelMutation({
          variables: {
            name,
            type,
            participants
          }
        });
        return true;
      } catch (error) {
        console.error('Error creating channel:', error);
        return false;
      }
    },
    [createChannelMutation]
  );

  return {
    channels: data?.getChannels || [],
    loadingChannels,
    channelsError,
    createChannel,
    creatingChannel
  };
}