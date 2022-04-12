import { Board } from '../../src/components/board'
import { render } from '@testing-library/react'

describe('Board', () => {
  const squares = Array(9).fill(null)
  const board = render(
    <Board squares={squares} onClick={() => console.log('HELLO')} />
  )
  test('snapshot', () => {
    expect(board).toMatchSnapshot()
  })
})
