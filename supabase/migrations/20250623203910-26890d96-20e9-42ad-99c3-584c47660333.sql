
-- Drop the existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can create articles" ON public.news_articles;
DROP POLICY IF EXISTS "Authenticated users can update articles" ON public.news_articles;
DROP POLICY IF EXISTS "Authenticated users can delete articles" ON public.news_articles;

-- Create new policies that allow anyone to insert/update/delete articles
-- This works with your localStorage-based admin authentication
CREATE POLICY "Anyone can create articles" 
  ON public.news_articles 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can update articles" 
  ON public.news_articles 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Anyone can delete articles" 
  ON public.news_articles 
  FOR DELETE 
  USING (true);