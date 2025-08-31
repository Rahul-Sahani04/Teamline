'use client';

import { ReactNode } from 'react';
import { ChannelList } from './channel-list';
import { useChannels } from '@/hooks/use-channels';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { UserSwitcher } from '@/components/user-switcher';
import { useAuth } from '@/contexts/auth-context';

interface ChatLayoutProps {
  children: ReactNode;
  currentChannelId?: string;
}

export function ChatLayout({ children, currentChannelId }: ChatLayoutProps) {
  const { channels, loadingChannels } = useChannels();
  const isMobile = useIsMobile();
  const { userId } = useAuth();

  const channelList = (
    <>
      <ChannelList
        channels={channels}
        loading={loadingChannels}
        currentChannelId={currentChannelId}
      />
      <UserSwitcher />
    </>
  );

  if (isMobile) {
    return (
      <div className="flex flex-col h-screen">
        <div className="flex items-center p-4 border-b">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0">
              {channelList}
            </SheetContent>
          </Sheet>
          <h1 className="text-lg font-semibold">TeamLine</h1>
          <p className="text-sm text-muted-foreground ml-auto">
            User: {userId}
          </p>
        </div>
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="w-[280px] border-r flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-lg font-semibold">TeamLine</h1>
          <p className="text-sm text-muted-foreground">
            User: {userId}
          </p>
        </div>
        <div className="flex-1 overflow-hidden">
          {channelList}
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}