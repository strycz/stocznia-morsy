'use client';

import Dashboard from '@/components/ui/dashboard';

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen justify-items-center font-[family-name:var(--font-geist-sans)]">
      <main className="pt-8">
        <Dashboard />
      </main>
    </div>
  );
}
