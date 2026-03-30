import { useEffect } from 'react';
import { useGame, useGameDispatch, Actions } from '../context/GameContext';
import Board from '../components/Board';
import Timer from '../components/Timer';
import GameControls from '../components/GameControls';
import CongratsMessage from '../components/CongratsMessage';

function NormalGame() {
  const { board, difficulty } = useGame();
  const dispatch = useGameDispatch();

  // Auto-generate a new game if none exists or difficulty changed
  useEffect(() => {
    if (board.length === 0 || difficulty !== 'normal') {
      dispatch({ type: Actions.NEW_GAME, payload: { difficulty: 'normal' } });
    }
  }, []);

  return (
    <div className="window-frame">
      <div className="page-title-bar">SuDONKu - <span>Normal Game</span></div>
      <div className="window-body">
        <div className="game-header">
          <Timer />
        </div>
        <Board />
        <CongratsMessage />
        <GameControls difficulty="normal" />
      </div>
    </div>
  );
}

export default NormalGame;