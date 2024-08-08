import { CalendarIcon } from '@heroicons/react/24/outline'
import { FC, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchArticles } from '../store/articles/articlesActions'
import { setCalendar } from '../store/articles/articlesSlice'
import { CalendarType, SelectableItem, useAppDispatch, useAppSelector } from '../store/articles/articlesTypes'
import { articlesData } from '../store/articlesSelectors'
import calendarData from '../utils/calendarData'
import classNames from '../utils/classNames'
import Calendar from './Calendar'
import Select from './Select'

const Datepicker: FC = () => {
  const dispatch = useAppDispatch()
  const { filterCalendar } = useAppSelector(articlesData)
  const type = filterCalendar?.type
  const singleDate = filterCalendar?.singleDate
  const dateRange = filterCalendar?.dateRange
  const [searchParams, setSearchParams] = useSearchParams()
  const [showCalendar, setShowCalendar] = useState<boolean>(false)

  const sendRequest = (urlParams: string) => {
    if (searchParams.get('q')) {
      dispatch(
        fetchArticles({
          endpoint: 'everything',
          searchParams: urlParams,
        }),
      )
    }
  }

  const clearUrlParams = (newCalendarType: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.delete(CalendarType.FROM)
    newSearchParams.delete(CalendarType.TO)
    !newCalendarType && sendRequest(newSearchParams.toString())
    setSearchParams(newSearchParams)
  }

  const handleDate = (newCalendarType: string | CalendarType) => {
    clearUrlParams(newCalendarType)
    setShowCalendar(false)
    dispatch(setCalendar({ type: newCalendarType }))
  }

  return (
    <div className="flex flex-wrap sm:flex-wraps">
      {showCalendar && <div onClick={() => setShowCalendar(false)} className="absolute inset-0"></div>}
      <Select
        dataSelect={type}
        options={calendarData}
        onSelect={(newDate: SelectableItem) => handleDate(newDate.name)}
        optionName="date"
      />
      <div className={classNames(type && 'mr-28 mb-3', type === CalendarType.RANGE && 'mr-16 relative')}>
        {type && (
          <>
            <label className="block text-sm font-medium leading-6 text-gray-900 capitalize">Calendar</label>
            <button
              className={classNames(
                type === CalendarType.RANGE ? 'w-56' : 'w-44',
                'flex items-center h-9 mt-2 cursor-pointer rounded-md bg-white py-1.5 px-3 text-left text-gray-900' +
                  'shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-neutral-500' +
                  ' sm:text-sm sm:leading-6',
              )}
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <input
                className="outline-none cursor-pointer w-full"
                type="text"
                value={dateRange ? singleDate + ' - ' + dateRange : singleDate || `Select ${type} date`}
                readOnly
              />
              <CalendarIcon className={classNames(type === CalendarType.RANGE && 'ml-2.5', 'w-5 h-5')} />
            </button>
          </>
        )}
        {showCalendar && <Calendar onShowCalendar={setShowCalendar} />}
      </div>
    </div>
  )
}

export default Datepicker
