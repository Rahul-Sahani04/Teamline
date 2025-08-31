'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageSquareText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = () => {
    if (email === 'admin@example.com' && password === 'password') {
      router.push('/admin');
    } else {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid email or password.',
      });
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
        <div className="absolute top-8 left-8 flex items-center gap-2 text-lg font-semibold text-primary">
            <MessageSquareText className="h-7 w-7" />
            <span>TeamLine</span>
        </div>
        <Card className="w-full max-w-sm border-2 shadow-xl">
            <CardHeader className="text-center space-y-2">
                <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="flex items-center">
                    <Link href="#" className="ml-auto inline-block text-sm text-primary hover:underline">
                    Forgot password?
                    </Link>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button className="w-full" onClick={handleLogin}>
                    Sign In
                </Button>
            </CardFooter>
        </Card>
    </div>
  );
}
