import { useState, useContext } from 'react'
import {
  CharacterListContext,
  ICharacterListState
} from '@context/characterList'

const useCharactersList = () => {
  const context = useContext(CharacterListContext)

  if (!context) {
    throw new Error('Faltando CharacterListContextProvider')
  }

  const { setCharacterListState, characterListState, loading, setLoading } =
    context

  const setCharacters = (
    data:
      | ICharacterListState
      | ((prevState: ICharacterListState) => ICharacterListState)
  ) => {
    setCharacterListState((prevState) => {
      const newState =
        typeof data === 'function' ? data(prevState) : { ...prevState, ...data }
      return { ...newState }
    })
  }

  const filterCharacters = ({ page, name, series }: FilterParams) => {
    setLoading(true)

    const queryParams = new URLSearchParams()

    if (page !== undefined) {
      queryParams.append('page', page.toString())
    }

    if (name) {
      queryParams.append('name', name)
    }

    if (series) {
      queryParams.append('series', series)
    }

    fetch(`/api/chars?${queryParams}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then((data: ICharacterListState) => {
        setCharacters(data)
      })
      .catch((error) => {
        console.error('Erro ao buscar chars:', error)
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false)
        }, 500)
      })
  }

  const goToPage = (page: number) => {
    filterCharacters({
      page,
      name: characterListState?.filters?.name,
      series: characterListState?.filters?.series
    })
  }

  return {
    characterList: characterListState,
    loading,
    setCharacters,
    filterCharacters,
    goToPage
  }
}

export default useCharactersList

interface FilterParams {
  page?: number
  name?: string
  series?: string
}
