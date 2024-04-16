import { CalendarIcon } from '@heroicons/react/24/outline'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { fetchArticles } from '../store/articles/articlesActions'
import { SelectableItem } from '../store/articles/articlesTypes'
import Calendar from './Calendar'
import Select from './Select'

interface DatepickerProps {
  hasKeyword: boolean
  dateType: string
  onDateType: Dispatch<SetStateAction<string>>
}

const Datepicker: FC<DatepickerProps> = ({ hasKeyword, dateType, onDateType }) => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  const [dateCalendar, setDateCalendar] = useState<string>('')

  const handleDate = (newDate: string) => {
    setDateCalendar('')
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.delete('to')
    newSearchParams.delete('from')
    setSearchParams(newSearchParams)
    setShowCalendar(false)
    onDateType(newDate)
  }

  const handleDataFromCalendar = data => {
    // страшно смотреть на такой код)     но сделал для начала чтоб хотяб работало тк не знал как сделать промежуток от и до вместе, потом поправлять буду
    const newSearchParams = new URLSearchParams(searchParams)
    setShowCalendar(false)
    if (dateType === 'From date') {
      newSearchParams.set('from', data)
      newSearchParams.delete('to')
      setDateCalendar(data)
    } else if (dateType === 'To date') {
      newSearchParams.set('to', data)
      newSearchParams.delete('from')
      setDateCalendar(data)
    } else if (dateType === 'From date to date') {
      console.log({ data })
      const { startDate, endDate } = data
      newSearchParams.set('from', startDate)
      newSearchParams.set('to', endDate)
      setDateCalendar(startDate + '/' + endDate)
    }
    newSearchParams.set('page', '1')

    sendRequest(newSearchParams.toString())
    setSearchParams(newSearchParams)
  }

  // функция для отправки запроса очень похожа в 4 компонентах (home, search, pagination, datepicker) - может стоит как то оптимизировать?
  const sendRequest = (urlParams: string) => {
    if (hasKeyword) {
      dispatch(
        fetchArticles({
          endpoint: 'everything',
          searchParams: urlParams,
        }),
      )
    }
  }

  return (
    <>
      <Select
        dataSelect={dateType}
        options={[
          { id: 0, name: 'From date' },
          { id: 1, name: 'To date' },
          { id: 2, name: 'From date to date' },
        ]}
        onSelect={(newDate: SelectableItem) => handleDate(newDate.name)}
        optionName="date range"
      />
      <div className="relative mr-28">
        {dateType && (
          <>
            <label className="block text-sm font-medium leading-6 text-gray-900 capitalize">Select date</label>
            <button
              className="flex items-center w-44 h-9 mt-2 cursor-pointer rounded-md bg-white py-1.5 px-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 sm:text-sm sm:leading-6"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <input
                className="outline-none cursor-pointer w-full"
                type="text"
                value={dateCalendar || 'Select date'}
                readOnly
              />
              <CalendarIcon className="w-5 h-5" />
            </button>
          </>
        )}
        {showCalendar && <Calendar dateType={dateType} onDataFromChild={handleDataFromCalendar} />}
      </div>
    </>
  )
}

export default Datepicker
