import { Board } from '../components/Board'
import { History } from '../components/History'
import { useGame } from '../hooks/useGame'

export const Game: React.FC = () => {
  const { xIsNext, moveHistory, currentMove, winner, handleNextMove, jumpTo } = useGame();

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={currentMove.squares}
          onClick={(i) => handleNextMove(i)}
        />
      </div>
      <div className="game-info">
        <History
          xIsNext={xIsNext}
          moveHistory={moveHistory}
          winner={winner}
          jumpTo={jumpTo}
        />
      </div>
    </div>
  );
};
