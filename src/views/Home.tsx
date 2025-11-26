import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-3xl font-bold mb-4 text-purple-700">Welcome to React Testing POC</h2>
      <p className="mb-4 text-gray-700">
        Explore a modern React project with automated testing, clean structure, and Tailwind CSS styling. This is a playground for learning and experimenting with best practices.
      </p>
      <div className="mb-4">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">React 19</span>
        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2">Vitest</span>
        <span className="inline-block bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full">Tailwind CSS</span>
      </div>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>Fast development with Vite</li>
        <li>Reusable components and layouts</li>
        <li>Easy navigation with React Router</li>
        <li>Ready for automated testing</li>
      </ul>
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 mb-4">
        "Testing is not just a checkbox—it's a mindset for building reliable software."
      </blockquote>
      <p className="text-gray-700">Feel free to explore, modify, and contribute!</p>
      <nav className="mt-6">
        <Link to="/about" className="text-purple-600 hover:underline">Go to About</Link>
      </nav>
    </section>
  );
}

export default Home;
