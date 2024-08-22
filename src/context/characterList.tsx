import { CharacterInterface } from '../types/chars'
import React, { createContext, useState, ReactNode } from 'react'

export interface ICharacterListState {
  total: number
  totalFiltered: number
  page: number
  count: number
  data: CharacterInterface[]
  filters: {
    name: string
    series: string
  }
}

interface IContextState {
  characterListState: ICharacterListState
  setCharacterListState: React.Dispatch<
    React.SetStateAction<ICharacterListState>
  >
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const initialState: ICharacterListState = {
  total: 0,
  totalFiltered: 0,
  page: 0,
  count: 0,
  data: [],
  filters: {
    name: '',
    series: ''
  }
}

export const CharacterListContext = createContext<IContextState>({
  characterListState: initialState,
  setCharacterListState: () => {},
  loading: false,
  setLoading: () => {}
})

const CharacterListContextProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [characterListState, setCharacterListState] =
    useState<ICharacterListState>(initialState)
  const [loading, setLoading] = useState(false)

  return (
    <CharacterListContext.Provider
      value={{
        characterListState,
        setCharacterListState,
        loading,
        setLoading
      }}
    >
      {children}
    </CharacterListContext.Provider>
  )
}

export default CharacterListContextProvider
