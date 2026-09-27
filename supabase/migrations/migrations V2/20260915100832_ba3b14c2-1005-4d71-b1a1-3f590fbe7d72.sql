REVOKE EXECUTE ON FUNCTION public.increment_article_views(uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.increment_article_views(uuid) FROM anon;
REVOKE EXECUTE ON FUNCTION public.increment_article_views(uuid) FROM authenticated;

CREATE OR REPLACE FUNCTION public.increment_article_views(article_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  UPDATE public.news_articles
  SET views = views + 1
  WHERE id = article_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_article_views(uuid) TO anon;
GRANT EXECUTE ON FUNCTION public.increment_article_views(uuid) TO authenticated;