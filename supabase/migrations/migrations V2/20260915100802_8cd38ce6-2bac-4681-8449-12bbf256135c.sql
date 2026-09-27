
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

ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published articles" 
  ON public.news_articles 
  FOR SELECT 
  USING (true);

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

CREATE INDEX idx_news_articles_category ON public.news_articles(category);
CREATE INDEX idx_news_articles_published_at ON public.news_articles(published_at DESC);

CREATE TABLE public.videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail TEXT,
  tags TEXT[],
  duration TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view videos" 
  ON public.videos 
  FOR SELECT 
  USING (true);

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

CREATE TABLE public.breaking_news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  display_order INTEGER DEFAULT 0
);

ALTER TABLE public.breaking_news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active breaking news" 
  ON public.breaking_news 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Anyone can create breaking news" 
  ON public.breaking_news 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can update breaking news" 
  ON public.breaking_news 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Anyone can delete breaking news" 
  ON public.breaking_news 
  FOR DELETE 
  USING (true);

INSERT INTO public.breaking_news (title, display_order) VALUES
('BRI implementation discussions continue', 1),
('Discord in Maoist Centre over leadership', 2),
('Mid-Hill Highway construction progress update', 3),
('Nawalparasi hotels announce special summer deals', 4),
('Arjun Lama murder case investigation ongoing', 5);

CREATE TABLE IF NOT EXISTS public.audios (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  author text not null,
  category text not null,
  tags text[] default '{}'::text[],
  duration text,
  audio_url text not null,
  thumbnail text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

ALTER TABLE public.audios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view audios"
  ON public.audios
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create audios"
  ON public.audios
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update audios"
  ON public.audios
  FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can delete audios"
  ON public.audios
  FOR DELETE
  USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER audios_set_updated_at
BEFORE UPDATE ON public.audios
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.news_articles 
ADD COLUMN IF NOT EXISTS views integer NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_news_articles_views ON public.news_articles(views DESC);

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

ALTER TABLE public.news_articles ADD COLUMN IF NOT EXISTS audio_url text;

ALTER TABLE news_articles 
  RENAME COLUMN image TO images;

ALTER TABLE news_articles 
  ALTER COLUMN images TYPE text[] USING 
    CASE 
      WHEN images IS NULL THEN NULL
      WHEN images = '' THEN NULL
      ELSE ARRAY[images]
    END;

ALTER TABLE news_articles 
  ALTER COLUMN images SET DEFAULT '{}';

GRANT SELECT, INSERT, UPDATE, DELETE ON public.news_articles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.news_articles TO authenticated;
GRANT ALL ON public.news_articles TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.videos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.videos TO authenticated;
GRANT ALL ON public.videos TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.audios TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.audios TO authenticated;
GRANT ALL ON public.audios TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.breaking_news TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.breaking_news TO authenticated;
GRANT ALL ON public.breaking_news TO service_role;