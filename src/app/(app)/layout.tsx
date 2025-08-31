"use client";

import Link from "next/link";
import {
  Bell,
  Hash,
  Menu,
  MessageSquare,
  Settings,
  Shield,
} from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from 'next/navigation';

const channels = [
  { name: "general", href: "/chat/general", unread: 3 },
  { name: "design-critique", href: "/chat/design-critique", unread: 0 },
  { name: "development", href: "/chat/development", unread: 1 },
  { name: "marketing", href: "/chat/marketing", unread: 0 },
];

const directMessages = [
  { name: "Alice Johnson", href: "/chat/dm/alice-johnson", online: true, unread: 1 },
  { name: "Bob Williams", href: "/chat/dm/bob-williams", online: false, unread: 0 },
  { name: "Charlie Brown", href: "/chat/dm/charlie-brown", online: true, unread: 0 },
  { name: "Diana Prince", href: "/chat/dm/diana-prince", online: true, unread: 2 },
];

function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      <div className="flex h-14 items-center border-b border-primary-foreground/20 px-4 lg:h-[60px] lg:px-6">
        <Link href="/chat/general" className="flex items-center gap-2 font-semibold text-primary-foreground">
          <MessageSquare className="h-6 w-6" />
          <span className="">TeamLine</span>
        </Link>
        <Button variant="outline" size="icon" className="ml-auto h-8 w-8 bg-primary text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <div className="px-2 py-2">
            <h3 className="mb-2 px-3 text-lg font-semibold tracking-tight text-primary-foreground">Channels</h3>
            {channels.map((channel) => (
              <Link
                key={channel.name}
                href={channel.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-primary-foreground/10 ${pathname === channel.href ? 'bg-primary-foreground/20 text-primary-foreground' : 'text-primary-foreground/80'}`}
              >
                <Hash className="h-4 w-4" />
                {channel.name}
                {channel.unread > 0 && (
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    {channel.unread}
                  </Badge>
                )}
              </Link>
            ))}
          </div>
          <div className="px-2 py-2">
            <h3 className="mb-2 px-3 text-lg font-semibold tracking-tight text-primary-foreground">Direct Messages</h3>
            {directMessages.map((dm) => (
              <Link
                key={dm.name}
                href={dm.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-primary-foreground/10 ${pathname === dm.href ? 'bg-primary-foreground/20 text-primary-foreground' : 'text-primary-foreground/80'}`}
              >
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://picsum.photos/seed/${dm.name}/40`} data-ai-hint="people avatar" alt={dm.name} />
                    <AvatarFallback>{dm.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {dm.online && (
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-primary"></span>
                  )}
                </div>
                {dm.name}
                {dm.unread > 0 && (
                   <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    {dm.unread}
                  </Badge>
                )}
              </Link>
            ))}
          </div>
        </nav>
      </div>
      <div className="mt-auto p-4 border-t border-primary-foreground/20">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 w-full justify-start p-2 h-auto hover:bg-primary-foreground/10 text-primary-foreground">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://picsum.photos/seed/me/40" data-ai-hint="people avatar" alt="My Avatar" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-sm font-medium">My Account</p>
                <p className="text-xs text-primary-foreground/70">Online</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56" side="top">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href="/settings" className="flex items-center"><Settings className="mr-2 h-4 w-4" /><span>Settings</span></Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/admin" className="flex items-center"><Shield className="mr-2 h-4 w-4" /><span>Admin</span></Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href="/">Log out</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-primary text-primary-foreground md:flex md:flex-col">
        <SidebarNav />
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col bg-primary text-primary-foreground p-0">
               <SidebarNav />
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* Header Content can go here, e.g. search bar */}
          </div>
        </header>
        <main className="flex flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
