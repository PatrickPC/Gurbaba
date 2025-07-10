-- Set a more conservative file size limit and ensure proper configuration
UPDATE storage.buckets 
SET file_size_limit = 104857600 -- 100MB in bytes (100 * 1024 * 1024)
WHERE id = 'videos';

-- Also ensure the bucket has the right configuration
UPDATE storage.buckets 
SET 
  public = true,
  allowed_mime_types = ARRAY['video/mp4', 'video/mpeg', 'video/quicktime', 'video/webm', 'video/ogg', 'video/x-msvideo', 'video/avi']
WHERE id = 'videos';