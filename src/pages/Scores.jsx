const scores = [
  { rank: 1, username: 'Bill', completed: 300, best: '1:14' },
  { rank: 2, username: 'masterblaster', completed: 280, best: '1:21' },
  { rank: 3, username: 'howdy', completed: 250, best: '3:15' },
  { rank: 4, username: 'binky', completed: 240, best: '3:20' },
  { rank: 5, username: 'logic43', completed: 200, best: '3:50' },
  { rank: 6, username: 'perfec', completed: 175, best: '4:08' },
  { rank: 7, username: 'massa', completed: 160, best: '4:22' },
  { rank: 8, username: 'penny', completed: 135, best: '4:45' },
  { rank: 9, username: 'Pal', completed: 131, best: '5:02' },
  { rank: 10, username: 'rr56', completed: 100, best: '5:10' },
];

function Scores() {
  return (
    <div className="window-frame">
      <div className="page-title-bar">SuDONKu - <span>High Scores</span></div>
      <div className="window-body">
        <p className="page-subtitle">The top SuDONKu players ranked by puzzles completed.</p>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Completed</th>
              <th>Best Time</th>
            </tr>
          </thead>
          <tbody>
            {scores.map(s => (
              <tr key={s.rank} className={s.rank <= 3 ? `rank-${['', 'gold', 'silver', 'bronze'][s.rank]}` : ''}>
                <td><span className="rank-badge">{s.rank}</span></td>
                <td>{s.username}</td>
                <td>{s.completed}</td>
                <td>{s.best}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Scores;