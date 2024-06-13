import { FC, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import { z } from 'zod'
import { PhotoIcon } from '@heroicons/react/24/solid'
import { zodResolver } from '@hookform/resolvers/zod'
import { setCurrentArticle, addArticle, changeCurrentArticle } from '../store/articles/articlesSlice'
import { articlesData } from '../store/articlesSelectors'

const MAX_FILE_SIZE: number = 1024 * 1024 * 10
const ACCEPTED_IMAGE_TYPES: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']

const NewsForm: FC<{ onOpen: Dispatch<SetStateAction<boolean>> }> = ({ onOpen }) => {
  const dispatch = useDispatch()
  const { currentArticle } = useSelector(articlesData)
  const isEditing = !!Object.keys(currentArticle).length
  const [preview, setPreview] = useState<string | null>(null)

  const schema = z.object({
    title: z
      .string()
      .min(40, { message: 'Title must be at least 40 characters long' })
      .max(100, { message: 'Title must be no more than 100 characters long' })
      .nonempty({ message: 'Title is required' }),
    description: z
      .string()
      .min(80, { message: 'Description must be at least 80 characters long' })
      .max(270, { message: 'Description must be no more than 270 characters long' })
      .nonempty({ message: 'Description is required' }),
    isHotNews: z.boolean(),
    coverPhoto: z
      .instanceof(File)
      .refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: 'Only PNG, JPG, GIF files are allowed',
      })
      .refine(file => file.size <= MAX_FILE_SIZE, {
        message: 'File size must be less than 10MB',
      })
      .optional(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  })

  const closeModal = () => {
    onOpen(false)
    dispatch(setCurrentArticle({}))
  }

  useEffect(() => {
    reset(currentArticle)
  }, [currentArticle, reset])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return toast.error('Only PNG, JPG, GIF files are allowed')
    }

    if (file.size > MAX_FILE_SIZE) {
      return toast.error('File size must be less than 10MB')
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
      toast.success('Image Successfully Uploaded')
    }
    reader.readAsDataURL(file)
  }

  const onSubmit = data => {
    if (isEditing) {
      dispatch(changeCurrentArticle({ ...currentArticle, ...data }))
    } else {
      dispatch(
        addArticle({
          id: Math.random().toString(16).slice(2),
          author: 'Finnegan Whitmore',
          title: data.title,
          description: data.description,
          // urlToImage
          publishedAt: dayjs().toString(),
          isHotNews: data.isHotNews,
        }),
      )
    }
    closeModal()
  }

  return (
    <>
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        {isEditing ? 'Edit Article' : 'Create New Article'}
      </h3>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        {isEditing
          ? 'Update the form below to edit your article. Ensure your information is current and share the latest updates with our community!'
          : 'Fill in the form below to submit your new article. Share your news with our community!'}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border-b border-gray-900/10 pb-12 mt-2 sm:mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
              Title
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="title"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('title')}
              />
              {errors.title && <span className="text-red-600">{errors.title.message}</span>}
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
              Description
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                rows={3}
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('description')}
              />
              {errors.description && <span className="text-red-600">{errors.description.message}</span>}
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
              Cover photo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              {preview ? (
                <img src={preview} alt="Preview" className="max-w-3xl object-cover rounded-md" />
              ) : (
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload image</span>

                      <input
                        accept="image/*"
                        id="file-upload"
                        type="file"
                        className="sr-only"
                        {...register('coverPhoto', { onChange: handleFileChange })}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>
          </div>

          <div className="relative flex gap-x-3">
            <div className="flex h-6 items-center">
              <input
                id="hot-news"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                {...register('isHotNews')}
              />
            </div>
            <div className="text-sm leading-6">
              <label htmlFor="hot-news" className="font-medium text-gray-900">
                Hot News
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={closeModal}>
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  )
}

export default NewsForm
