import { render, screen } from '@testing-library/react'
import Navbar from './index'

describe('Navbar', () => {
  it('testa a logo', () => {
    const logoText = 'Logo'
    render(<Navbar logo={<div>{logoText}</div>} />)

    const logoElement = screen.getByText(logoText)
    expect(logoElement).toBeInTheDocument()
  })
})
