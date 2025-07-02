
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

export const isNewsArticle = (article: NewsUnion): article is NewsArticle => {
  return 'published_at' in article;
};

export const isNewsItem = (article: NewsUnion): article is NewsItem => {
  return 'publishedAt' in article;
};