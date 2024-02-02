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

const url: string = 'https://newsapi.org/v2';
const apiKey: string = 'apiKey=72310decc144431baadd3552440e662f';
const request: string = url + '/everything?q=d&' + apiKey;

export const fetchNews = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const response = await fetch(request);
    const data: FetchNewsResponse = await response.json();
    return data.articles
  }
);
