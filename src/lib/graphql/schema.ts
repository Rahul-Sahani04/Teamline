import { TypedDocumentNode, gql } from '@apollo/client';

export interface Message {
  id: string;
  channelId: string;
  senderId: string;
  content: string;
  timestamp: string;
}

export interface Channel {
  id: string;
  name: string;
  type: 'DIRECT' | 'GROUP';
  participants: string[];
}

export const GET_MESSAGES = gql`
  query GetMessages($channelId: String!, $limit: Int) {
    getMessages(channelId: $channelId, limit: $limit) {
      id
      channelId
      senderId
      content
      timestamp
    }
  }
`;

export const GET_CHANNELS = gql`
  query GetChannels {
    getChannels {
      id
      name
      type
      participants
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($channelId: String!, $content: String!) {
    sendMessage(channelId: $channelId, content: $content) {
      id
      channelId
      senderId
      content
      timestamp
    }
  }
`;

export const CREATE_CHANNEL = gql`
  mutation CreateChannel($name: String!, $type: ChannelType!, $participants: [String!]!) {
    createChannel(name: $name, type: $type, participants: $participants) {
      id
      name
      type
      participants
    }
  }
`;

export const ON_MESSAGE_SENT = gql`
  subscription OnMessageSent($channelId: String!) {
    onMessageSent(channelId: $channelId) {
      id
      channelId
      senderId
      content
      timestamp
    }
  }
`;

export const ON_CHANNEL_CREATED = gql`
  subscription OnChannelCreated {
    onChannelCreated {
      id
      name
      type
      participants
    }
  }
`;

export interface GetMessagesQuery {
  getMessages: Message[];
}

export interface GetChannelsQuery {
  getChannels: Channel[];
}

export interface SendMessageMutation {
  sendMessage: Message;
}

export interface CreateChannelMutation {
  createChannel: Channel;
}

export interface MessageSubscription {
  onMessageSent: Message;
}

export interface ChannelSubscription {
  onChannelCreated: Channel;
}

export type GetMessagesQueryDocument = TypedDocumentNode<GetMessagesQuery, { channelId: string; limit?: number }>;
export type GetChannelsQueryDocument = TypedDocumentNode<GetChannelsQuery, never>;
export type SendMessageMutationDocument = TypedDocumentNode<SendMessageMutation, { channelId: string; content: string }>;
export type CreateChannelMutationDocument = TypedDocumentNode<CreateChannelMutation, { name: string; type: 'DIRECT' | 'GROUP'; participants: string[] }>;
export type MessageSubscriptionDocument = TypedDocumentNode<MessageSubscription, { channelId: string }>;
export type ChannelSubscriptionDocument = TypedDocumentNode<ChannelSubscription, never>;