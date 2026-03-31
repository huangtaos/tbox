'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Todo {
  id: number;
  text: string;
  done: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface AppContextType {
  // Todo State
  todos: Todo[];
  addTodo: (text: string, priority?: 'low' | 'medium' | 'high') => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, text: string, priority?: 'low' | 'medium' | 'high') => void;
  
  // Water State
  water: number;
  waterGoal: number;
  addWater: (amount: number) => void;
  resetWater: () => void;
  setWaterGoal: (goal: number) => void;
  
  // Timer State
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  isTimerRunning: boolean;
  setIsTimerRunning: React.Dispatch<React.SetStateAction<boolean>>;
  timerMode: string;
  setTimerMode: React.Dispatch<React.SetStateAction<string>>;
  timerSessions: number;
  setTimerSessions: React.Dispatch<React.SetStateAction<number>>;
  workDuration: number;
  setWorkDuration: (mins: number) => void;
  breakDuration: number;
  setBreakDuration: (mins: number) => void;
  isFullScreenTimer: boolean;
  setIsFullScreenTimer: React.Dispatch<React.SetStateAction<boolean>>;
  formatTime: (seconds: number) => string;
  
  // Stats
  visitCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Todo State
  const [todos, setTodos] = useState<Todo[]>([]);
  
  // Water State
  const [water, setWater] = useState(0);
  const [waterGoal, setWaterGoal] = useState(2000);
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isFullScreenTimer, setIsFullScreenTimer] = useState(false);
  const [timerMode, setTimerMode] = useState('work');
  const [timerSessions, setTimerSessions] = useState(0);
  const [workDuration, setWorkDurationState] = useState(25);
  const [breakDuration, setBreakDurationState] = useState(5);

  // Stats
  const [visitCount, setVisitCount] = useState(30000);

  // Initial Load
  useEffect(() => {
    const savedTodos = localStorage.getItem('tbox_todos');
    if (savedTodos) {
      const parsed = JSON.parse(savedTodos);
      // Migration: add priority if missing
      setTodos(parsed.map((t: any) => ({
        ...t,
        priority: t.priority || 'medium'
      })));
    } else {
      setTodos([
        { id: 1, text: '探索 tbox 的所有工具', done: true, priority: 'medium' },
        { id: 2, text: '尝试使用番茄时钟专注 25 分钟', done: false, priority: 'high' },
        { id: 3, text: '今天也要记得多喝水哦', done: false, priority: 'low' }
      ]);
    }

    const savedWater = localStorage.getItem('tbox_water');
    if (savedWater) setWater(parseInt(savedWater));

    const savedWorkDur = localStorage.getItem('tbox_work_duration');
    if (savedWorkDur) {
      const mins = parseInt(savedWorkDur);
      setWorkDurationState(mins);
      setTimeLeft(mins * 60);
    }

    const savedBreakDur = localStorage.getItem('tbox_break_duration');
    if (savedBreakDur) setBreakDurationState(parseInt(savedBreakDur));

    // Visit Count (Users Served)
    const savedVisits = localStorage.getItem('tbox_visit_count');
    const baseCount = 30000;
    const currentVisits = savedVisits ? parseInt(savedVisits) : 0;
    const newCount = currentVisits + 1;
    
    setVisitCount(baseCount + newCount);
    localStorage.setItem('tbox_visit_count', newCount.toString());
  }, []);

  // Persistence
  useEffect(() => {
    localStorage.setItem('tbox_todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('tbox_water', water.toString());
  }, [water]);

  // Todo Actions
  const addTodo = (text: string, priority: 'low' | 'medium' | 'high' = 'medium') => 
    setTodos([...todos, { id: Date.now(), text, done: false, priority }]);
  
  const toggleTodo = (id: number) => 
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  
  const deleteTodo = (id: number) => 
    setTodos(todos.filter(t => t.id !== id));

  const updateTodo = (id: number, text: string, priority?: 'low' | 'medium' | 'high') => 
    setTodos(todos.map(t => t.id === id ? { ...t, text, priority: priority || t.priority } : t));

  // Water Actions
  const addWater = (amount: number) => setWater(prev => prev + amount);
  const resetWater = () => setWater(0);

  const setWorkDuration = (mins: number) => {
    setWorkDurationState(mins);
    localStorage.setItem('tbox_work_duration', mins.toString());
    if (timerMode === 'work') setTimeLeft(mins * 60);
  };

  const setBreakDuration = (mins: number) => {
    setBreakDurationState(mins);
    localStorage.setItem('tbox_break_duration', mins.toString());
    if (timerMode !== 'work') setTimeLeft(mins * 60);
  };

  // Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setIsFullScreenTimer(false);
      if (timerMode === 'work') {
        setTimerSessions(prev => prev + 1);
        setTimerMode('short-break');
        setTimeLeft(breakDuration * 60);
      } else {
        setTimerMode('work');
        setTimeLeft(workDuration * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, timerMode, workDuration, breakDuration]);

  // Utility
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AppContext.Provider value={{
      todos, addTodo, toggleTodo, deleteTodo, updateTodo,
      water, waterGoal, addWater, resetWater, setWaterGoal,
      timeLeft, setTimeLeft, isTimerRunning, setIsTimerRunning, timerMode, setTimerMode, timerSessions, setTimerSessions, 
      workDuration, setWorkDuration, breakDuration, setBreakDuration,
      isFullScreenTimer, setIsFullScreenTimer,
      formatTime,
      visitCount
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
