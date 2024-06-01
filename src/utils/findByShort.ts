import { SelectableItem } from "../store/articles/articlesTypes"

const findByShort = (searchedWord: string, arr: SelectableItem[]): SelectableItem | undefined => {
  return arr.find(item => item.short === searchedWord)
}

export default findByShort
