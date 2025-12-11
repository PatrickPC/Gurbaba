
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsCard from '../components/NewsCard';
import VideoCard from '../components/VideoCard';
import Advertisement from '../components/Advertisement';
import { mockNews } from '../data/mockNews';
import { useNews } from '../contexts/NewsContext';
import { supabase } from '../integrations/supabase/Client';

const CategoryPage = () => {
  const { category } = useParams();
  const { articles, loading, getArticlesByCategory } = useNews();
  
  // Clean up category name for display
  const categoryName = category?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';
  
  // Check if this is a video category
  const isVideoCategory = category === 'video' || category === 'interview';
  
  // Fetch videos if this is a video category
  const { data: videos, isLoading: videosLoading } = useQuery({
    queryKey: ['videos', category],
    queryFn: async () => {
      if (!isVideoCategory) return [];
      
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('category', categoryName)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: isVideoCategory,
  });
  
  // Get articles from database first, fallback to mock news
  const databaseCategoryNews = getArticlesByCategory(category || '');
  const mockCategoryNews = mockNews.filter(news => {
    const newsCategory = news.category.toLowerCase().replace(' & ', '-').replace(' ', '-');
    const urlCategory = category?.toLowerCase();
    return newsCategory === urlCategory || news.category.toLowerCase() === categoryName.toLowerCase();
  });
  
  // Use database articles if available, otherwise use mock data
  const categoryNews = databaseCategoryNews.length > 0 ? databaseCategoryNews : mockCategoryNews;

  if (loading || (isVideoCategory && videosLoading)) {
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
            {isVideoCategory 
              ? `Latest ${categoryName.toLowerCase()} content`
              : `Latest news and updates in ${categoryName.toLowerCase()}`
            }
          </p>
          {!isVideoCategory && (
            <div className="text-sm text-gray-500 mt-2">
              Database articles: {databaseCategoryNews.length} | Mock articles: {mockCategoryNews.length} | Total showing: {categoryNews.length}
            </div>
          )}
          {isVideoCategory && videos && (
            <div className="text-sm text-gray-500 mt-2">
              Total videos: {videos.length}
            </div>
          )}
        </div>

        {/* Advertisement Banner */}
        <Advertisement variant="banner" size="medium" />

        {/* Video Grid for video categories */}
        {isVideoCategory && videos && videos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                id={video.id}
                title={video.title}
                thumbnail={video.thumbnail || 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=800'}
                duration={video.duration || '0:00'}
                author={video.author}
                publishedDate={new Date(video.created_at).toLocaleDateString()}
                videoUrl={video.video_url}
              />
            ))}
          </div>
        )}

        {/* No videos message */}
        {isVideoCategory && (!videos || videos.length === 0) && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              No {categoryName.toLowerCase()} content found
            </h2>
            <p className="text-gray-500 mb-4">
              Check back later for new {categoryName.toLowerCase()} content
            </p>
            <Link to="/" className="text-red-600 hover:underline">
              Return to homepage
            </Link>
          </div>
        )}

        {/* News Grid for non-video categories */}
        {!isVideoCategory && categoryNews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryNews.map((news) => (
              <NewsCard 
                key={news.id} 
                id={news.id}
                title={news.title}
                excerpt={news.excerpt}
                image={'image' in news ? news.image : undefined}
                images={'images' in news ? news.images : undefined}
                author={news.author}
                published_at={'published_at' in news ? news.published_at : undefined}
                publishedAt={'publishedAt' in news ? news.publishedAt : undefined}
                category={news.category}
                readTime={'readTime' in news ? news.readTime : undefined}
                views={'views' in news ? news.views : undefined}
              />
            ))}
          </div>
        )}
        
        {/* No articles message for non-video categories */}
        {!isVideoCategory && categoryNews.length === 0 && (
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