
// import VideoCard from './VideoCard';

// const VideoSection = () => {
//   const videos = [
//     {
//       id: '1',
//       title: 'Breaking: Major Political Development in Nepal',
//       thumbnail: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=800',
//       duration: '5:32',
//       author: 'News Team',
//       publishedDate: 'June 15, 2025',
//       videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
//     },
//     {
//       id: '2',
//       title: 'Economic Recovery: Nepal\'s Growth Story',
//       thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
//       duration: '8:15',
//       author: 'Economic Desk',
//       publishedDate: 'June 14, 2025',
//       videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
//     },
//     {
//       id: '3',
//       title: 'Sports Highlights: Cricket Championship Finals',
//       thumbnail: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
//       duration: '12:45',
//       author: 'Sports Team',
//       publishedDate: 'June 13, 2025',
//       videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
//     },
//     {
//       id: '4',
//       title: 'Technology Innovation in Kathmandu Valley',
//       thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800',
//       duration: '6:20',
//       author: 'Tech Reporter',
//       publishedDate: 'June 12, 2025',
//       videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
//     },
//     {
//       id: '5',
//       title: 'Cultural Festival Celebration in Nepal',
//       thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
//       duration: '9:30',
//       author: 'Culture Desk',
//       publishedDate: 'June 11, 2025',
//       videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
//     },
//     {
//       id: '6',
//       title: 'Weather Update: Monsoon Season Outlook',
//       thumbnail: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800',
//       duration: '4:18',
//       author: 'Weather Team',
//       publishedDate: 'June 10, 2025',
//       videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
//     }
//   ];

//   return (
//     <section className="mb-12">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-red-600 border-b-2 border-red-600 pb-2">
//           VIDEO NEWS
//         </h2>
//         <button className="text-red-600 hover:text-red-700 font-medium text-sm">
//           View All Videos →
//         </button>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {videos.slice(0, 6).map((video) => (
//           <VideoCard key={video.id} {...video} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default VideoSection;



import { useQuery } from '@tanstack/react-query';
import VideoCard from './VideoCard';
import { supabase } from '../integrations/supabase/Client';

const VideoSection = () => {
  const { data: videos, isLoading, error } = useQuery({
    queryKey: ['videos-homepage'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-red-600 border-b-2 border-red-600 pb-2">
            VIDEO NEWS
          </h2>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">Loading videos...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-red-600 border-b-2 border-red-600 pb-2">
            VIDEO NEWS
          </h2>
        </div>
        <div className="text-center py-8">
          <p className="text-red-500">Error loading videos</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-red-600 border-b-2 border-red-600 pb-2">
          VIDEO NEWS
        </h2>
        <button className="text-red-600 hover:text-red-700 font-medium text-sm">
          View All Videos →
        </button>
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
        <div className="text-center py-8">
          <p className="text-gray-500">No videos available at the moment.</p>
          <p className="text-gray-400 text-sm mt-2">Upload videos from the admin panel to see them here.</p>
        </div>
      )}
    </section>
  );
};

export default VideoSection;