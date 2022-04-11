import { calculateWinner } from '../../src/functions/calculateWinner'

describe('calculateWinner', () => {
  // NOTE: only output case...
  test('no winner', () => {
    const squares = Array(9).fill(null)
    expect(calculateWinner(squares)).toBe(null)
  })

  test('X winner', () => {
    const squares = Array(9).fill('X')
    expect(calculateWinner(squares)).toBe('X')
  })

  test('O winner', () => {
    const squares = Array(9).fill('O')
    expect(calculateWinner(squares)).toBe('O')
  })
})
