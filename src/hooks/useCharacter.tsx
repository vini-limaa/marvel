import { CharacterContext } from '@context/character'
import { CharacterInterface } from '../types/chars'

import { useContext } from 'react'

const useCharacter = () => {
  const context = useContext(CharacterContext)

  if (!context) {
    throw new Error('Faltando CharacterContextProvider')
  }

  const { characterState, setCharacterState } = context

  const setCharacter = (
    data:
      | CharacterInterface
      | ((prevState: CharacterInterface) => CharacterInterface)
  ) => {
    setCharacterState((prevState) =>
      typeof data === 'function' ? data(prevState) : data
    )
  }

  return {
    character: characterState,
    setCharacter
  }
}

export default useCharacter
