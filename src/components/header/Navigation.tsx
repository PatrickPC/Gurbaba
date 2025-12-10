
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isCompact?: boolean;
}

const Navigation = ({ isMenuOpen, setIsMenuOpen, isCompact = false }: NavigationProps) => {
  const { t } = useLanguage();

  const categories = [
    { key: 'nav.local', slug: 'local' },
    { key: 'nav.national', slug: 'national' },
    { key: 'nav.agriculture', slug: 'agriculture' },
    { key: 'nav.cultureLifestyle', slug: 'culture-lifestyle' },
    { key: 'nav.foreign', slug: 'foreign' },
    { key: 'nav.sports', slug: 'sports' },
    { key: 'nav.interview', slug: 'interview' },
    { key: 'nav.video', slug: 'video' },
    { key: 'nav.audio', slug: 'audio' },
    { key: 'nav.aboutUs', slug: 'about' },
    { key: 'nav.contact', slug: 'contact' }
  ];

  return (
    <>
      <button 
        className="md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={isCompact ? 20 : 24} /> : <Menu size={isCompact ? 20 : 24} />}
      </button>

      <nav className={`border-t border-gray-200 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
        <ul className={`flex flex-col md:flex-row md:justify-center ${isCompact ? 'py-1' : 'py-2'} md:flex-wrap`}>
          {categories.map((category) => (
            <li key={category.key}>
              <Link 
                to={`/${category.slug}`}
                className={`block ${isCompact ? 'px-2 py-1 text-sm' : 'px-4 py-2 text-base'} text-gray-700 hover:text-red-600 hover:bg-gray-50 md:hover:bg-transparent transition-colors font-medium`}
              >
                {t(category.key)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navigation;