
import React, { createContext, useContext, ReactNode } from 'react';
import { useNewsData, NewsArticle } from '../hooks/useNewsData';

interface NewsContextType {
  articles: NewsArticle[];
  loading: boolean;
  createArticle: (article: Omit<NewsArticle, 'id' | 'published_at' | 'updated_at' | 'readTime'>) => Promise<{ success: boolean; error?: any }>;
  getArticleById: (id: string) => NewsArticle | undefined;
  getArticlesByCategory: (category: string) => NewsArticle[];
  refreshArticles: () => Promise<void>;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const newsData = useNewsData();

  return (
    <NewsContext.Provider value={newsData}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};