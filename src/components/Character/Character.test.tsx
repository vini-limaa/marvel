import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CharacterCard from './index'
import { useCharacter } from '@hooks'

jest.mock('@hooks', () => ({
  useCharacter: jest.fn()
}))

const mockCharacter = {
  name: '3-D Man',
  thumbnail: {
    path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
    extension: 'jpg'
  }
}

describe('CharacterCard', () => {
  beforeEach(() => {
    ;(useCharacter as jest.Mock).mockReturnValue({ character: mockCharacter })
  })

  test('testa o CharacterCard', () => {
    render(<CharacterCard />)
    const nomePersonagem = screen.getByText('3-D Man')
    expect(nomePersonagem).toBeInTheDocument()
    const imagemPersonagem = screen.getByAltText('Imagem do personagem 3-D Man')
    expect(imagemPersonagem).toHaveAttribute(
      'src',
      'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784.jpg'
    )
  })

  test('testa o onClick', () => {
    const handleClick = jest.fn()
    render(<CharacterCard onClick={handleClick} />)
    const cardElement = screen.getByText('3-D Man').closest('article')
    fireEvent.click(cardElement!)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
