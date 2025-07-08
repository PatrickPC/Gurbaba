
-- Update RLS policies for videos table to allow admin operations
-- Remove the existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can create videos" ON public.videos;
DROP POLICY IF EXISTS "Authenticated users can delete videos" ON public.videos;
DROP POLICY IF EXISTS "Authenticated users can update videos" ON public.videos;

-- Create new policies that allow anyone to manage videos (since this is admin functionality)
CREATE POLICY "Anyone can create videos" 
  ON public.videos 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can update videos" 
  ON public.videos 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Anyone can delete videos" 
  ON public.videos 
  FOR DELETE 
  USING (true);

-- Also need to update storage bucket policies to allow uploads
-- First, let's make sure the video storage buckets allow public uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('videos', 'videos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('video-thumbnails', 'video-thumbnails', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Create storage policies for video uploads
INSERT INTO storage.policies (bucket_id, name, command, permissive, type, check_expression)
VALUES 
  ('videos', 'Anyone can upload videos', 'INSERT', true, 'permissive', 'true'),
  ('videos', 'Anyone can update videos', 'UPDATE', true, 'permissive', 'true'),
  ('videos', 'Anyone can delete videos', 'DELETE', true, 'permissive', 'true'),
  ('video-thumbnails', 'Anyone can upload thumbnails', 'INSERT', true, 'permissive', 'true'),
  ('video-thumbnails', 'Anyone can update thumbnails', 'UPDATE', true, 'permissive', 'true'),
  ('video-thumbnails', 'Anyone can delete thumbnails', 'DELETE', true, 'permissive', 'true')
ON CONFLICT (bucket_id, name) DO NOTHING;