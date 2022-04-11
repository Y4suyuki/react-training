import React, { useState } from 'react'

interface GameState {
  history: Array<{ squares: Array<string | null> }>
  xIsNext: boolean
  stepNumber: number
}

export type useGameStatusReturnType = {
  state: GameState
  setState: React.Dispatch<React.SetStateAction<GameState>>
}

export const useGameStatus = (): useGameStatusReturnType => {
  const [state, setState] = useState<GameState>({
    history: [{ squares: Array(9).fill(null) }],
    xIsNext: true,
    stepNumber: 0,
  })
  return { state, setState }
}
