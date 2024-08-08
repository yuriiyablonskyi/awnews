import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import dayjs, { Dayjs } from 'dayjs'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchArticles } from '../store/articles/articlesActions'
import { setCalendar } from '../store/articles/articlesSlice'
import { CalendarType, DayInfo, useAppDispatch, useAppSelector } from '../store/articles/articlesTypes'
import { articlesData } from '../store/articlesSelectors'
import classNames from '../utils/classNames'
import generateDateRange from '../utils/generateDateRange'

const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const Calendar: FC<{ onShowCalendar: Dispatch<SetStateAction<boolean>> }> = ({ onShowCalendar }) => {
  const dispatch = useAppDispatch()
  const { filterCalendar } = useAppSelector(articlesData)
  const type = filterCalendar?.type
  const singleDate = filterCalendar?.singleDate
  const dateRange = filterCalendar?.dateRange
  const [searchParams, setSearchParams] = useSearchParams()
  const currentDate: Dayjs = dayjs()
  const [today, setToday] = useState<Dayjs>(currentDate)
  const [hoveredDate, setHoveredDate] = useState<Dayjs | null>(null)
  const datesArray = generateDateRange(today.month(), today.year())

  const sendRequest = (newSearchParams: string) => {
    if (searchParams.get('q')) {
      dispatch(
        fetchArticles({
          endpoint: 'everything',
          searchParams: newSearchParams,
        }),
      )
    }
  }

  const handleClickDate = (date: Dayjs) => {
    const newSearchParams = new URLSearchParams(searchParams)
    const newDateFormat = date.format('YYYY-MM-DD')
    let shouldDispatchRequest = true

    switch (type) {
      case CalendarType.FROM:
      case CalendarType.TO:
        dispatch(setCalendar({ type, singleDate: newDateFormat }))
        newSearchParams.set(type, newDateFormat)
        break
      case CalendarType.RANGE:
        if (singleDate && dayjs(singleDate).isBefore(date) && !dateRange) {
          dispatch(setCalendar({ type: CalendarType.RANGE, singleDate: newDateFormat, dateRange: singleDate }))
          newSearchParams.set(CalendarType.FROM, singleDate)
          newSearchParams.set(CalendarType.TO, newDateFormat)
          setHoveredDate(null)
        } else {
          dispatch(setCalendar({ type, singleDate: newDateFormat }))
          shouldDispatchRequest = false
        }
        break
      default:
        break
    }

    if (shouldDispatchRequest) {
      newSearchParams.set('page', '1')
      sendRequest(newSearchParams.toString())
      setSearchParams(newSearchParams)
      onShowCalendar(false)
    }
  }

  const isHighlighted = (date: Dayjs) => {
    const fromDate = dayjs(searchParams.get(CalendarType.FROM))
    const toDate = dayjs(searchParams.get(CalendarType.TO))
    const isAfterSingleDate = date.isAfter(dayjs(singleDate))
    const isBeforeHoveredDate = date.isBefore(hoveredDate)
    const isInDateRange = dateRange && date.isAfter(fromDate) && date.isBefore(toDate)

    if (dateRange) {
      return isInDateRange
    }
    return isAfterSingleDate && isBeforeHoveredDate
  }

  return (
    <div
      className="absolute z-20 w-72 mt-1 p-3 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5
     focus:outline-none"
    >
      <div className="flex items-center">
        <h2 className="flex-auto text-sm font-semibold text-gray-900">{today.format('MMMM YYYY')}</h2>
        <button
          type="button"
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          onClick={() => setToday(today.month(today.month() - 1))}
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className={classNames(
            '-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400',
            currentDate.isAfter(today, 'month') && 'hover:text-gray-500',
          )}
          onClick={() => setToday(today.month(today.month() + 1))}
          disabled={!currentDate.isAfter(today, 'month')}
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-8 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
        {daysOfWeek.map((day, i) => (
          <div key={i}>{day}</div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 text-sm">
        {datesArray.map(({ date, isToday, isCurrentMonth, isLaterThanToday }: DayInfo) => {
          const dayItem = date.toString().slice(5, 16)
          const isSelectDate = singleDate && singleDate === date.format('YYYY-MM-DD')
          const isEndDate = dateRange && dateRange === date.format('YYYY-MM-DD')
          const isHighlightedDate = isHighlighted(date)

          return (
            <div key={dayItem} className="py-1.5">
              <button
                onClick={() => handleClickDate(date)}
                onMouseMove={() => type === CalendarType.RANGE && setHoveredDate(date)}
                type="button"
                className={classNames(
                  isHighlightedDate && 'bg-gray-200',
                  (isEndDate || isSelectDate) && 'text-white',
                  !isSelectDate && !isEndDate && isToday && 'text-indigo-600',
                  !isSelectDate && !isEndDate && !isToday && isCurrentMonth && 'text-gray-900',
                  !isSelectDate && !isEndDate && !isToday && !isCurrentMonth && 'text-gray-400',
                  isLaterThanToday && 'text-gray-400',
                  isSelectDate && isToday && 'bg-indigo-600',
                  (isSelectDate || isEndDate) && !isToday && 'bg-gray-900',
                  !isSelectDate && !isEndDate && !isLaterThanToday && 'hover:bg-gray-200',
                  (isSelectDate || isToday || isEndDate) && 'font-semibold',
                  'mx-auto flex h-6 w-6 items-center justify-center rounded-full',
                )}
                disabled={isLaterThanToday}
              >
                <time dateTime={dayItem}>{date.date()}</time>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar
