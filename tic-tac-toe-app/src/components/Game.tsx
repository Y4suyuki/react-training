import { Board } from '../components/Board'
import { useGame } from '../hooks/useGame'

export const Game: React.FC = () => {
  const { xIsNext, moveHistory, currentMove, winner, handleNextMove, jumpTo } = useGame();
  const status =
    winner
      ? 'Winner: ' +  winner
      : 'Next player: ' + (xIsNext ? 'X' : 'O');
  const moves = moveHistory.map((step, move) => {
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
          squares={currentMove.squares}
          onClick={(i) => handleNextMove(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};
