import { useState } from 'react';
import { SquareValue } from '../types/SquareValue';
import { calculateWinner } from '../lib/calculateWinner'

type History = {
  squares: SquareValue[]
}[];

export const useGame = () => {
  const [history   , setHistory]    = useState<History>([{squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [xIsNext   , setXIsNext]    = useState<boolean>(true);

  const handleClick = (i: number): void => {
    const historySlice = history.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(historySlice.concat({squares: squares}));
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step: number): void => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  };

  return {
    history: history,
    stepNumber: stepNumber,
    xIsNext: xIsNext,
    handleClick: handleClick,
    jumpTo: jumpTo
  };
};
