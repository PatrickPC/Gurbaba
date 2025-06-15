
import { useState } from 'react';
import { Search, Menu, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const categories = [
    'National', 'Politics', 'Valley', 'Opinion', 'Money', 'Sports', 'Culture & Lifestyle',
    'Science & Technology', 'World', 'Features', 'Columns', 'Editorial', 'Interviews'
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-100 py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span className="text-gray-600">Monday, June 16, 2025</span>
          <div className="flex items-center gap-4">
            <span className="text-red-600">🌡️ 21.8°C Kathmandu</span>
            <span className="text-gray-600">Air Quality in Kathmandu: Good</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        {/* Logo and Weather Info */}
        <div className="flex justify-between items-center py-4">
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <Link to="/" className="flex-1 text-center">
            <div className="flex flex-col items-center">
              <div className="text-2xl md:text-4xl font-bold text-gray-900 tracking-wider">
                THE KATHMANDU POST
              </div>
              <div className="text-sm text-gray-600 mt-1">Without Fear or Favour</div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Search size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User size={20} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search news..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className={`border-t border-gray-200 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          <ul className="flex flex-col md:flex-row md:justify-center py-2 md:flex-wrap">
            {categories.map((category) => (
              <li key={category}>
                <Link 
                  to={`/category/${category.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                  className="block px-3 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-gray-50 md:hover:bg-transparent transition-colors"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
