import { Mark } from "../types/types";
import { Square } from "./Square";

type BoardProps = {
  squares: Mark[];
  onClick: (i: number) => void;
};

export function Board(props: BoardProps) {
  const SquareContainer = (p: { i: number }) => (
    <Square value={props.squares[p.i]} onClick={() => props.onClick(p.i)} />
  );

  return (
    <div>
      <div className="board-row">
        <SquareContainer i={0} />
        <SquareContainer i={1} />
        <SquareContainer i={2} />
      </div>
      <div className="board-row">
        <SquareContainer i={3} />
        <SquareContainer i={4} />
        <SquareContainer i={5} />
      </div>
      <div className="board-row">
        <SquareContainer i={6} />
        <SquareContainer i={7} />
        <SquareContainer i={8} />
      </div>
    </div>
  );
}
