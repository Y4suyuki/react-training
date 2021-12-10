import React from 'react';
import { Player } from '../types/Player'

export type SquareProps = {
  value: Player;
  onClick: VoidFunction;
};

export const Square: React.FC<SquareProps> = ({value, onClick}) => {
  return (
    <button
      className="square"
      onClick={() => onClick()}
    >
      {value}
    </button>
  );
};
