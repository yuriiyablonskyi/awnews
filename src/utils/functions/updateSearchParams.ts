const updateSearchParams = (searchParams: URLSearchParams, key: string, value: string | undefined) => {
  if (value) {
    searchParams.set(key, value)
  } else {
    searchParams.delete(key)
  }
  if (!searchParams.get('page')) {
    searchParams.set('page', '1')
  }
  return searchParams
}

export default updateSearchParams