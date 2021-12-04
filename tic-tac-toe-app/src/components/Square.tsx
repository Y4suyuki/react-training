import React from 'react';
import { SquareValue } from '../types/SquareValue'

export type SquareProps = {
  value: SquareValue;
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
