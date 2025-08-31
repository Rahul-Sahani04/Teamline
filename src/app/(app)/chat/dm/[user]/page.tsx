'use client';

import { MessageList } from '@/components/chat/message-list';
import { MessageInput } from '@/components/chat/message-input';
import { useMessages } from '@/hooks/use-messages';
import { ChatLayout } from '@/components/chat/chat-layout';

export default function DirectMessageChatPage({
  params: { user }
}: {
  params: { user: string }
}) {
  // TODO: Get current user ID from authentication
  const currentUserId = 'temp-user-id';
  
  // For DMs, we'll use a channel ID format that combines both user IDs
  const channelId = [currentUserId, user].sort().join('_');

  const {
    messages,
    loadingMessages,
    sendMessage,
    sendingMessage
  } = useMessages(channelId);

  return (
    <ChatLayout currentChannelId={channelId}>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-hidden">
          <MessageList
            messages={messages}
            loading={loadingMessages}
            currentUserId={currentUserId}
          />
        </div>
        <MessageInput
          onSendMessage={sendMessage}
          sending={sendingMessage}
        />
      </div>
    </ChatLayout>
  );
}
