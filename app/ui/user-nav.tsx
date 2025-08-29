'use client';

import { signOut, useSession } from 'next-auth/react';
import { Button } from './button';

export default function UserNav() {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="flex items-center gap-4">
      <div className="text-sm text-gray-700">
        Welcome, {session?.user?.name || session?.user?.email}
      </div>
      <Button onClick={handleSignOut} variant="outline" size="sm">
        Sign Out
      </Button>
    </div>
  );
}
