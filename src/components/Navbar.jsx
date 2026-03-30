import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

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