-- Update the videos storage bucket to allow larger file uploads (up to 200MB)
UPDATE storage.buckets 
SET file_size_limit = 209715200 -- 200MB in bytes
WHERE id = 'videos';