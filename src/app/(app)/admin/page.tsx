import {
  MoreHorizontal,
  PlusCircle,
  Shield,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const users = [
  { name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active", avatar: "https://picsum.photos/seed/Alice Johnson/40" },
  { name: "Bob Williams", email: "bob@example.com", role: "Member", status: "Active", avatar: "https://picsum.photos/seed/Bob Williams/40" },
  { name: "Charlie Brown", email: "charlie@example.com", role: "Member", status: "Active", avatar: "https://picsum.photos/seed/Charlie Brown/40" },
  { name: "Diana Prince", email: "diana@example.com", role: "Member", status: "Inactive", avatar: "https://picsum.photos/seed/Diana Prince/40" },
  { name: "Ethan Hunt", email: "ethan@example.com", role: "Member", status: "Active", avatar: "https://picsum.photos/seed/Ethan Hunt/40" },
];

const channels = [
    { name: "general", members: 15, visibility: "Public" },
    { name: "design-critique", members: 8, visibility: "Private" },
    { name: "development", members: 12, visibility: "Public" },
    { name: "marketing", members: 5, visibility: "Public" },
    { name: "project-x", members: 4, visibility: "Private" },
];

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold md:text-3xl">Admin Dashboard</h1>
             <Button size="sm" className="gap-1 bg-primary hover:bg-primary/90">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add User
                </span>
            </Button>
        </div>
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">
            <User className="mr-2 h-4 w-4" /> Users
          </TabsTrigger>
          <TabsTrigger value="channels">
            <Shield className="mr-2 h-4 w-4" /> Channels
          </TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                Manage your team members and their roles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Status
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map(user => (
                    <TableRow key={user.email}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                           <Avatar className="h-9 w-9">
                              <AvatarImage src={user.avatar} data-ai-hint="people avatar" alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{user.name}</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                                {user.email}
                            </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'Admin' ? 'destructive' : 'secondary'}>{user.role}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant={user.status === 'Active' ? 'outline' : 'destructive'} className={user.status === 'Active' ? 'text-green-600 border-green-600' : ''}>{user.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Change Role</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-5</strong> of <strong>{users.length}</strong> users
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="channels">
           <Card>
            <CardHeader>
              <CardTitle>Channels</CardTitle>
              <CardDescription>
                Manage chat channels and their members.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Channel</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Visibility
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {channels.map(channel => (
                     <TableRow key={channel.name}>
                        <TableCell>
                            <div className="font-medium">#{channel.name}</div>
                        </TableCell>
                        <TableCell>{channel.members}</TableCell>
                        <TableCell className="hidden md:table-cell">
                            <Badge variant={channel.visibility === 'Public' ? 'secondary' : 'outline'}>{channel.visibility}</Badge>
                        </TableCell>
                        <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Manage Members</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                     </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
             <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-5</strong> of <strong>{channels.length}</strong> channels
              </div>
            </CardFooter>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
