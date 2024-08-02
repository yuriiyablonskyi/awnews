import { Listbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { FC } from 'react'
import { OptionProps } from '../store/articles/articlesTypes'
import classNames from '../utils/classNames'

const Option: FC<OptionProps> = ({ select, optionName, onChange }) => (
  <Listbox.Option
    onClick={onChange}
    className={({ active }) =>
      classNames(
        active ? 'bg-stone-300 text-silver cursor-pointer' : 'text-gray-900',
        'relative cursor-pointer select-none py-2 pl-3 pr-9 capitalize',
      )
    }
    value={select}
  >
    {({ selected, active }) => (
      <>
        <span>{select?.name || `Select ${optionName}`}</span>
        {selected ? (
          <span
            className={classNames(
              active ? 'text-white' : 'text-stone-300',
              'absolute inset-y-0 right-0 flex items-center pr-4',
            )}
          >
            <CheckIcon className="h-5 w-5" aria-hidden="true" />
          </span>
        ) : null}
      </>
    )}
  </Listbox.Option>
)

export default Option
