import { History, Mark } from "../types";

type Props = {
  winner: Mark;
  xIsNext: boolean;
  history: History;
  jumpTo: (i: number) => void;
};

function MoveInfo(props: { onClick: () => void; move: number }) {
  const desc = props.move ? "Go to move #" + props.move : "Go to game start";
  return (
    <li>
      <button onClick={props.onClick}>{desc}</button>
    </li>
  );
}

export function GameInfo(props: Props) {
  let status: string;
  if (props.winner) {
    status = "Winner: " + props.winner;
  } else {
    status = "Next player: " + (props.xIsNext ? "X" : "O");
  }

  return (
    <div className="game-info">
      <div>{status}</div>
      <ol>
        {props.history.map((_, i) => {
          return <MoveInfo onClick={() => props.jumpTo(i)} move={i} />;
        })}
      </ol>
    </div>
  );
}
