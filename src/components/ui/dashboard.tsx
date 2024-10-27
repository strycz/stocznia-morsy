import React from 'react';
import { WeekendTodoListComponent as ParticipantsList } from '../participants-list';

const Dashboard: React.FC = () => {
  return (
    <main className="flex flex-col gap-0 row-start-2 items-center sm:items-start">
      <h2 className="text-4xl font-bold mb-4">Stocznia Sauna + Morsowanie</h2>
      <ParticipantsList />
    </main>
  );
};

export default Dashboard;
