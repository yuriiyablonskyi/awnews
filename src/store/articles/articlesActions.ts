import { createAsyncThunk } from '@reduxjs/toolkit'

interface Source {
  id?: string
  name: string
}

export interface Article {
  source: Source
  author: string
  title: string
  description: string
  url: string
  urlToImage?: string
  publishedAt: string
  content: string
}

export interface RootState {
  status: string
  totalResults: number
  articles: Article[]
}

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (param: string) => {
    // async ({ searchQuery, category = 'all', language = 'all', country = 'all' }: { searchQuery: string; category?: string; language?: string; country?: string }) => {

    const baseURL: string = import.meta.env.VITE_API_URL
    const apiKey: string = import.meta.env.VITE_API_KEY

    let request: string = `${baseURL}/everything?q=${param}&apiKey=${apiKey}`
    console.log(request);


    // if (category && category !== 'all') {
    //   request += `&category=${category}`
    // }

    // if (language && language !== 'all') {
    //   request += `&language=${language}`
    // }

    // if (country && country !== 'all') {
    //   request += `&country=${country}`
    // }

    const response = await fetch(request)

    if (!response.ok) {
      throw new Error('Failed to fetch articles')
    }

    const data: RootState = await response.json()
    return data
  }
)
