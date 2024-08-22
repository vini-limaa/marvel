import React, { createContext, useState, useEffect } from 'react'
import { CharacterInterface } from '../types/chars'

interface IContextState {
  characterState: CharacterInterface
  setCharacterState: React.Dispatch<React.SetStateAction<CharacterInterface>>
}

const initialState: CharacterInterface = {
  id: 0,
  name: '',
  description: '',
  modified: '',
  thumbnail: undefined,
  resourceURI: '',
  comics: undefined,
  series: undefined,
  stories: undefined,
  events: undefined,
  urls: []
}

export const CharacterContext = createContext<IContextState>({
  characterState: initialState,
  setCharacterState: () => {}
})

const CharacterContextProvider = ({ value, children }) => {
  const [characterState, setCharacterState] = useState<CharacterInterface>({
    ...initialState,
    ...value
  })

  useEffect(() => {
    setCharacterState((prevState) => ({
      ...prevState,
      ...value
    }))
  }, [value])

  return (
    <CharacterContext.Provider
      value={{
        characterState,
        setCharacterState
      }}
    >
      {children}
    </CharacterContext.Provider>
  )
}

export default CharacterContextProvider
