

-- Drop the existing restrictive storage policies that require authentication
DROP POLICY IF EXISTS "Authenticated users can upload videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload video thumbnails" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update video thumbnails" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete video thumbnails" ON storage.objects;

-- Create new permissive policies that allow anyone to upload (since this is admin functionality)
CREATE POLICY "Anyone can upload to videos bucket" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'videos');

CREATE POLICY "Anyone can update in videos bucket" 
  ON storage.objects 
  FOR UPDATE 
  USING (bucket_id = 'videos');

CREATE POLICY "Anyone can delete from videos bucket" 
  ON storage.objects 
  FOR DELETE 
  USING (bucket_id = 'videos');

CREATE POLICY "Anyone can upload to video-thumbnails bucket" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'video-thumbnails');

CREATE POLICY "Anyone can update in video-thumbnails bucket" 
  ON storage.objects 
  FOR UPDATE 
  USING (bucket_id = 'video-thumbnails');

CREATE POLICY "Anyone can delete from video-thumbnails bucket" 
  ON storage.objects 
  FOR DELETE 
  USING (bucket_id = 'video-thumbnails');
