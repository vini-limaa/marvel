import React, { useCallback, useState, useMemo } from 'react'
import styles from './styles.module.scss'
import TextField from '@mui/material/TextField'
import { Button } from '@components'
import { useCharactersList } from '@hooks'

interface SearchProps {
  children: string
}

const Search = ({ children }: SearchProps) => {
  const { filterCharacters, characterList } = useCharactersList()
  const [formState, setFormState] = useState({ name: '', series: '' })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormState((prevState) => ({ ...prevState, [name]: value }))
  }

  const filter = useCallback(() => {
    filterCharacters(formState)
  }, [filterCharacters, formState])

  const subtitle = useMemo(() => {
    return `${children} - ${characterList.totalFiltered}`
  }, [children, characterList.totalFiltered])

  const reset = useCallback(() => {
    setFormState({ name: '', series: '' })
    filterCharacters({ name: '', series: '', page: 1 })
  }, [filterCharacters])

  return (
    <div className={styles.search}>
      <div className={styles.top}>
        <div className={styles.left}>
          <TextField
            label="Search"
            variant="standard"
            className={styles.input}
            name="name"
            value={formState.name}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.right}>
          <TextField
            label="Series/Movies"
            variant="standard"
            className={styles.input}
            name="series"
            value={formState.series}
            onChange={handleInputChange}
          />
          <div className={styles.buttons}>
            <Button onClick={reset}>RESET</Button>
            <Button onClick={filter}>FILTER</Button>
          </div>
        </div>
      </div>
      <h2 className={styles.subtitle}>{subtitle}</h2>
    </div>
  )
}

export default Search
