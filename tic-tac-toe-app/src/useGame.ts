import { useCallback, useEffect, useState } from "react";
import { History, Mark } from "./types";
import { calculateWinner } from "./helper";
import { infoStyle } from "./constants";

type GameState = {
  history: History;
  stepNumber: number;
  xIsNext: boolean;
};

const initialGameS = {
  history: [
    {
      squares: Array(9).fill(null),
    },
  ],
  stepNumber: 0,
  xIsNext: true,
};

const initialPlayerSide = "X";

export const useGame = () => {
  const [playerSide, setPlayerSide] = useState<Mark>(initialPlayerSide);
  const [inPlay, setInPlay] = useState(false);
  const [gameS, setGameS] = useState<GameState>(initialGameS);

  const makeMove = useCallback(
    (i: number) => {
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
    },
    [gameS, setGameS]
  );

  const aiMove = useCallback(() => {
    const history = gameS.history.slice(0, gameS.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const candidates = squares
      .map((s, i) => ({ square: s, index: i }))
      .filter((e) => e.square === null)
      .map((e) => e.index);
    const nextMove = candidates[0];
    makeMove(nextMove);
  }, [gameS, setGameS]);

  const jumpTo = useCallback(
    (step: number) => {
      setGameS({
        history: gameS.history.slice(0, step + 1),
        stepNumber: step,
        xIsNext: step % 2 === 0,
      });
    },
    [gameS, setGameS]
  );

  const initializeGame = useCallback(() => {
    setPlayerSide(initialPlayerSide);
    setInPlay(false);
    setGameS(initialGameS);
  }, [setPlayerSide, setInPlay, setGameS]);

  useEffect(() => {
    if (
      (playerSide === "X" && gameS.xIsNext) ||
      (playerSide === "O" && !gameS.xIsNext)
    ) {
      console.log("%cplayer turn", infoStyle);
      return;
    }
    console.log("%cai turn", infoStyle);
    aiMove();
  }, [aiMove, playerSide, gameS.xIsNext]);

  const history = gameS.history;
  const current = history[gameS.stepNumber];
  const winner = calculateWinner(current.squares);
  const xIsNext = gameS.xIsNext;
  const startGame = useCallback(() => {
    setInPlay(true);
  }, [setInPlay]);
  const endGame = useCallback(() => {
    initializeGame();
  }, [setInPlay]);

  return {
    inPlay,
    playerSide,
    winner,
    xIsNext,
    history,
    current,
    startGame,
    endGame,
    setPlayerSide,
    makeMove,
    jumpTo,
  };
};
