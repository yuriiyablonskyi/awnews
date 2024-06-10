import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { removeArticle } from '../store/articles/articlesSlice'

const DropdownMenu: FC<{ id: string }> = ({ id }) => {
  const dispatch = useDispatch()

  return (
    <div className="absolute top-0 right-0 text-right">
      <Menu>
        <Menu.Button className="inline-flex items-center gap-2 rounded-md py-1 px-0.5 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:-graybg-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          <EllipsisVerticalIcon className="size-8 fill-gray-600" />
        </Menu.Button>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Menu.Items className="bg-gray-500 origin-top-right rounded-xl border border-white/5 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none">
            <Menu.Item>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-white/10">
                <PencilIcon className="size-4 fill-white/30" />
                Edit
              </button>
            </Menu.Item>
            <Menu.Item>
              <button
                onClick={() => dispatch(removeArticle(id))}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-white/10"
              >
                <TrashIcon className="size-4 fill-white/30" />
                Delete
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default DropdownMenu
