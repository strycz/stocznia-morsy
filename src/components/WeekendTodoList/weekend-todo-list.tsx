'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import HorizontalDatePicker from '../ui/datePicker';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Button } from '../ui/button';
import { ChevronLeft, LucideAArrowUp, ThumbsUp } from 'lucide-react';

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
  return date.toLocaleDateString('pl-PL', { month: 'long', day: '2-digit' });
};

export function WeekendTodoListComponent() {
  const likeMessage = useMutation(api.messages.like);
  const messages = useQuery(api.messages.list);

  const [weekends, setWeekends] = useState<Date[]>(generateWeekendDates(10));
  const [selectedDate, setSelectedDate] = useState<Date>(weekends[0]);

  const [todos, setTodos] = useState<DayTodos>({});

  useEffect(() => {
    // Generate some dummy data for each weekend
    const dummyTodos: DayTodos = {};
    weekends.forEach((date) => {
      dummyTodos[date.toISOString()] = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          avatarUrl: '/placeholder.svg?height=40&width=40',
          completed: false,
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Smith',
          avatarUrl: '/placeholder.svg?height=40&width=40',
          completed: true,
        },
        {
          id: '3',
          firstName: 'Bob',
          lastName: 'Johnson',
          avatarUrl: '/placeholder.svg?height=40&width=40',
          completed: false,
        },
      ];
    });
    setTodos(dummyTodos);
  }, [weekends]);

  const toggleTodo = (date: Date, todoId: string) => {
    setTodos((prevTodos) => {
      const dateKey = date.toISOString();
      const updatedTodos = prevTodos[dateKey].map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      );
      return { ...prevTodos, [dateKey]: updatedTodos };
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      {messages?.map(({ _id, body }) => (
        <div
          key={_id}
          className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center"
        >
          <p className="flex-grow">{body}</p>
          <Button
            variant="ghost"
            onClick={async () => {
              await likeMessage({
                liker: 'placeholderName',
                messageId: _id,
              });
            }}
            className="p-2"
          >
            <ThumbsUp className="h-6 w-6" />
          </Button>
        </div>
      ))}
      <div className="max-w-[800px] w-full">
        <HorizontalDatePicker setSelectedDate={setSelectedDate} />
      </div>

      <h2 className="text-2xl font-bold mb-4">
        Zapisy na dzień {formatDate(selectedDate)}
      </h2>
      <ul className="space-y-4">
        {todos[selectedDate.toISOString()]?.map((item) => (
          <li
            key={item.id}
            className="flex items-center space-x-4 bg-card p-4 rounded-lg shadow"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={item.avatarUrl}
                alt={`${item.firstName} ${item.lastName}`}
              />
              <AvatarFallback>
                {item.firstName[0]}
                {item.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <p className="font-medium">
                {item.firstName} {item.lastName}
              </p>
            </div>
            <Checkbox
              checked={item.completed}
              onCheckedChange={() => toggleTodo(selectedDate, item.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
