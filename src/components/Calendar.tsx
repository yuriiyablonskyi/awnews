import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import dayjs, { Dayjs } from 'dayjs'
import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import classNames from '../utils/functions/classNames'
import generateDateRange, { DayInfo } from '../utils/functions/generateDateRange'
import { AppDispatch } from '../store'
import { articlesData } from '../store/articlesSelectors'
import { setCalendar } from '../store/articles/articlesSlice'
import { fetchArticles } from '../store/articles/articlesActions'

const daysOfWeek: string[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const Calendar: FC = ({ onShowCalendar }) => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    filterCalendar: { type, singleDate, dateRange },
  } = useSelector(articlesData)
  const [searchParams, setSearchParams] = useSearchParams()
  const currentDate: Dayjs = dayjs()
  const [today, setToday] = useState<Dayjs>(currentDate)
  const [hoveredDate, setHoveredDate] = useState<Dayjs | null>(null) // никогда не сбрасываю к null, но работает корректно
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
    // let чтоб не дублировать код отправки запроса (нужно отправить когда type = 'from' или 'to' или в случае если 'range' и есть вторая дата, когда есть только первая дата то не отправлять запрос )

    switch (type) {
      case 'from':
      case 'to':
        dispatch(setCalendar({ type, singleDate: newDateFormat }))
        newSearchParams.set(type, newDateFormat)
        break
      case 'range':
        if (dayjs(singleDate).isBefore(date) && !dateRange) {
          // первая проверка "dayjs(singleDate).isBefore(date)" - если есть первая дата то вторая выбираемая дата должна быть позже первой
          dispatch(setCalendar({ type: 'range', singleDate: newDateFormat, dateRange: singleDate }))
          newSearchParams.set('from', singleDate)
          newSearchParams.set('to', newDateFormat)
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

  return (
    <div className="absolute z-20 w-72 mt-1 p-3 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div className="flex items-center">
        <h2 className="flex-auto text-sm font-semibold text-gray-900">{today.format('MMMM YYYY')}</h2>
        <button
          type="button"
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          onClick={() => setToday(today.month(today.month() - 1))}
        >
          <span className="sr-only">Previous month</span>
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
          <span className="sr-only">Next month</span>
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
          const dayItem: string = date.toString().slice(5, 16)
          const isSelectDate = singleDate && singleDate === date.format('YYYY-MM-DD')
          const isEndDate = dateRange && dateRange === date.format('YYYY-MM-DD')
          const isHighlightedDate =
            (date.isAfter(dayjs(singleDate)) && !dateRange && date.isBefore(hoveredDate)) ||
            (date.isAfter(dayjs(searchParams.get('from'))) && dateRange && date.isBefore(dayjs(searchParams.get('to'))))
          // тут покраска дат при наведении либо между двумя выбраными датами, стоит ли сделать более читаемо?

          return (
            <div key={dayItem} className="py-1.5">
              <button
                onClick={() => handleClickDate(date)}
                onMouseMove={() => type === 'range' && setHoveredDate(date)}
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
