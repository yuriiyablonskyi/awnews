import dayjs, { Dayjs } from 'dayjs'
import { DayInfo } from '../store/articles/articlesTypes'

const generateDateRange = (month: number = dayjs().month(), year: number = dayjs().year()) => {
  const today: Dayjs = dayjs()
  const firstDateOfMonth: Dayjs = dayjs().year(year).month(month).startOf('month')
  const lastDateOfMonth: Dayjs = dayjs().year(year).month(month).endOf('month')
  const arrayOfDate: DayInfo[] = []

  for (let i = 1; i < firstDateOfMonth.day(); i++) {
    const date = firstDateOfMonth.day(i)
    arrayOfDate.push({ date, isCurrentMonth: false, isLaterThanToday: date.isAfter(today, 'day') })
  }

  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    const currentDate: Dayjs = firstDateOfMonth.date(i)
    arrayOfDate.push({
      date: currentDate,
      isCurrentMonth: true,
      isToday: currentDate.isSame(today, 'day'),
      isLaterThanToday: currentDate.isAfter(today, 'day'),
    })
  }

  const remaining = 42 - arrayOfDate.length

  for (let i = lastDateOfMonth.date() + 1; i <= lastDateOfMonth.date() + remaining; i++) {
    const date = lastDateOfMonth.date(i)
    arrayOfDate.push({ date, isCurrentMonth: false, isLaterThanToday: date.isAfter(today, 'day') })
  }

  return arrayOfDate
}

export default generateDateRange
