'use client';

import { WeekendTodoListComponent } from '@/components/participants-list';
import { Button } from '@/components/ui/button';
import { useAuthActions } from '@convex-dev/auth/react';
import { Authenticated, useConvexAuth } from 'convex/react';
import React from 'react';

export default function Dashboard() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  return (
    <main className="pt-8">
      <div className="max-w-4xl mx-auto mt-8 p-4">
        <h2 className="text-4xl font-bold mb-4">Stocznia Sauna + Morsowanie</h2>
        <div className="App">
          {isAuthenticated ? (
            <div>
              <h2>"Logged in"</h2>
            </div>
          ) : (
            'Logged out or still loading'
          )}
        </div>
        <WeekendTodoListComponent />
      </div>
    </main>
  );
}
