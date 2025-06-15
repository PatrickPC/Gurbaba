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

const Contact = () => {
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
            Back to Home
          </Link>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with The Kathmandu Post. We're here to help with your questions, 
            feedback, and story tips.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="text-red-600" size={24} />
                  Our Office
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Head Office</h3>
                  <p className="text-gray-600">
                    Kantipath, Kathmandu 44600<br />
                    Nepal
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Postal Address</h3>
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
                  Phone Numbers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <span className="font-semibold">Main Office:</span>
                  <span className="ml-2 text-gray-600">+977-1-4270774</span>
                </div>
                <div>
                  <span className="font-semibold">Newsroom:</span>
                  <span className="ml-2 text-gray-600">+977-1-4270775</span>
                </div>
                <div>
                  <span className="font-semibold">Advertising:</span>
                  <span className="ml-2 text-gray-600">+977-1-4270776</span>
                </div>
                <div>
                  <span className="font-semibold">Circulation:</span>
                  <span className="ml-2 text-gray-600">+977-1-4270777</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="text-red-600" size={24} />
                  Email Addresses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <span className="font-semibold">General Inquiries:</span>
                  <span className="ml-2 text-gray-600">info@kathmandupost.com</span>
                </div>
                <div>
                  <span className="font-semibold">Editorial:</span>
                  <span className="ml-2 text-gray-600">editor@kathmandupost.com</span>
                </div>
                <div>
                  <span className="font-semibold">News Tips:</span>
                  <span className="ml-2 text-gray-600">news@kathmandupost.com</span>
                </div>
                <div>
                  <span className="font-semibold">Advertising:</span>
                  <span className="ml-2 text-gray-600">ads@kathmandupost.com</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="text-red-600" size={24} />
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">Monday - Friday:</span>
                    <span className="ml-2 text-gray-600">9:00 AM - 6:00 PM</span>
                  </div>
                  <div>
                    <span className="font-semibold">Saturday:</span>
                    <span className="ml-2 text-gray-600">10:00 AM - 4:00 PM</span>
                  </div>
                  <div>
                    <span className="font-semibold">Sunday:</span>
                    <span className="ml-2 text-gray-600">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <p className="text-gray-600">
                  Have a question or story tip? We'd love to hear from you.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" type="text" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" type="text" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" type="text" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      rows={6} 
                      placeholder="Please provide details about your inquiry..."
                      required 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>For Media Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  For press releases, media partnerships, or interview requests, 
                  please contact our media relations team directly.
                </p>
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">Media Relations:</span>
                    <span className="ml-2 text-gray-600">media@kathmandupost.com</span>
                  </div>
                  <div>
                    <span className="font-semibold">Direct Line:</span>
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
                Find Us
              </CardTitle>
              <p className="text-gray-600">
                Visit our office in the heart of Kathmandu
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
