import { createAsyncThunk } from '@reduxjs/toolkit';

interface SourceArticle {
  id: string | null;
  name: string;
}

export interface Article {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: SourceArticle;
  title: string;
  url: string;
  urlToImage: string | null;
}

interface FetchNewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export const fetchNews = createAsyncThunk<Article[], string>(
  'news/fetchNews',
  async (searchQuery: string) => {
    const request: string = `${import.meta.env.VITE_API_URL}/everything?q=${searchQuery}&apiKey=${import.meta.env.VITE_API_KEY}`;
    const response = await fetch(request);

    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }

    const data: FetchNewsResponse = await response.json();
    return data.articles;
  }
);
