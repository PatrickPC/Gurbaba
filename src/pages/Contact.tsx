
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
            {t('contact.backToHome')}
          </Link>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="text-red-600" size={24} />
                  {t('contact.ourOffice')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{t('contact.headOffice')}</h3>
                  <p className="text-gray-600">
                    Kantipath, Kathmandu 44600<br />
                    Nepal
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{t('contact.postalAddress')}</h3>
                  <p className="text-gray-600">
                    GPO Box 8975, EPC 696<br />
                    Kathmandu, Nepal
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="text-red-600" size={24} />
                  {t('contact.phoneNumbers')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <span className="font-semibold">{t('contact.mainOffice')}</span>
                  <span className="ml-2 text-gray-600">+977-1-4270774</span>
                </div>
                <div>
                  <span className="font-semibold">{t('contact.newsroom')}</span>
                  <span className="ml-2 text-gray-600">+977-1-4270775</span>
                </div>
                <div>
                  <span className="font-semibold">{t('contact.advertising')}</span>
                  <span className="ml-2 text-gray-600">+977-1-4270776</span>
                </div>
                <div>
                  <span className="font-semibold">{t('contact.circulation')}</span>
                  <span className="ml-2 text-gray-600">+977-1-4270777</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="text-red-600" size={24} />
                  {t('contact.emailAddresses')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <span className="font-semibold">{t('contact.generalInquiries')}</span>
                  <span className="ml-2 text-gray-600">info@kathmandupost.com</span>
                </div>
                <div>
                  <span className="font-semibold">{t('contact.editorial')}</span>
                  <span className="ml-2 text-gray-600">editor@kathmandupost.com</span>
                </div>
                <div>
                  <span className="font-semibold">{t('contact.newsTips')}</span>
                  <span className="ml-2 text-gray-600">news@kathmandupost.com</span>
                </div>
                <div>
                  <span className="font-semibold">{t('contact.advertising')}</span>
                  <span className="ml-2 text-gray-600">ads@kathmandupost.com</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="text-red-600" size={24} />
                  {t('contact.officeHours')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">{t('contact.mondayFriday')}</span>
                    <span className="ml-2 text-gray-600">9:00 AM - 6:00 PM</span>
                  </div>
                  <div>
                    <span className="font-semibold">{t('contact.saturday')}</span>
                    <span className="ml-2 text-gray-600">10:00 AM - 4:00 PM</span>
                  </div>
                  <div>
                    <span className="font-semibold">{t('contact.sunday')}</span>
                    <span className="ml-2 text-gray-600">{t('contact.closed')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{t('contact.sendMessage')}</CardTitle>
                <p className="text-gray-600">
                  {t('contact.messageDesc')}
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">{t('contact.firstName')}</Label>
                      <Input id="firstName" type="text" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">{t('contact.lastName')}</Label>
                      <Input id="lastName" type="text" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">{t('contact.email')}</Label>
                    <Input id="email" type="email" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">{t('contact.phone')}</Label>
                    <Input id="phone" type="tel" />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">{t('contact.subject')}</Label>
                    <Input id="subject" type="text" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">{t('contact.message')}</Label>
                    <Textarea 
                      id="message" 
                      rows={6} 
                      placeholder={t('contact.messagePlaceholder')}
                      required 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                    {t('contact.sendBtn')}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>{t('contact.mediaInquiries')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {t('contact.mediaDesc')}
                </p>
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">{t('contact.mediaRelations')}</span>
                    <span className="ml-2 text-gray-600">media@kathmandupost.com</span>
                  </div>
                  <div>
                    <span className="font-semibold">{t('contact.directLine')}</span>
                    <span className="ml-2 text-gray-600">+977-1-4270778</span>
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
                {t('contact.findUs')}
              </CardTitle>
              <p className="text-gray-600">
                {t('contact.visitOffice')}
              </p>
            </CardHeader>
            <CardContent>
              <Map className="h-96" />
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;