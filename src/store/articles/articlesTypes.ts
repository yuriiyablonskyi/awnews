export interface ArticleInterface {
  id?: string
  author: string
  title: string
  description: string
  url?: string
  urlToImage?: string
  publishedAt: string
  isHotNews?: boolean
}

export interface ArticlesState {
  articles: ArticleInterface[]
  customArticles: ArticleInterface[]
  totalResults: number
  loading: boolean
  filterCalendar: {
    type?: CalendarType
    singleDate?: string
    dateRange?: string
  }
}

export interface SelectableItem {
  id?: number
  name: string | CalendarType
  short?: string
}

export interface SelectableItem {
  id?: number
  name: string
  short?: string
}

export enum CalendarType {
  FROM = 'from',
  TO = 'to',
  RANGE = 'range',
}
