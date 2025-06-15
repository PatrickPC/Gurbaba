
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Share2, Facebook, Twitter, Mail, Bookmark } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { mockNews } from '../data/mockNews';

const NewsDetail = () => {
  const { id } = useParams();
  const article = mockNews.find(news => news.id === id);
  const relatedNews = mockNews.filter(news => news.id !== id && news.category === article?.category).slice(0, 4);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Article not found</h1>
          <Link to="/" className="text-red-600 hover:underline mt-4 inline-block">
            Return to homepage
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link to="/" className="flex items-center text-gray-600 hover:text-red-600 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back to Homepage
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Article */}
          <article className="lg:col-span-3 bg-white rounded-lg shadow-md overflow-hidden">
            {/* Article Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="mb-4">
                <span className="bg-red-600 text-white px-3 py-1 text-sm font-semibold rounded">
                  {article.category}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {article.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">
                {article.excerpt}
              </p>
              
              <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>Published at: {article.publishedAt}</span>
                  </div>
                  {article.updatedAt && (
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>Updated at: {article.updatedAt}</span>
                    </div>
                  )}
                  {article.location && (
                    <span>📍 {article.location}</span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Bookmark size={16} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Article Image */}
            <div className="relative">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 text-sm rounded">
                Post Illustration
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6">
              <div className="prose max-w-none">
                {article.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 px-3 py-1 text-sm rounded-full hover:bg-gray-200 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Sharing */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Share this article</h3>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                    <Facebook size={16} />
                    Share
                  </button>
                  <button className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors">
                    <Twitter size={16} />
                    Tweet
                  </button>
                  <button className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                    <Mail size={16} />
                    Email
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-red-600 mb-6 border-b-2 border-red-600 pb-2">
                EDITOR'S PICKS
              </h2>
              
              <div className="space-y-6">
                {relatedNews.map((news) => (
                  <Link key={news.id} to={`/news/${news.id}`} className="block group">
                    <div className="flex gap-3">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-20 h-16 object-cover rounded group-hover:opacity-80 transition-opacity"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm text-gray-900 mb-1 group-hover:text-red-600 transition-colors line-clamp-2">
                          {news.title}
                        </h3>
                        <div className="text-xs text-gray-500">
                          {news.publishedAt}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewsDetail;
