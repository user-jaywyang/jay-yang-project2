import { Link } from 'react-router-dom';

const games = [
  { name: 'Brainteaser', author: 'George Washington', difficulty: 'normal' },
  { name: 'Challenge', author: 'Abraham Lincoln', difficulty: 'normal' },
  { name: 'Gauntlet', author: 'Johnny Test', difficulty: 'normal' },
  { name: 'Warm Up', author: 'Hideo Kojima', difficulty: 'easy' },
  { name: 'Stumper', author: 'Yoji Shinkawa', difficulty: 'normal' },
  { name: 'Quick', author: 'Johnny Test', difficulty: 'easy' },
];

function Selection() {
  return (
    <div className="window-frame">
      <div className="page-title-bar">SuDONKu - <span>Select a Game</span></div>
      <div className="window-body">
        <p className="page-description">Choose a puzzle from the list below.</p>
        <div className="game-list">
          {games.map((g, i) => (
            <Link
              key={i}
              to={`/games/${g.difficulty}`}
              className="window-panel game-card"
            >
              <div className="game-info">
                <h3 className="game-name">{g.name}</h3>
                <p className="game-author">By <span>{g.author}</span></p>
              </div>
              <div className="game-meta">
                <span className={`game-difficulty ${g.difficulty === 'easy' ? 'easy' : 'hard'}`}>
                  {g.difficulty === 'easy' ? 'Easy 6×6' : 'Normal 9×9'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Selection;