import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import dayjs, { Dayjs } from 'dayjs'
import { FC, useState } from 'react'
import classNames from '../utils/functions/classNames'
import generateDateRange, { DayInfo } from '../utils/functions/generateDateRange'

const daysOfWeek: string[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const Calendar: FC = ({ onDataFromChild, dateType }) => {
  // onDataFromChild - для передачи дат из calendar в search
  // dateType - для определения какую функцию использовать (handleClickDate или nandleDateRange)

  const currentDate: Dayjs = dayjs()
  const [today, setToday] = useState<Dayjs>(currentDate)
  const [selectDate, setSelectDate] = useState<Dayjs>(currentDate)
  const datesArray = generateDateRange(today.month(), today.year())
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState('')
  // типов не везде прописал тк еще будет рефактор

  const handleClickDate = (date: Dayjs) => {
    // обработка когда либо "From date" либо "To date"
    onDataFromChild(date.format('YYYY-MM-DD'))
    setSelectDate(date)
  }

  const nandleDateRange = (date: Dayjs) => {
    // обработка исключительно когда "From date to date"
    const newDate = date.format('YYYY-MM-DD')
    if (!startDate) {
      setStartDate(newDate)
    } else if (!endDate) {
      setEndDate(newDate)
      onDataFromChild({ startDate, endDate: newDate })
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
          const daySelected = selectDate.toString() === date.toString()
          return (
            <div key={dayItem} className="py-1.5">
              <button
                onClick={() => {
                  dateType === 'From date to date' ? nandleDateRange(date) : handleClickDate(date)
                  // тут идет проверка какую функцию для обработки дат использовать
                }}
                type="button"
                className={classNames(
                  daySelected && 'text-white',
                  !daySelected && isToday && 'text-indigo-600',
                  !daySelected && !isToday && isCurrentMonth && 'text-gray-900',
                  !daySelected && !isToday && !isCurrentMonth && 'text-gray-400',
                  daySelected && isToday && 'bg-indigo-600',
                  daySelected && !isToday && 'bg-gray-900',
                  !daySelected && !isLaterThanToday && 'hover:bg-gray-200',
                  (daySelected || isToday) && 'font-semibold',
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
