import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Clock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import Map from '../components/Map';
import { useLanguage } from '../contexts/LanguageContext';
import RadioPlayer from '@/components/RadioPlayer';

const Contact = () => {
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link to="/" className="flex items-center text-gray-600 hover:text-red-600 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            {t('BackToHome')}
          </Link>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('Contact Us')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('You can contact us using following details us visit our office on open hours')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="text-red-600" size={24} />
                  {t('Contact our Office')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{t(' Editorial Office')}</h3>
                  <p className="text-gray-600">
                  Bansgadhi Municipality ward no. 5 Laxmanpur, Bardiya<br />
                    Nepal
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{t(' Advertising')}</h3>
                  <p className="text-gray-600">
                  For advertising inquiries and rates<br />
                  Phone: 977-084-400003
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="text-red-600" size={24} />
                  {t('Phone Numbers')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <span className="font-semibold">{t(' Main Office:')}</span>
                  <span className="ml-2 text-gray-600">084-400004/084-400003</span>
                </div>
                <div>
                  <span className="font-semibold">{t(' Newsroom:')}</span>
                  <span className="ml-2 text-gray-600">084-400004/084-400003</span>
                </div>
                <div>
                  <span className="font-semibold">{t(' Advertising:')}</span>
                  <span className="ml-2 text-gray-600">084-400004/084-400003</span>
                </div>
               
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="text-red-600" size={24} />
                  {t('Email Addresses')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <span className="font-semibold">{t(' GeneralInquiries:')}</span>
                  <span className="ml-2 text-gray-600">fmgurbaba@gmail.com</span>
                </div>
                <div>
                  <span className="font-semibold">{t(' Editorial:')}</span>
                  <span className="ml-2 text-gray-600">fmgurbaba@gmail.com</span>
                </div>
                <div>
                  <span className="font-semibold">{t(' NewsTips:')}</span>
                  <span className="ml-2 text-gray-600">fmgurbaba@gmail.com</span>
                </div>
                <div>
                  <span className="font-semibold">{t(' Advertising:')}</span>
                  <span className="ml-2 text-gray-600">fmgurbaba@gmail.com</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="text-red-600" size={24} />
                  {t('Office Hours')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">{t('Contact Sunday-Friday')}</span>
                    <span className="ml-2 text-gray-600">9:00 AM - 6:00 PM</span>
                  </div>
                  <div>
                    <span className="font-semibold">{t('Contact Saturday')}</span>
                    <span className="ml-2 text-gray-600">10:00 AM - 4:00 PM</span>
                  </div>
                 
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{t('Send Message')}</CardTitle>
                <p className="text-gray-600">
                  {t('Have a question or story tip? We would love to hear from you.')}
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">{t('FirstName')}</Label>
                      <Input id="firstName" type="text" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">{t('LastName')}</Label>
                      <Input id="lastName" type="text" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">{t('Email')}</Label>
                    <Input id="email" type="email" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">{t('Phone')}</Label>
                    <Input id="phone" type="tel" />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">{t('Subject')}</Label>
                    <Input id="subject" type="text" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">{t('Message')}</Label>
                    <Textarea 
                      id="message" 
                      rows={6} 
                      placeholder={t('Message Placeholder')}
                      required 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                    {t('Send')}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>{t('Media Inquiries')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {t('For press releases, media partnerships, or interview requests, please contact our media relations team directly.')}
                </p>
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">{t('Media Relations')}</span>
                    <span className="ml-2 text-gray-600">fmgurbaba@gmail.com</span>
                  </div>
                  <div>
                    <span className="font-semibold">{t('Direct Line')}</span>
                    <span className="ml-2 text-gray-600">084-400004/084-400003</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="text-red-600" size={24} />
                {t('Find Us')}
              </CardTitle>
              <p className="text-gray-600">
                {t('Visit our office in the heart of Bansghadi')}
              </p>
            </CardHeader>
            <CardContent>
              <Map className="h-96" />
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
      <RadioPlayer/>
    </div>
  );
};

export default Contact;