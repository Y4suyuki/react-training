import { Game } from '../../src/components/game'
import { render, act } from '@testing-library/react'

describe('Game', () => {
  const game = render(<Game />)
  test('snapshot', () => {
    expect(game).toMatchSnapshot()
  })

  describe('UI test', () => {
    test('click button', () => {
      // changed X in first,
      const components = render(<Game />)
      let button  = components.getAllByRole("button")[0]
      act(() => {
        button.dispatchEvent(new MouseEvent("click", { bubbles: true}))
      })
      expect(button.innerHTML).toBe("X")
      expect(components.getByText(/Next player: O/i)).toBeTruthy()

      // changed O in second.
      button  = components.getAllByRole("button")[1]
      act(() => {
        button.dispatchEvent(new MouseEvent("click", { bubbles: true}))
      })
      expect(button.innerHTML).toBe("O")
      expect(components.getByText(/Next player: X/i)).toBeTruthy()

      // not changed if click selected button
      button  = components.getAllByRole("button")[1]
      act(() => {
        button.dispatchEvent(new MouseEvent("click", { bubbles: true}))
      })
      expect(button.innerHTML).toBe("O")
      expect(components.getByText(/Next player: X/i)).toBeTruthy()

    })
  })
})
