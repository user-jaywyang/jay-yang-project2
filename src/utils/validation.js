/**
 * Validation: checks the board for rule violations.
 * Returns a Set of "row-col" strings for cells that violate rules.
 */

import { getSubgridDims } from './generatePuzzle';

export function findErrors(board, size) {
  const errors = new Set();

  // Check rows
  for (let r = 0; r < size; r++) {
    const seen = {};
    for (let c = 0; c < size; c++) {
      const val = board[r][c];
      if (val === 0) continue;
      if (seen[val] !== undefined) {
        errors.add(`${r}-${c}`);
        errors.add(`${r}-${seen[val]}`);
      } else {
        seen[val] = c;
      }
    }
  }

  // Check columns
  for (let c = 0; c < size; c++) {
    const seen = {};
    for (let r = 0; r < size; r++) {
      const val = board[r][c];
      if (val === 0) continue;
      if (seen[val] !== undefined) {
        errors.add(`${r}-${c}`);
        errors.add(`${seen[val]}-${c}`);
      } else {
        seen[val] = r;
      }
    }
  }

  // Check subgrids
  const { rows: subR, cols: subC } = getSubgridDims(size);
  for (let gr = 0; gr < size; gr += subR) {
    for (let gc = 0; gc < size; gc += subC) {
      const seen = {};
      for (let r = gr; r < gr + subR; r++) {
        for (let c = gc; c < gc + subC; c++) {
          const val = board[r][c];
          if (val === 0) continue;
          const key = val;
          if (seen[key]) {
            errors.add(`${r}-${c}`);
            errors.add(seen[key]);
          } else {
            seen[key] = `${r}-${c}`;
          }
        }
      }
    }
  }

  return errors;
}

/**
 * Check if the board is completely and validly filled
 */
export function isBoardComplete(board, size) {
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === 0) return false;
    }
  }
  return findErrors(board, size).size === 0;
}