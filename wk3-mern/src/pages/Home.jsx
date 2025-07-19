import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

export default function Home() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Card title={<span className="dark:text-white">Welcome to Taskify!</span>}>
        <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">Organize your tasks efficiently and boost your productivity.</p>
        <Link to="/tasks">
          <Button variant="primary">Go to Task Manager</Button>
        </Link>
      </Card>
    </div>
  );
} 