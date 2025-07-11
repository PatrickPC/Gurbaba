
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VideoCard from '../components/VideoCard';
import RadioPlayer from '@/components/RadioPlayer';
import { supabase } from '../integrations/supabase/Client';
import { useLanguage } from '../contexts/LanguageContext';

const Video = () => {
  const { t } = useLanguage();

  const { data: videos, isLoading, error } = useQuery({
    queryKey: ['videos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600">Loading videos...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-red-600">Error loading videos. Please try again later.</p>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('nav.video')}</h1>
          <p className="text-gray-600">Watch the latest video news and reports</p>
        </div>

        {videos && videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No videos available at the moment.</p>
            <p className="text-gray-400 text-sm mt-2">Check back later for new video content.</p>
          </div>
        )}
      </main>

      <Footer />
      <RadioPlayer/>
    </div>
  );
};

export default Video;