import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

export default function ApiPage() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error('Failed to fetch posts.');
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Filter and paginate posts
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const displayedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card title="API Integration - Posts">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full px-3 py-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {loading && <p className="text-center text-blue-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {displayedPosts.map(post => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-900 p-4 rounded shadow transition-all duration-300 hover:scale-[1.02]"
              >
                <h3 className="text-lg font-bold mb-2 text-black dark:text-white">{post.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{post.body}</p>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-4">
          <Button
            variant="secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            Prev
          </Button>
          <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
          <Button
            variant="secondary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
} 