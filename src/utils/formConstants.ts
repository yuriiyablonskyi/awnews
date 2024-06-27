import { z } from "zod"

export const schema = z.object({
  title: z
    .string()
    .min(40, { message: 'Title must be at least 40 characters long' })
    .max(100, { message: 'Title must be no more than 100 characters long' })
    .nonempty({ message: 'Title is required' }),
  description: z
    .string()
    .min(80, { message: 'Description must be at least 80 characters long' })
    .max(270, {
      message: 'Description must be no more than 270 characters long',
    })
    .nonempty({ message: 'Description is required' }),
  isHotNews: z.boolean(),
  urlToImage: z.string().nonempty({ message: 'Image is required' }),
})