'use client';

import { useState, FormEvent, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import HorizontalDatePicker from '../ui/datePicker';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Id } from '../../../convex/_generated/dataModel';

type TodoItem = {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  completed: boolean;
};

type DayTodos = {
  [key: string]: TodoItem[];
};

type IDay = {
  date: Date;
  dayId: Id<'days'>;
};

const generateWeekendDates = (count: number): Date[] => {
  const weekends: Date[] = [];
  const currentDate = new Date();

  while (weekends.length < count) {
    if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
      weekends.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekends;
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('pl-PL', {
    month: 'long',
    day: '2-digit',
  });
};

export function WeekendTodoListComponent() {
  const [newMessage, setNewMessage] = useState('');
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [selectedDayId, setSelectedDayId] = useState<Id<'days'>>();

  const addParticipant = useMutation(api.participants.add);
  const getOrCreateDay = useMutation(api.days.getOrCreate);
  const participants = useQuery(api.participants.get, {
    byDayId: selectedDayId,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      await addParticipant({ name: newMessage, dayId: selectedDayId });
      setNewMessage('');
    }
  };

  const dateSelectedHandler = async (date: Date) => {
    try {
      const dayId = await getOrCreateDay({ date: date.toISOString() });
      console.log('Day created or retrieved:', dayId);
      setSelectedDay(date);
      setSelectedDayId(dayId);
    } catch (error) {
      console.error('Error getting or creating day:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <div className="max-w-[800px] w-full">
        <HorizontalDatePicker dateSelectedHandler={dateSelectedHandler} />
      </div>

      <h2 className="text-2xl font-bold mb-4">
        Zapisy na dzień {formatDate(selectedDay)}
      </h2>
      <form onSubmit={handleSubmit} className="mb-4 flex space-x-2">
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow"
        />
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-md"
        >
          Zapisz się
        </Button>
      </form>
      {participants?.map(({ _id, name }) => (
        <div
          key={_id}
          className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center"
        >
          <p className="flex-grow">{name}</p>
        </div>
      ))}
    </div>
  );
}
