-- Update the existing videos bucket with increased file size limit
UPDATE storage.buckets 
SET 
  file_size_limit = 262144000, -- 250MB in bytes (250 * 1024 * 1024)
  allowed_mime_types = ARRAY['video/mp4', 'video/mpeg', 'video/quicktime', 'video/webm', 'video/ogg', 'video/x-msvideo']
WHERE id = 'videos';

-- Ensure storage policies exist for video uploads
DO $$
BEGIN
  -- Create policies only if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Anyone can upload videos'
  ) THEN
    EXECUTE 'CREATE POLICY "Anyone can upload videos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = ''videos'')';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Anyone can view videos'
  ) THEN
    EXECUTE 'CREATE POLICY "Anyone can view videos" ON storage.objects FOR SELECT USING (bucket_id = ''videos'')';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Anyone can update videos'
  ) THEN
    EXECUTE 'CREATE POLICY "Anyone can update videos" ON storage.objects FOR UPDATE USING (bucket_id = ''videos'')';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Anyone can delete videos'
  ) THEN
    EXECUTE 'CREATE POLICY "Anyone can delete videos" ON storage.objects FOR DELETE USING (bucket_id = ''videos'')';
  END IF;
END
$$;