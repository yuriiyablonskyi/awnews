import { FC } from 'react'

const SkeletonArticle: FC = () => (
  <div role="status" className="animate-pulse">
    <div className="flex items-center justify-center h-80 mb-4 bg-gray-300 rounded dark:bg-gray-700"></div>
    <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
    <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
    <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    <div className="flex items-center mt-4">
      <div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
        <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
    </div>
  </div>
)

export default SkeletonArticle
