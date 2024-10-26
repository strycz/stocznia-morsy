'use client';

import Dashboard from '@/components/ui/dashboard';
import Footer from '@/components/ui/footer';
import Navbar from '@/components/ui/navbar'; // Assuming we have a Navbar component

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen justify-items-center font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="pt-8">
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}
