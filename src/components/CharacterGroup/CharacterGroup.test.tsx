/* eslint-disable react/display-name */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CharacterGroup from './index'

jest.mock('@components', () => {
  const React = require('react')
  return {
    Character: ({ onClick }: { onClick: () => void }) => (
      <button onClick={onClick}>Character Button</button>
    ),
    CharacterInfo: React.forwardRef(
      ({ closeIcon }: { closeIcon: () => void }, ref) => (
        <div ref={ref} tabIndex={-1}>
          <button onClick={closeIcon}>Close Modal</button>
          <p>Character Info Content</p>
        </div>
      )
    )
  }
})

describe('CharacterGroup', () => {
  it('deve renderizar o botão Character', () => {
    render(<CharacterGroup />)
    const characterButton = screen.getByText('Character Button')
    expect(characterButton).toBeInTheDocument()
  })

  it('deve abrir o modal quando o botão Character for clicado', () => {
    render(<CharacterGroup />)
    const characterButton = screen.getByText('Character Button')
    fireEvent.click(characterButton)
    const modalContent = screen.getByText('Character Info Content')
    expect(modalContent).toBeInTheDocument()
  })

  it('deve fechar o modal quando o botão de fechar no CharacterInfo for clicado', () => {
    render(<CharacterGroup />)
    const characterButton = screen.getByText('Character Button')
    fireEvent.click(characterButton)
    const closeButton = screen.getByText('Close Modal')
    fireEvent.click(closeButton)
    expect(screen.queryByText('Character Info Content')).not.toBeInTheDocument()
  })
})
