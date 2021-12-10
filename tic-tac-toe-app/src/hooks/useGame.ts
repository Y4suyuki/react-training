import { useEffect, useState } from 'react';
import { Player } from '../types/Player';
import { calculateWinner } from '../lib/calculateWinner'

type moveHistory = {
  squares: Player[]
}[];

export const useGame = () => {
  const [player      , setPlayer]      = useState<Player>(null)
  const [stepNumber  , setStepNumber]  = useState<number>(0);
  const [xIsNext     , setXIsNext]     = useState<boolean>(true);
  const [moveHistory , setMoveHistory] = useState<moveHistory>([{squares: Array(9).fill(null) }]);
  const currentMove                    = moveHistory[stepNumber];
  const winner                         = calculateWinner(moveHistory[stepNumber].squares);
  const isNextComputer                 = (player === 'O' && xIsNext) || (player === 'X' && !xIsNext)

  useEffect(() => {
    if (isNextComputer) {
      // TODO: ランダムだと同じ箇所にコンピューターが打とうとするので直す。
      // TODO: 即打たれると違和感があるのでので1秒くらい待ちたい。
      handleNextMove(Math.floor(Math.random() * 9))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isNextComputer]);

  const handleNextMove = (i: number): void => {
    if (!player) {return}

    const historySlice = moveHistory.slice(0, stepNumber + 1);
    const current = moveHistory[moveHistory.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {return}

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
    player: player,
    xIsNext: xIsNext,
    moveHistory: moveHistory,
    currentMove: currentMove,
    winner: winner,
    setPlayer: setPlayer,
    handleNextMove: handleNextMove,
    jumpTo: jumpTo
  };
};
