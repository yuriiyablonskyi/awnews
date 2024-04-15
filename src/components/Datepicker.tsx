import { CalendarIcon } from '@heroicons/react/24/outline'
import dayjs from 'dayjs'
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

  const handleDataFromCalendar = (data: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    setShowCalendar(false)
    setDateCalendar(data)
    if (dateType === 'From date') {
      newSearchParams.set('from', data)
      newSearchParams.delete('to')
    } else if (dateType === 'To date') {
      newSearchParams.set('to', data)
      newSearchParams.delete('from')
    }
    newSearchParams.set('page', '1')
    // } else if (dateType === 'From date to date' ) {
    sendRequest(newSearchParams.toString())
    setSearchParams(newSearchParams)
  }

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
                value={(dateCalendar && dayjs(dateCalendar).format('D MMMM YYYY')) || 'Select date'} // отображать  выбранную дату в другом формате либо текст
                // value="3 April 2024 - 3 April 2024"
                readOnly
              />
              <CalendarIcon className="w-5 h-5" />
            </button>
          </>
        )}
        {showCalendar && <Calendar onDataFromChild={handleDataFromCalendar} />}
      </div>
    </>
  )
}

export default Datepicker
