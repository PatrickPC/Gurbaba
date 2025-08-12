import { Play } from 'lucide-react';
import { useState } from 'react';

interface AudioCardProps {
  id: string;
  title: string;
  thumbnail?: string;
  duration?: string;
  author: string;
  publishedDate: string;
  audioUrl: string;
}

const AudioCard = ({ id, title, thumbnail, duration = '0:00', author, publishedDate, audioUrl }: AudioCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handlePlayAudio = () => setIsPlaying(true);
  const handleImageError = () => setImageError(true);

  const displayThumbnail = imageError || !thumbnail
    ? 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800'
    : thumbnail;

  return (
    <article className="group cursor-pointer">
      <div className="relative mb-3">
        {!isPlaying ? (
          <>
            <img
              src={displayThumbnail}
              alt={`${title} audio thumbnail`}
              className="w-full h-48 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
              onError={handleImageError}
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handlePlayAudio}
                className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors shadow-lg"
                aria-label={`Play ${title}`}
              >
                <Play size={24} fill="white" />
              </button>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
              {duration}
            </div>
          </>
        ) : (
          <audio src={audioUrl} controls autoPlay className="w-full">
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-red-600 transition-colors line-clamp-2">
        {title}
      </h3>
      <div className="text-sm text-gray-600">
        <p className="mb-1">By {author}</p>
        <p>{publishedDate}</p>
      </div>
    </article>
  );
};

export default AudioCard;