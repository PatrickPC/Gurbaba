
import { Link } from 'react-router-dom';
import { Users, Award, Globe, Calendar } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About The Kathmandu Post
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nepal's leading English-language daily newspaper, committed to delivering news without fear or favour since 1993.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Article */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4 text-lg">
              गुर्बाबा एफएम प्राचिन सृजनशिल आदिबासी समाज बर्दिया द्धारा संचालित एफएम हो । यो एफएम २०६५ सालमा स्थापना भएको हाे । गुर्बाबा एफएम बर्दिया जिल्लाको बाँसगढी नगरपालिका ५ मा रहेको छ । बर्दिया जिल्ला नेपालकै सबैभन्दा बढी थारु जनघनत्व रहेको जिल्ला हो । यहाँ ५२ प्रतिसत भन्दा बढी थारु जातीका मानिस बसोबास गर्छन । शैक्षिक, आर्थिक, राजनितिक हीसाबले पछाडी पारिएका छन् । त्यसैले एफएमले थारु समुदायलाइ लक्षित गरेको छ । ८९.७ मेघाहर्जमा पंसारण हुने याे एफएमकाे ५०० वाट क्षमता रहेको छ । यो रेडियोको मुख्य भाषा थारु रहेको छ । त्यसका अलावा ५० प्रतिसत थारु भाषामा र ५० प्रतिसत नेपाली भाषामा कार्यक्रम प्रसारण गरीन्छ । स्थानीय समाचार, स्थानीय लोक भाषा लोक संस्कृतीलाइ प्राथमिकता दिने भएकोले यो एफएम थारु समुदायमा एकदमै लोकप्रिय रहेको छ ।
              </p>
              
              <p className="mb-4">
                Our mission is to inform, educate, and empower the people of Nepal through quality journalism that upholds 
                the highest standards of accuracy, fairness, and integrity. We believe in the power of free press to strengthen 
                democracy and hold those in power accountable.
              </p>
              
              <p className="mb-6">
                Over the years, The Guraba Post has evolved from a small startup to become one of Nepal's most trusted 
                news sources. We have embraced digital transformation while maintaining our commitment to journalistic excellence, 
                reaching readers both in print and online across the globe.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <ul className="list-disc list-inside mb-6 space-y-2">
                <li><strong>Independence:</strong> We maintain editorial independence and report without fear or favour</li>
                <li><strong>Accuracy:</strong> We are committed to factual reporting and correcting errors promptly</li>
                <li><strong>Transparency:</strong> We operate with transparency in our reporting and business practices</li>
                <li><strong>Diversity:</strong> We represent diverse voices and perspectives in our coverage</li>
                <li><strong>Public Service:</strong> We serve the public interest above all other considerations</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Awards & Recognition</h3>
              <p className="mb-4">
                The Gurbaba Post has received numerous awards for journalistic excellence, including recognition from 
                international press organizations for our coverage of major events in Nepal's history. Our investigative 
                reporting has led to significant policy changes and greater government accountability.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Digital Innovation</h3>
              <p className="mb-4">
                As media consumption habits evolve, we have invested heavily in digital platforms to reach our audience 
                wherever they are. Our website and mobile applications provide real-time news updates, while our social 
                media presence keeps readers engaged with breaking news and in-depth analysis.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold text-red-600 mb-4">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="text-red-600" size={20} />
                  <div>
                    <div className="font-semibold">Founded</div>
                    <div className="text-gray-600">2065 B.S</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="text-red-600" size={20} />
                  <div>
                    <div className="font-semibold">Coverage</div>
                    <div className="text-gray-600">National & International</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="text-red-600" size={20} />
                  <div>
                    <div className="font-semibold">Language</div>
                    <div className="text-gray-600">Tharu/Nepali</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="text-red-600" size={20} />
                  <div>
                    <div className="font-semibold">Daily Readership</div>
                    <div className="text-gray-600">5000+</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-red-600 mb-4">Our Team</h3>
              <p className="text-gray-600 mb-4">
                Meet the dedicated professionals who make The Gurbaba F.M possible.
              </p>
              <Link 
                to="/staff" 
                className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                <Users size={16} />
                View Staff Directory
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Editorial Office</h3>
              <div className="text-gray-700 space-y-2">
                <p>Bansghadi, Bardiya</p>
                <p>P.O. Box 8559</p>
                <p>Bardiya, Nepal</p>
                <p>Phone: +977-1-4270774</p>
                <p>Email: editor@Gurababa.com</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Advertising</h3>
              <div className="text-gray-700 space-y-2">
                <p>For advertising inquiries and rates</p>
                <p>Phone: +977-1-4270051</p>
                <p>Email: ads@Gurababa.com</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
