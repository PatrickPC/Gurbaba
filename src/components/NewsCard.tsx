import { Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';

interface NewsCardProps {
  key: string;
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  publishedAt: string;
  category: string;
  featured?: boolean;
}

const NewsCard = ({ id, title, excerpt, image, author, publishedAt, category, featured = false }: NewsCardProps) => {
  return (
    <Link to={`/news/${id}`} className="block group">
      <article className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ${featured ? 'md:flex' : ''}`}>
        <div className={`relative overflow-hidden ${featured ? 'md:w-1/2' : ''}`}>
          <img
            src={image}
            alt={title}
            className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
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
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <time>{publishedAt}</time>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default NewsCard;
