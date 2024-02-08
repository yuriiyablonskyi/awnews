import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from './articlesSlice'

interface FilterOptions {
  country: string;
  category: string;
  language: string;
}

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({ country, category, language }: FilterOptions) => {

    const baseURL: string = import.meta.env.VITE_API_URL;
    const apiKey: string = import.meta.env.VITE_API_KEY;

    let request: string = `${baseURL}/top-headlines?`;

    if (country) {
      request += `country=${country}&`;
    }
    if (category) {
      request += `category=${category}&`;
    }
    if (language) {
      request += `language=${language}&`;
    }

    request += `apiKey=${apiKey}`;

    const response = await fetch(request);

    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    const data: RootState = await response.json();
    return data;
  }
);
  