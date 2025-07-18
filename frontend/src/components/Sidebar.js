import React, { useState } from 'react';

const navItems = [
  { label: 'Dashboard', icon: '📊' },
  { label: 'Models', icon: '🧠' },
  { label: 'Prompt Studio', icon: '🎨' },
  { label: 'Compare', icon: '⚖️' },
  { label: 'Sessions', icon: '🗂️' },
  { label: 'Settings', icon: '⚙️' },
  { label: 'About', icon: 'ℹ️' },
];

function Sidebar({ active, setActive }) {
  const [collapsed, setCollapsed] = useState(false);
  const user = { name: 'AI Engineer', avatar: '👤' };

  return (
    <aside
      style={{
        width: collapsed ? 60 : 220,
        minWidth: collapsed ? 60 : 220,
        background: 'var(--bg)',
        color: 'var(--fg)',
        borderRight: '1px solid #222',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: collapsed ? '1rem 0.5rem' : '2rem 1rem',
        boxSizing: 'border-box',
        height: '100vh',
        position: 'relative',
        zIndex: 2,
        transition: 'width 0.2s, min-width 0.2s, padding 0.2s',
      }}
    >
      <button
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        onClick={() => setCollapsed(c => !c)}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--fg)',
          fontSize: 22,
          cursor: 'pointer',
          alignSelf: collapsed ? 'center' : 'flex-end',
          marginBottom: collapsed ? 0 : 24,
          marginTop: collapsed ? 0 : -8,
        }}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? '➡️' : '⬅️'}
      </button>
      {!collapsed && (
        <h2 style={{ fontSize: 22, margin: 0, marginBottom: 32, fontWeight: 700, textAlign: 'center' }}>Inferno</h2>
      )}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: collapsed ? 'center' : 'stretch' }}>
        {navItems.map(item => (
          <a
            key={item.label}
            href="#"
            onClick={e => { e.preventDefault(); setActive(item.label); }}
            style={{
              color: active === item.label ? 'var(--accent)' : 'var(--fg)',
              textDecoration: 'none',
              fontWeight: 500,
              background: active === item.label ? 'rgba(255,152,0,0.08)' : 'none',
              borderRadius: 6,
              padding: collapsed ? '0.5em' : '0.5em 1em',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 17,
              justifyContent: collapsed ? 'center' : 'flex-start',
              transition: 'background 0.15s, color 0.15s',
              position: 'relative',
            }}
            aria-current={active === item.label ? 'page' : undefined}
            title={collapsed ? item.label : undefined}
            onMouseOver={e => {
              if (collapsed) e.currentTarget.style.background = 'rgba(255,152,0,0.12)';
              else e.currentTarget.style.background = 'rgba(255,152,0,0.08)';
            }}
            onMouseOut={e => {
              if (active === item.label) e.currentTarget.style.background = 'rgba(255,152,0,0.08)';
              else e.currentTarget.style.background = 'none';
            }}
          >
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            {!collapsed && item.label}
          </a>
        ))}
      </nav>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 28, marginBottom: collapsed ? 0 : 4 }}>{user.avatar}</div>
        {!collapsed && <div style={{ fontSize: 13, color: '#aaa' }}>{user.name}</div>}
      </div>
      {!collapsed && (
        <div style={{ fontSize: 12, color: '#888', marginTop: 0, textAlign: 'center' }}>
          v0.1.0
        </div>
      )}
    </aside>
  );
}

export default Sidebar; 