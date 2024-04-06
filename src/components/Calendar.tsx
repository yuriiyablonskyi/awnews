import { FC, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import dayjs from 'dayjs'
import generateDateRange from '../utils/functions/generateDateRange'

const days = generateDateRange()
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Calendar: FC = () => {
  const generateDayMonth = () => {
    const days = []
    for (let i = 0; i < 36; i++) {
      days.push(dayjs().date(i))
    }
    return console.log({ generateDayMonth: days })
  }
  generateDayMonth()

  const today = dayjs()
  const day = today.date()
  const month = today.month()
  const [selectedDay, setSelectedDay] = useState(day)
  const [currentMonth, setCurrentMonth] = useState(month)

  return (
    <div className="max-w-md">
      <div className="flex items-center">
        <h2 className="flex-auto text-sm font-semibold text-gray-900">{1}</h2>
        <button
          type="button"
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
        <div>S</div>
      </div>
      <div className="mt-2 grid grid-cols-7 text-sm">
        {days.map((day, dayIdx) => (
          <div key={day.date} className={classNames(dayIdx > 6 && 'border-t border-gray-200', 'py-2')}>
            <button
              type="button"
              // className='text-white'
            >
              <time dateTime={day.date}>{day.day}</time>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar
