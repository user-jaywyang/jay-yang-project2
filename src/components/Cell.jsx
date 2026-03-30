import { useGameDispatch, Actions } from '../context/GameContext';

/**
 * Cell component — renders a single Sudoku cell.
 * Receives all display data as props from Board (parent).
 * Dispatches actions to Context (child-to-parent via state management).
 */
function Cell({ row, col, value, isGiven, isSelected, isError, isHint, size, isComplete }) {
  const dispatch = useGameDispatch();

  const handleClick = () => {
    if (isComplete) return;
    dispatch({ type: Actions.SELECT_CELL, payload: { row, col } });
  };

  const handleChange = (e) => {
    const input = e.target.value;
    if (input === '' || input === '0') {
      dispatch({ type: Actions.CLEAR_CELL, payload: { row, col } });
      return;
    }
    const num = parseInt(input, 10);
    if (num >= 1 && num <= size) {
      dispatch({ type: Actions.SET_CELL, payload: { row, col, value: num } });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      dispatch({ type: Actions.CLEAR_CELL, payload: { row, col } });
    }
  };

  // Build class list
  let className = 'cell';
  if (isGiven) className += ' cell-given';
  if (isSelected) className += ' cell-selected';
  if (isError) className += ' cell-error';
  if (isHint) className += ' cell-hint';
  if (isComplete) className += ' cell-locked';

  return (
    <div className={className} onClick={handleClick}>
      {isGiven ? (
        <span className="cell-value">{value}</span>
      ) : (
        <input
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value || ''}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          readOnly={isComplete}
          className="cell-input"
        />
      )}
    </div>
  );
}

export default Cell;