import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { X } from 'lucide-react';
import { IconButton } from '@pedro-ui/react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function AppLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setMobileNavOpen(true)} />
      <div className="mx-auto flex max-w-6xl gap-8 px-4 py-8">
        <Sidebar className="sticky top-20 hidden max-h-[calc(100vh-6rem)] md:block" />

        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div
              className="absolute inset-0 bg-overlay/50"
              onClick={() => setMobileNavOpen(false)}
              aria-hidden="true"
            />
            <div className="relative flex w-72 flex-col bg-surface p-4 shadow-xl">
              <IconButton
                aria-label="Close navigation"
                icon={<X />}
                variant="ghost"
                colorScheme="neutral"
                size="sm"
                className="mb-4 self-end"
                onClick={() => setMobileNavOpen(false)}
              />
              <Sidebar />
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1 pb-24">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
