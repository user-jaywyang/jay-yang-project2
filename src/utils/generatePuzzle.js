/**
 * Sudoku Puzzle Generator using Backtracking
 *
 * Step 1: Generate a fully solved board using recursive backtracking
 * Step 2: Remove cells one at a time, verifying unique solvability
 * Step 3: Return { board, solution, initial }
 *
 * Supports 6x6 (easy) and 9x9 (normal) grids.
 */

// Get subgrid dimensions based on board size
function getSubgridDims(size) {
  if (size === 6) return { rows: 2, cols: 3 };
  if (size === 9) return { rows: 3, cols: 3 };
  return { rows: 3, cols: 3 };
}

// Check if placing `num` at (row, col) is valid
function isValid(board, row, col, num, size) {
  // Check row
  for (let c = 0; c < size; c++) {
    if (board[row][c] === num) return false;
  }
  // Check column
  for (let r = 0; r < size; r++) {
    if (board[r][col] === num) return false;
  }
  // Check subgrid
  const { rows: subR, cols: subC } = getSubgridDims(size);
  const startRow = Math.floor(row / subR) * subR;
  const startCol = Math.floor(col / subC) * subC;
  for (let r = startRow; r < startRow + subR; r++) {
    for (let c = startCol; c < startCol + subC; c++) {
      if (board[r][c] === num) return false;
    }
  }
  return true;
}

// Shuffle an array in place (Fisher-Yates)
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Step 1: Fill the board completely using backtracking
function fillBoard(board, size) {
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === 0) {
        const nums = shuffle([...Array(size)].map((_, i) => i + 1));
        for (const num of nums) {
          if (isValid(board, r, c, num, size)) {
            board[r][c] = num;
            if (fillBoard(board, size)) return true;
            board[r][c] = 0;
          }
        }
        return false; // trigger backtrack
      }
    }
  }
  return true; // board is full
}

// Count solutions (stop at 2 — we only need to know if it's unique)
function countSolutions(board, size, limit = 2) {
  let count = 0;

  function solve() {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (board[r][c] === 0) {
          for (let num = 1; num <= size; num++) {
            if (isValid(board, r, c, num, size)) {
              board[r][c] = num;
              solve();
              board[r][c] = 0;
              if (count >= limit) return;
            }
          }
          return; // no valid number — dead end
        }
      }
    }
    count++; // reached a full board
  }

  solve();
  return count;
}

// Deep copy a 2D array
function copyBoard(board) {
  return board.map(row => [...row]);
}

// Step 2: Remove cells while ensuring a unique solution
function removeClues(board, size, targetFilled) {
  const totalCells = size * size;
  let filled = totalCells;
  const positions = shuffle(
    [...Array(totalCells)].map((_, i) => [Math.floor(i / size), i % size])
  );

  for (const [r, c] of positions) {
    if (filled <= targetFilled) break;
    const backup = board[r][c];
    board[r][c] = 0;

    const testBoard = copyBoard(board);
    if (countSolutions(testBoard, size) !== 1) {
      board[r][c] = backup; // put it back — removal breaks uniqueness
    } else {
      filled--;
    }
  }

  return board;
}

/**
 * Main export: generate a puzzle
 * @param {'easy' | 'normal'} difficulty
 * @returns {{ board: number[][], solution: number[][], initial: number[][], size: number }}
 */
export function generatePuzzle(difficulty) {
  const size = difficulty === 'easy' ? 6 : 9;
  const targetFilled = difficulty === 'easy'
    ? Math.floor((size * size) / 2) // half filled for easy
    : 28 + Math.floor(Math.random() * 3); // 28-30 for normal

  // Create empty board
  const board = Array.from({ length: size }, () => Array(size).fill(0));

  // Fill it completely
  fillBoard(board, size);
  const solution = copyBoard(board);

  // Remove clues
  removeClues(board, size, targetFilled);
  const initial = copyBoard(board);

  return { board, solution, initial, size };
}

// Exported for use by hint system and validation
export { isValid, getSubgridDims, countSolutions, copyBoard };