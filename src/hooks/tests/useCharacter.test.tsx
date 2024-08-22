import React from 'react'
import { render, screen, act } from '@testing-library/react'
import { CharacterProvider } from '@context'
import { useCharacter } from '@hooks'
import mockCharacter from '@mocks/mockCharacter'
import { CharacterInterface } from '../../types/chars'

const TestComponent: React.FC = () => {
  const { character, setCharacter } = useCharacter()

  return (
    <div>
      <div data-testid="character">{JSON.stringify(character)}</div>
      <button onClick={() => setCharacter(mockCharacter as CharacterInterface)}>
        Update Character
      </button>
    </div>
  )
}

const renderWithProvider = (ui: React.ReactElement) =>
  render(
    <CharacterProvider value={{} as CharacterInterface}>{ui}</CharacterProvider>
  )

describe('useCharacter hook', () => {
  it('inicializa o Hook', () => {
    renderWithProvider(<TestComponent />)
    expect(screen.getByTestId('character')).toHaveTextContent('{}')

    act(() => {
      screen.getByText('Update Character').click()
    })

    expect(screen.getByTestId('character')).toHaveTextContent(
      JSON.stringify(mockCharacter)
    )
  })
})
