import { Board } from '../components/Board'
import { useGame } from '../hooks/useGame'
import { calculateWinner } from '../lib/calculateWinner'

export const Game: React.FC = () => {
  const { history, stepNumber, xIsNext, handleClick, jumpTo } = useGame();

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const status =
    winner
      ? 'Winner: ' +  winner
      : 'Next player: ' + (xIsNext ? 'X' : 'O');
  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};
