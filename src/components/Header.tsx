
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import MainHeader from './header/MainHeader';
import Navigation from './header/Navigation';
import TopBar from './header/TopBar';



const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language } = useLanguage();

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
      ? 'The Gurbaba Post - Without Fear or Favour' 
      : 'द गुरबाबा पोस्ट - डर र पक्षपात बिना';
  }, [language]);

  return (
    <>
      {/* Full Header - visible when not scrolled */}
      <header className={`bg-white shadow-md sticky top-0 z-50 transition-transform duration-300 ${isScrolled ? '-translate-y-full' : 'translate-y-0'}`}>
        <TopBar />
        
        <div className="container mx-auto px-4">
          <MainHeader />
          <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>
      </header>

      {/* Compact Scrolled Header */}
      <header className={`bg-white shadow-md fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isScrolled ? 'translate-y-0' : '-translate-y-full'}`}>
        <CompactHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </header>
    </>
  );
};

export default Header;