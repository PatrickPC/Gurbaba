import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BreakingNews from '../components/BreakingNews';
import NewsCard from '../components/NewsCard';
import VideoSection from '../components/VideoSection';
import Advertisement from '../components/Advertisement';
import RadioPlayer from '../components/RadioPlayer';
import { mockNews } from '../data/mockNews';
import { useNews } from '../contexts/NewsContext';
import { getPublishedDate } from '../utils/newsHelpers';

const Index = () => {
  const { articles, loading } = useNews();
  
  // Use database articles if available, fallback to mock data
  const allNews = articles.length > 0 ? articles : mockNews;
  const displayFeaturedNews = articles.length > 0 ? articles[0] : mockNews[0];
  const displayMainNews = articles.length > 1 ? articles.slice(1, 4) : mockNews.slice(1, 4);

  // Get local news articles from database first, then fallback to mock data
  const sidebarNews = articles.filter(news => news.category === 'Local').length > 0 
    ? articles.filter(news => news.category === 'Local')
    : mockNews.filter(news => news.category === 'Local');

  const categoryNews = {
    Politics: allNews.filter(news => news.category === 'Politics'),
    Sports: allNews.filter(news => news.category === 'Sports'),
    Money: allNews.filter(news => news.category === 'Money'),
    'Science & Technology': allNews.filter(news => news.category === 'Science & Technology'),
    World: allNews.filter(news => news.category === 'World'),
    Features: allNews.filter(news => news.category === 'Features'),
    Columns: allNews.filter(news => news.category === 'Columns'),
    Editorial: allNews.filter(news => news.category === 'Editorial'),
    Interviews: allNews.filter(news => news.category === 'Interviews')
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
        {/* Featured Story Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Featured Story */}
            <div className="lg:col-span-2">
              <NewsCard {...displayFeaturedNews} featured={true} />
            </div>
            
            {/* Sidebar News */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-red-600 mb-4 border-b-2 border-red-600 pb-2">
                  LOCAL NEWS
                </h2>
                {sidebarNews.slice(0, 3).map((news) => (
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
                {sidebarNews.length === 0 && (
                  <p className="text-gray-500 text-sm">No opinion articles available.</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Main News Grid */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayMainNews.map((news) => (
              <NewsCard key={news.id} {...news} />
            ))}
          </div>
        </section>


        {/* Show Database Articles - Moved here above category sections */}
        {articles.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-red-600 mb-6 border-b-2 border-red-600 pb-2">
              LATEST NEWS ({articles.length} articles)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.slice(0, 6).map((news) => (
                <NewsCard key={news.id} {...news} />
              ))}
            </div>
          </section>
        )}

        {/* Four Column Category Sections */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Science & Technology */}
          <div>
            <h2 className="text-lg font-bold text-red-600 mb-4 border-b-2 border-red-600 pb-2">
              SCIENCE & TECHNOLOGY
            </h2>
            <div className="space-y-4">
              {categoryNews['Science & Technology'].slice(0, 1).map((article) => (
                <div key={article.id} className="group">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-32 object-cover rounded mb-3 group-hover:opacity-80 transition-opacity"
                  />
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    <a href={`/news/${article.id}`}>{article.title}</a>
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                </div>
              ))}
              {categoryNews['Science & Technology'].slice(1, 4).map((article) => (
                <div key={article.id} className="group">
                  <h3 className="font-medium text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                    <a href={`/news/${article.id}`}>{article.title}</a>
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sports */}
          <div>
            <h2 className="text-lg font-bold text-red-600 mb-4 border-b-2 border-red-600 pb-2">
              SPORTS
            </h2>
            <div className="space-y-4">
              {categoryNews.Sports.slice(0, 1).map((article) => (
                <div key={article.id} className="group">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-32 object-cover rounded mb-3 group-hover:opacity-80 transition-opacity"
                  />
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    <a href={`/news/${article.id}`}>{article.title}</a>
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                </div>
              ))}
              <div className="space-y-2">
                <p className="text-sm text-gray-700">Bagmati win 15th Central President Running Shield with 36 golds</p>
                <p className="text-sm text-gray-700">Junior athletes shatter more records</p>
                <p className="text-sm text-gray-700">Nepal to play West Indies in September</p>
                <p className="text-sm text-gray-700">Nepal's 12th man: Diaspora fans power the Rhinos in Scotland</p>
              </div>
            </div>
          </div>

          {/* World */}
          <div>
            <h2 className="text-lg font-bold text-red-600 mb-4 border-b-2 border-red-600 pb-2">
              WORLD
            </h2>
            <div className="space-y-4">
              {categoryNews.World.slice(0, 1).map((article) => (
                <div key={article.id} className="group">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-32 object-cover rounded mb-3 group-hover:opacity-80 transition-opacity"
                  />
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    <a href={`/news/${article.id}`}>{article.title}</a>
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                </div>
              ))}
              <div className="space-y-2">
                <p className="text-sm text-gray-700">Helicopter crash in northern India kills 7 on Hindu pilgrimage route</p>
                <p className="text-sm text-gray-700">Minnesota manhunt underway for suspect in deadly shooting of Democratic state lawmakers</p>
                <p className="text-sm text-gray-700">Israel and Iran strike at each other in new wave of attacks</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-lg font-bold text-red-600 mb-4 border-b-2 border-red-600 pb-2">
              FEATURES
            </h2>
            <div className="space-y-4">
              {categoryNews.Features.slice(0, 1).map((article) => (
                <div key={article.id} className="group">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-32 object-cover rounded mb-3 group-hover:opacity-80 transition-opacity"
                  />
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    <a href={`/news/${article.id}`}>{article.title}</a>
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                </div>
              ))}
              <div className="space-y-2">
                <p className="text-sm text-gray-700">Kites over Kathmandu sky</p>
                <p className="text-sm text-gray-700">The Kumari tradition lives on, balancing ancient and modern values</p>
                <p className="text-sm text-gray-700">The royal roots of Central Zoo</p>
              </div>
            </div>
          </div>
        </section>

        {/* Four Column Lower Sections */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Columns */}
          <div>
            <h2 className="text-lg font-bold text-red-600 mb-4 border-b-2 border-red-600 pb-2">
              COLUMNS
            </h2>
            <div className="space-y-4">
              {categoryNews.Columns.slice(0, 1).map((article) => (
                <div key={article.id} className="group">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-32 object-cover rounded mb-3 group-hover:opacity-80 transition-opacity"
                  />
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    <a href={`/news/${article.id}`}>{article.title}</a>
                  </h3>
                </div>
              ))}
              <div className="space-y-2">
                <p className="text-sm text-gray-700">Uniting against divisive politics</p>
                <p className="text-sm text-gray-700">Anthropocene in international relations</p>
                <p className="text-sm text-gray-700">Shaping the contest of the century</p>
              </div>
            </div>
          </div>

          {/* Editorial */}
          <div>
            <h2 className="text-lg font-bold text-red-600 mb-4 border-b-2 border-red-600 pb-2">
              EDITORIAL
            </h2>
            <div className="space-y-4">
              {categoryNews.Editorial.slice(0, 1).map((article) => (
                <div key={article.id} className="group">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-32 object-cover rounded mb-3 group-hover:opacity-80 transition-opacity"
                  />
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    <a href={`/news/${article.id}`}>{article.title}</a>
                  </h3>
                </div>
              ))}
              <div className="space-y-2">
                <p className="text-sm text-gray-700">Pride and procedure</p>
                <p className="text-sm text-gray-700">Holding House hostage</p>
                <p className="text-sm text-gray-700">Madhav Nepal's hard landing</p>
              </div>
            </div>
          </div>

          {/* Interviews */}
          <div>
            <h2 className="text-lg font-bold text-red-600 mb-4 border-b-2 border-red-600 pb-2">
              INTERVIEWS
            </h2>
            <div className="space-y-4">
              {categoryNews.Interviews.slice(0, 1).map((article) => (
                <div key={article.id} className="group">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-32 object-cover rounded mb-3 group-hover:opacity-80 transition-opacity"
                  />
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    <a href={`/news/${article.id}`}>{article.title}</a>
                  </h3>
                </div>
              ))}
              <div className="space-y-2">
                <p className="text-sm text-gray-700">No budget for mega projects without breaking old structural constraints</p>
                <p className="text-sm text-gray-700">Sagarmatha Sambaad is a learning opportunity for Nepal</p>
                <p className="text-sm text-gray-700">Nepali judiciary is not sensitised on caste-based discrimination</p>
              </div>
            </div>
          </div>

          {/* Politics - Replaced Weather section */}


          <div>
            <h2 className="text-lg font-bold text-red-600 mb-4 border-b-2 border-red-600 pb-2">
              POLITICS
            </h2>
            <div className="space-y-4">
            {categoryNews.Politics.slice(0, 1).map((article) => (
                <div key={article.id} className="group">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-32 object-cover rounded mb-3 group-hover:opacity-80 transition-opacity"
                  />
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    <a href={`/news/${article.id}`}>{article.title}</a>
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                </div>
              ))}
              {categoryNews.Politics.slice(1, 4).map((article) => (
                <div key={article.id} className="group">
                  <h3 className="font-medium text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                    <a href={`/news/${article.id}`}>{article.title}</a>
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                </div>
              ))}
              {categoryNews.Politics.length === 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">Coalition government stability discussions</p>
                  <p className="text-sm text-gray-700">Parliamentary session updates</p>
                  <p className="text-sm text-gray-700">Provincial assembly proceedings</p>
                  <p className="text-sm text-gray-700">Political party merger talks</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Original Category Sections */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {Object.entries({
            Politics: categoryNews.Politics,
            Money: categoryNews.Money
          }).map(([category, articles]) => (
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
                          By {article.author} • {getPublishedDate(article)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </section>

         {/* Advertisement Inline */}
         <Advertisement variant="inline" size="medium" />

        {/* Video News Section - Moved to Bottom */}
        <VideoSection />
      </main>

      <RadioPlayer />

      <Footer />
    </div>
  );
};

export default Index;