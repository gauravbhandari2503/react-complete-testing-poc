import { Link } from 'react-router-dom';

function About() {
  return (
    <section className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-3xl font-bold mb-4 text-blue-700">About This Project</h2>
      <p className="mb-4 text-gray-700">
        This project is a <span className="font-semibold">React Testing Proof of Concept (POC)</span> designed to demonstrate best practices for automated testing in a React environment using <span className="font-semibold">Vitest</span>.
      </p>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>Showcase a clean and scalable project structure for React apps.</li>
        <li>Utilize <span className="font-semibold">Tailwind CSS</span> for modern, utility-first styling.</li>
        <li>Write, organize, and run automated test cases with <span className="font-semibold">Vitest</span>.</li>
        <li>Demonstrate routing with <span className="font-semibold">React Router DOM</span>.</li>
        <li>No authentication system is included; focus is on testing and structure.</li>
      </ul>
      <p className="text-gray-700">
        As the project evolves, we will update documentation and structure to reflect new features and best practices. This POC is ideal for learning, experimentation, and internal demos.
      </p>
      <nav className="mt-6">
        <Link to="/" className="text-blue-600 hover:underline">Go to Home</Link>
      </nav>
    </section>
  );
}

export default About;
