
import { NewsArticle } from '../hooks/useNewsData';
import { NewsItem } from '../data/mockNews';

export type NewsUnion = NewsArticle | NewsItem;

export const getPublishedDate = (article: NewsUnion): string => {
  if ('published_at' in article) {
    return article.published_at;
  }
  return article.publishedAt || '';
};

export const getReadTime = (article: NewsUnion): string | undefined => {
  if ('readTime' in article) {
    return article.readTime;
  }
  return undefined;
};

export const getImage = (article: NewsUnion): string => {
  if ('images' in article) {
    return article.images && (article.images as string[]).length > 0 
      ? article.images[0] 
      : 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800';
  }
  return article.image || 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800';
};

export const getImages = (article: NewsUnion): string[] => {
  if ('images' in article) {
    return article.images as string[] || [];
  }
  return article.image ? [article.image] : [];
};

export const isNewsArticle = (article: NewsUnion): article is NewsArticle => {
  return 'published_at' in article;
};

export const isNewsItem = (article: NewsUnion): article is NewsItem => {
  return 'publishedAt' in article;
};