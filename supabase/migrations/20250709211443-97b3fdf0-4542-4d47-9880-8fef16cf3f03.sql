DELETE FROM storage.buckets WHERE id = 'videos';

-- Create the videos bucket with increased file size limit
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'videos', 
  'videos', 
  true, 
  262144000, -- 250MB in bytes (250 * 1024 * 1024)
  ARRAY['video/mp4', 'video/mpeg', 'video/quicktime', 'video/webm', 'video/ogg', 'video/x-msvideo']
);

-- Create storage policies for video uploads
CREATE POLICY "Anyone can upload videos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'videos');

CREATE POLICY "Anyone can view videos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'videos');

CREATE POLICY "Anyone can update videos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'videos');

CREATE POLICY "Anyone can delete videos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'videos');