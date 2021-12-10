import React from 'react';
import { Player } from '../types/Player'

type HistoryProps = {
  xIsNext: boolean,
  moveHistory: {
    squares: Player[]
  }[],
  winner: Player,
  jumpTo: (move: number) => void
}

export const History: React.FC<HistoryProps> = ({xIsNext, moveHistory, winner, jumpTo}) => {
  const status =
    winner
      ? 'Winner: ' +  winner
      : 'Next player: ' + (xIsNext ? 'X' : 'O');

  const moves = moveHistory.map((_, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return(
    <>
      <div>{status}</div>
      <ol>{moves}</ol>
    </>
  )
}
