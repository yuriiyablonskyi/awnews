const areFilterOptionsEmpty = (options: { [key: string]: string }): boolean => {
  return Object.values(options).every(value => value === '')
}

export default areFilterOptionsEmpty