import { useGame } from '../context/GameContext';
import Cell from './Cell';
import '../css/board.css';

/**
 * Board component, renders the full Sudoku grid.
 * Reads state from Context, passes data as props to Cell children.
 */
function Board() {
  const { board, initial, size, selectedCell, errors, hintCell, isComplete } = useGame();

  if (!board || board.length === 0) {
    return <div className="board-empty">Press "New Game" to start!</div>;
  }

  const boardClass = size === 6 ? 'sudoku-board board-6x6' : 'sudoku-board board-9x9';

  return (
    <div className="board-wrapper">
      <div className={boardClass}>
        {board.map((row, r) =>
          row.map((val, c) => {
            const isGiven = initial[r][c] !== 0;
            const isSelected = selectedCell && selectedCell.row === r && selectedCell.col === c;
            const isError = errors.has(`${r}-${c}`);
            const isHint = hintCell && hintCell.row === r && hintCell.col === c;

            return (
              <Cell
                key={`${r}-${c}`}
                row={r}
                col={c}
                value={val}
                isGiven={isGiven}
                isSelected={isSelected}
                isError={isError}
                isHint={isHint}
                size={size}
                isComplete={isComplete}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default Board;