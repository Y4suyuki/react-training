import { Board } from "./components/Board";
import { GameInfo } from "./components/GameInfo";
import { useGame } from "./useGame";

export function App() {
  const { winner, xIsNext, history, current, makeMove, jumpTo } = useGame();

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={makeMove} />
      </div>
      <GameInfo
        winner={winner}
        xIsNext={xIsNext}
        jumpTo={jumpTo}
        history={history}
      />
    </div>
  );
}
