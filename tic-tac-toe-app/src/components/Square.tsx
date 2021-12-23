import { useEffect } from "react";
import { infoStyle, infoStyleRed } from "../constants";
import { Mark } from "../types";

type SquareProps = { value: Mark; onClick: () => void };

export function Square(props: SquareProps) {
  useEffect(() => {
    console.log(`%cupdating square`, infoStyle);
    return () => {
      console.log(`%cunmounting square`, infoStyleRed);
    };
  }, []);
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
