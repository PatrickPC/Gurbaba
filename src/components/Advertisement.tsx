import { ExternalLink } from 'lucide-react';

interface AdvertisementProps {
  variant?: 'banner' | 'sidebar' | 'inline';
  size?: 'small' | 'medium' | 'large';
}

const Advertisement = ({ variant = 'banner', size = 'medium' }: AdvertisementProps) => {
  const getAdContent = () => {
    const ads = [
      {
        title: "",
        description: "",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop",
        link: "#",
        color: "from-blue-600 to-blue-800"
      },
      {
        title: "",
        description: "",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=200&fit=crop",
        link: "#",
        color: "from-green-600 to-green-800"
      },
      {
        title: "",
        description: "",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop",
        link: "#",
        color: "from-purple-600 to-purple-800"
      }
    ];

    return ads[Math.floor(Math.random() * ads.length)];
  };

  const ad = getAdContent();

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return variant === 'banner' ? 'h-24' : 'h-32';
      case 'large':
        return variant === 'banner' ? 'h-40' : 'h-48';
      default:
        return variant === 'banner' ? 'h-32' : 'h-40';
    }
  };

  const getLayoutClasses = () => {
    switch (variant) {
      case 'sidebar':
        return 'max-w-sm mx-auto';
      case 'inline':
        return 'max-w-2xl mx-auto';
      default:
        return 'w-full';
    }
  };

  return (
    <div className={`${getLayoutClasses()} mb-6`}>
      <div className="bg-gray-100 border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between p-2 bg-gray-50 border-b">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Advertisement</span>
          <ExternalLink size={12} className="text-gray-400" />
        </div>
        
        <div className={`relative ${getSizeClasses()} overflow-hidden`}>
          <div className={`absolute inset-0 bg-gradient-to-r ${ad.color} opacity-90`}></div>
          <img 
            src={ad.image} 
            alt={ad.title}
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
          />
          <div className="relative h-full flex items-center justify-between p-4 text-white">
            <div className="flex-1">
              <h3 className="font-bold text-sm md:text-base mb-1">{ad.title}</h3>
              <p className="text-xs md:text-sm opacity-90 line-clamp-2">{ad.description}</p>
            </div>
            <button 
              onClick={() => window.open(ad.link, '_blank')}
              className="ml-4 bg-white bg-opacity-20 hover:bg-opacity-30 transition-all px-3 py-1 rounded text-xs font-medium"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertisement;