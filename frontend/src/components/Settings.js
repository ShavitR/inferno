import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const glassCard = {
  position: 'relative',
  zIndex: 2,
  maxWidth: 700,
  margin: '0 auto',
  marginBottom: 32,
  padding: '2.1rem 2.1rem 1.5rem 2.1rem',
  borderRadius: 24,
  background: 'rgba(30, 34, 44, 0.78)',
  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
  backdropFilter: 'blur(14px) saturate(1.1)',
  WebkitBackdropFilter: 'blur(14px) saturate(1.1)',
  color: 'var(--fg)',
  overflow: 'hidden',
  border: '1.2px solid rgba(255,255,255,0.09)',
  animation: 'aboutSectionIn 0.9s both',
  transition: 'box-shadow 0.2s',
};

const sectionTitle = {
  fontSize: '1.18rem',
  fontWeight: 800,
  letterSpacing: '0.01em',
  color: 'var(--accent)',
  marginBottom: 2,
  marginTop: 0,
};
const sectionSubtitle = {
  fontSize: '1.01em',
  color: '#aaa',
  marginBottom: 18,
  marginTop: 0,
  fontWeight: 500,
};
const divider = {
  height: 1,
  background: 'linear-gradient(90deg, #ff980033 0%, #222 100%)',
  border: 'none',
  margin: '28px 0 18px 0',
  opacity: 0.7,
};

