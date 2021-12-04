import React from 'react';
import { SquareValue } from '../types/SquareValue'

type SquareProps = {
  value: SquareValue
  onClick: VoidFunction
};

export class Square extends React.Component<SquareProps> {
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
};
