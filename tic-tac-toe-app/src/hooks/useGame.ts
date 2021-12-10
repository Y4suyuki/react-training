import { useState } from 'react';
import { SquareValue } from '../types/SquareValue';
import { calculateWinner } from '../lib/calculateWinner'

type moveHistory = {
  squares: SquareValue[]
}[];

export const useGame = () => {
  const [stepNumber  , setStepNumber]     = useState<number>(0);
  const [xIsNext     , setXIsNext]        = useState<boolean>(true);
  const [moveHistory , setMoveHistory]    = useState<moveHistory>([{squares: Array(9).fill(null) }]);
  const currentMove = moveHistory[stepNumber];
  const winner = calculateWinner(moveHistory[stepNumber].squares);

  const handleNextMove = (i: number): void => {
    const historySlice = moveHistory.slice(0, stepNumber + 1);
    const current = moveHistory[moveHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';

    setMoveHistory(historySlice.concat({squares: squares}));
    setStepNumber(moveHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step: number): void => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  };

  return {
    xIsNext: xIsNext,
    moveHistory: moveHistory,
    currentMove: currentMove,
    winner: winner,
    handleNextMove: handleNextMove,
    jumpTo: jumpTo
  };
};
