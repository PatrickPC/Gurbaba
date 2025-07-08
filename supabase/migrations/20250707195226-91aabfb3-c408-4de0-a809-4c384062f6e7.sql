-- Update RLS policies for videos table to allow public inserts like news_articles
DROP POLICY IF EXISTS "Authenticated users can create videos" ON public.videos;
DROP POLICY IF EXISTS "Authenticated users can update videos" ON public.videos;
DROP POLICY IF EXISTS "Authenticated users can delete videos" ON public.videos;

-- Create new policies that allow anyone to create, update, and delete videos (matching news_articles pattern)
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