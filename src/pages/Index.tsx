
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BreakingNews from '../components/BreakingNews';
import NewsCard from '../components/NewsCard';
import { mockNews } from '../data/mockNews';

const Index = () => {
  const [featuredNews] = useState(mockNews[0]);
  const [mainNews] = useState(mockNews.slice(1, 4));
  const [sidebarNews] = useState(mockNews.slice(4));

  const categoryNews = {
    Politics: mockNews.filter(news => news.category === 'Politics'),
    Sports: mockNews.filter(news => news.category === 'Sports'),
    Money: mockNews.filter(news => news.category === 'Money'),
    Opinion: mockNews.filter(news => news.category === 'Opinion')
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <BreakingNews />
      
      <main className="container mx-auto px-4 py-8">
        {/* Featured Story Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Featured Story */}
            <div className="lg:col-span-2">
              <NewsCard {...featuredNews} featured={true} />
            </div>
            
            {/* Sidebar News */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-red-600 mb-4 border-b-2 border-red-600 pb-2">
                  OPINION
                </h2>
                {sidebarNews.map((news) => (
                  <div key={news.id} className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2 hover:text-red-600 transition-colors">
                      <a href={`/news/${news.id}`}>{news.title}</a>
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span>By {news.author}</span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-3">{news.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main News Grid */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainNews.map((news) => (
              <NewsCard key={news.id} {...news} />
            ))}
          </div>
        </section>

        {/* Category Sections */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {Object.entries(categoryNews).map(([category, articles]) => (
            articles.length > 0 && (
              <div key={category}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-red-600 pb-2">
                  {category.toUpperCase()}
                </h2>
                <div className="space-y-6">
                  {articles.slice(0, 3).map((article) => (
                    <div key={article.id} className="flex gap-4 group">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-24 h-16 object-cover rounded group-hover:opacity-80 transition-opacity"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                          <a href={`/news/${article.id}`}>{article.title}</a>
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                        <div className="text-xs text-gray-500 mt-1">
                          By {article.author} • {article.publishedAt}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
