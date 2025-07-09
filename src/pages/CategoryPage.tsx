import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsCard from '../components/NewsCard';
import Advertisement from '../components/Advertisement';
import { mockNews } from '../data/mockNews';
import { useNews } from '../contexts/NewsContext';

const CategoryPage = () => {
  const { category } = useParams();
  const { articles, loading, getArticlesByCategory } = useNews();
  
  // Clean up category name for display
  const categoryName = category?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';
  
  // Get articles from database first, fallback to mock news
  const databaseCategoryNews = getArticlesByCategory(category || '');
  const mockCategoryNews = mockNews.filter(news => {
    const newsCategory = news.category.toLowerCase().replace(' & ', '-').replace(' ', '-');
    const urlCategory = category?.toLowerCase();
    return newsCategory === urlCategory || news.category.toLowerCase() === categoryName.toLowerCase();
  });
  
  // Use database articles if available, otherwise use mock data
  const categoryNews = databaseCategoryNews.length > 0 ? databaseCategoryNews : mockCategoryNews;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600">Loading articles...</p>
          </div>
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

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {categoryName}
          </h1>
          <p className="text-gray-600">
            Latest news and updates in {categoryName.toLowerCase()}
          </p>
          <div className="text-sm text-gray-500 mt-2">
            Database articles: {databaseCategoryNews.length} | Mock articles: {mockCategoryNews.length} | Total showing: {categoryNews.length}
          </div>
        </div>


        {/* Advertisement Banner */}
        <Advertisement variant="banner" size="medium" />


        {/* News Grid */}
        {categoryNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryNews.map((news) => (
              <NewsCard 
                key={news.id} 
                id={news.id}
                title={news.title}
                excerpt={news.excerpt}
                image={news.image}
                author={news.author}
                published_at={'published_at' in news ? news.published_at : undefined}
                publishedAt={'publishedAt' in news ? news.publishedAt : undefined}
                category={news.category}
                readTime={'readTime' in news ? news.readTime : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              No articles found in this category
            </h2>
            <p className="text-gray-500 mb-4">
              Category: {categoryName} | URL Parameter: {category}
            </p>
            <Link to="/" className="text-red-600 hover:underline">
              Return to homepage
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;