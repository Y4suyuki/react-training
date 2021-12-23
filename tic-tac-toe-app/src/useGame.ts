import { useState } from "react";
import { Mark } from "./types";
import { calculateWinner } from "./helper";

type GameState = {
  history: { squares: Mark[] }[];
  stepNumber: number;
  xIsNext: boolean;
};

export const useGame = () => {
  const [gameS, setGameS] = useState<GameState>({
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    stepNumber: 0,
    xIsNext: true,
  });

  function makeMove(i: number) {
    const history = gameS.history.slice(0, gameS.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = gameS.xIsNext ? "X" : "O";
    setGameS({
      history: history.concat({ squares: squares }),
      stepNumber: history.length,
      xIsNext: !gameS.xIsNext,
    });
  }

  function jumpTo(step: number) {
    setGameS({
      history: gameS.history.slice(0, step + 1),
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  const history = gameS.history;
  const current = history[gameS.stepNumber];
  const winner = calculateWinner(current.squares);
  const xIsNext = gameS.xIsNext;

  return {
    winner,
    xIsNext,
    history,
    current,
    makeMove,
    jumpTo,
  };
};
