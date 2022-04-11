import { useState } from 'react';

interface GameState {
    history: Array<any>,
    xIsNext: boolean,
    stepNumber: number
}

export const useGameStatus = () => {
    const [state, setState] = useState<GameState>({
        history: [{squares: Array(9).fill(null)}],
        xIsNext: true,
        stepNumber: 0
    })
    return {state, setState};
}
