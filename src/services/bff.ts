import { CharacterInterface, Data } from '../types/chars'
import { file, pagination } from '@utils'

const bff = () => {
  const { read } = file()
  const { getPageSlice } = pagination()

  const chars = () => {
    const dataCache = (() => {
      let cachedItems: CharacterInterface[] | null = null

      const loadItems = async (): Promise<CharacterInterface[]> => {
        if (!cachedItems) {
          const jsonData: Data<CharacterInterface> = await read<
            Data<CharacterInterface>
          >('src/mocks/chars.json')
          cachedItems = jsonData?.results ?? []
        }
        return cachedItems
      }

      return {
        getItems: loadItems,
        getTotal: async () => (await loadItems()).length
      }
    })()

    const getAll = async (): Promise<CharacterInterface[]> => {
      return await dataCache.getItems()
    }

    const filterByProps = async (
      name: string,
      series: string
    ): Promise<CharacterInterface[]> => {
      const items = await getAll()
      return items.filter((item) => {
        const matchesName =
          !name || item.name.toLowerCase().includes(name.toLowerCase())
        const matchesSeries =
          !series ||
          item.series.items.some((seriesItem) =>
            seriesItem.name.toLowerCase().includes(series.toLowerCase())
          )
        return matchesName && matchesSeries
      })
    }

    const getWithPage = async (page: number, name: string, series: string) => {
      const filteredItems = await filterByProps(name, series)
      const pageSlice = getPageSlice({ items: filteredItems, page })

      if (!pageSlice) {
        return {
          items: [],
          totalFiltered: 0
        }
      }

      const paginatedItems = filteredItems.slice(pageSlice.start, pageSlice.end)

      return {
        items: paginatedItems,
        totalFiltered: filteredItems.length
      }
    }

    return {
      getAll,
      getWithPage,
      total: dataCache.getTotal()
    }
  }

  return {
    chars: chars()
  }
}

export default bff
