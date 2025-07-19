const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400",
  secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-400",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-400"
};

export default function Button({ variant = "primary", children, ...props }) {
  return (
    <button
      className={`px-6 py-2 rounded-lg shadow transition-all duration-200 focus:outline-none active:scale-95 hover:opacity-90 disabled:opacity-50 ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
} 