import { useState } from "react";
import { choosePlayerSide } from "../helper";
import { Mark } from "../types";

export function StartPage(props: {
  startGame: () => void;
  setPlayerSide: (playerSide: Mark) => void;
}) {
  const [tempSide, setTempSide] = useState<Mark | "random">("X");

  function SideCheckBox(props: { choice: Mark | "random" }) {
    return (
      <div>
        <input
          type="checkbox"
          checked={tempSide === props.choice}
          onChange={() => setTempSide(props.choice)}
        />
        <label>{props.choice}</label>
      </div>
    );
  }
  return (
    <div className="start-page">
      <h1>start game</h1>
      <h2>select your side</h2>
      <div className="side-selector">
        <SideCheckBox choice="X" />
        <SideCheckBox choice="O" />
        <SideCheckBox choice="random" />
      </div>
      <button
        className="start-button"
        onClick={() => {
          if (tempSide === "random") {
            props.setPlayerSide(choosePlayerSide());
          } else {
            props.setPlayerSide(tempSide);
          }
          props.startGame();
        }}
      >
        start game
      </button>
    </div>
  );
}
