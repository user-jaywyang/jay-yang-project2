# SuDONKu — Project 2

A single-player Sudoku web app built with React for CS5610. Play on two difficulty modes (Easy 6×6 and Normal 9×9).

## Live Demo

🔗 [Render Deployment]()

## Features

### Core Gameplay
- **Two difficulty modes**: Easy (6×6 grid, half pre-filled) and Normal (9×9 grid, 28–30 pre-filled cells)
- **Real-time validation**: Cells that violate row, column, or subgrid rules are highlighted in red immediately
- **Input enforcement**: Only valid numbers (1–6 or 1–9) are accepted; all other input is ignored
- **Editable cells**: User-entered values can be changed or deleted at any time
- **Given cells**: Pre-filled cells are locked and cannot be edited
- **Game completion detection**: When all cells are validly filled, the board locks and a congratulations message is displayed
- **Timer**: Tracks elapsed time from the start of each game, stops on completion
- **New Game / Reset**: Generate a fresh puzzle or revert to the original starting state

### Pages
| Route | Description |
|-------|-------------|
| `/` | Home page with game title, description, and cat photo |
| `/games` | Game selection page with hardcoded list of puzzles and authors |
| `/games/easy` | Easy mode — randomly generated 6×6 Sudoku |
| `/games/normal` | Normal mode — randomly generated 9×9 Sudoku |
| `/rules` | Rules of Sudoku with credits and contact links |
| `/scores` | Mock high scores leaderboard |
| `/login` | Mock login form (no functionality) |
| `/register` | Mock registration form (no functionality) |

### Bonus Features
- **Local Storage (3 pts)**: Game state is persisted to `localStorage` after every action. On page reload, the game resumes where you left off. Storage is cleared on game completion or board reset. All game `localStorage` access goes through the `GameContext` only.
- **Backtracking Algorithm (4 pts)**: Puzzles are generated using a recursive backtracking algorithm that first fills a complete valid board, then removes cells one at a time while verifying that the puzzle remains uniquely solvable. See `src/utils/generatePuzzle.js`.
- **Hint System (5 pts)**: Pressing the "Hint" button highlights a cell where only one valid number is possible (a "naked single"). The user must still determine the correct number themselves. If no naked singles exist, a "No hints available" message is displayed. See the `REQUEST_HINT` action in `src/context/GameContext.jsx`.



## Project Structure

```
src/
├── index.js                    # Entry point
├── App.jsx                     # Router + providers
├── context/
│   ├── GameContext.jsx          # Game state, reducer, actions, localStorage integration
│   └── ThemeContext.jsx         # Dark mode state + persistence
├── utils/
│   ├── generatePuzzle.js       # Backtracking puzzle generator + unique solution validator
│   ├── validation.js           # Board error detection + completion check
│   └── localStorage.js         # localStorage wrapper (save/load/clear)
├── components/
│   ├── Navbar.jsx              # Navigation bar with dark mode toggle
│   ├── Footer.jsx              # Page footer
│   ├── Board.jsx               # Sudoku grid — reads context, passes props to Cell
│   ├── Cell.jsx                # Individual cell — receives props from Board, dispatches to context
│   ├── Timer.jsx               # MM:SS timer display
│   ├── GameControls.jsx        # New Game, Reset, Hint buttons
│   └── CongratsMessage.jsx     # Victory banner on completion
├── pages/
│   ├── Home.jsx                # Home page
│   ├── Selection.jsx           # Game selection list
│   ├── NormalGame.jsx           # 9×9 game page
│   ├── EasyGame.jsx            # 6×6 game page
│   ├── Rules.jsx               # Rules + credits
│   ├── Scores.jsx              # Mock leaderboard
│   ├── Login.jsx               # Mock login form
│   └── Register.jsx            # Mock register form
├── css/
│   ├── common.css              # Global styles, Win95 theme, dark mode, responsive
│   └── board.css               # Board, cell states, timer, controls, congrats banner
public/
└── assets/
    └── sudoku-cat.webp         # Home page cat image
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

```bash
git clone https://github.com/user-jaywyang/jay-yang-project2.git
cd jay-yang-project2
npm install
```

### Running Locally

```bash
npm start
```

Opens at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
```

## Deployment

Deployed on Render as a static site:
- **Build Command**: `npm run build`
- **Publish Directory**: `build`

## Author

Jay Yang — CS5610, 2026

## License

This project was built for educational purposes as part of CS5610.