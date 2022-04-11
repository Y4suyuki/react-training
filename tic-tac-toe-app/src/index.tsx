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
      { props.value }
    </button>
  );
}


interface BoardProps {
  squares: Array<any>,
  onClick: (i: number) => any
};
interface BoardState {
  squares: Array<any>
  xIsNext: Boolean
};
class Board extends React.Component<BoardProps, BoardState> {

  renderSquare(i: number) {
    return <Square
      value={ this.props.squares[i] }
      onClick={ () => this.props.onClick(i) }
    />;
  }

  render() {

    return (
      <div>
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

interface GameProps {}
interface GameState {
  history: Array<any>,
  xIsNext: boolean
}


class Game extends React.Component<GameProps, GameState> {

  handleClick(i: number) {
    const history = this.state.history;
    const current = history[history.length - 1];
    if(calculateWinner(current.squares) || current.squares[i] != null) {
      return;
    }
    let next_squares = current.squares;
    let sign = this.state.xIsNext ? 'X' : 'O';
    next_squares[i] = sign;

    let next_history = history.concat([{squares: next_squares}]);
    this.setState({history: next_history, xIsNext: !this.state.xIsNext})
  }

  constructor(props: GameProps) {
    super(props);
    this.state = {
      history: [{squares: Array(9).fill(null)}],
      xIsNext: true
    }
  }
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    let status = '';
    if(calculateWinner(current.squares)) {
      const winner = this.state.xIsNext ? 'O' : 'X';
      status = `Winner is ${winner}`;
    } else {
      const turn = this.state.xIsNext ? 'X' : 'O';
      status =`Next player: ${turn}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{ status }</div>
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
