
import { useState, useEffect } from 'react';

const BreakingNews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const breakingNews = [
    "BRI implementation",
    "Discord in Maoist Centre", 
    "Mid-Hill Highway construction",
    "Nawalparasi hotels' summer deals",
    "Arjun Lama murder case"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingNews.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [breakingNews.length]);

  return (
    <div className="bg-red-600 text-white py-2 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <span className="bg-white text-red-600 px-3 py-1 text-sm font-bold mr-4 flex-shrink-0">
            WHAT'S NEWS:
          </span>
          <div className="flex-1 overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {breakingNews.map((news, index) => (
                <div key={index} className="flex-shrink-0 w-full">
                  <span className="text-sm">{news}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
