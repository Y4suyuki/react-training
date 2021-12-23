import { Board } from "./components/Board";
import { GameInfo } from "./components/GameInfo";
import { StartPage } from "./components/StartPage";
import { useGame } from "./useGame";

export function App() {
  const {
    inPlay,
    winner,
    xIsNext,
    history,
    current,
    startGame,
    endGame,
    setPlayerSide,
    makeMove,
    jumpTo,
  } = useGame();
  if (!inPlay) {
    return <StartPage startGame={startGame} setPlayerSide={setPlayerSide} />;
  }

  return (
    <div className="game">
      <div className="game-header">
        <h1>tic-tac-toe</h1>
      </div>
      <div className="game-board">
        <Board squares={current.squares} onClick={makeMove} />
      </div>
      <GameInfo
        winner={winner}
        xIsNext={xIsNext}
        jumpTo={jumpTo}
        history={history}
      />
      <div className="game-footer">
        <button onClick={endGame}>leave game</button>
      </div>
    </div>
  );
}
