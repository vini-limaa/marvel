import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './index'

test('renderiza o Button', () => {
  render(<Button>Clique Aqui</Button>)
  const elementoButton = screen.getByText('Clique Aqui')
  expect(elementoButton).toBeInTheDocument()
})

test('testa variantes', () => {
  const { rerender } = render(<Button variant="primary">Primary</Button>)
  expect(screen.getByText('Primary')).toHaveClass('button', 'primary')

  rerender(<Button variant="secondary">Secondary</Button>)
  expect(screen.getByText('Secondary')).toHaveClass('button', 'secondary')

  rerender(<Button variant="inverse">Inverse</Button>)
  expect(screen.getByText('Inverse')).toHaveClass('button', 'inverse')
})

test('testa o clique', () => {
  const handleClick = jest.fn()
  render(<Button onClick={handleClick}>Clique Aqui</Button>)
  const elementoButton = screen.getByText('Clique Aqui')
  fireEvent.click(elementoButton)
  expect(handleClick).toHaveBeenCalledTimes(1)
})

test('testa props', () => {
  render(<Button aria-label="botao-teste">Clique Aqui</Button>)
  const elementoButton = screen.getByLabelText('botao-teste')
  expect(elementoButton).toBeInTheDocument()
})
