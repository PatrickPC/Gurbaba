import { createContext, useContext, useState } from 'react';

type Language = 'EN' | 'नेपाली';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  EN: {
    'header.tagline': 'Without Fear or Favour',
    'nav.national': 'National',
    'nav.politics': 'Politics',
    'nav.valley': 'Valley',
    'nav.opinion': 'Opinion',
    'nav.money': 'Money',
    'nav.sports': 'Sports',
    'nav.cultureLifestyle': 'Culture & Lifestyle',
    'nav.scienceTech': 'Science & Technology',
    'nav.world': 'World',
    'nav.video': 'Video',
    'nav.aboutUs': 'About Us',
    'nav.contact': 'Contact',
    'nav.interviews': 'Interviews',
    'home.trending': 'Trending',
    'home.latestStories': 'Latest Stories',
    'home.loadMore': 'Load More',
    'article.share': 'Share',
    'article.relatedArticles': 'Related Articles',
    'footer.aboutUs': 'About Us',
    'footer.contactUs': 'Contact Us',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.termsOfService': 'Terms of Service',
    'footer.copyright': '© 2023 The Gurbaba Post. All rights reserved.',
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with The Gurbaba Post team. We\'d love to hear from you.',
    'contact.backToHome': 'Back to Home',
    'contact.ourOffice': 'Our Office',
    'contact.headOffice': 'Head Office',
    'contact.postalAddress': 'Postal Address',
    'contact.phoneNumbers': 'Phone Numbers',
    'contact.mainOffice': 'Main Office:',
    'contact.newsroom': 'Newsroom:',
    'contact.advertising': 'Advertising:',
    'contact.circulation': 'Circulation:',
    'contact.emailAddresses': 'Email Addresses',
    'contact.generalInquiries': 'General Inquiries:',
    'contact.editorial': 'Editorial:',
    'contact.newsTips': 'News Tips:',
    'contact.officeHours': 'Office Hours',
    'contact.mondayFriday': 'Monday - Friday:',
    'contact.saturday': 'Saturday:',
    'contact.sunday': 'Sunday:',
    'contact.closed': 'Closed',
    'contact.sendMessage': 'Send us a Message',
    'contact.messageDesc': 'Fill out the form below and we\'ll get back to you as soon as possible.',
    'contact.firstName': 'First Name',
    'contact.lastName': 'Last Name',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Please enter your message here...',
    'contact.sendBtn': 'Send Message',
    'contact.mediaInquiries': 'Media Inquiries',
    'contact.mediaDesc': 'For press releases, media partnerships, and journalist inquiries, please contact our media relations team.',
    'contact.mediaRelations': 'Media Relations:',
    'contact.directLine': 'Direct Line:',
    'contact.findUs': 'Find Us',
    'contact.visitOffice': 'Visit our office during business hours or reach out to us using the contact information above.'
  },
  'नेपाली': {
    'header.tagline': 'डर र पक्षपात बिना',
    'nav.national': 'राष्ट्रिय',
    'nav.politics': 'राजनीति',
    'nav.valley': 'उपत्यका',
    'nav.opinion': 'मत',
    'nav.money': 'अर्थ',
    'nav.sports': 'खेलकुद',
    'nav.cultureLifestyle': 'संस्कृति र जीवनशैली',
    'nav.scienceTech': 'विज्ञान र प्रविधि',
    'nav.world': 'विदेश',
    'nav.video': 'भिडियो',
    'nav.aboutUs': 'हाम्रो बारेमा',
    'nav.contact': 'सम्पर्क',
    'nav.interviews': 'अन्तर्वार्ता',
    'home.trending': 'Trending',
    'home.latestStories': 'ताजा खबर',
    'home.loadMore': 'थप लोड गर्नुहोस्',
    'article.share': 'बाँड्नुहोस्',
    'article.relatedArticles': 'सम्बन्धित लेख',
    'footer.aboutUs': 'हाम्रो बारेमा',
    'footer.contactUs': 'सम्पर्क गर्नुहोस्',
    'footer.privacyPolicy': 'गोपनीयता नीति',
    'footer.termsOfService': 'सेवाका सर्तहरू',
    'footer.copyright': '© २०२३ गुरबाबा पोस्ट। सर्वाधिकार सुरक्षित।',
    'contact.title': 'हामीलाई सम्पर्क गर्नुहोस्',
    'contact.subtitle': 'द गुरबाबा पोस्ट टोलीसँग सम्पर्कमा रहनुहोस्। हामी तपाईंबाट सुन्न चाहन्छौं।',
    'contact.backToHome': 'घर फिर्ता',
    'contact.ourOffice': 'हाम्रो कार्यालय',
    'contact.headOffice': 'मुख्य कार्यालय',
    'contact.postalAddress': 'हुलाक ठेगाना',
    'contact.phoneNumbers': 'फोन नम्बरहरू',
    'contact.mainOffice': 'मुख्य कार्यालय:',
    'contact.newsroom': 'समाचार कोठा:',
    'contact.advertising': 'विज्ञापन:',
    'contact.circulation': 'सर्कुलेसन:',
    'contact.emailAddresses': 'इमेल ठेगानाहरू',
    'contact.generalInquiries': 'सामान्य सोधपुछ:',
    'contact.editorial': 'सम्पादकीय:',
    'contact.newsTips': 'समाचार टिप्स:',
    'contact.officeHours': 'कार्यालय समय',
    'contact.mondayFriday': 'सोमबार - शुक्रबार:',
    'contact.saturday': 'शनिबार:',
    'contact.sunday': 'आइतबार:',
    'contact.closed': 'बन्द',
    'contact.sendMessage': 'हामीलाई सन्देश पठाउनुहोस्',
    'contact.messageDesc': 'तलको फारम भर्नुहोस् र हामी जति सक्दो चाँडो तपाईंलाई जवाफ दिनेछौं।',
    'contact.firstName': 'पहिलो नाम',
    'contact.lastName': 'अन्तिम नाम',
    'contact.email': 'इमेल',
    'contact.phone': 'फोन',
    'contact.subject': 'विषय',
    'contact.message': 'सन्देश',
    'contact.messagePlaceholder': 'कृपया यहाँ आफ्नो सन्देश प्रविष्ट गर्नुहोस्...',
    'contact.sendBtn': 'सन्देश पठाउनुहोस्',
    'contact.mediaInquiries': 'मिडिया सोधपुछ',
    'contact.mediaDesc': 'प्रेस विज्ञप्ति, मिडिया साझेदारी, र पत्रकार सोधपुछको लागि, कृपया हाम्रो मिडिया सम्बन्ध टोलीलाई सम्पर्क गर्नुहोस्।',
    'contact.mediaRelations': 'मिडिया सम्बन्ध:',
    'contact.directLine': 'प्रत्यक्ष लाइन:',
    'contact.findUs': 'हामीलाई भेट्टाउनुहोस्',
    'contact.visitOffice': 'कार्यालय समयमा हाम्रो कार्यालयमा आउनुहोस् वा माथिको सम्पर्क जानकारी प्रयोग गरेर हामीलाई सम्पर्क गर्नुहोस्।'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('EN');

  const t = (key: string): string => {
    return translations[language][key] || key;
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