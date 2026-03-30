import { useEffect } from 'react';
import { useGame, useGameDispatch, Actions } from '../context/GameContext';
import Board from '../components/Board';
import Timer from '../components/Timer';
import GameControls from '../components/GameControls';
import CongratsMessage from '../components/CongratsMessage';

function EasyGame() {
  const { board, difficulty } = useGame();
  const dispatch = useGameDispatch();

  useEffect(() => {
    if (board.length === 0 || difficulty !== 'easy') {
      dispatch({ type: Actions.NEW_GAME, payload: { difficulty: 'easy' } });
    }
  }, []);

  return (
    <div className="window-frame">
      <div className="page-title-bar">SuDONKu - <span>Easy Game</span></div>
      <div className="window-body">
        <div className="game-header">
          <Timer />
        </div>
        <Board />
        <CongratsMessage />
        <GameControls difficulty="easy" />
      </div>
    </div>
  );
}

export default EasyGame;