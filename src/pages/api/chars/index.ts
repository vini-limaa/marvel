import { ICharacterListState } from '@context/characterList'
import { bff } from '@services'

const handler = (req, res) => {
  if (req.method === 'GET') {
    const { chars } = bff()
    const { page = 1, name = '', series = '' } = req.query

    chars
      .getWithPage(Number(page), name, series)
      .then(({ items, totalFiltered }) => {
        chars.total.then((total) => {
          const result: ICharacterListState = {
            total,
            totalFiltered,
            page: Number(page),
            count: items.length,
            data: items,
            filters: {
              name,
              series
            }
          }
          res.status(200).json(result)
        })
      })
      .catch((error) => {
        res.status(500).end({ error: error })
      })
  } else {
    res.status(404).end()
  }
}

export default handler
