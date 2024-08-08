import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

const classNames = (...args: Parameters<typeof clsx>) => twMerge(clsx(args))

export default classNames
