'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  userId: string;
  switchUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState(process.env.NEXT_PUBLIC_TEST_USER1_ID || 'user1');

  const switchUser = () => {
    setUserId(currentId => 
      currentId === process.env.NEXT_PUBLIC_TEST_USER1_ID || currentId === 'user1'
        ? process.env.NEXT_PUBLIC_TEST_USER2_ID || 'user2'
        : process.env.NEXT_PUBLIC_TEST_USER1_ID || 'user1'
    );
  };

  return (
    <AuthContext.Provider value={{ userId, switchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}