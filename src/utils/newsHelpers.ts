
import { NewsArticle } from '../hooks/useNewsData';
import { NewsItem } from '../data/mockNews';
import { DEFAULT_NEWS_IMAGE } from '@/constants/images';

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
      : DEFAULT_NEWS_IMAGE;
  }
   return article.image || DEFAULT_NEWS_IMAGE;
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