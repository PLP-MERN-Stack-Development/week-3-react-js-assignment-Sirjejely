import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-4 md:p-8 bg-gray-50 dark:bg-gray-900 transition-all duration-300">
        {children}
      </main>
      <Footer />
    </div>
  );
} 