'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';
import { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      {/* Toast global */}
      <Toaster richColors position="top-right" />
      {children}
    </SessionProvider>
  );
}
