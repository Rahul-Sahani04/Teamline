'use client';

import { MessageList } from '@/components/chat/message-list';
import { MessageInput } from '@/components/chat/message-input';
import { useMessages } from '@/hooks/use-messages';
import { ChatLayout } from '@/components/chat/chat-layout';

export default function ChannelChatPage({
  params: { channel }
}: {
  params: { channel: string }
}) {
  // TODO: Get current user ID from authentication
  const currentUserId = 'temp-user-id';
  
  const {
    messages,
    loadingMessages,
    sendMessage,
    sendingMessage
  } = useMessages(channel);

  return (
    <ChatLayout currentChannelId={channel}>
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
