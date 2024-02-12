import { FilterOptions } from '../../store/articles/articlesActions'

const areFilterOptionsEmpty = (options: FilterOptions): boolean => {
  return Object.values(options).every(value => value === '')
}

export default areFilterOptionsEmpty