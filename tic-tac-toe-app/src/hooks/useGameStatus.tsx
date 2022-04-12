import { useState, useCallback } from 'react'

interface GameState {
  history: Array<{ squares: Array<string | null> }>
  xIsNext: boolean
  stepNumber: number
}

export type useGameStatusReturnType = {
  state: GameState
  updateState: (_: GameState) => void
}

export const useGameStatus = (): useGameStatusReturnType => {
  const [state, setState] = useState<GameState>({
    history: [{ squares: Array(9).fill(null) }],
    xIsNext: true,
    stepNumber: 0,
  })

  const updateState = useCallback((state: GameState) => {
    setState({
      history: state.history,
      xIsNext: state.xIsNext,
      stepNumber: state.stepNumber
    })
  }, [])
  return { state, updateState }
}
