'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { Users } from 'lucide-react';

export function UserSwitcher() {
  const { userId, switchUser } = useAuth();

  return (
    <div className="flex items-center gap-2 p-4 border-t">
      <p className="text-sm text-muted-foreground">
        Current User: {userId}
      </p>
      <Button
        variant="outline"
        size="sm"
        onClick={switchUser}
        className="ml-auto"
      >
        <Users className="h-4 w-4 mr-2" />
        Switch User
      </Button>
    </div>
  );
}