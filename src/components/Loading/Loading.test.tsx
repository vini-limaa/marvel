import { render } from '@testing-library/react'
import Loading from './index'

describe('Loading', () => {
  it('testa o loading', () => {
    const { container } = render(<Loading />)
    const loadingContainerDiv = container.firstChild
    expect(loadingContainerDiv).toHaveClass('loadingContainer')
  })

  it('testa o spinner', () => {
    const { container } = render(<Loading />)
    const loadingContainerDiv = container.firstChild
    const spinnerDiv = loadingContainerDiv?.firstChild
    expect(spinnerDiv).toHaveClass('spinner')
  })
})
