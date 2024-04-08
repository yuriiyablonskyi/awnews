import dayjs, { Dayjs } from 'dayjs'

export interface DayInfo {
  date: Dayjs
  isToday?: boolean
  isCurrentMonth: boolean
}

const generateDateRange = (month: number = dayjs().month(), year: number = dayjs().year()) => {
  const firstDateOfMonth: Dayjs = dayjs().year(year).month(month).startOf('month')
  const lastDateOfMonth: Dayjs = dayjs().year(year).month(month).endOf('month')
  const arrayOfDate: DayInfo[] = []

  for (let i = 1; i < firstDateOfMonth.day(); i++) {
    arrayOfDate.push({ date: firstDateOfMonth.day(i), isCurrentMonth: false })
  }

  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    arrayOfDate.push({
      date: firstDateOfMonth.date(i),
      isCurrentMonth: true,
      isToday: firstDateOfMonth.date(i).toDate().toDateString() === dayjs().toDate().toDateString(),
    })
  }

  const remaining = 42 - arrayOfDate.length

  for (let i = lastDateOfMonth.date() + 1; i <= lastDateOfMonth.date() + remaining; i++) {
    arrayOfDate.push({ date: lastDateOfMonth.date(i), isCurrentMonth: false })
  }

  return arrayOfDate
}

export default generateDateRange
