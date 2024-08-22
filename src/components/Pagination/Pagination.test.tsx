import { render, screen, fireEvent } from '@testing-library/react'
import CharacterPagination from './index'
import { useCharactersList } from '@hooks'

jest.mock('@hooks', () => ({
  useCharactersList: jest.fn()
}))

describe('CharacterPagination', () => {
  beforeEach(() => {
    ;(useCharactersList as jest.Mock).mockReturnValue({
      characterList: {
        page: 1,
        totalFiltered: 40
      },
      goToPage: jest.fn()
    })
  })

  it('testa o CharacterPagination', () => {
    render(<CharacterPagination />)

    const paginationElement = screen.getByRole('navigation')
    expect(paginationElement).toBeInTheDocument()
  })

  it('testa o total de paginas', () => {
    render(<CharacterPagination />)

    const paginationItems = screen.getAllByRole('button')
    expect(paginationItems).toHaveLength(4)
  })

  it('chama a função goPage', () => {
    const goToPageMock = jest.fn()
    ;(useCharactersList as jest.Mock).mockReturnValue({
      characterList: {
        page: 1,
        totalFiltered: 40
      },
      goToPage: goToPageMock
    })

    render(<CharacterPagination />)

    const secondPageButton = screen.getByText('2')
    fireEvent.click(secondPageButton)

    expect(goToPageMock).toHaveBeenCalledWith(2)
  })

  it('não chama a goPage se clicar na pagina atual', () => {
    const goToPageMock = jest.fn()
    ;(useCharactersList as jest.Mock).mockReturnValue({
      characterList: {
        page: 1,
        totalFiltered: 40
      },
      goToPage: goToPageMock
    })

    render(<CharacterPagination />)

    const firstPageButton = screen.getByText('1')
    fireEvent.click(firstPageButton)

    expect(goToPageMock).not.toHaveBeenCalled()
  })
})
