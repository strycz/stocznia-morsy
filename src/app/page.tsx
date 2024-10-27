'use client';

import { WeekendTodoListComponent } from '@/components/participants-list';
import React from 'react';

export default function Dashboard() {
  return (
    <main className="pt-8">
      <div className="max-w-4xl mx-auto mt-8 p-4">
        <h2 className="text-4xl font-bold mb-4">Stocznia Sauna + Morsowanie</h2>
        <WeekendTodoListComponent />
      </div>
    </main>
  );
}
