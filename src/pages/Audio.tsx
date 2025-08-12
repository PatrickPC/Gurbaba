import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AudioCard from '../components/AudioCard';
import { supabase } from '../integrations/supabase/Client';

const Audio = () => {
  const { data: audios, isLoading, error } = useQuery({
    queryKey: ['audios'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('audios')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Audio</h1>
          <p className="text-gray-600">Listen to the latest audio news and podcasts</p>
        </header>

        {isLoading && (
          <div className="text-center"><p className="text-gray-600">Loading audios...</p></div>
        )}
        {error && (
          <div className="text-center"><p className="text-red-600">Error loading audios. Please try again later.</p></div>
        )}
        {audios && audios.length > 0 ? (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {audios.map((audio: any) => (
              <AudioCard
                key={audio.id}
                id={audio.id}
                title={audio.title}
                thumbnail={audio.thumbnail}
                duration={audio.duration}
                author={audio.author}
                publishedDate={new Date(audio.created_at).toLocaleDateString()}
                audioUrl={audio.audio_url}
              />
            ))}
          </section>
        ) : (!isLoading && !error) ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No audio content available at the moment.</p>
            <p className="text-gray-400 text-sm mt-2">Check back later for new audio content.</p>
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

export default Audio;