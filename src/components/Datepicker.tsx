import { CalendarIcon } from '@heroicons/react/24/outline'
import { FC, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CalendarType, SelectableItem } from '../store/articles/articlesTypes'
import calendarData from '../utils/data/calendarData'
import Calendar from './Calendar'
import Select from './Select'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'
import { articlesData } from '../store/articlesSelectors'
import { setCalendar } from '../store/articles/articlesSlice'
import classNames from '../utils/functions/classNames'
import { fetchArticles } from '../store/articles/articlesActions'

const Datepicker: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    filterCalendar: { type, singleDate, dateRange },
  } = useSelector(articlesData)
  const [searchParams, setSearchParams] = useSearchParams()
  const [showCalendar, setShowCalendar] = useState<boolean>(false)

  // добавил отправку запроса когда фильтр по дате сброшен (тоесть когда на странице в Select текст "Select date")
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

  const clearUrlParams = (newCalendarType: CalendarType) => {
    // функция создана чтоб удалять параметры календаря при изменении типа календаря (при изменении type)
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.delete('from')
    newSearchParams.delete('to')
    !newCalendarType && sendRequest(newSearchParams.toString())
    setSearchParams(newSearchParams)
  }

  const handleDate = (newCalendarType: CalendarType) => {
    clearUrlParams(newCalendarType)
    setShowCalendar(false)
    dispatch(setCalendar({ type: newCalendarType }))
  }

  return (
    <>
      {showCalendar && <div onClick={() => setShowCalendar(false)} className="absolute inset-0"></div>}
      <Select
        dataSelect={type}
        options={calendarData}
        onSelect={(newDate: SelectableItem) => handleDate(newDate.name)}
        optionName="date"
      />
      <div className={classNames(type && 'mr-28', type === 'range' && 'mr-16', 'relative')}>
        {type && (
          <>
            <label className="block text-sm font-medium leading-6 text-gray-900 capitalize">Calendar</label>
            <button
              className={classNames(
                type === 'range' ? 'w-56' : 'w-44',
                'flex items-center h-9 mt-2 cursor-pointer rounded-md bg-white py-1.5 px-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 sm:text-sm sm:leading-6',
              )}
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <input
                className="outline-none cursor-pointer w-full"
                type="text"
                value={dateRange ? singleDate + ' - ' + dateRange : singleDate || `Select ${type} date`}
                readOnly
              />
              <CalendarIcon className={classNames(type === 'range' && 'ml-2.5', 'w-5 h-5')} />
            </button>
          </>
        )}
        {showCalendar && <Calendar onShowCalendar={setShowCalendar} />}
      </div>
    </>
  )
}

export default Datepicker
