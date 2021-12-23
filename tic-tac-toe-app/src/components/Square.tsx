import { Mark } from "../types";

type SquareProps = { value: Mark; onClick: () => void };

export function Square(props: SquareProps) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
