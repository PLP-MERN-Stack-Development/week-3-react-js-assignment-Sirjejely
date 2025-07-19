export default function Card({ title, children }) {
  return (
    <div className="p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">{title}</h2>
      {children}
    </div>
  );
} 