"use client";

import type React from 'react';

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  // If you need client-side providers (e.g., React Query, ThemeProvider for dark mode toggle), add them here.
  // For now, it's a simple passthrough.
  return <>{children}</>;
}