function Settings({ theme, setTheme }) {
  // Placeholder states for future settings
  const [server, setServer] = useState('ws://localhost:8000');
  const [serverStatus, setServerStatus] = useState('disconnected');
  const [devMode, setDevMode] = useState(false);
  const [logLevel, setLogLevel] = useState('info');

  // Animation delays for staggered reveal
  const fade = idx => ({ animation: `aboutSectionIn 0.9s ${0.1 + idx * 0.13}s both` });

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '2.5rem 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Appearance Section */}
      <section style={{ ...glassCard, ...fade(0) }} tabIndex={0} aria-label="Appearance settings">
        <h2 style={sectionTitle}>🎨 Appearance</h2>
        <div style={sectionSubtitle}>Customize the look and feel of Inferno.</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <span style={{ color: 'var(--fg)', fontSize: '1em', opacity: 0.7 }}>Toggle dark/light mode</span>
        </div>
      </section>

      <hr style={divider} />

      {/* Backend Connection Section */}
      <section style={{ ...glassCard, ...fade(1), marginTop: 0 }} tabIndex={0} aria-label="Backend connection settings">
        <h2 style={sectionTitle}>🔌 Backend Connection</h2>
        <div style={sectionSubtitle}>Configure the backend server address and connection status.</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10 }}>
          <span style={{ fontSize: 18, opacity: 0.7 }}>🌐</span>
          <input
            type="text"
            value={server}
            onChange={e => setServer(e.target.value)}
            style={{ flex: 1, borderRadius: 9, border: '1.2px solid #333', fontSize: '1em', padding: '0.5em 1em', background: 'rgba(255,255,255,0.07)', color: 'var(--fg)', outline: 'none', boxShadow: '0 1px 4px #0001' }}
            aria-label="Backend server address"
            placeholder="ws://localhost:8000"
          />
          <button style={{ fontSize: '1em', fontWeight: 700, background: '#1976d2', color: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #1976d233' }} title="Reconnect (coming soon)">Reconnect</button>
        </div>
        <div style={{ fontSize: '1em', color: serverStatus === 'connected' ? '#43e97b' : '#ff9800', fontWeight: 600, marginLeft: 2 }}>
          Status: {serverStatus === 'connected' ? '🟢 Connected' : '🟠 Disconnected'}
        </div>
      </section>

      <hr style={divider} />

      {/* Data & Privacy Section */}
      <section style={{ ...glassCard, ...fade(2), marginTop: 0 }} tabIndex={0} aria-label="Data and privacy settings">
        <h2 style={sectionTitle}>🗄️ Data & Privacy</h2>
        <div style={sectionSubtitle}>Manage your app data and privacy preferences.</div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 8 }}>
          <button style={{ fontSize: '1em', background: '#232323', color: '#fff', border: '1.2px solid #ff9800', borderRadius: 8, fontWeight: 600, boxShadow: '0 2px 8px #ff980033' }} title="Clear app cache (coming soon)">🧹 Clear Cache</button>
          <button style={{ fontSize: '1em', background: '#232323', color: '#fff', border: '1.2px solid #1976d2', borderRadius: 8, fontWeight: 600, boxShadow: '0 2px 8px #1976d233' }} title="Reset all settings (coming soon)">♻️ Reset App</button>
          <button style={{ fontSize: '1em', background: '#232323', color: '#fff', border: '1.2px solid #43e97b', borderRadius: 8, fontWeight: 600, boxShadow: '0 2px 8px #43e97b33' }} title="Export settings (coming soon)">⬇️ Export Settings</button>
        </div>
        <div style={{ fontSize: '0.97em', color: '#aaa', marginTop: 4 }}>Your data is stored locally and never leaves your device.</div>
      </section>

      <hr style={divider} />

      {/* Advanced Section */}
      <section style={{ ...glassCard, ...fade(3), marginTop: 0 }} tabIndex={0} aria-label="Advanced settings">
        <h2 style={sectionTitle}>⚙️ Advanced</h2>
        <div style={sectionSubtitle}>Developer and troubleshooting options.</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 10, flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={devMode}
              onChange={e => setDevMode(e.target.checked)}
              style={{ accentColor: 'var(--accent)', width: 18, height: 18 }}
              aria-label="Developer mode"
            />
            Developer Mode
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500, cursor: 'pointer' }}>
            Log Level:
            <select value={logLevel} onChange={e => setLogLevel(e.target.value)} style={{ borderRadius: 7, fontSize: '1em', padding: '0.2em 0.7em', background: 'rgba(255,255,255,0.07)', color: 'var(--fg)', border: '1.2px solid #333' }} aria-label="Log level">
              <option value="debug">Debug</option>
              <option value="info">Info</option>
              <option value="warn">Warn</option>
              <option value="error">Error</option>
            </select>
          </label>
          <button style={{ fontSize: '1em', background: '#232323', color: '#fff', border: '1.2px solid #aaa', borderRadius: 8, fontWeight: 600, marginLeft: 8, boxShadow: '0 2px 8px #aaa2' }} title="Restore all settings to default (coming soon)">Restore Defaults</button>
        </div>
        <div style={{ fontSize: '0.97em', color: '#aaa' }}>Advanced options are for troubleshooting and development. (Placeholders)</div>
      </section>

      {/* Version & Credits */}
      <div style={{ ...glassCard, ...fade(4), marginTop: 0, textAlign: 'center', padding: '1.1rem 1.1rem 0.7rem 1.1rem', fontSize: '1.01em', color: '#aaa', background: 'rgba(30,34,44,0.62)', border: '1.2px solid rgba(255,255,255,0.06)' }} tabIndex={0} aria-label="Version and credits">
        <div style={{ marginBottom: 2 }}>
          <b style={{ color: '#ff9800' }}>Inferno</b> v0.1.0 &nbsp;|&nbsp; <span style={{ color: '#1976d2' }}>MIT License</span>
        </div>
        <div style={{ marginBottom: 0 }}>
          <span>Lead: <span style={{ color: '#1976d2' }}>AI Engineer</span> &nbsp;|&nbsp; Contributors: <span style={{ color: '#ff9800' }}>Inferno Team</span></span>
        </div>
        <div style={{ marginTop: 8, fontSize: '0.97em', opacity: 0.7 }}>
          <a href="#/about" style={{ color: '#ff9800', textDecoration: 'underline', fontWeight: 500 }}>About & Credits</a>
        </div>
      </div>
    </div>
  );
}

export default Settings; 