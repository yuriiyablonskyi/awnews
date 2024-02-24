export interface ArticleInterface {
  author: string
  title: string
  description: string
  url: string
  urlToImage?: string
  publishedAt: string
}

export interface RootState {
  totalResults: number
  articles: ArticleInterface[]
  searchQuery?: string
}

export interface ArticlesState {
  articlesData: RootState
  loading: boolean
  error?: null | string
}

export interface SelectableItem {
  id: number
  name: string
  short?: string
}