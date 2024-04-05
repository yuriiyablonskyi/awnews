export interface ArticleInterface {
  author: string
  title: string
  description: string
  url: string
  urlToImage?: string
  publishedAt: string
}

export interface ArticlesState {
  articles: ArticleInterface[]
  totalResults: number
  loading: boolean
  error: string | null
}

export interface SelectableItem {
  id?: number
  name: string
  short?: string
}

export interface SelectableItem {
  id?: number
  name: string
  short?: string
}
