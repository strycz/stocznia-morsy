'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type TodoItem = {
  id: string
  firstName: string
  lastName: string
  avatarUrl: string
  completed: boolean
}

type DayTodos = {
  [key: string]: TodoItem[]
}

const generateWeekendDates = (count: number): Date[] => {
  const weekends: Date[] = []
  const currentDate = new Date()

  while (weekends.length < count) {
    if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
      weekends.push(new Date(currentDate))
    }
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return weekends
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function WeekendTodoListComponent() {
  const [weekends, setWeekends] = useState<Date[]>(generateWeekendDates(10))
  const [selectedDate, setSelectedDate] = useState<Date>(weekends[0])
  const scrollRef = useRef<HTMLDivElement>(null)

  const [todos, setTodos] = useState<DayTodos>({})

  useEffect(() => {
    // Generate some dummy data for each weekend
    const dummyTodos: DayTodos = {}
    weekends.forEach(date => {
      dummyTodos[date.toISOString()] = [
        { id: '1', firstName: 'John', lastName: 'Doe', avatarUrl: '/placeholder.svg?height=40&width=40', completed: false },
        { id: '2', firstName: 'Jane', lastName: 'Smith', avatarUrl: '/placeholder.svg?height=40&width=40', completed: true },
        { id: '3', firstName: 'Bob', lastName: 'Johnson', avatarUrl: '/placeholder.svg?height=40&width=40', completed: false },
      ]
    })
    setTodos(dummyTodos)
  }, [weekends])

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }

  const toggleTodo = (date: Date, todoId: string) => {
    setTodos(prevTodos => {
      const dateKey = date.toISOString()
      const updatedTodos = prevTodos[dateKey].map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
      return { ...prevTodos, [dateKey]: updatedTodos }
    })
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={scrollLeft} className="p-2">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div 
          ref={scrollRef} 
          className={cn(
            "flex-1 overflow-x-auto whitespace-nowrap",
            "scrollbar-none",
            "[-ms-overflow-style:none]",
            "[scrollbar-width:none]",
            "&::-webkit-scrollbar { display: none; }"
          )}
        >
          {weekends.map((date, index) => (
            <Button
              key={index}
              variant={date.toDateString() === selectedDate.toDateString() ? "default" : "ghost"}
              className="mx-1"
              onClick={() => setSelectedDate(date)}
            >
              {formatDate(date)}
            </Button>
          ))}
        </div>
        <Button variant="ghost" onClick={scrollRight} className="p-2">
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Todo List for {formatDate(selectedDate)}</h2>
      <ul className="space-y-4">
        {todos[selectedDate.toISOString()]?.map((item) => (
          <li key={item.id} className="flex items-center space-x-4 bg-card p-4 rounded-lg shadow">
            <Avatar className="h-10 w-10">
              <AvatarImage src={item.avatarUrl} alt={`${item.firstName} ${item.lastName}`} />
              <AvatarFallback>{item.firstName[0]}{item.lastName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <p className="font-medium">{item.firstName} {item.lastName}</p>
            </div>
            <Checkbox 
              checked={item.completed}
              onCheckedChange={() => toggleTodo(selectedDate, item.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}