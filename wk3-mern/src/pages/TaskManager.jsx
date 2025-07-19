import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from '../components/Button';
import Card from '../components/Card';

export default function TaskManager() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('All');

  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Card title={<span className="dark:text-white">Task Manager</span>}>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
            className="flex-grow px-3 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            onKeyDown={e => { if (e.key === 'Enter') addTask(); }}
          />
          <Button onClick={addTask}>Add</Button>
        </div>

        <div className="flex gap-2 mb-4">
          {['All', 'Active', 'Completed'].map((status) => (
            <Button
              key={status}
              variant={filter === status ? 'primary' : 'secondary'}
              onClick={() => setFilter(status)}
            >
              {status}
            </Button>
          ))}
        </div>

        <ul className="space-y-2">
          {filteredTasks.length === 0 && (
            <p className="text-gray-500 text-center">No tasks to display</p>
          )}
          {filteredTasks.map(task => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded shadow-sm transition-all duration-200 animate-fadeIn"
            >
              <label className="flex items-center gap-2 flex-grow cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  className="form-checkbox h-5 w-5 text-blue-600 transition-all duration-200"
                />
                <span className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.text}</span>
              </label>
              <Button variant="danger" onClick={() => deleteTask(task.id)}>Delete</Button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
} 