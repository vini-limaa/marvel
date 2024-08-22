import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CharacterInfo from './index'
import { useCharacter } from '@hooks'

import mockCharacter from '@mocks/mockCharacter'

jest.mock('@hooks', () => ({
  useCharacter: jest.fn()
}))

describe('CharacterInfo', () => {
  beforeEach(() => {
    ;(useCharacter as jest.Mock).mockReturnValue({ character: mockCharacter })
  })

  test('renderiza CharacterInfo', () => {
    render(<CharacterInfo />)
    expect(screen.getByText('3-D Man')).toBeInTheDocument()
    const image = screen.getByAltText('Imagem do personagem 3-D Man')
    expect(image).toHaveAttribute(
      'src',
      'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784.jpg'
    )
    expect(
      screen.getByText('Avengers: The Initiative (2007) #14')
    ).toBeInTheDocument()
    expect(screen.getByText('Marvel Premiere (1972) #35')).toBeInTheDocument()
    expect(
      screen.getByText('Avengers: The Initiative (2007 - 2010)')
    ).toBeInTheDocument()
    expect(screen.getByText('The 3-D Man!')).toBeInTheDocument()
    expect(screen.getByText('Secret Invasion')).toBeInTheDocument()
    expect(
      screen.getByText(
        'http://marvel.com/characters/74/3-d_man?utm_campaign=apiRef&utm_source=64f21a16962ed767cbf64bcfd03ce491'
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'http://marvel.com/universe/3-D_Man_(Chandler)?utm_campaign=apiRef&utm_source=64f21a16962ed767cbf64bcfd03ce491'
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'http://marvel.com/comics/characters/1011334/3-d_man?utm_campaign=apiRef&utm_source=64f21a16962ed767cbf64bcfd03ce491'
      )
    ).toBeInTheDocument()
  })

  test('chama a função closeIcon quando o botão de fechar é clicado', () => {
    const handleClose = jest.fn()
    render(<CharacterInfo closeIcon={handleClose} />)

    const closeButton = screen.getByText('X')
    fireEvent.click(closeButton)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
