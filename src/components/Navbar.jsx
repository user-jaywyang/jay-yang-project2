import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function Navbar() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        <span>&#9638;</span> SuDONKu
      </NavLink>
      <ul className="nav-links">
        <li><NavLink to="/" end className={({ isActive }) => isActive ? 'nav-active' : ''}>Home</NavLink></li>
        <li><NavLink to="/games" end className={({ isActive }) => isActive ? 'nav-active' : ''}>Play</NavLink></li>
        <li><NavLink to="/games/easy" className={({ isActive }) => isActive ? 'nav-active' : ''}>Easy</NavLink></li>
        <li><NavLink to="/games/normal" className={({ isActive }) => isActive ? 'nav-active' : ''}>Normal</NavLink></li>
        <li><NavLink to="/rules" className={({ isActive }) => isActive ? 'nav-active' : ''}>Rules</NavLink></li>
        <li><NavLink to="/scores" className={({ isActive }) => isActive ? 'nav-active' : ''}>Scores</NavLink></li>
        <li><NavLink to="/login" className={({ isActive }) => isActive ? 'nav-active' : ''}>Login</NavLink></li>
        <li><NavLink to="/register" className={({ isActive }) => isActive ? 'nav-active' : ''}>Register</NavLink></li>
      </ul>
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Dark Mode">
        {darkMode ? '☀️' : '🌙'}
      </button>
    </nav>
  );
}

export default Navbar;