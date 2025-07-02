
-- Create a storage bucket for news article images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'news-images', 
  'news-images', 
  true, 
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- Create storage policies to allow anyone to upload, view, and manage images
CREATE POLICY "Anyone can view news images" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'news-images');

CREATE POLICY "Anyone can upload news images" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'news-images');

CREATE POLICY "Anyone can update news images" 
  ON storage.objects 
  FOR UPDATE 
  USING (bucket_id = 'news-images');

CREATE POLICY "Anyone can delete news images" 
  ON storage.objects 
  FOR DELETE 
  USING (bucket_id = 'news-images');