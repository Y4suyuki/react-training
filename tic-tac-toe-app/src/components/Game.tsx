import { Board } from '../components/Board'
import { History } from '../components/History'
import { First }  from '../components/First'
import { useGame } from '../hooks/useGame'

export const Game: React.FC = () => {
  const { player, xIsNext, moveHistory, currentMove, winner, setPlayer, handleNextMove, jumpTo } = useGame();

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={currentMove.squares}
          onClick={(i) => handleNextMove(i)}
        />
      </div>
      <div className="game-info">
        {
          player
            ? 
              <History
                xIsNext={xIsNext}
                moveHistory={moveHistory}
                winner={winner}
                jumpTo={jumpTo}
              />
            : 
              <First
                setPlayer={setPlayer}
              />
        }
      </div>
    </div>
  );
};
