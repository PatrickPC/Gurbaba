import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, LogIn } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              {language === 'EN' ? ' GURBABA ' : ' गुर्बाबा  '}
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-300 hover:text-white">{t('footer.aboutUs')}</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">{t('footer.contact')}</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-white">{t('footer.careers')}</Link></li>
              <li><Link to="/advertise" className="text-gray-300 hover:text-white">{t('footer.advertise')}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-gray-300 hover:text-white">{t('footer.privacy')}</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white">{t('footer.terms')}</Link></li>
              <li><Link to="/disclaimer" className="text-gray-300 hover:text-white">{t('footer.disclaimer')}</Link></li>
              <li><Link to="/sitemap" className="text-gray-300 hover:text-white">{t('footer.sitemap')}</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.newsletter')}</h3>
            <p className="text-gray-300 text-sm mb-4">
              {t('footer.newsletterDesc')}
            </p>
            <div className="flex mb-4">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-r-lg transition-colors">
                <Mail size={16} />
              </button>
            </div>
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm"
            >
              <LogIn size={16} />
              Admin Login
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300 text-sm">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;