import { Board, Mark } from "../../types";

function evaluate(board: Board, depth: number, imX: boolean) {
  const x = imX ? 1 : -1;
  if (xWins(board)) {
    return x * (10 - depth);
  } else if (oWins(board)) {
    return x * (-10 + depth);
  } else {
    return 0;
  }
}

export function bestMove(board: Board, imX: boolean) {
  const frontiers = exploreNextWithMove(board, imX ? "X" : "O");

  let bestScore = -1000;
  let nextMove = -1;
  for (const f of frontiers) {
    console.log(f);
    const score = miniMax(f.board, 1, imX);
    console.log("score", score);
    if (score > bestScore) {
      bestScore = score;
      nextMove = f.move;
    }
  }

  return nextMove;
}

export function miniMax(board: Board, depth: number, imX: boolean) {
  const score = evaluate(board, depth, imX);
  if (gameOver(board)) {
    return score;
  }

  if (score !== 0) {
    return score;
  }

  const maximizer = depth % 2 === 0;
  if (maximizer) {
    const frontiers = exploreNext(board, imX ? "X" : "O");
    let best = -100000;
    for (const f of frontiers) {
      const score = miniMax(f, depth + 1, imX);
      best = Math.max(score, best);
    }
    return best;
  } else {
    const frontiers = exploreNext(board, imX ? "O" : "X");
    let worst = 100000;
    for (const f of frontiers) {
      const score = miniMax(f, depth + 1, imX);
      worst = Math.min(score, worst);
    }
    return worst;
  }
}

export function wins(board: Board, mark: Mark) {
  const rows = [0, 3, 6].map((start) => board.slice(start, start + 3));
  const cols = [0, 1, 2].map((start) => [
    board[start],
    board[start + 3],
    board[start + 3 * 2],
  ]);

  const diagonals = [
    [board[0], board[4], board[8]],
    [board[2], board[4], board[6]],
  ];

  return [...rows, ...cols, ...diagonals].some((arr) =>
    arr.every((e) => e === mark)
  );
}

function xWins(board: Board) {
  return wins(board, "X");
}

function oWins(board: Board) {
  return wins(board, "O");
}

export function gameOver(board: Board) {
  return board.every((x) => x !== null);
}

function* exploreNext(board: Board, player: Mark) {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      const res = [...board];
      res[i] = player;
      yield res;
    }
  }
}

function* exploreNextWithMove(board: Board, player: Mark) {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      const res = [...board];
      res[i] = player;
      yield { board: res, move: i };
    }
  }
}
