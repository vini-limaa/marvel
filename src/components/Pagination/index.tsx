import styles from './styles.module.scss'
import React from 'react'
import { Pagination, PaginationItem } from '@mui/material'
import { useCharactersList } from '@hooks'

const CharacterPagination: React.FC = () => {
  const { characterList, goToPage } = useCharactersList()
  const { page, totalFiltered } = characterList

  const totalPages = Math.ceil(totalFiltered / 20)

  const handleChange = (_event: React.ChangeEvent, value: number) => {
    if (value !== page) {
      goToPage(value)
    }
  }

  return (
    <div className={styles.pagination}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        color="primary"
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem {...item} disabled={item.page === page} />
        )}
      />
    </div>
  )
}

export default CharacterPagination
