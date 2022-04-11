import {
  useGameStatusReturnType,
  useGameStatus,
} from '../../src/hooks/useGameStatus'
import { renderHook, RenderResult } from '@testing-library/react-hooks'

describe('useGameStatus', () => {
  let result: RenderResult<useGameStatusReturnType>

  beforeEach(() => {
    result = renderHook(() => useGameStatus()).result
  })

  test('check init value', () => {
    expect(result.current.state.history).toEqual([
      { squares: Array(9).fill(null) },
    ])
    expect(result.current.state.stepNumber).toBe(0)
    expect(result.current.state.xIsNext).toBe(true)
  })
})
