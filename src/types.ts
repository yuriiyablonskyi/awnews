export interface ArticleInterface {
  author: string
  title: string
  description: string
  url: string
  urlToImage?: string
  publishedAt: string
}

export interface RootState {
  articles: ArticleInterface[]
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