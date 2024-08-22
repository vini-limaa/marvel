import { render, screen } from '@testing-library/react'
import ListCharacters from './index'

describe('ListCharacters', () => {
  it('renderiza o componente filho de ListCharacters ', () => {
    render(
      <ListCharacters>
        <div>Character 1</div>
      </ListCharacters>
    )
    const characterElement = screen.getByText('Character 1')
    expect(characterElement).toBeInTheDocument()
  })

  it('renderiza varios componentes filhos de ListCharacters', () => {
    render(
      <ListCharacters>
        <div>Character 1</div>
        <div>Character 2</div>
        <div>Character 3</div>
      </ListCharacters>
    )
    const character1 = screen.getByText('Character 1')
    const character2 = screen.getByText('Character 2')
    const character3 = screen.getByText('Character 3')

    expect(character1).toBeInTheDocument()
    expect(character2).toBeInTheDocument()
    expect(character3).toBeInTheDocument()
  })
})
