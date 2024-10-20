'use client';

import Dashboard from '@/components/ui/dashboard';
import Footer from '@/components/ui/footer';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <Dashboard />
      <Footer />
    </div>
  );
}
