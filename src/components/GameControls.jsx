import { useGame, useGameDispatch, Actions } from '../context/GameContext';

function GameControls({ difficulty }) {
  const dispatch = useGameDispatch();
  const { isComplete, noHints } = useGame();

  const handleNewGame = () => {
    dispatch({ type: Actions.NEW_GAME, payload: { difficulty } });
  };

  const handleReset = () => {
    dispatch({ type: Actions.RESET_GAME });
  };

  const handleHint = () => {
    dispatch({ type: Actions.REQUEST_HINT });
  };

  return (
    <div className="game-controls-wrapper">
      <div className="game-controls">
        <button className="btn" onClick={handleNewGame}>New Game</button>
        <button className="btn" onClick={handleReset}>Reset</button>
        {!isComplete && (
          <button className="btn btn-hint" onClick={handleHint}>Hint</button>
        )}
      </div>
      {noHints && (
        <p className="no-hints-msg">No hints available, try solving manually!</p>
      )}
      {!isComplete && (
        <p className="hint-info">Hint highlights a cell where only one number is possible.</p>
      )}
    </div>
  );
}

export default GameControls;