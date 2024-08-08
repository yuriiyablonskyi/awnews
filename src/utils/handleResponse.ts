import { FetchBaseQueryError } from "@reduxjs/toolkit/query"

const handleResponse = async (response: Response, rejectWithValue: (value: FetchBaseQueryError | string) => void) => {
  if (!response.ok) {
    const text = await response.text()
    const parsedText = JSON.parse(text).message
    return rejectWithValue(parsedText)
  }
  return await response.json()
}

export default handleResponse
