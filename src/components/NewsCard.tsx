
import { Link } from 'react-router-dom';
import { Clock, User, Eye, BookOpen } from 'lucide-react';
import { DEFAULT_NEWS_IMAGE, DEFAULT_VIDEO_THUMBNAIL } from '@/constants/images';


interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  image?: string | null;
  images?: string[];
  author: string;
  published_at?: string;
  publishedAt?: string;
  category: string;
  readTime?: string;
  views?: number;
  featured?: boolean;
  layout?: 'card' | 'editorial';
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
  featured = false,
  layout = 'card'
}: NewsCardProps) => {
  const displayDate = published_at || publishedAt || 'Unknown date';
    const displayImage = (images && images.length > 0 ? images[0] : image) || DEFAULT_NEWS_IMAGE;

     const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = DEFAULT_NEWS_IMAGE;
  };

  if (layout === 'editorial') {
    return (
      <Link
        to={`/news/${id}`}
        className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
        aria-label={title}
      >
        <article className="border-b border-border pb-8  md:pb-16">
         
          <h2 className="text-center text-2xl font-bold leading-[1.45] py-2 text-foreground transition-colors duration-200 group-hover:text-primary sm:text-3xl md:text-4xl lg:text-[2.625rem]">
            {title}
          </h2>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground sm:text-sm">
            <span className="inline-flex items-center gap-1.5">
              <User size={14} aria-hidden="true" />
              <span>{author}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} aria-hidden="true" />
              <time>{displayDate}</time>
            </span>
            {readTime && (
              <span className="inline-flex items-center gap-1.5">
                <BookOpen size={14} aria-hidden="true" />
                <span>{readTime}</span>
              </span>
            )}
            {views !== undefined && (
              <span className="inline-flex items-center gap-1.5">
                <Eye size={14} aria-hidden="true" />
                <span>{views.toLocaleString()}</span>
              </span>
            )}
          </div>

          <div className="mt-5 aspect-[16/9] overflow-hidden rounded-md bg-muted md:mt-7 md:aspect-[2/1]">
            <img
              src={displayImage}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
              onError={handleImageError}
            />
          </div>

         <p className="mx-auto mt-5 line-clamp-4 max-w-4xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg md:mt-6 md:text-xl md:leading-8">
            {excerpt}
          </p>
        </article>
      </Link>
    );
  }

  return (
    <Link to={`/news/${id}`} className="block group">
      <article className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ${featured ? 'md:flex' : ''}`}>
        <div className={`relative overflow-hidden ${featured ? 'md:w-1/2' : ''}`}>
          <img
            src={displayImage}
            alt={title}
            className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
           onError={handleImageError}
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