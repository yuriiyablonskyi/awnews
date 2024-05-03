import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import dayjs, { Dayjs } from 'dayjs'
import { FC, useEffect, useState } from 'react'
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
  const datesArray = generateDateRange(today.month(), today.year())

  const updateUrlParams = (firstValue, secondValue) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.delete('from')

    !secondValue && newSearchParams.set(type, firstValue)
    secondValue && newSearchParams.set('from', firstValue)
    secondValue && newSearchParams.set('to', secondValue)

    // TODO: поміняти логіку (можливо обєднати dispatch)
    if (newSearchParams.get('q')) {
      console.log('handleFirstDateValue - dispatch')
      dispatch(
        fetchArticles({
          endpoint: 'everything',
          searchParams: newSearchParams.toString(),
        }),
      )
    }
    setSearchParams(newSearchParams)
  }

  const handleFirstDateValue = date => {
    console.log('handleFirstDateValue')

    // если есть только один параметр

    dispatch(
      setCalendar({
        type: type,
        singleDate: date.format('YYYY-MM-DD'),
      }),
    )
  }

  const handleTwoDateValues = date => {
    // если есть два параметра
    dispatch(
      setCalendar({
        type: type,
        singleDate,
        dateRange: date.format('YYYY-MM-DD'),
      }),
    )
    onShowCalendar(false)
  }

  const handleRangeType = (date: Dayjs) => {
    if (dayjs(singleDate).isBefore(date)) {
      console.log('!else if')
      // если уже есть первая дата то нелзя чтоб вторая дата была раньше первой, в таком случае срабатывает handleFirstDateValue (заново нужно выбрать первую дату)
      handleTwoDateValues(date)
      updateUrlParams(singleDate, date.format('YYYY-MM-DD'))
    } else {
      handleFirstDateValue(date)
      console.log('else')
    }
  }

  const handleClickDate = (date: Dayjs) => {
    const newDate = date.format('YYYY-MM-DD')
    if (type === 'range') {
      handleRangeType(date)
    } else {
      updateUrlParams(newDate, '')
      onShowCalendar(false)
      dispatch(setCalendar({ type: type, singleDate: newDate }))
    }
  }

  const handleMouseMove = (date: Dayjs) => {
    if (singleDate) {
      date.isAfter(singleDate) && console.log({ dateReadyToStyle: date.format('YYYY-MM-DD') })
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
          const isRangeDate = date.isAfter(singleDate) && date.isBefore(dayjs(dateRange)) && type === 'range'

          return (
            <div key={dayItem} className="py-1.5">
              <button
                onClick={() => handleClickDate(date)}
                onMouseMove={() => handleMouseMove(date)}
                type="button"
                className={classNames(
                  isRangeDate && 'bg-gray-300',
                  (isEndDate || isSelectDate) && 'text-white',
                  !isSelectDate && !isEndDate && isToday && 'text-indigo-600',
                  !isSelectDate && !isEndDate && !isToday && isCurrentMonth && 'text-gray-900',
                  !isSelectDate && !isEndDate && !isToday && !isCurrentMonth && 'text-gray-400',
                  isLaterThanToday && 'text-gray-400',
                  isSelectDate && isToday && 'bg-indigo-600',
                  (isSelectDate || isEndDate) && !isToday && 'bg-gray-900',
                  !isSelectDate && !isEndDate && !isLaterThanToday && 'hover:bg-gray-200',
                  (isSelectDate || isToday) && 'font-semibold',
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
