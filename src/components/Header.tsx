import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [weatherData, setWeatherData] = useState({ temp: '', condition: '', airQuality: 'Good' });
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
    { key: 'nav.interviews', slug: 'interviews' },
    { key: 'nav.video', slug: 'video' },
    { key: 'nav.audio', slug: 'audio' },
    { key: 'nav.aboutUs', slug: 'about' },
    { key: 'nav.contact', slug: 'contact' }
    
  ];

  const toggleLanguage = () => {
    const newLanguage = language === 'EN' ? 'नेपाली' : 'EN';
    setLanguage(newLanguage);
    
    // Update document title based on language
    document.title = newLanguage === 'EN' 
      ? ' Gurbaba  - Your trusted source for news and information.' 
      : ' गुरबाबा  - तपाईंको विश्वसनीय समाचार र जानकारीको स्रोत।';
  };


  // Fetch live date
  const updateCurrentDate = () => {
    const now = new Date();
    const options = { 
      weekday: 'long' as const, 
      year: 'numeric' as const, 
      month: 'long' as const, 
      day: 'numeric' as const,
      timeZone: 'Asia/Kathmandu'
    };
    setCurrentDate(now.toLocaleDateString('en-US', options));
  };

  // Fetch weather data for Bardiya, Nepal
  const fetchWeatherData = async () => {
    try {
      // Using OpenWeatherMap API - this is a public API
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Bardiya,NP&appid=demo&units=metric`
      );
      
      if (response.ok) {
        const data = await response.json();
        setWeatherData({
          temp: `${Math.round(data.main.temp)}°C`,
          condition: data.weather[0].main,
          airQuality: 'Good' // This would need a separate API call for real air quality data
        });
      } else {
        // Fallback to demo data if API fails
        setWeatherData({
          temp: '25°C-12°C',
          condition: 'Clear',
          airQuality: 'Good'
        });
      }
    } catch (error) {
      console.log('Weather API error, using fallback data:', error);
      // Fallback weather data for Bardiya
      setWeatherData({
        temp: '25°C-12°C',
        condition: 'Clear',
        airQuality: 'Good'
      });
    }
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
      ? ' Gurbaba  - Your trusted source for news and information.' 
      : ' गुरबाबा  - तपाईंको विश्वसनीय समाचार र जानकारीको स्रोत।';
  }, [language]);


  // Update date and weather on component mount and set interval for updates
  useEffect(() => {
    updateCurrentDate();
    fetchWeatherData();

    // Update date every minute
    const dateInterval = setInterval(updateCurrentDate, 60000);
    
    // Update weather every 30 minutes
    const weatherInterval = setInterval(fetchWeatherData, 1800000);

    return () => {
      clearInterval(dateInterval);
      clearInterval(weatherInterval);
    };
  }, []);


  return (
    <>
      {/* Full Header - visible when not scrolled */}
      <header className={`bg-white shadow-md sticky top-0 z-50 transition-transform duration-300 ${isScrolled ? '-translate-y-full' : 'translate-y-0'}`}>
        {/* Top Bar */}
        <div className="bg-gray-100 py-2 text-sm">
          <div className="container mx-auto px-4 flex justify-between items-center">
          <span className="text-gray-600">{currentDate}</span>

        <div className="flex items-center gap-4">
              <span className="text-red-600">🌡️ {weatherData.temp} Bardiya</span>
              <span className="text-gray-600">Air Quality in Bardiya: {weatherData.airQuality}</span>
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
                  {language === 'EN' ? ' GURBABA ' : ' गुरबाबा '}
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
                    to={`/${category.slug}`}

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
                  {language === 'EN' ? ' GURBABA POST' : ' गुरबाबा '}
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
                    to={`/${category.slug}`}

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