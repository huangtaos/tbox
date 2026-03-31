'use client';

import React from 'react';
import { ListTodo, Plus, Pencil, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface TodoCardProps {
  onOpenModal: (mode: 'view' | 'add') => void;
}

export default function TodoCard({ onOpenModal }: TodoCardProps) {
  const { 
    todos,
    toggleTodo,
    deleteTodo,
    updateTodo
  } = useApp();

  const [editingTodo, setEditingTodo] = React.useState<number | null>(null);
  const [editValue, setEditValue] = React.useState('');

  const sortedTodos = [...todos].sort((a, b) => {
    const priorityMap = { high: 3, medium: 2, low: 1 };
    if (a.done !== b.done) return a.done ? 1 : -1;
    return priorityMap[b.priority] - priorityMap[a.priority];
  });

  const displayTodos = sortedTodos.slice(0, 5);
  const hasMoreTodos = sortedTodos.length > 5;

  const startEdit = (id: number, text: string) => {
    setEditingTodo(id);
    setEditValue(text);
  };

  const saveEdit = (id: number) => {
    if (editValue.trim()) {
      updateTodo(id, editValue.trim());
      setEditingTodo(null);
    }
  };

  const priorityColors = {
    low: 'bg-blue-400',
    medium: 'bg-yellow-400',
    high: 'bg-red-400'
  };

  const completedTodos = todos.filter(t => t.done).length;
  const totalTodos = todos.length;

  return (
    <div className="tool-card p-6 rounded-[2.5rem] group relative overflow-hidden block bg-white h-full flex flex-col min-h-[340px]">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
              <ListTodo className="w-5 h-5" />
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="text-xl font-black text-slate-800">{completedTodos}</span>
              <span className="text-slate-400 font-bold text-xs">/ {totalTodos}</span>
            </div>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal('add');
            }}
            className="w-8 h-8 bg-blue-500 text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col min-h-0">
        <div className={`flex-1 flex flex-col ${displayTodos.length > 0 && displayTodos.length <= 5 ? 'justify-between' : 'space-y-1'} overflow-y-auto pr-1 custom-scrollbar`}>
          {displayTodos.map(todo => (
            <div key={todo.id} className="group/item flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-all">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTodo(todo.id);
                  }}
                  className={`shrink-0 transition-colors ${todo.done ? 'text-blue-500' : 'text-slate-300 hover:text-blue-400'}`}
                >
                  {todo.done ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                </button>
                
                {editingTodo === todo.id ? (
                  <input
                    autoFocus
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => saveEdit(todo.id)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit(todo.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 bg-transparent border-none outline-none font-bold text-sm text-slate-800"
                  />
                ) : (
                  <div className="flex flex-col min-w-0">
                    <span className={`text-sm font-bold truncate ${todo.done ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                      {todo.text}
                    </span>
                    <div className="flex items-center mt-0.5 space-x-2">
                      <div className={`w-2 h-2 rounded-full ${priorityColors[todo.priority]}`}></div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                        {todo.priority === 'high' ? '高' : todo.priority === 'medium' ? '中' : '低'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    startEdit(todo.id, todo.text);
                  }}
                  className="p-1 text-slate-400 hover:text-blue-500 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTodo(todo.id);
                  }}
                  className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {hasMoreTodos && (
          <div className="mt-2 text-center">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal('view');
              }}
              className="text-[10px] font-bold text-blue-400 animate-pulse hover:text-blue-600 transition-colors cursor-pointer"
            >
              还有更多任务哦~请点击这里查看详情
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
