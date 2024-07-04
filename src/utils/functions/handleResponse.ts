const handleResponse = async (response: Response, rejectWithValue: any) => {
  console.log(response)

  if (!response.ok) {
    const text = await response.text()
    const parsedText = JSON.parse(text).message
    return rejectWithValue(parsedText)
  }
  return await response.json()
}

export default handleResponse
