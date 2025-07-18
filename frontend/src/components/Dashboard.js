import React from 'react';

function Dashboard() {
  // Placeholder data
  const project = {
    name: 'Inferno Benchmark v1',
    path: '/user/projects/inferno-v1',
    modelsLoaded: [],
    lastComparison: null,
  };
  const system = {
    gpu: '32% used - RTX 4090',
    vram: '6.2 / 24 GB',
    ram: '14 / 32 GB',
    threads: '12 / 16',
    backend: 'llama.cpp',
  };
  const modelStatus = [
    { name: 'Mistral 7B', format: 'GGUF', size: '4.2GB', quant: 'Q4_K_M', loaded: true },
  ];
  const recent = [
    'Loaded Mistral 7B Q4_K_M',
    'Ran comparison between Mistral & Zephyr',
    'Edited prompt template "customer-support"',
    'Saved comparison output comparison-07-18.json',
  ];
  const pinned = [
    'Compare Zephyr vs LLaMA3',
    'Edit Prompt: "Longform QA test"',
    'View Metrics: "Coding vs Dialogue"',
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
      {/* Project Overview */}
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        <section style={{ flex: 1, minWidth: 320 }}>
          <h2>🧾 Project Overview</h2>
          <div style={{ marginBottom: 8 }}><b>Name:</b> {project.name}</div>
          <div style={{ marginBottom: 8 }}><b>Models Loaded:</b> {project.modelsLoaded.length ? project.modelsLoaded.join(', ') : 'None'}</div>
          <div style={{ marginBottom: 8 }}><b>Last Comparison:</b> {project.lastComparison || 'None'}</div>
          <div style={{ marginBottom: 0 }}><b>Path:</b> {project.path}</div>
        </section>
        <section style={{ flex: 1, minWidth: 320, borderLeft: '1px solid #333', paddingLeft: 32 }}>
          <h2>📊 System Status</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div><b>GPU:</b> {system.gpu}</div>
            <div><b>VRAM:</b> {system.vram}</div>
            <div><b>RAM:</b> {system.ram}</div>
            <div><b>Threads:</b> {system.threads}</div>
            <div><b>Backend:</b> {system.backend}</div>
          </div>
        </section>
      </div>

      {/* Quick Actions */}
      <section>
        <h2>⚡ Quick Actions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 18 }}>
          <button>🔁 Start New Comparison</button>
          <button>➕ Add New Model</button>
          <button>🎯 Test Prompt in Prompt Studio</button>
          <button>📁 Open Recent Session</button>
        </div>
      </section>

      {/* Model Status */}
      <section>
        <h2>🧠 Model Status</h2>
        {modelStatus.length === 0 ? (
          <div>No model loaded</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
            <thead>
              <tr style={{ background: '#222', color: '#fff' }}>
                <th>Model Name</th><th>Format</th><th>Size</th><th>Quant</th><th>Loaded</th>
              </tr>
            </thead>
            <tbody>
              {modelStatus.map(m => (
                <tr key={m.name} style={{ background: m.loaded ? '#e0ffe0' : '#fff' }}>
                  <td>{m.name}</td>
                  <td>{m.format}</td>
                  <td>{m.size}</td>
                  <td>{m.quant}</td>
                  <td>{m.loaded ? '✅' : '❌'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        {/* Recent Activity */}
        <section style={{ flex: 1, minWidth: 320 }}>
          <h2>🕓 Recent Activity</h2>
          <ul>
            {recent.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </section>
        {/* Pinned Tools / Shortcuts */}
        <section style={{ flex: 1, minWidth: 320, borderLeft: '1px solid #333', paddingLeft: 32 }}>
          <h2>📎 Pinned Tools</h2>
          <ul>
            {pinned.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Dashboard; 