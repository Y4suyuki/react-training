import { Game } from '../../src/components/game'
import { render } from '@testing-library/react'

describe('Game', () => {
  const game = render(<Game />)
  test('snapshot', () => {
    expect(game).toMatchSnapshot()
  })
})
