import React from 'react'
import { render, screen } from '@testing-library/react'
import Hero from './index'

describe('Hero', () => {
  const mockProps = {
    title: 'Marvel Characters',
    subtitle:
      'Get hooked on a hearty helping of heroes and villains from the humble House of Ideas!',
    backgroundImage: '/teste'
  }

  test('renderiza o Hero', () => {
    render(<Hero {...mockProps} />)

    const titleElement = screen.getByText('Marvel Characters')
    expect(titleElement).toBeInTheDocument()

    const subtitleElement = screen.getByText(
      'Get hooked on a hearty helping of heroes and villains from the humble House of Ideas!'
    )
    expect(subtitleElement).toBeInTheDocument()
  })
})
