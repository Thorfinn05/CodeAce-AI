
"use client";

import type React from 'react';
import { AuthProvider } from '@/hooks/use-auth'; // Import AuthProvider

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
