import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { JetBrains_Mono as JetBrainsMono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AppProviders from '@/components/layout/AppProviders';
import AppHeader from '@/components/layout/Header'; 
import AppFooter from '@/components/layout/Footer'; 

const jetbrainsMono = JetBrainsMono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '700'], 
});

export const metadata: Metadata = {
  title: 'CodeCoach – AI-Powered Programming Mentor',
  description: 'Write, test, and improve code with AI guidance. Track your programming progress and master new concepts with CodeCoach.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}>
        <AppProviders>
          <AppHeader />
          <main className="flex-grow container mx-auto px-4 py-6">
            {children}
          </main>
          <AppFooter />
          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}
