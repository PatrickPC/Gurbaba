
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

CREATE POLICY "Everyone can view videos" ON storage.objects FOR SELECT USING (bucket_id = 'videos');
CREATE POLICY "Anyone can upload videos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'videos');
CREATE POLICY "Anyone can update videos" ON storage.objects FOR UPDATE USING (bucket_id = 'videos');
CREATE POLICY "Anyone can delete videos" ON storage.objects FOR DELETE USING (bucket_id = 'videos');

CREATE POLICY "Everyone can view video thumbnails" ON storage.objects FOR SELECT USING (bucket_id = 'video-thumbnails');
CREATE POLICY "Anyone can upload video thumbnails" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'video-thumbnails');
CREATE POLICY "Anyone can update video thumbnails" ON storage.objects FOR UPDATE USING (bucket_id = 'video-thumbnails');
CREATE POLICY "Anyone can delete video thumbnails" ON storage.objects FOR DELETE USING (bucket_id = 'video-thumbnails');

CREATE POLICY "Public can read audios bucket"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'audios');

CREATE POLICY "Public can read audio-thumbnails bucket"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'audio-thumbnails');

CREATE POLICY "Anyone can upload to audios bucket"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'audios');

CREATE POLICY "Anyone can update audios bucket"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'audios');

CREATE POLICY "Anyone can delete from audios bucket"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'audios');

CREATE POLICY "Anyone can upload to audio-thumbnails bucket"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'audio-thumbnails');

CREATE POLICY "Anyone can update audio-thumbnails bucket"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'audio-thumbnails');

CREATE POLICY "Anyone can delete from audio-thumbnails bucket"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'audio-thumbnails');