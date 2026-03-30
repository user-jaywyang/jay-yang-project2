/**
 * LocalStorage wrapper for game state persistence.
 * All localStorage access is centralized here and called
 * only from GameContext.
 */

const STORAGE_KEY = 'sudonku_game';

export function saveGame(state) {
  try {
    const data = {
      board: state.board,
      solution: state.solution,
      initial: state.initial,
      size: state.size,
      difficulty: state.difficulty,
      timerSeconds: state.timerSeconds,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save game:', e);
  }
}

export function loadGame() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load game:', e);
    return null;
  }
}

export function clearGame() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear game:', e);
  }
}