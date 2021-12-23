import { useState } from "react";
import { Mark } from "./types";
import { Board } from "./components/Board";

function calculateWinner(squares: Mark[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

type GameState = {
  history: { squares: Mark[] }[];
  stepNumber: number;
  xIsNext: boolean;
};

export function Game() {
  const [gameS, setGameS] = useState<GameState>({
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    stepNumber: 0,
    xIsNext: true,
  });

  function handleClick(i: number) {
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
      ...gameS,
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  const history = gameS.history;
  const current = history[gameS.stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (gameS.xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
