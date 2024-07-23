import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { addArticle, changeCurrentArticle, setCurrentArticle } from '../store/articles/articlesSlice'
import { ArticleInterface, useAppDispatch, useAppSelector } from '../store/articles/articlesTypes'
import { articlesData } from '../store/articlesSelectors'
import { schema } from '../utils/formConstants'

const NewsForm: FC<{ onOpen: Dispatch<SetStateAction<boolean>> }> = ({ onOpen }) => {
  const dispatch = useAppDispatch()
  const { currentArticle } = useAppSelector(articlesData)
  const isEditing = !!currentArticle
  const [preview, setPreview] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    ...(isEditing && { defaultValues: currentArticle }),
  })

  const closeModal = () => {
    onOpen(false)
    dispatch(setCurrentArticle(null))
  }

  const onSubmit = (data: ArticleInterface) => {
    if (isEditing) {
      dispatch(changeCurrentArticle({ ...currentArticle, ...data }))
    } else {
      dispatch(
        addArticle({
          id: Math.random().toString(16).slice(2),
          title: data.title,
          description: data.description,
          urlToImage: data.urlToImage,
          publishedAt: dayjs().toString(),
          isHotNews: data.isHotNews,
        }),
      )
    }
    closeModal()
  }

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setPreview(url)
    toast.success('Image added successfully')
  }

  return (
    <>
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        {isEditing ? 'Edit Article' : 'Create New Article'}
      </h3>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        {isEditing
          ? 'Update the form below to edit your article. Ensure your information is current and share the latest' +
            'updates with our community!'
          : 'Fill in the form below to submit your new article. Share your news with our community!'}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="border-b border-gray-900/10 pb-12 mt-2 sm:mt-10 grid grid-cols-1 gap-x-6 gap-y-8
         sm:grid-cols-6"
        >
          <div className="col-span-full">
            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
              Title
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="title"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
                ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                sm:text-sm sm:leading-6 "
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
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
                ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                sm:text-sm sm:leading-6"
                {...register('description')}
              />
              {errors.description && <span className="text-red-600">{errors.description.message}</span>}
            </div>
          </div>
          <div className="col-span-full">
            <label htmlFor="img-url" className="block text-sm font-medium leading-6 text-gray-900">
              Url image
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="img-url"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                 sm:text-sm sm:leading-6"
                {...register('urlToImage', { onChange: handleImgChange })}
              />
              {errors.urlToImage && <span className="text-red-600">{errors.urlToImage.message}</span>}
            </div>
            {preview && <img src={preview} alt="Preview" className="mt-1.5 w-12 h-12 object-cover" />}
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
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm
             hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
             focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  )
}

export default NewsForm
