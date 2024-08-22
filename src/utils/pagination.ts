const pagination = () => {
  const getPageSlice = <T>({
    items,
    page
  }: GetPageSliceParams<T>): PageSlice | undefined => {
    const itemsPerPage = 20
    const totalPages = Math.ceil(items.length / itemsPerPage)

    const isValid = page >= 1 && page <= totalPages

    if (isValid) {
      const start = (page - 1) * itemsPerPage
      const end = start + itemsPerPage

      return {
        start,
        end
      }
    }

    return undefined
  }

  return { getPageSlice }
}

export default pagination

interface GetPageSliceParams<T> {
  items: T[]
  page: number
}

interface PageSlice {
  start: number
  end: number
}
