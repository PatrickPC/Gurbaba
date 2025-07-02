
-- Create a table for news articles
CREATE TABLE public.news_articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to make articles publicly readable
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

-- Create policy that allows everyone to read articles (public access)
CREATE POLICY "Anyone can view published articles" 
  ON public.news_articles 
  FOR SELECT 
  USING (true);

-- Create policy that allows authenticated users to insert articles
CREATE POLICY "Authenticated users can create articles" 
  ON public.news_articles 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Create policy that allows authenticated users to update articles
CREATE POLICY "Authenticated users can update articles" 
  ON public.news_articles 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Create policy that allows authenticated users to delete articles
CREATE POLICY "Authenticated users can delete articles" 
  ON public.news_articles 
  FOR DELETE 
  TO authenticated
  USING (true);

-- Create an index for better performance on category queries
CREATE INDEX idx_news_articles_category ON public.news_articles(category);

-- Create an index for better performance on published_at queries
CREATE INDEX idx_news_articles_published_at ON public.news_articles(published_at DESC);