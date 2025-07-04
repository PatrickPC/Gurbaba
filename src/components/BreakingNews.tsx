
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../integrations/supabase/Client';

interface BreakingNewsItem {
  id: string;
  title: string;
  display_order: number;
}

const BreakingNews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [breakingNews, setBreakingNews] = useState<BreakingNewsItem[]>([]);
  const { t } = useLanguage();

  const fetchBreakingNews = async () => {
    try {
      const { data, error } = await supabase
        .from('breaking_news')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching breaking news:', error);
        return;
      }

      setBreakingNews(data || []);
    } catch (error) {
      console.error('Error fetching breaking news:', error);
    }
  };

  useEffect(() => {
    fetchBreakingNews();
  }, []);

  useEffect(() => {
    if (breakingNews.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingNews.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [breakingNews.length]);

  if (breakingNews.length === 0) {
    return null;
  }

  return (
    <div className="bg-red-600 text-white py-2 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <span className="bg-white text-red-600 px-3 py-1 text-sm font-bold mr-4 flex-shrink-0">
            {t("WHAT'S NEWS")}
          </span>
          <div className="flex-1 overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {breakingNews.map((news, index) => (
                <div key={news.id} className="flex-shrink-0 w-full">
                  <span className="text-sm">{news.title}</span>
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