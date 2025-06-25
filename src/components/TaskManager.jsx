import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from './Button';

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (input.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const toggleComplete = (id) =>
    setTasks(tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));

  const deleteTask = (id) =>
    setTasks(tasks.filter((task) => task.id !== id));

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div>
      <div className="flex items-center mb-4">
        <input
          className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 mr-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task"
        />
        <Button variant="primary" onClick={addTask}>Add</Button>
      </div>

      <div className="flex gap-2 mb-4">
        {['all', 'active', 'completed'].map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'secondary' : 'primary'}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      <ul className="space-y-2">
        {filteredTasks.length === 0 && <p className="text-gray-500">No tasks found.</p>}
        {filteredTasks.map((task) => (
          <li key={task.id} className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded">
            <span
              onClick={() => toggleComplete(task.id)}
              className={`cursor-pointer ${task.completed ? 'line-through text-gray-400' : ''}`}
            >
              {task.text}
            </span>
            <Button variant="danger" size="sm" onClick={() => deleteTask(task.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
