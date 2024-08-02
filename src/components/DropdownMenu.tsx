import { Menu, Transition } from '@headlessui/react'
import { FC } from 'react'
import { DropdownMenuProps } from '../store/articles/articlesTypes'

const DropdownMenu: FC<DropdownMenuProps> = ({ dropdownData, actions }) => (
  <div className={dropdownData.wpapperStyle}>
    <Menu>
      <Menu.Button
        className="inline-flex items-center gap-2 rounded-md py-1 px-0.5 text-sm/6 font-semibold text-white
      focus:outline-none data-[hover]:-graybg-700 data-[open]:bg-gray-700 data-[focus]:outline-1
      data-[focus]:outline-white"
      >
        {dropdownData.menuButtonIcon.icon ? (
          <dropdownData.menuButtonIcon.icon className={dropdownData.menuButtonIcon.style} />
        ) : (
          <img src={dropdownData.menuButtonIcon.img} className="h-10 w-10 rounded-full" />
        )}
      </Menu.Button>
      <Transition
        enter="transition ease-out duration-75"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute right-0 mt-1 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1
         ring-black/5 focus:outline-none"
        >
          {dropdownData.data.map(({ name, icon: Icon, action }, index) => (
            <Menu.Item key={index}>
              <button
                onClick={action || (actions && actions[name])}
                className="flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-100"
              >
                <Icon className="size-4 fill-gray-600" />
                {name}
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  </div>
)

export default DropdownMenu
