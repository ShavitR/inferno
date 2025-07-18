import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Models from './components/Models';
import PromptStudio from './components/PromptStudio';
import Compare from './components/Compare';
import Sessions from './components/Sessions';
import Settings from './components/Settings';
import About from './components/About';
import './styles/app.css';

const PAGES = {
  Dashboard: Dashboard,
  Models: Models,
  'Prompt Studio': PromptStudio,
  Compare: Compare,
  Sessions: Sessions,
  Settings: Settings,
  About: About,
};

function App() {
  const [theme, setTheme] = useState('dark');
  const [status, setStatus] = useState('disconnected');
  const [model, setModel] = useState('mistral-7b');
  const [inferenceState, setInferenceState] = useState('idle');
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState('Dashboard');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const PageComponent = PAGES[currentPage] || Dashboard;

  return (
    <div style={{ display: 'flex', minWidth: 1000, minHeight: 700, maxWidth: '100vw', maxHeight: '100vh', boxSizing: 'border-box', overflow: 'hidden' }}>
      <Sidebar active={currentPage} setActive={setCurrentPage} />
      <div className="App" style={{ flex: 1, overflow: 'auto', paddingLeft: 0 }}>
        {error && (
          <div style={{ background: '#ffdddd', color: '#900', padding: '0.5em 1em', borderRadius: 6, marginBottom: 12 }}>
            <b>Error:</b> {error}
          </div>
        )}
        <PageComponent
          status={status}
          model={model}
          inferenceState={inferenceState}
          theme={theme}
          setTheme={setTheme}
        />
      </div>
    </div>
  );
}

export default App; 