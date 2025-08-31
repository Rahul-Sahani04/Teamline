import { Message } from '@/lib/graphql/schema';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';

interface MessageListProps {
  messages: Message[];
  loading: boolean;
  currentUserId: string;
}

export function MessageList({ messages, loading, currentUserId }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Loading messages...</p>
      </div>
    );
  }

  return (
    <ScrollArea ref={scrollRef} className="h-[calc(100vh-200px)]">
      <div className="flex flex-col gap-4 p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-2 ${
              message.senderId === currentUserId ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <Avatar className="h-8 w-8" />
            <Card
              className={`p-3 max-w-[70%] ${
                message.senderId === currentUserId
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              <p className="text-sm break-words">{message.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </Card>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}