
-- Create a table for videos
CREATE TABLE public.videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail TEXT,
  tags TEXT[],
  duration TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Create policy that allows everyone to view videos (public content)
CREATE POLICY "Everyone can view videos" 
  ON public.videos 
  FOR SELECT 
  USING (true);

-- Create policy that allows authenticated users to insert videos (admin only in practice)
CREATE POLICY "Authenticated users can create videos" 
  ON public.videos 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Create policy that allows authenticated users to update videos
CREATE POLICY "Authenticated users can update videos" 
  ON public.videos 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Create policy that allows authenticated users to delete videos
CREATE POLICY "Authenticated users can delete videos" 
  ON public.videos 
  FOR DELETE 
  TO authenticated
  USING (true);

-- Create storage bucket for video files
INSERT INTO storage.buckets (id, name, public) VALUES ('videos', 'videos', true);

-- Create storage bucket for video thumbnails
INSERT INTO storage.buckets (id, name, public) VALUES ('video-thumbnails', 'video-thumbnails', true);

-- Create storage policies for videos bucket
CREATE POLICY "Everyone can view videos" ON storage.objects FOR SELECT USING (bucket_id = 'videos');
CREATE POLICY "Authenticated users can upload videos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'videos');
CREATE POLICY "Authenticated users can update videos" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'videos');
CREATE POLICY "Authenticated users can delete videos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'videos');

-- Create storage policies for video-thumbnails bucket
CREATE POLICY "Everyone can view video thumbnails" ON storage.objects FOR SELECT USING (bucket_id = 'video-thumbnails');
CREATE POLICY "Authenticated users can upload video thumbnails" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'video-thumbnails');
CREATE POLICY "Authenticated users can update video thumbnails" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'video-thumbnails');
CREATE POLICY "Authenticated users can delete video thumbnails" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'video-thumbnails');