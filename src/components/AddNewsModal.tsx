import { Dialog, Transition } from '@headlessui/react'
import { FC, Fragment } from 'react'
import { setCurrentArticle } from '../store/articles/articlesSlice'
import { AddNewsModalProps, useAppDispatch } from '../store/articles/articlesTypes'
import NewsForm from './NewsForm'

const AddNewsModal: FC<AddNewsModalProps> = ({ isOpen, onOpen }) => {
  const dispatch = useAppDispatch()
  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      onOpen(false)
      dispatch(setCurrentArticle(null))
    }
    onOpen(isOpen)
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative p-4 transform overflow-hidden rounded-lg bg-white text-left shadow-xl
               transition-all sm:m-8"
              >
                <NewsForm onOpen={onOpen} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default AddNewsModal
