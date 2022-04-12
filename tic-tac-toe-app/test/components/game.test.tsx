import { Game } from '../../src/components/game'
import { render, act } from '@testing-library/react'

describe('Game', () => {
  const game = render(<Game />)
  test('snapshot', () => {
    expect(game).toMatchSnapshot()
  })

  describe('UI test', () => {
    test('Playing Game!', () => {
      // changed X in first,
      const components = render(<Game />)
      const buttons  = components.getAllByRole("button")

      act(() => {
        buttons[0].dispatchEvent(new MouseEvent("click", { bubbles: true}))
      })
      expect(buttons[0].innerHTML).toBe("X")
      expect(components.getByText(/Next player: O/i)).toBeTruthy()

      // changed O in second.
      act(() => {
        buttons[1].dispatchEvent(new MouseEvent("click", { bubbles: true}))
      })
      expect(buttons[1].innerHTML).toBe("O")
      expect(components.getByText(/Next player: X/i)).toBeTruthy()

      // not changed if click selected button
      act(() => {
        buttons[1].dispatchEvent(new MouseEvent("click", { bubbles: true}))
      })
      expect(buttons[1].innerHTML).toBe("O")
      expect(components.getByText(/Next player: X/i)).toBeTruthy()

      // get back if click `Go to move #1` and, get back one move.
      let button  = components.getByRole('button', { name: /Go to move #1/i })
      act(() => {
        button.dispatchEvent(new MouseEvent("click", { bubbles: true}))
      })
      expect(components.getByText(/Next player: O/i)).toBeTruthy()

      // decide winner
      let nums = [3, 4, 6, 8]
      nums.forEach((i) => {
        act(() => {
          buttons[i].dispatchEvent(new MouseEvent("click", { bubbles: true}))
        })
      })
      expect(components.getByText(/Winner is X/i)).toBeTruthy()

      // not changed if after decide winner
      act(() => {
        buttons[7].dispatchEvent(new MouseEvent("click", { bubbles: true}))
      })
      expect(buttons[7].innerHTML).toBe("")
      expect(components.getByText(/Winner is X/i)).toBeTruthy()
    })
  })
})
