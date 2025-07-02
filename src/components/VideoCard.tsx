
import { Play } from 'lucide-react';
import { useState } from 'react';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
  publishedDate: string;
  videoUrl: string;
}

const VideoCard = ({ id, title, thumbnail, duration, author, publishedDate, videoUrl }: VideoCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <div className="group cursor-pointer">
      <div className="relative mb-3">
        {!isPlaying ? (
          <>
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-48 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handlePlayVideo}
                className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors shadow-lg"
              >
                <Play size={24} fill="white" />
              </button>
            </div>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
              {duration}
            </div>
          </>
        ) : (
          <video
            src={videoUrl}
            controls
            autoPlay
            className="w-full h-48 object-cover rounded-lg"
          />
        )}
      </div>
      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-red-600 transition-colors line-clamp-2">
        {title}
      </h3>
      <div className="text-sm text-gray-600">
        <p className="mb-1">By {author}</p>
        <p>{publishedDate}</p>
      </div>
    </div>
  );
};

export default VideoCard;