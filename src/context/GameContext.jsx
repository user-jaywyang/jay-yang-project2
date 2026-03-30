import { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import { generatePuzzle, isValid, copyBoard } from '../utils/generatePuzzle';
import { findErrors, isBoardComplete } from '../utils/validation';
import { saveGame, loadGame, clearGame } from '../utils/localStorage';

// ===== Initial State =====
const initialState = {
  board: [],
  solution: [],
  initial: [],
  size: 9,
  difficulty: 'normal',
  selectedCell: null,
  timerSeconds: 0,
  timerRunning: false,
  isComplete: false,
  errors: new Set(),
  hintCell: null,
  noHints: false,
};

// ===== Action Types =====
const Actions = {
  NEW_GAME: 'NEW_GAME',
  RESET_GAME: 'RESET_GAME',
  SET_CELL: 'SET_CELL',
  CLEAR_CELL: 'CLEAR_CELL',
  SELECT_CELL: 'SELECT_CELL',
  TICK_TIMER: 'TICK_TIMER',
  REQUEST_HINT: 'REQUEST_HINT',
  CLEAR_HINT: 'CLEAR_HINT',
  LOAD_FROM_STORAGE: 'LOAD_FROM_STORAGE',
};

// ===== Reducer =====
function gameReducer(state, action) {
  switch (action.type) {
    case Actions.NEW_GAME: {
      const { difficulty } = action.payload;
      const puzzle = generatePuzzle(difficulty);
      return {
        ...initialState,
        board: puzzle.board,
        solution: puzzle.solution,
        initial: puzzle.initial,
        size: puzzle.size,
        difficulty,
        timerRunning: true,
        errors: new Set(),
      };
    }

    case Actions.RESET_GAME: {
      const board = copyBoard(state.initial);
      return {
        ...state,
        board,
        selectedCell: null,
        timerSeconds: 0,
        timerRunning: true,
        isComplete: false,
        errors: new Set(),
        hintCell: null,
      };
    }

    case Actions.SET_CELL: {
      const { row, col, value } = action.payload;
      if (state.isComplete) return state;
      if (state.initial[row][col] !== 0) return state; // can't edit givens

      const num = parseInt(value, 10);
      if (isNaN(num) || num < 1 || num > state.size) return state;

      const board = copyBoard(state.board);
      board[row][col] = num;
      const errors = findErrors(board, state.size);
      const complete = isBoardComplete(board, state.size);

      return {
        ...state,
        board,
        errors,
        isComplete: complete,
        timerRunning: !complete,
        hintCell: null,
        noHints: false,
      };
    }

    case Actions.CLEAR_CELL: {
      const { row, col } = action.payload;
      if (state.isComplete) return state;
      if (state.initial[row][col] !== 0) return state;

      const board = copyBoard(state.board);
      board[row][col] = 0;
      const errors = findErrors(board, state.size);

      return {
        ...state,
        board,
        errors,
        hintCell: null,
        noHints: false,
      };
    }

    case Actions.SELECT_CELL: {
      return {
        ...state,
        selectedCell: action.payload,
        hintCell: null,
      };
    }

    case Actions.TICK_TIMER: {
      if (!state.timerRunning) return state;
      return {
        ...state,
        timerSeconds: state.timerSeconds + 1,
      };
    }

    case Actions.REQUEST_HINT: {
      if (state.isComplete) return state;

      // Find naked singles (cells with only one valid number)
      const candidates = [];
      for (let r = 0; r < state.size; r++) {
        for (let c = 0; c < state.size; c++) {
          if (state.board[r][c] !== 0) continue;
          const validNums = [];
          for (let n = 1; n <= state.size; n++) {
            if (isValid(state.board, r, c, n, state.size)) {
              validNums.push(n);
            }
          }
          if (validNums.length === 1) {
            candidates.push({ row: r, col: c, value: validNums[0] });
          }
        }
      }

      if (candidates.length === 0) {
        return { ...state, noHints: true, hintCell: null };
      }

      const hint = candidates[Math.floor(Math.random() * candidates.length)];

      // Auto-fill the hinted cell
      const board = copyBoard(state.board);
      board[hint.row][hint.col] = hint.value;
      const errors = findErrors(board, state.size);
      const complete = isBoardComplete(board, state.size);

      return {
        ...state,
        board,
        errors,
        isComplete: complete,
        timerRunning: !complete,
        hintCell: { row: hint.row, col: hint.col },
        noHints: false,
      };
    }

    case Actions.CLEAR_HINT: {
      return { ...state, hintCell: null };
    }

    case Actions.LOAD_FROM_STORAGE: {
      const saved = action.payload;
      const errors = findErrors(saved.board, saved.size);
      return {
        ...initialState,
        board: saved.board,
        solution: saved.solution,
        initial: saved.initial,
        size: saved.size,
        difficulty: saved.difficulty,
        timerSeconds: saved.timerSeconds || 0,
        timerRunning: true,
        errors,
      };
    }

    default:
      return state;
  }
}

// ===== Context =====
const GameContext = createContext(null);
const GameDispatchContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const initialized = useRef(false);

  // On mount: check localStorage for saved game
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const saved = loadGame();
    if (saved && saved.board && saved.board.length > 0) {
      dispatch({ type: Actions.LOAD_FROM_STORAGE, payload: saved });
    }
  }, []);

  // Save to localStorage after every state change (if game is active)
  useEffect(() => {
    if (state.board.length === 0) return;
    if (state.isComplete) {
      clearGame();
    } else {
      saveGame(state);
    }
  }, [state]);

  // Timer interval
  useEffect(() => {
    if (!state.timerRunning) return;
    const id = setInterval(() => {
      dispatch({ type: Actions.TICK_TIMER });
    }, 1000);
    return () => clearInterval(id);
  }, [state.timerRunning]);

  return (
    <GameContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
}

// ===== Custom Hooks =====
export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx && ctx !== initialState) {
    // Allow usage outside provider for non-game pages
    return initialState;
  }
  return ctx;
}

export function useGameDispatch() {
  return useContext(GameDispatchContext);
}

export { Actions };