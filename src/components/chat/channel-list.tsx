import { Channel } from '@/lib/graphql/schema';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Hash, MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface ChannelListProps {
  channels: Channel[];
  loading: boolean;
  currentChannelId?: string;
}

export function ChannelList({ channels, loading, currentChannelId }: ChannelListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Loading channels...</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-100px)]">
      <div className="flex flex-col gap-1 p-2">
        {channels.map((channel) => (
          <Link 
            key={channel.id} 
            href={channel.type === 'DIRECT' 
              ? `/chat/dm/${channel.participants[0]}` 
              : `/chat/${channel.id}`
            }
          >
            <Button
              variant={currentChannelId === channel.id ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
            >
              {channel.type === 'DIRECT' ? (
                <Avatar className="h-6 w-6" />
              ) : (
                <Hash className="h-5 w-5 text-muted-foreground" />
              )}
              <span className="truncate">{channel.name}</span>
              {currentChannelId !== channel.id && (
                <MessageSquare className="h-4 w-4 ml-auto text-muted-foreground" />
              )}
            </Button>
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}