import { useQuery } from 'convex/react';
import React from 'react';
import { api } from '../../../convex/_generated/api';
import HorizontalDatePicker from './datePicker';
import { WeekendTodoListComponent } from '../WeekendTodoList/weekend-todo-list';

const Dashboard: React.FC = () => {
  const tasks = useQuery(api.tasks.get);

  return (
    <main className="flex flex-col gap-0 row-start-2 items-center sm:items-start">
      {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
      <h2 className="text-4xl font-bold mb-4">Stocznia Sauna + Morsowanie</h2>
      <div className="max-w-[800px] w-full">
        <HorizontalDatePicker />
      </div>
      <WeekendTodoListComponent />
    </main>
  );
};

export default Dashboard;
