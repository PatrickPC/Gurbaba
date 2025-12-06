-- Add views column to news_articles table
ALTER TABLE public.news_articles 
ADD COLUMN IF NOT EXISTS views integer NOT NULL DEFAULT 0;

-- Create an index on views for performance when sorting by most viewed
CREATE INDEX IF NOT EXISTS idx_news_articles_views ON public.news_articles(views DESC);