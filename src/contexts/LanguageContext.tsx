import React, { createContext, useContext, useState } from 'react';

type Language = 'EN' | 'नेपाली';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  'EN': {
  'header.tagline': 'Your trusted source for news and information.',
    'nav.national': 'National',
    'nav.politics': 'Politics',
    'nav.valley': 'Valley',
    'nav.opinion': 'Opinion',
    'nav.money': 'Money',
    'nav.sports': 'Sports',
    'nav.cultureLifestyle': 'Culture & Lifestyle',
    'nav.scienceTech': 'Science & Technology',
    'nav.world': 'World',
    'nav.features': 'Features',
    'nav.columns': 'Columns',
    'nav.editorial': 'Editorial',
    'nav.interviews': 'Interviews',
    'footer.description': 'Your trusted source for news and information.',
    'footer.quickLinks': 'Quick Links',
    'footer.aboutUs': 'About Us',
    'footer.contact': 'Contact',
    'footer.careers': 'Careers',
    'footer.advertise': 'Advertise',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.disclaimer': 'Disclaimer',
    'footer.sitemap': 'Sitemap',
    'footer.newsletter': 'Newsletter',
    'footer.newsletterDescription': 'Subscribe to our newsletter for the latest updates.',
    'footer.emailPlaceholder': 'Enter your email',
    'footer.copyright': '© 2024 The Gurbaba Post. All rights reserved.'
  },
  'नेपाली': {
    'header.tagline': 'तपाईंको विश्वसनीय समाचार र जानकारीको स्रोत।',
    'nav.national': 'राष्ट्रिय',
    'nav.politics': 'राजनीति',
    'nav.valley': 'काठमाडौं',
    'nav.opinion': 'विचार',
    'nav.money': 'अर्थ',
    'nav.sports': 'खेलकुद',
    'nav.cultureLifestyle': 'संस्कृति र जीवनशैली',
    'nav.scienceTech': 'विज्ञान र प्रविधि',
    'nav.world': 'विश्व',
    'nav.features': 'विशेष',
    'nav.columns': 'स्तम्भ',
    'nav.editorial': 'सम्पादकीय',
    'nav.interviews': 'अन्तर्वार्ता',
    'footer.description': 'तपाईंको विश्वसनीय समाचार र जानकारीको स्रोत।',
    'footer.quickLinks': 'द्रुत लिङ्कहरू',
    'footer.aboutUs': 'हाम्रोबारे',
    'footer.contact': 'सम्पर्क',
    'footer.careers': 'क्यारियर',
    'footer.advertise': 'विज्ञापन',
    'footer.legal': 'कानूनी',
    'footer.privacy': 'गोपनीयता नीति',
    'footer.terms': 'सेवा सर्तहरू',
    'footer.disclaimer': 'दायित्व अस्वीकरण',
    'footer.sitemap': 'साइट नक्सा',
    'footer.newsletter': 'पत्रिका',
    'footer.newsletterDescription': 'नवीनतम अपडेटहरूको लागि हाम्रो पत्रिकामा सदस्यता लिनुहोस्।',
    'footer.emailPlaceholder': 'आफ्नो इमेल प्रविष्ट गर्नुहोस्',
    'footer.copyright': '© २०२४ द गुरबाबा पोस्ट। सर्वाधिकार सुरक्षित।'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('EN');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 