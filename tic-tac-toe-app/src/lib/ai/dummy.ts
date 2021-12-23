import { Board } from "../../types";

export function dummyMove(board: Board) {
  const candidates = board
    .map((s, i) => ({ square: s, index: i }))
    .filter((e) => e.square === null)
    .map((e) => e.index);
  return candidates[0];
}
