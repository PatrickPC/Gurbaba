
import { useState, useEffect } from 'react';
import { Menu, X, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const categories = [
    'National', 'Politics', 'Valley', 'Opinion', 'Money', 'Sports', 'Culture & Lifestyle',
    'Science & Technology', 'World', 'Features', 'Columns', 'Editorial', 'Interviews'
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Full Header - visible when not scrolled */}
      <header className={`bg-white shadow-md sticky top-0 z-50 transition-transform duration-300 ${isScrolled ? '-translate-y-full' : 'translate-y-0'}`}>
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
          {/* Logo */}
          <div className="flex justify-between items-center py-4">
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <Link to="/" className="flex-1 text-center">
              <div className="flex flex-col items-center">
                <Newspaper size={32} className="text-gray-900 mb-2" />
                <div className="text-2xl md:text-4xl font-bold text-gray-900 tracking-wider">
                  THE KATHMANDU POST
                </div>
                <div className="text-sm text-gray-600 mt-1">Without Fear or Favour</div>
              </div>
            </Link>

            {/* Empty div to balance the layout on mobile */}
            <div className="w-6 md:hidden"></div>
          </div>

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

      {/* Compact Scrolled Header */}
      <header className={`bg-white shadow-md fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isScrolled ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <Link to="/" className="flex-1 text-center">
              <div className="flex flex-col items-center">
                <Newspaper size={20} className="text-gray-900 mb-1" />
                <div className="text-lg md:text-xl font-bold text-gray-900 tracking-wider">
                  THE KATHMANDU POST
                </div>
              </div>
            </Link>

            {/* Empty div to balance the layout on mobile */}
            <div className="w-5 md:hidden"></div>
          </div>

          {/* Compact Navigation */}
          <nav className={`border-t border-gray-200 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
            <ul className="flex flex-col md:flex-row md:justify-center py-1 md:flex-wrap">
              {categories.map((category) => (
                <li key={category}>
                  <Link 
                    to={`/category/${category.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                    className="block px-2 py-1 text-xs text-gray-700 hover:text-red-600 hover:bg-gray-50 md:hover:bg-transparent transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
