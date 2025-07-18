import React from 'react';

const bgStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 0,
  background: 'linear-gradient(120deg, #0f2027 0%, #2c5364 100%)',
  overflow: 'hidden',
  pointerEvents: 'none',
};

const glassCard = {
  position: 'relative',
  zIndex: 2,
  maxWidth: 700,
  margin: '4.5rem auto',
  padding: '2.7rem 2.7rem 2.2rem 2.7rem',
  borderRadius: 32,
  background: 'rgba(30, 34, 44, 0.72)',
  boxShadow: '0 12px 48px 0 rgba(0,0,0,0.35)',
  backdropFilter: 'blur(18px) saturate(1.2)',
  WebkitBackdropFilter: 'blur(18px) saturate(1.2)',
  color: '#fff',
  overflow: 'hidden',
  border: '1.5px solid rgba(255,255,255,0.08)',
  animation: 'aboutFadeIn 1.2s cubic-bezier(.4,0,.2,1)',
};

const logoWrap = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: 28,
  justifyContent: 'center',
  position: 'relative',
};

const logo = {
  fontSize: '3.2rem',
  marginRight: 18,
  filter: 'drop-shadow(0 0 24px #ff9800cc)',
  animation: 'logoPulse 2.5s infinite alternate',
  position: 'relative',
  zIndex: 2,
};

const shine = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: 120,
  height: 80,
  pointerEvents: 'none',
  zIndex: 1,
};

const title = {
  fontWeight: 900,
  fontSize: '2.7rem',
  letterSpacing: '0.06em',
  background: 'linear-gradient(90deg, #fff 60%, #ff9800 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 2px 24px #ff9800cc',
  animation: 'titleReveal 1.2s 0.2s both',
  position: 'relative',
  zIndex: 2,
};

const sectionFade = idx => ({
  animation: `aboutSectionIn 0.9s ${0.4 + idx * 0.18}s both`,
});

const particleStyle = idx => ({
  position: 'absolute',
  left: `${10 + idx * 18}%`,
  top: `${20 + (idx % 3) * 22}%`,
  opacity: 0.18 + (idx % 3) * 0.08,
  filter: 'blur(1.5px)',
  animation: `particleFloat${idx % 3} 7s ${idx * 0.7}s infinite alternate`,
});

function About() {
  return (
    <>
      {/* Animated background gradient and floating SVG particles */}
      <div style={bgStyle}>
        {[...Array(7)].map((_, idx) => (
          <svg key={idx} width="120" height="120" style={particleStyle(idx)}>
            <circle cx="60" cy="60" r="48" fill={idx % 2 === 0 ? '#ff9800' : '#1976d2'} fillOpacity="0.18" />
          </svg>
        ))}
        <style>{`
          @keyframes aboutFadeIn {
            from { opacity: 0; transform: translateY(60px) scale(0.98); }
            to { opacity: 1; transform: none; }
          }
          @keyframes aboutSectionIn {
            from { opacity: 0; transform: translateY(40px) scale(0.98); }
            to { opacity: 1; transform: none; }
          }
          @keyframes logoPulse {
            from { filter: drop-shadow(0 0 24px #ff9800cc); }
            to { filter: drop-shadow(0 0 48px #ff9800cc); }
          }
          @keyframes titleReveal {
            from { opacity: 0; letter-spacing: 0.25em; }
            to { opacity: 1; letter-spacing: 0.06em; }
          }
          @keyframes particleFloat0 {
            0% { transform: translateY(0) scale(1); }
            100% { transform: translateY(-40px) scale(1.12); }
          }
          @keyframes particleFloat1 {
            0% { transform: translateY(0) scale(1); }
            100% { transform: translateY(30px) scale(0.95); }
          }
          @keyframes particleFloat2 {
            0% { transform: translateY(0) scale(1); }
            100% { transform: translateY(-25px) scale(1.08); }
          }
          .about-link:hover {
            color: #ff9800;
            text-shadow: 0 0 8px #ff9800, 0 0 16px #1976d2;
          }
        `}</style>
      </div>
      {/* Glassmorphism card with animated logo and content */}
      <div style={glassCard}>
        <div style={logoWrap}>
          <span style={logo}>🔥</span>
          <span style={title}>Inferno</span>
          <svg style={shine} width="120" height="80">
            <defs>
              <linearGradient id="shineGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <ellipse cx="60" cy="40" rx="48" ry="18" fill="url(#shineGrad)" opacity="0.7">
              <animate attributeName="rx" values="48;60;48" dur="2.5s" repeatCount="indefinite" />
            </ellipse>
          </svg>
        </div>
        <div style={sectionFade(0)}>
          <p style={{ fontSize: '1.13em', marginBottom: 18, lineHeight: 1.7, letterSpacing: '0.01em', textAlign: 'center' }}>
            <b>Inferno</b> is a next-gen local LLM debugger & visualizer. Load GGUF models, run token-by-token inference, and see the mind of your model—live, in color, on your own machine.
          </p>
        </div>
        <div style={sectionFade(1)}>
          <div style={{ marginBottom: 18, fontSize: '1.01em', textAlign: 'center' }}>
            <b>Version:</b> <span style={{ color: '#ff9800' }}>0.1.0</span> &nbsp;|&nbsp;
            <b>License:</b> <span style={{ color: '#1976d2' }}>MIT</span> &nbsp;|&nbsp;
            <b>Project Path:</b> <code style={{ color: '#fff', background: '#222', borderRadius: 4, padding: '0.1em 0.4em' }}>/user/projects/inferno-v1</code>
          </div>
        </div>
        <div style={sectionFade(2)}>
          <div style={{ marginBottom: 18, textAlign: 'center' }}>
            <b style={{ color: '#ff9800' }}>Team & Credits</b>
            <ul style={{ marginTop: 6, marginBottom: 0, fontSize: '1.01em', display: 'inline-block', textAlign: 'left' }}>
              <li>Lead: <span style={{ color: '#1976d2' }}>AI Engineer</span></li>
              <li>Contributors: <span style={{ color: '#ff9800' }}>Inferno Team</span>, Open Source Community</li>
            </ul>
          </div>
        </div>
        <div style={sectionFade(3)}>
          <b style={{ color: '#1976d2', textAlign: 'center', display: 'block' }}>Resources</b>
          <ul style={{ marginTop: 6, marginBottom: 0, fontSize: '1.01em', textAlign: 'center' }}>
            <li><a className="about-link" href="https://github.com/your-org/inferno" target="_blank" rel="noopener noreferrer">GitHub Repository</a></li>
            <li><a className="about-link" href="#" target="_blank" rel="noopener noreferrer">Documentation (coming soon)</a></li>
          </ul>
        </div>
        <div style={{ color: '#aaa', fontSize: '0.97em', marginTop: 38, textAlign: 'center', letterSpacing: '0.04em', opacity: 0.85, animation: 'aboutFadeIn 1.5s 1.2s both' }}>
          &copy; 2024 Inferno Project. All rights reserved.
        </div>
      </div>
    </>
  );
}

export default About; 