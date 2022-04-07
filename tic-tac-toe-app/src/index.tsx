import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';


interface SquareProps {
  value: any,
  onClick:() => any
}

function Square(props: SquareProps) {
  return (
    <button className="square" onClick={ props.onClick }>
      { props.value}
    </button>
  );
}


interface BoardProps {};
interface BoardState {
  squares: Array<any>
  xIsNext: Boolean
};
class Board extends React.Component<BoardProps, BoardState> {

  constructor(props: BoardProps) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    }
  }

  handleClick(i: number) {
    if(calculateWinner(this.state.squares) || this.state.squares[i] != null) {
      return;
    }
    let next_squares = this.state.squares;
    let sign = this.state.xIsNext ? 'X' : 'O';
    next_squares[i] = sign;
    this.setState({squares: next_squares, xIsNext: !this.state.xIsNext})
  }

  renderSquare(i: number) {
    return <Square
      value={ this.state.squares[i] }
      onClick={ () => this.handleClick(i) }
    />;
  }

  render() {

    let status = '';
    if(calculateWinner(this.state.squares)) {
      const winner = this.state.xIsNext ? 'O' : 'X';
      status = `Winner is ${winner}`;
    } else {
      const turn = this.state.xIsNext ? 'X' : 'O';
      status =`Next player: ${turn}`;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function calculateWinner(squares: Array<any>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
