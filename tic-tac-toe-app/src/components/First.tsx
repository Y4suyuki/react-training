import React from 'react';
import { Player } from '../types/Player';

export type FirstProps = {
  setPlayer: (player: Player) => void;
};

export const First: React.FC<FirstProps> = ({setPlayer}) => {
  return (
    <>
      <div>
        Select a player.
      </div>
      <button onClick={() => setPlayer('X')} style={{marginTop: "10px", marginRight: "10px"}}>
        X
      </button>
      <button onClick={() => setPlayer('O')}>
        O
      </button>
    </>
  );
};
