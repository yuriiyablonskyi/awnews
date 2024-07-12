import { Dayjs } from 'dayjs'
import { Dispatch, SetStateAction } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '..'

export enum CalendarType {
  FROM = 'from',
  TO = 'to',
  RANGE = 'range',
}

export interface AddNewsModalProps {
  isOpen: boolean
  onOpen: Dispatch<SetStateAction<boolean>>
}

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

export interface FilterCalendar {
  type?: string | CalendarType
  singleDate?: string
  dateRange?: string
}

export interface ArticlesState {
  articles: ArticleInterface[]
  customArticles: ArticleInterface[]
  totalResults: number
  loading: boolean
  currentArticle: ArticleInterface | null
  filterCalendar: FilterCalendar | null
}

export interface DayInfo {
  date: Dayjs
  isToday?: boolean
  isCurrentMonth: boolean
  isLaterThanToday: boolean
}

export interface FetchArticlesParams {
  endpoint: string
  searchParams: string
}

export interface FetchArticlesPayload {
  articles: ArticleInterface[]
  totalResults: number
}

export interface OptionProps {
  select?: SelectableItem
  optionName?: string
  onChange: () => void
}

export interface PaginationProps {
  totalResults: number
  endpoint: string
}

export interface RouteType {
  path: string
  element: JSX.Element
  children?: RouteType[]
}

export interface SelectableItem {
  id?: number
  name: string | CalendarType
  short?: string
}

export interface SelectProps {
  dataSelect?: string
  options: SelectableItem[]
  onSelect: (newCategory: SelectableItem) => void
  optionName: string
}

export interface DropdownData {
  wpapperStyle: string
  menuButtonIcon: {
    icon?: React.ElementType
    img?: string
    style: string
  }
  data: Array<{
    name: string
    icon: React.ElementType
    action?: () => void
  }>
}

export interface DropdownMenuProps {
  dropdownData: DropdownData
  actions?: { [key: string]: () => void }
}

export interface DropDownMenu {
  userItems: DropdownData
  articlesItems: DropdownData
}

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
