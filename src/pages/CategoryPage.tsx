
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsCard from '../components/NewsCard';
import { mockNews } from '../data/mockNews';

const CategoryPage = () => {
  const { category } = useParams();
  const categoryName = category?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';
  
  const categoryNews = mockNews.filter(news => 
    news.category.toLowerCase().replace(' & ', '-').replace(' ', '-') === category
  );

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
        </div>

        {/* News Grid */}
        {categoryNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryNews.map((news) => (
              <NewsCard key={news.id} {...news} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              No articles found in this category
            </h2>
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
