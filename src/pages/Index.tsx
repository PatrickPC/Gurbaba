import Header from '../components/Header';
import Footer from '../components/Footer';
import BreakingNews from '../components/BreakingNews';
import NewsCard from '../components/NewsCard';
import VideoSection from '../components/VideoSection';
import Advertisement from '../components/Advertisement';
import { mockNews } from '../data/mockNews';
import { useNews } from '../contexts/NewsContext';
import { getImage } from '../utils/newsHelpers';
import { useLanguage } from '../contexts/LanguageContext';

const Index = () => {
  const { articles, loading } = useNews();
  const { language } = useLanguage();
  
  // Use database articles if available, fallback to mock data
  const allNews = articles.length > 0 ? articles : mockNews;
  const recentNews = articles.length > 0
    ? articles.slice(0, 10)
    : [...mockNews]
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, 10);

  // New categories matching navbar
  const categoryNews = {
    Local: allNews.filter(news => news.category === 'Local'),
    National: allNews.filter(news => news.category === 'National'),
    Agriculture: allNews.filter(news => news.category === 'Agriculture'),
    'Culture and Lifestyle': allNews.filter(news => news.category === 'Culture and Lifestyle'),
    Foreign: allNews.filter(news => news.category === 'Foreign'),
    Sports: allNews.filter(news => news.category === 'Sports'),
  };

  // Category labels for bilingual display
  const categoryLabels: Record<string, { en: string; np: string }> = {
    Local: { en: 'LOCAL', np: 'स्थानीय' },
    National: { en: 'NATIONAL', np: 'राष्ट्रिय' },
    Agriculture: { en: 'AGRICULTURE', np: 'कृषी' },
    'Culture and Lifestyle': { en: 'CULTURE & LIFESTYLE', np: 'संस्कृति र जीवनशैली' },
    Foreign: { en: 'FOREIGN', np: 'विदेश' },
    Sports: { en: 'SPORTS', np: 'खेलकुद' },
  };

  const getCategoryLabel = (category: string) => {
    const labels = categoryLabels[category];
    if (!labels) return category.toUpperCase();
    return language === 'EN' ? labels.en : labels.np;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600">Loading news articles...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <BreakingNews />
      
      {/* Advertisement Banner - Moved to top */}
      <div className="container mx-auto px-4 pt-4">
        <Advertisement variant="banner" size="large" />
      </div>
      
      <main className="container mx-auto px-4 py-8">

       {/* Recent editorial news feed */}
        <section className="mx-auto mb-16 w-full md:w-[88%] lg:w-[84%]" aria-label="Recent news">
          <div className="space-y-12 md:space-y-16">
            {recentNews.map((news) => (
              <NewsCard key={news.id} {...news} layout="editorial" />
            ))}
          </div>
        </section>

        {/* Six Column Category Sections - New Categories */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Local */}
          <div>
            <h2 className="text-lg font-bold text-red-600 mb-4 border-b-2 border-red-600 pb-2">
              {getCategoryLabel('Local')}
            </h2>
            <div className="space-y-4">
              {categoryNews.Local.slice(0, 1).map((article) => (
                <div key={article.id} className="group">
                  <img
                    src={getImage(article)}
                    alt={article.title}
                    className="w-full h-40 object-cover rounded mb-3 group-hover:opacity-80 transition-opacity"
                  />
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    <a href={`/news/${article.id}`}>{article.title}</a>
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                </div>
              ))}
              {categoryNews.Local.slice(1, 4).map((article) => (
                <div key={article.id} className="group">
                  <h3 className="font-medium text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                    <a href={`/news/${article.id}`}>{article.title}</a>
                  </h3>
                </div>
              ))}
              {categoryNews.Local.length === 0 && (
                <p className="text-gray-500 text-sm">No articles available.</p>
              )}
            </div>
          </div>

          {/* National */}
          <div>
            <h2 className="text-lg font-bold text-red-600 mb-4 border-b-2 border-red-600 pb-2">
              {getCategoryLabel('National')}
            </h2>
            <div className="space-y-4">
              {categoryNews.National.slice(0, 1).map((article) => (
                <div key={article.id} className="group">
                  <img
                    src={getImage(article)}
                    alt={article.title}
                    className="w-full h-40 object-cover rounded mb-3 group-hover:opacity-80 transition-opacity"
                  />
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    <a href={`/news/${article.id}`}>{article.title}</a>
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                </div>
              ))}
              {categoryNews.National.slice(1, 4).map((article) => (
                <div key={article.id} className="group">
                  <h3 className="font-medium text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                    <a href={`/news/${article.id}`}>{article.title}</a>
                  </h3>
                </div>
              ))}
              {categoryNews.National.length === 0 && (
                <p className="text-gray-500 text-sm">No articles available.</p>
              )}
            </div>
          </div>

          {/* Agriculture */}
          <div>
            <h2 className="text-lg font-bold text-red-600 mb-4 border-b-2 border-red-600 pb-2">
              {getCategoryLabel('Agriculture')}
            </h2>
            <div className="space-y-4">
              {categoryNews.Agriculture.slice(0, 1).map((article) => (
                <div key={article.id} className="group">
                  <img
                    src={getImage(article)}
                    alt={article.title}
                    className="w-full h-40 object-cover rounded mb-3 group-hover:opacity-80 transition-opacity"
                  />
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    <a href={`/news/${article.id}`}>{article.title}</a>
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                </div>
              ))}
              {categoryNews.Agriculture.slice(1, 4).map((article) => (
                <div key={article.id} className="group">
                  <h3 className="font-medium text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                    <a href={`/news/${article.id}`}>{article.title}</a>
                  </h3>
                </div>
              ))}
              {categoryNews.Agriculture.length === 0 && (
                <p className="text-gray-500 text-sm">No articles available.</p>
              )}
            </div>
          </div>
        </section>

        {/* Second Row of Categories */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Culture and Lifestyle */}
          <div>
            <h2 className="text-lg font-bold text-red-600 mb-4 border-b-2 border-red-600 pb-2">
              {getCategoryLabel('Culture and Lifestyle')}
            </h2>
            <div className="space-y-4">
              {categoryNews['Culture and Lifestyle'].slice(0, 1).map((article) => (
                <div key={article.id} className="group">
                  <img
                    src={getImage(article)}
                    alt={article.title}
                    className="w-full h-40 object-cover rounded mb-3 group-hover:opacity-80 transition-opacity"
                  />
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    <a href={`/news/${article.id}`}>{article.title}</a>
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                </div>
              ))}
              {categoryNews['Culture and Lifestyle'].slice(1, 4).map((article) => (
                <div key={article.id} className="group">
                  <h3 className="font-medium text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                    <a href={`/news/${article.id}`}>{article.title}</a>
                  </h3>
                </div>
              ))}
              {categoryNews['Culture and Lifestyle'].length === 0 && (
                <p className="text-gray-500 text-sm">No articles available.</p>
              )}
            </div>
          </div>

          {/* Foreign */}
          <div>
            <h2 className="text-lg font-bold text-red-600 mb-4 border-b-2 border-red-600 pb-2">
              {getCategoryLabel('Foreign')}
            </h2>
            <div className="space-y-4">
              {categoryNews.Foreign.slice(0, 1).map((article) => (
                <div key={article.id} className="group">
                  <img
                    src={getImage(article)}
                    alt={article.title}
                    className="w-full h-40 object-cover rounded mb-3 group-hover:opacity-80 transition-opacity"
                  />
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    <a href={`/news/${article.id}`}>{article.title}</a>
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                </div>
              ))}
              {categoryNews.Foreign.slice(1, 4).map((article) => (
                <div key={article.id} className="group">
                  <h3 className="font-medium text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                    <a href={`/news/${article.id}`}>{article.title}</a>
                  </h3>
                </div>
              ))}
              {categoryNews.Foreign.length === 0 && (
                <p className="text-gray-500 text-sm">No articles available.</p>
              )}
            </div>
          </div>

          {/* Sports */}
          <div>
            <h2 className="text-lg font-bold text-red-600 mb-4 border-b-2 border-red-600 pb-2">
              {getCategoryLabel('Sports')}
            </h2>
            <div className="space-y-4">
              {categoryNews.Sports.slice(0, 1).map((article) => (
                <div key={article.id} className="group">
                  <img
                    src={getImage(article)}
                    alt={article.title}
                    className="w-full h-40 object-cover rounded mb-3 group-hover:opacity-80 transition-opacity"
                  />
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    <a href={`/news/${article.id}`}>{article.title}</a>
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                </div>
              ))}
              {categoryNews.Sports.slice(1, 4).map((article) => (
                <div key={article.id} className="group">
                  <h3 className="font-medium text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                    <a href={`/news/${article.id}`}>{article.title}</a>
                  </h3>
                </div>
              ))}
              {categoryNews.Sports.length === 0 && (
                <p className="text-gray-500 text-sm">No articles available.</p>
              )}
            </div>
          </div>
        </section>

        {/* Video Section */}
        <VideoSection />

        {/* Advertisement Inline */}
        <div className="my-8">
          <Advertisement variant="inline" size="medium" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;