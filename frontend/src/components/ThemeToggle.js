import React from 'react';

function ThemeToggle({ theme, setTheme }) {
  return (
    <button className="ThemeToggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}

export default ThemeToggle; 