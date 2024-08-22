import { render, screen, fireEvent } from '@testing-library/react'
import Search from './index'
import { useCharactersList } from '@hooks'

jest.mock('@hooks', () => ({
  useCharactersList: jest.fn()
}))

describe('Search', () => {
  const mockFilterCharacters = jest.fn()

  beforeEach(() => {
    ;(useCharactersList as jest.Mock).mockReturnValue({
      filterCharacters: mockFilterCharacters,
      characterList: {
        totalFiltered: 10
      }
    })
  })

  it('testa o Search', () => {
    render(<Search>Test Subtitle</Search>)

    const searchInput = screen.getByLabelText('Search')
    const seriesInput = screen.getByLabelText('Series/Movies')
    const resetButton = screen.getByText('RESET')
    const filterButton = screen.getByText('FILTER')

    expect(searchInput).toBeInTheDocument()
    expect(seriesInput).toBeInTheDocument()
    expect(resetButton).toBeInTheDocument()
    expect(filterButton).toBeInTheDocument()
  })

  it('testa se os campos são alterados', () => {
    render(<Search>Test Subtitle</Search>)

    const searchInput = screen.getByLabelText('Search')
    const seriesInput = screen.getByLabelText('Series/Movies')

    fireEvent.change(searchInput, { target: { value: 'Spider' } })
    fireEvent.change(seriesInput, { target: { value: 'Man' } })

    expect(searchInput).toHaveValue('Spider')
    expect(seriesInput).toHaveValue('Man')
  })

  it('chama o filtro ao clicar em filtro', () => {
    render(<Search>Test Subtitle</Search>)

    const searchInput = screen.getByLabelText('Search')
    const seriesInput = screen.getByLabelText('Series/Movies')
    const filterButton = screen.getByText('FILTER')

    fireEvent.change(searchInput, { target: { value: 'Spider' } })
    fireEvent.change(seriesInput, { target: { value: 'Man' } })
    fireEvent.click(filterButton)

    expect(mockFilterCharacters).toHaveBeenCalledWith({
      name: 'Spider',
      series: 'Man'
    })
  })

  it('testa se os campos estão sendo resetados', () => {
    render(<Search>Test Subtitle</Search>)

    const searchInput = screen.getByLabelText('Search')
    const seriesInput = screen.getByLabelText('Series/Movies')
    const resetButton = screen.getByText('RESET')

    fireEvent.change(searchInput, { target: { value: 'Spider' } })
    fireEvent.change(seriesInput, { target: { value: 'Man' } })
    fireEvent.click(resetButton)

    expect(searchInput).toHaveValue('')
    expect(seriesInput).toHaveValue('')
    expect(mockFilterCharacters).toHaveBeenCalledWith({
      name: '',
      series: '',
      page: 1
    })
  })

  it('testa se está trazendo o total de chars', () => {
    render(<Search>Test Subtitle</Search>)

    const subtitleElement = screen.getByText('Test Subtitle - 10')
    expect(subtitleElement).toBeInTheDocument()
  })
})
