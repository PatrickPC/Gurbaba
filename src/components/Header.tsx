import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const categories = [
    { key: 'nav.national', slug: 'national' },
    { key: 'nav.politics', slug: 'politics' },
    { key: 'nav.valley', slug: 'valley' },
    { key: 'nav.opinion', slug: 'opinion' },
    { key: 'nav.money', slug: 'money' },
    { key: 'nav.sports', slug: 'sports' },
    { key: 'nav.cultureLifestyle', slug: 'culture-lifestyle' },
    { key: 'nav.scienceTech', slug: 'science-technology' },
    { key: 'nav.world', slug: 'world' },
    { key: 'nav.features', slug: 'features' },
    { key: 'nav.columns', slug: 'columns' },
    { key: 'nav.editorial', slug: 'editorial' },
    { key: 'nav.interviews', slug: 'interviews' }
  ];

  const toggleLanguage = () => {
    const newLanguage = language === 'EN' ? 'नेपाली' : 'EN';
    setLanguage(newLanguage);
    
    // Update document title based on language
    document.title = newLanguage === 'EN' 
      ? 'The Gurbaba Post - Your trusted source for news and information.' 
      : 'द गुरबाबा पोस्ट - तपाईंको विश्वसनीय समाचार र जानकारीको स्रोत।';
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set initial title based on current language
  useEffect(() => {
    document.title = language === 'EN' 
      ? 'The Gurbaba Post - Your trusted source for news and information.' 
      : 'द गुरबाबा पोस्ट - तपाईंको विश्वसनीय समाचार र जानकारीको स्रोत।';
  }, [language]);

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
                <div className="text-2xl md:text-4xl font-bold text-gray-900 tracking-wider">
                  {language === 'EN' ? 'THE GURBABA POST' : 'द गुरबाबा पोस्ट'}
                </div>
                <div className="text-sm text-gray-600 mt-1">{t('header.tagline')}</div>
              </div>
            </Link>

            {/* Language Toggle Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-1 border-gray-300 hover:border-red-600 hover:text-red-600"
            >
              <Globe size={16} />
              <span className="text-xs font-medium">{language}</span>
            </Button>
          </div>

          {/* Navigation */}
          <nav className={`border-t border-gray-200 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
            <ul className="flex flex-col md:flex-row md:justify-center py-2 md:flex-wrap">
              {categories.map((category) => (
                <li key={category.key}>
                  <Link 
                    to={`/category/${category.slug}`}
                    className="block px-3 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-gray-50 md:hover:bg-transparent transition-colors"
                  >
                    {t(category.key)}
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
                <div className="text-lg md:text-xl font-bold text-gray-900 tracking-wider">
                  {language === 'EN' ? 'THE GURBABA POST' : 'द गुरबाबा पोस्ट'}
                </div>
              </div>
            </Link>

            {/* Language Toggle Button - Compact */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-1 border-gray-300 hover:border-red-600 hover:text-red-600 text-xs"
            >
              <Globe size={14} />
              <span className="font-medium">{language}</span>
            </Button>
          </div>

          {/* Compact Navigation */}
          <nav className={`border-t border-gray-200 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
            <ul className="flex flex-col md:flex-row md:justify-center py-1 md:flex-wrap">
              {categories.map((category) => (
                <li key={category.key}>
                  <Link 
                    to={`/category/${category.slug}`}
                    className="block px-2 py-1 text-xs text-gray-700 hover:text-red-600 hover:bg-gray-50 md:hover:bg-transparent transition-colors"
                  >
                    {t(category.key)}
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