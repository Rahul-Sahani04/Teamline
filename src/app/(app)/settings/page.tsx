import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
        <h1 className="text-2xl font-semibold md:text-3xl">Settings</h1>
        <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
            <Card>
            <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                This is how others will see you on the site.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src="https://picsum.photos/seed/me/120" data-ai-hint="people avatar" alt="My Avatar" />
                        <AvatarFallback>ME</AvatarFallback>
                    </Avatar>
                    <Button>Change Avatar</Button>
                </div>

                <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="My Account" />
                </div>
                <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="my.account@example.com" disabled />
                </div>
            </CardContent>
            <CardFooter>
                <Button>Save changes</Button>
            </CardFooter>
            </Card>
        </TabsContent>
        <TabsContent value="notifications">
            <Card>
            <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                Manage how you receive notifications.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label className="text-base" htmlFor="email-notifications">Email Notifications</Label>
                        <CardDescription>
                            Receive emails about mentions and new messages in your absence.
                        </CardDescription>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                     <div className="space-y-0.5">
                        <Label className="text-base" htmlFor="desktop-notifications">Desktop Notifications</Label>
                        <CardDescription>
                            Receive push notifications on your desktop.
                        </CardDescription>
                    </div>
                    <Switch id="desktop-notifications" defaultChecked />
                </div>
                 <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                     <div className="space-y-0.5">
                        <Label className="text-base" htmlFor="notification-sound">Notification Sound</Label>
                        <CardDescription>
                            Play a sound for new messages.
                        </CardDescription>
                    </div>
                    <Switch id="notification-sound" />
                </div>
            </CardContent>
             <CardFooter>
                <Button>Save preferences</Button>
            </CardFooter>
            </Card>
        </TabsContent>
        </Tabs>
    </div>
  );
}
