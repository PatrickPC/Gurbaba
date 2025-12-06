-- Create a function to increment article views
CREATE OR REPLACE FUNCTION public.increment_article_views(article_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.news_articles
  SET views = views + 1
  WHERE id = article_id;
END;
$$;
