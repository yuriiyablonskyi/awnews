import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import { CalendarType } from '../store/articles/articlesTypes'

dayjs.extend(timezone)
const userTimeZone = dayjs.tz.guess()

const addTimeZoneToDates = (urlParams: URLSearchParams): string => {
  [CalendarType.FROM, CalendarType.TO].forEach(type => {
    const date = urlParams.get(type)
    if (date) {
      urlParams.set(type, dayjs(date).tz(userTimeZone).toISOString())
    }
  })
  return urlParams.toString()
}

export default addTimeZoneToDates
