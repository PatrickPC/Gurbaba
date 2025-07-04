
-- Create a table for breaking news items
CREATE TABLE public.breaking_news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  display_order INTEGER DEFAULT 0
);

-- Add Row Level Security (RLS)
ALTER TABLE public.breaking_news ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access and admin write access
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

-- Insert some initial data
INSERT INTO public.breaking_news (title, display_order) VALUES
('BRI implementation discussions continue', 1),
('Discord in Maoist Centre over leadership', 2),
('Mid-Hill Highway construction progress update', 3),
('Nawalparasi hotels announce special summer deals', 4),
('Arjun Lama murder case investigation ongoing', 5);