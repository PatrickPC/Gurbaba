
import { Link } from 'react-router-dom';
import { Clock, User, Eye } from 'lucide-react';


interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  image?: string | null;
  images?: string[];  author: string;
  published_at?: string;
  publishedAt?: string;
  category: string;
  readTime?: string;
  views?: number;
  featured?: boolean;
}

const NewsCard = ({ 
  id, 
  title, 
  excerpt, 
  image, 
  images,
  author, 
  published_at,
  publishedAt, 
  category, 
  readTime,
  views,
  featured = false 
}: NewsCardProps) => {
  const displayDate = published_at || publishedAt || 'Unknown date';
  const displayImage = (images && images.length > 0 ? images[0] : image) || 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800';

  return (
    <Link to={`/news/${id}`} className="block group">
      <article className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ${featured ? 'md:flex' : ''}`}>
        <div className={`relative overflow-hidden ${featured ? 'md:w-1/2' : ''}`}>
          <img
            src={displayImage}
            alt={title}
            className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Fallback to default image if uploaded image fails to load
              e.currentTarget.src = 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800';
            }}
          />
          <div className="absolute top-4 left-4">
            <span className="bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded">
              {category}
            </span>
          </div>
        </div>
        
        <div className={`p-6 ${featured ? 'md:w-1/2' : ''}`}>
          <h2 className={`font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors ${featured ? 'text-xl md:text-2xl' : 'text-lg'}`}>
            {title}
          </h2>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {excerpt}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{author}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <time>{displayDate}</time>
                {readTime && <span>• {readTime}</span>}
              </div>
              {views !== undefined && (
                <div className="flex items-center gap-1">
                  <Eye size={16} />
                  <span>{views.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default NewsCard;