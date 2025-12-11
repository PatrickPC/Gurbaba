
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/Client';
import { useToast } from '@/hooks/use-toast';

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  images: string[];
  author: string;
  category: string;
  tags: string[];
  published_at: string;
  updated_at: string;
  views: number;
  readTime?: string;
}

export const useNewsData = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const calculateReadTime = (content: string) => {
    const words = content.split(' ').length;
    const readTime = Math.ceil(words / 200);
    return `${readTime} min read`;
  };

  const fetchArticles = async () => {
    try {
      console.log('Fetching articles from database...');
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Fetched articles:', data);

      const articlesWithReadTime = data.map(article => ({
        ...article,
        readTime: calculateReadTime(article.content),
        published_at: new Date(article.published_at).toLocaleDateString()
      }));

      setArticles(articlesWithReadTime);
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast({
        title: "Error",
        description: "Failed to load articles from database",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createArticle = async (article: Omit<NewsArticle, 'id' | 'published_at' | 'updated_at' | 'readTime' | 'views'>) => {
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .insert([{
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          images: article.images,
          author: article.author,
          category: article.category,
          tags: article.tags
        }])
        .select()
        .single();

      if (error) throw error;

      const newArticle = {
        ...data,
        readTime: calculateReadTime(data.content),
        published_at: new Date(data.published_at).toLocaleDateString()
      };

      setArticles(prev => [newArticle, ...prev]);
      toast({
        title: "Success",
        description: "Article created successfully",
      });
      return { success: true };
    } catch (error) {
      console.error('Error creating article:', error);
      toast({
        title: "Error",
        description: "Failed to create article",
        variant: "destructive"
      });
      return { success: false, error };
    }
  };

  const getArticleById = (id: string) => {
    return articles.find(article => article.id === id);
  };

  const getArticlesByCategory = (category: string) => {
    console.log('Getting articles by category:', category);
    console.log('Available articles:', articles);
    
    if (!category) {
      console.log('No category provided, returning empty array');
      return [];
    }
    
    const filtered = articles.filter(article => {
      const articleCategory = article.category.toLowerCase();
      const searchCategory = category.toLowerCase();
      
      // Handle URL-formatted categories (with hyphens) - convert both ways
      const normalizedArticleCategory = articleCategory.replace(/\s+&\s+/g, '-').replace(/\s+/g, '-');
      const normalizedSearchCategory = searchCategory.replace(/\s+&\s+/g, '-').replace(/\s+/g, '-');
      
      // Also try converting hyphens back to spaces for matching
      const articleCategoryWithSpaces = normalizedSearchCategory.replace(/-/g, ' ');
      
      console.log('Comparing:', {
        articleCategory,
        searchCategory,
        normalizedArticleCategory,
        normalizedSearchCategory,
        articleCategoryWithSpaces
      });
      
      return articleCategory === searchCategory || 
             normalizedArticleCategory === normalizedSearchCategory ||
             articleCategory === articleCategoryWithSpaces;
    });
    
    console.log('Filtered articles:', filtered);
    return filtered;
  };

  const incrementArticleViews = async (id: string) => {
    try {
      const { error } = await supabase
        .rpc('increment_article_views' as any, { article_id: id });

      if (error) throw error;
      
      // Refresh articles to get updated view count
      await fetchArticles();
    } catch (error) {
      console.error('Error incrementing article views:', error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return {
    articles,
    loading,
    createArticle,
    getArticleById,
    getArticlesByCategory,
    refreshArticles: fetchArticles,
    incrementArticleViews
  };
};