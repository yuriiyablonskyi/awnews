import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { FC, Fragment } from 'react'
import { SelectProps, SelectableItem } from '../store/articles/articlesTypes'
import Option from './Option'

const Select: FC<SelectProps> = ({ dataSelect, options, onSelect, optionName }) => (
  <div className="flex justify-center mb-3 mr-4 sm:mb-7">
    <div className="mx-auto w-full max-w-xs">
      <Listbox value={dataSelect || ''}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900 capitalize">
              {optionName}
            </Listbox.Label>
            <div className="relative mt-2">
              <Listbox.Button
                className="relative w-full max-w-52 min-w-44 cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 
                text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2
                focus:ring-neutral-500 sm:text-sm sm:leading-6 capitalize"
              >
                <span>{dataSelect || `Select ${optionName}`}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  className="absolute z-10 mt-1 max-h-80 max-w-52 min-w-44 overflow-auto rounded-md bg-white py-1 
                  text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  <Option optionName={optionName} onChange={() => onSelect({ name: '' })} />
                  {options.map((select: SelectableItem) => (
                    <Option select={select} key={select.id} onChange={() => onSelect(select)} />
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  </div>
)

export default Select
