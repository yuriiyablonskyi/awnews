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
  totalResults: number
  error: Error | null
  loading: boolean
}

export interface SelectableItem {
  id?: number
  name: string
  short?: string
}

export interface RouteType {
  path: string
  element: JSX.Element
  children?: RouteType[]
}

export interface ArticlesState {
  articles: ArticleInterface[]
  totalResults: number
  loading: boolean
  error: string | null
}
