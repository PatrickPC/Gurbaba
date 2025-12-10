
import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { useLanguage } from '../../contexts/LanguageContext';

const MainHeader = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === 'EN' ? 'नेपाली' : 'EN';
    setLanguage(newLanguage);
    
    // Update document title based on language
    document.title = newLanguage === 'EN' 
      ? 'The Gurbaba Post - Without Fear or Favour' 
      : 'द गुरबाबा पोस्ट - डर र पक्षपात बिना';
  };

  return (
    <div className="flex justify-between items-center py-4">
      <Link to="/" className="flex-1 text-center">
        <div className="flex flex-col items-center">
          <div className="text-3xl md:text-5xl font-bold text-gray-900 tracking-wider">
            {language === 'EN' ? 'THE GURBABA POST' : 'द गुरबाबा पोस्ट'}
          </div>
          <div className="text-base md:text-lg text-gray-600 mt-1">{t('header.tagline')}</div>
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
  );
};

export default MainHeader;