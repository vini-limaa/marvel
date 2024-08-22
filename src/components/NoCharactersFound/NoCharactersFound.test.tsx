import { render, screen } from '@testing-library/react'
import NoCharactersFound from './index'

describe('NoCharactersFound', () => {
  it('testa o NoCharactersFound', () => {
    render(<NoCharactersFound />)
    const messageElement = screen.getByText('No characters found')
    expect(messageElement).toBeInTheDocument()
  })
})
