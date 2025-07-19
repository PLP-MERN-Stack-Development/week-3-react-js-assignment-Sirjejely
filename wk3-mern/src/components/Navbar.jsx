import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/tasks', label: 'Tasks' },
    { to: '/api', label: 'API' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-blue-700 text-white px-6 py-3 shadow flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="font-bold text-xl tracking-tight">Taskify</span>
        <ul className="flex gap-6 ml-6">
          {navLinks.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`px-2 py-1 rounded transition-colors duration-200 ${location.pathname === link.to ? 'bg-blue-900 font-semibold' : 'hover:bg-blue-800'}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={toggleTheme}
        className="ml-4 p-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <span role="img" aria-label="Light mode" className="text-yellow-300 text-xl">🌞</span>
        ) : (
          <span role="img" aria-label="Dark mode" className="text-blue-900 text-xl">🌙</span>
        )}
      </button>
    </nav>
  );
} 