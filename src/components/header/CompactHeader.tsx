
import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { useLanguage } from '../../contexts/LanguageContext';
import Navigation from './Navigation';

interface CompactHeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const CompactHeader = ({ isMenuOpen, setIsMenuOpen }: CompactHeaderProps) => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === 'EN' ? 'नेपाली' : 'EN';
    setLanguage(newLanguage);
    
    // Update document title based on language
    document.title = newLanguage === 'EN' 
      ? ' Gurbaba  - Inclusive Radio Common Voice' 
      : '  गुर्बाबा  - समाबेशी रेडियो साझा आवाज ';
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center py-3">
        <Link to="/" className="flex-1 text-center">
          <div className="flex flex-col items-center">
            <div className="text-lg md:text-xl font-bold text-gray-900 tracking-wider">
              {language === 'EN' ? 'GURBABA' : ' गुर्बाबा'}
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
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isCompact={true} />
    </div>
  );
};

export default CompactHeader;