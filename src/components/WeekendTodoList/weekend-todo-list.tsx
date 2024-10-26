'use client';

import { useState, FormEvent } from 'react';
import HorizontalDatePicker from '../ui/datePicker';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Id } from '../../../convex/_generated/dataModel';
import { TrashIcon } from '@radix-ui/react-icons';

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
  const deleteParticipant = useMutation(api.participants.deleteParticipant);
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
      const formattedDate = date.toISOString().split('T')[0];
      const dayId = await getOrCreateDay({ date: formattedDate });
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
          <Button
            onClick={() => deleteParticipant({ id: _id })}
            className="bg-red-500 hover:bg-red-600 text-white rounded-md ml-2"
          >
            <TrashIcon />
          </Button>
        </div>
      ))}
    </div>
  );
}
