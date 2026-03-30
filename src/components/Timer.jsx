import { useGame } from '../context/GameContext';

function Timer() {
  const { timerSeconds } = useGame();

  const mins = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
  const secs = String(timerSeconds % 60).padStart(2, '0');

  return (
    <div className="timer-display">
      <span className="timer-label">Time</span>
      <span className="timer-value">{mins}:{secs}</span>
    </div>
  );
}

export default Timer;