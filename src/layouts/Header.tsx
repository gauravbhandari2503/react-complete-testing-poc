import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg py-4 px-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-white tracking-wide">React Testing POC</h1>
      <nav>
        <ul className="flex gap-6">
          <li><Link to="/" className="text-white hover:text-yellow-300 transition">Home</Link></li>
          <li><Link to="/about" className="text-white hover:text-yellow-300 transition">About</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
