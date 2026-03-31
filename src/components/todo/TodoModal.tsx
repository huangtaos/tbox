'use client';

import React from 'react';
import { ListTodo, X, CheckCircle2, Trash2, Plus } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'view' | 'add';
}

export default function TodoModal({ isOpen, onClose, initialMode = 'view' }: TodoModalProps) {
  const { 
    todos, 
    addTodo, 
    toggleTodo, 
    deleteTodo, 
    updateTodo 
  } = useApp();

  const [newTodoValue, setNewTodoValue] = React.useState('');
  const [newTodoPriority, setNewTodoPriority] = React.useState<'low' | 'medium' | 'high'>('medium');

  const sortedTodos = [...todos].sort((a, b) => {
    const priorityMap = { high: 3, medium: 2, low: 1 };
    if (a.done !== b.done) return a.done ? 1 : -1;
    return priorityMap[b.priority] - priorityMap[a.priority];
  });

  const priorityColors = {
    low: 'bg-blue-400',
    medium: 'bg-yellow-400',
    high: 'bg-red-400'
  };

  const handleAddTodo = () => {
    if (newTodoValue.trim()) {
      addTodo(newTodoValue.trim(), newTodoPriority);
      setNewTodoValue('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col">
        <div className="p-6 md:p-8 border-b border-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
              <ListTodo className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-800">待办事项</h3>
              <p className="text-sm text-slate-400 font-bold">管理你的每日任务</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-slate-100 hover:text-slate-600 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="space-y-6">
            {/* Add New Todo Form */}
            <div className="bg-slate-50 rounded-3xl p-6">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">添加新任务</h4>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="输入任务内容..."
                  value={newTodoValue}
                  onChange={(e) => setNewTodoValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
                  className="w-full bg-white border-2 border-transparent rounded-2xl px-5 py-3 outline-none focus:border-blue-500 transition-all font-bold text-slate-700"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">优先级:</span>
                    {(['low', 'medium', 'high'] as const).map((p) => (
                      <button
                        key={p}
                        onClick={() => setNewTodoPriority(p)}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-black transition-all border-2 ${
                          newTodoPriority === p 
                            ? priorityColors[p] + ' text-white border-transparent'
                            : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                        }`}
                      >
                        {p === 'high' ? '高' : p === 'medium' ? '中' : '低'}
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={handleAddTodo}
                    disabled={!newTodoValue.trim()}
                    className="bg-blue-500 text-white px-6 py-2 rounded-xl font-black text-sm hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 disabled:opacity-50 cursor-pointer"
                  >
                    添加任务
                  </button>
                </div>
              </div>
            </div>

            {/* Todo List */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">任务列表 ({todos.length})</h4>
              {todos.length === 0 ? (
                <div className="py-12 text-center bg-slate-50 rounded-3xl">
                  <CheckCircle2 className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                  <p className="text-slate-400 font-bold">暂无任务</p>
                </div>
              ) : (
                sortedTodos.map(todo => (
                  <div 
                    key={todo.id}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all group ${todo.done ? 'bg-slate-50 border-slate-50' : 'bg-white border-slate-50 hover:border-blue-100'}`}
                  >
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <button 
                        onClick={() => toggleTodo(todo.id)}
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer shrink-0 ${todo.done ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-200 hover:border-blue-400'}`}
                      >
                        {todo.done && <CheckCircle2 className="w-4 h-4" />}
                      </button>
                      <div className="flex flex-col min-w-0">
                        <span className={`font-bold transition-all truncate ${todo.done ? 'text-slate-300 line-through' : 'text-slate-700'}`}>
                          {todo.text}
                        </span>
                        <div className="flex items-center mt-1 space-x-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${priorityColors[todo.priority]} text-white border-transparent`}>
                            {todo.priority === 'high' ? '高' : todo.priority === 'medium' ? '中' : '低'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                      <button 
                        onClick={() => deleteTodo(todo.id)}
                        className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-100 shrink-0">
          <button 
            onClick={onClose}
            className="w-full py-4 bg-slate-800 text-white rounded-2xl font-black hover:bg-slate-700 transition-colors cursor-pointer"
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
}
