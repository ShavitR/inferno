import React, { useState } from 'react';

const demoModels = [
  { name: 'llama3-8b-instruct', tags: ['chat', 'general-purpose'], provider: 'HuggingFace', size: '8B', quant: 'Q4_K_M', loaded: true },
  { name: 'mistral-7b', tags: ['chat', 'code'], provider: 'Ollama', size: '7B', quant: 'Q4_0', loaded: false },
  { name: 'zephyr-7b', tags: ['chat', 'reasoning'], provider: 'Custom', size: '7B', quant: 'Q4_K_M', loaded: false },
];
const allTags = ['chat', 'code', 'reasoning', 'embedding', 'general-purpose'];
const allModes = ['Single-turn chat', 'Multi-turn conversation', 'Structured task test'];

function Compare() {
  const [prompt, setPrompt] = useState('Explain quantum entanglement.');
  const [prompt2, setPrompt2] = useState('Explain quantum teleportation.');
  const [showPromptDiff, setShowPromptDiff] = useState(false);
  const [batch, setBatch] = useState('');
  const [fewShot, setFewShot] = useState('');
  const [selectedModels, setSelectedModels] = useState([demoModels[0], demoModels[1]]);
  const [mode, setMode] = useState(allModes[0]);
  const [temperature, setTemperature] = useState(1.0);
  const [topP, setTopP] = useState(1.0);
  const [seed, setSeed] = useState(42);
  const [showDiff, setShowDiff] = useState(false);
  const [diffPair, setDiffPair] = useState([demoModels[0], demoModels[1]]);
  const [showScoring, setShowScoring] = useState(false);
  const [showPromptLib, setShowPromptLib] = useState(false);
  const [showChaining, setShowChaining] = useState(false);
  const [showContextUsage, setShowContextUsage] = useState(false);
  const [showWhyFail, setShowWhyFail] = useState(null); // model output index
  const [showLogitSpikes, setShowLogitSpikes] = useState(false);
  const [showTraceSpecial, setShowTraceSpecial] = useState(false);
  const [results, setResults] = useState([
    {
      prompt: 'Explain quantum entanglement.',
      outputs: [
        { model: demoModels[0], text: 'Quantum entanglement is...', tokens: ['Quantum', 'entanglement', 'is', '...'], latency: 120, logprobs: [0.9, 0.8, 0.7, 0.6] },
        { model: demoModels[1], text: 'It is a phenomenon...', tokens: ['It', 'is', 'a', 'phenomenon', '...'], latency: 140, logprobs: [0.8, 0.7, 0.6, 0.5] },
      ],
    },
  ]);
  const [analytics, setAnalytics] = useState({ winCounts: { 'llama3-8b-instruct': 1, 'mistral-7b': 0 }, avgScore: 8.2, stddev: 0.7 });

  // Model multi-select
  const toggleModel = m => setSelectedModels(sel => sel.includes(m) ? sel.filter(x => x !== m) : [...sel, m]);

  // Placeholder for token diff viewer
  const openDiff = (a, b) => { setDiffPair([a, b]); setShowDiff(true); };

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Prompt Setup Panel */}
      <section style={{ marginBottom: 0, boxShadow: '0 2px 12px #0002' }}>
        <h2>⚔️ Compare Models</h2>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {/* Prompt input */}
          <div style={{ flex: 2, minWidth: 320 }}>
            <label style={{ fontWeight: 600 }}>Prompt</label>
            <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={2} style={{ width: '100%', borderRadius: 7, fontSize: '1em', marginBottom: 8, marginTop: 2 }} />
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <button style={{ fontSize: '0.97em' }} title="Batch input (coming soon)">Batch</button>
              <button style={{ fontSize: '0.97em' }} title="Few-shot examples (coming soon)">Few-shot</button>
              <button style={{ fontSize: '0.97em' }} title="Auto-generate prompts (coming soon)">Auto-generate</button>
              <button style={{ fontSize: '0.97em', background: '#1976d2', color: '#fff' }} title="Prompt diff tool" onClick={() => setShowPromptDiff(true)}>Prompt Diff</button>
            </div>
          </div>
          {/* Model selection */}
          <div style={{ flex: 2, minWidth: 320 }}>
            <label style={{ fontWeight: 600 }}>Select Models</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
              {demoModels.map(m => (
                <button
                  key={m.name}
                  onClick={() => toggleModel(m)}
                  style={{
                    background: selectedModels.includes(m) ? 'linear-gradient(90deg, #ff9800 0%, #1976d2 100%)' : '#222',
                    color: selectedModels.includes(m) ? '#fff' : '#eee',
                    border: selectedModels.includes(m) ? '2px solid #ff9800' : '1.5px solid #222',
                    borderRadius: 7,
                    fontWeight: 600,
                    fontSize: '0.97em',
                    boxShadow: selectedModels.includes(m) ? '0 2px 12px #ff980055' : '0 1px 4px #0001',
                    padding: '0.5em 1.1em',
                    cursor: 'pointer',
                    transition: 'all 0.18s',
                  }}
                  title={m.tags.join(', ')}
                >
                  <span style={{ fontSize: '1.1em', marginRight: 6 }}>{m.provider === 'HuggingFace' ? '🤗' : m.provider === 'Ollama' ? '🦙' : '🗂️'}</span>
                  {m.name} <span style={{ color: '#aaa', fontWeight: 400, marginLeft: 4 }}>{m.size}</span>
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <select style={{ borderRadius: 7, fontSize: '0.97em' }}><option>Filter by tag</option>{allTags.map(t => <option key={t}>{t}</option>)}</select>
              <button style={{ fontSize: '0.97em' }} title="Auto-select models (coming soon)">Auto-select</button>
            </div>
          </div>
          {/* Mode and sampling params */}
          <div style={{ flex: 1, minWidth: 220 }}>
            <label style={{ fontWeight: 600 }}>Mode</label>
            <select value={mode} onChange={e => setMode(e.target.value)} style={{ width: '100%', borderRadius: 7, fontSize: '0.97em', marginBottom: 8 }}>
              {allModes.map(m => <option key={m}>{m}</option>)}
            </select>
            <label style={{ fontWeight: 600 }}>Temperature</label>
            <input type="number" min={0} max={2} step={0.01} value={temperature} onChange={e => setTemperature(Number(e.target.value))} style={{ width: '100%', borderRadius: 7, fontSize: '0.97em', marginBottom: 4 }} />
            <label style={{ fontWeight: 600 }}>Top-p</label>
            <input type="number" min={0} max={1} step={0.01} value={topP} onChange={e => setTopP(Number(e.target.value))} style={{ width: '100%', borderRadius: 7, fontSize: '0.97em', marginBottom: 4 }} />
            <label style={{ fontWeight: 600 }}>Seed</label>
            <input type="number" value={seed} onChange={e => setSeed(Number(e.target.value))} style={{ width: '100%', borderRadius: 7, fontSize: '0.97em', marginBottom: 4 }} />
          </div>
          {/* Session management */}
          <div style={{ flex: 1, minWidth: 220, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontWeight: 600 }}>Session</label>
            <button style={{ fontSize: '0.97em' }} title="Save session (coming soon)">💾 Save</button>
            <button style={{ fontSize: '0.97em' }} title="Load session (coming soon)">📂 Load</button>
            <button style={{ fontSize: '0.97em' }} title="Version history (coming soon)">🕓 History</button>
          </div>
        </div>
      </section>

      {/* Prompt Diff Modal (placeholder) */}
      {showPromptDiff && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.65)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeInModelDetails 0.3s' }}>
          <div style={{ background: '#232323', borderRadius: 18, boxShadow: '0 8px 40px #000a', padding: '2.2em 2.5em', minWidth: 500, maxWidth: 700, color: '#fff', position: 'relative' }}>
            <h3 style={{ marginTop: 0, color: '#ff9800' }}>Prompt Diff Tool</h3>
            <div style={{ display: 'flex', gap: 18 }}>
              <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={3} style={{ flex: 1, borderRadius: 7, fontSize: '1em' }} />
              <textarea value={prompt2} onChange={e => setPrompt2(e.target.value)} rows={3} style={{ flex: 1, borderRadius: 7, fontSize: '1em' }} />
            </div>
            <div style={{ color: '#aaa', marginTop: 12 }}>Visual diff and impact analysis coming soon.</div>
            <button style={{ position: 'absolute', top: 18, right: 18, fontSize: '1.2em', background: '#c00', color: '#fff', borderRadius: 8 }} onClick={() => setShowPromptDiff(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Comparison Results Table */}
      <section style={{ marginBottom: 0, boxShadow: '0 2px 12px #0002' }}>
        <h3 style={{ marginTop: 0, marginBottom: 12, fontWeight: 700, color: '#ff9800' }}>Results</h3>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 8px #0002', fontSize: '0.98em' }}>
          <thead>
            <tr style={{ background: '#222', color: '#fff' }}>
              <th>Prompt</th>
              {selectedModels.map(m => <th key={m.name}>{m.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {results.map((row, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{row.prompt}</td>
                {row.outputs.map((out, j) => (
                  <td key={j} style={{ verticalAlign: 'top', position: 'relative' }}>
                    <div style={{ maxHeight: 80, overflow: 'auto', background: '#181818', borderRadius: 7, padding: '0.7em 0.8em', marginBottom: 6, fontSize: '0.97em', boxShadow: '0 1px 4px #0001' }}>{out.text}</div>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
                      <button style={{ fontSize: '0.93em' }} title="Vote best">✅</button>
                      <button style={{ fontSize: '0.93em' }} title="Remove model">🗑️</button>
                      <button style={{ fontSize: '0.93em' }} title="Refresh output">🔁</button>
                      <button style={{ fontSize: '0.93em' }} title="Retry with adjusted sampling">🔄</button>
                      <button style={{ fontSize: '0.93em' }} title="Compare tokens" onClick={() => openDiff(row.outputs[0], out)}>Compare Tokens</button>
                      <button style={{ fontSize: '0.93em', background: '#1976d2', color: '#fff' }} title="Why did this fail?" onClick={() => setShowWhyFail([i, j])}>Why did this fail?</button>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Why did this fail? Modal (placeholder) */}
      {showWhyFail && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.65)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeInModelDetails 0.3s' }}>
          <div style={{ background: '#232323', borderRadius: 18, boxShadow: '0 8px 40px #000a', padding: '2.2em 2.5em', minWidth: 500, maxWidth: 700, color: '#fff', position: 'relative' }}>
            <h3 style={{ marginTop: 0, color: '#1976d2' }}>Why did this fail?</h3>
            <div style={{ color: '#aaa', marginBottom: 18 }}>AI-based reasoning and suggestions for fixing prompts or model config (coming soon).</div>
            <button style={{ position: 'absolute', top: 18, right: 18, fontSize: '1.2em', background: '#c00', color: '#fff', borderRadius: 8 }} onClick={() => setShowWhyFail(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Token Diff Viewer Modal (placeholder) */}
      {showDiff && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.65)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeInModelDetails 0.3s' }}>
          <div style={{ background: '#232323', borderRadius: 18, boxShadow: '0 8px 40px #000a', padding: '2.2em 2.5em', minWidth: 600, maxWidth: 900, color: '#fff', position: 'relative' }}>
            <h3 style={{ marginTop: 0, color: '#ff9800' }}>Token Diff Viewer</h3>
            <div style={{ display: 'flex', gap: 18, marginBottom: 18 }}>
              <button style={{ fontSize: '0.97em' }} onClick={() => setShowTraceSpecial(s => !s)}>{showTraceSpecial ? 'Hide' : 'Show'} Special Sequences</button>
              <button style={{ fontSize: '0.97em' }} onClick={() => setShowLogitSpikes(s => !s)}>{showLogitSpikes ? 'Hide' : 'Show'} Logit Spikes</button>
              <button style={{ fontSize: '0.97em' }}>Hide identical</button>
              <button style={{ fontSize: '0.97em' }}>Semantic Diff</button>
              <button style={{ fontSize: '0.97em' }}>Show Latency</button>
              <button style={{ fontSize: '0.97em' }}>Show Logprobs</button>
            </div>
            <div style={{ display: 'flex', gap: 18, marginBottom: 18 }}>
              <div style={{ flex: 1 }}>
                <b>{diffPair[0].model.name}</b>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 6 }}>
                  {diffPair[0].tokens.map((t, i) => <span key={i} style={{ background: showTraceSpecial && i === 2 ? '#ff9800' : (i % 2 === 0 ? '#43e97b' : '#b388ff'), color: '#222', borderRadius: 4, padding: '0.1em 0.4em', marginRight: 2, boxShadow: showLogitSpikes && i === 1 ? '0 0 8px #ff9800' : undefined }}>{t}</span>)}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <b>{diffPair[1].model.name}</b>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 6 }}>
                  {diffPair[1].tokens.map((t, i) => <span key={i} style={{ background: showTraceSpecial && i === 2 ? '#ff9800' : (i % 2 === 0 ? '#ff9800' : '#1976d2'), color: '#fff', borderRadius: 4, padding: '0.1em 0.4em', marginRight: 2, boxShadow: showLogitSpikes && i === 1 ? '0 0 8px #ff9800' : undefined }}>{t}</span>)}
                </div>
              </div>
            </div>
            <button style={{ position: 'absolute', top: 18, right: 18, fontSize: '1.2em', background: '#c00', color: '#fff', borderRadius: 8 }} onClick={() => setShowDiff(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Scoring & Analytics Panel (placeholder) */}
      <section style={{ marginBottom: 0, boxShadow: '0 2px 12px #0002' }}>
        <h3 style={{ marginTop: 0, marginBottom: 12, fontWeight: 700, color: '#1976d2' }}>Scoring & Analytics</h3>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'center' }}>
          <div><b>Win count:</b> {Object.entries(analytics.winCounts).map(([m, c]) => <span key={m} style={{ marginRight: 8 }}>{m}: {c}</span>)}</div>
          <div><b>Average score:</b> {analytics.avgScore}</div>
          <div><b>Stddev:</b> {analytics.stddev}</div>
          <div><b>Token drift:</b> <span style={{ color: '#ff9800' }}>N/A</span></div>
          <div><b>Latency:</b> <span style={{ color: '#1976d2' }}>N/A</span></div>
        </div>
        <div style={{ marginTop: 18 }}>
          <button style={{ fontSize: '0.97em', marginRight: 8 }} onClick={() => setShowScoring(true)}>Show Charts</button>
          <button style={{ fontSize: '0.97em', marginRight: 8 }} onClick={() => setShowPromptLib(true)}>Prompt Library</button>
          <button style={{ fontSize: '0.97em', marginRight: 8 }} onClick={() => setShowChaining(true)}>Model Chaining</button>
          <button style={{ fontSize: '0.97em', marginRight: 8 }} onClick={() => setShowContextUsage(true)}>Context Usage</button>
          <button style={{ fontSize: '0.97em', marginRight: 8 }}>Export</button>
        </div>
      </section>

      {/* Context Usage Modal (placeholder) */}
      {showContextUsage && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.65)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeInModelDetails 0.3s' }}>
          <div style={{ background: '#232323', borderRadius: 18, boxShadow: '0 8px 40px #000a', padding: '2.2em 2.5em', minWidth: 500, maxWidth: 700, color: '#fff', position: 'relative' }}>
            <h3 style={{ marginTop: 0, color: '#ff9800' }}>Context Usage Timeline</h3>
            <div style={{ color: '#aaa', marginBottom: 18 }}>Timeline of context window usage and token tracking (coming soon).</div>
            <button style={{ position: 'absolute', top: 18, right: 18, fontSize: '1.2em', background: '#c00', color: '#fff', borderRadius: 8 }} onClick={() => setShowContextUsage(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Prompt Library Modal (placeholder) */}
      {showPromptLib && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.65)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeInModelDetails 0.3s' }}>
          <div style={{ background: '#232323', borderRadius: 18, boxShadow: '0 8px 40px #000a', padding: '2.2em 2.5em', minWidth: 500, maxWidth: 700, color: '#fff', position: 'relative' }}>
            <h3 style={{ marginTop: 0, color: '#ff9800' }}>Prompt Library</h3>
            <div style={{ color: '#aaa', marginBottom: 18 }}>Prebuilt and user-generated prompt sets for benchmarking (coming soon).</div>
            <button style={{ position: 'absolute', top: 18, right: 18, fontSize: '1.2em', background: '#c00', color: '#fff', borderRadius: 8 }} onClick={() => setShowPromptLib(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Model Chaining Modal (placeholder) */}
      {showChaining && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.65)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeInModelDetails 0.3s' }}>
          <div style={{ background: '#232323', borderRadius: 18, boxShadow: '0 8px 40px #000a', padding: '2.2em 2.5em', minWidth: 500, maxWidth: 700, color: '#fff', position: 'relative' }}>
            <h3 style={{ marginTop: 0, color: '#ff9800' }}>Model Chaining</h3>
            <div style={{ color: '#aaa', marginBottom: 18 }}>Visual flow diagram UI for chaining setup (coming soon).</div>
            <button style={{ position: 'absolute', top: 18, right: 18, fontSize: '1.2em', background: '#c00', color: '#fff', borderRadius: 8 }} onClick={() => setShowChaining(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Scoring Charts Modal (placeholder) */}
      {showScoring && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.65)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeInModelDetails 0.3s' }}>
          <div style={{ background: '#232323', borderRadius: 18, boxShadow: '0 8px 40px #000a', padding: '2.2em 2.5em', minWidth: 500, maxWidth: 700, color: '#fff', position: 'relative' }}>
            <h3 style={{ marginTop: 0, color: '#1976d2' }}>Scoring & Analytics Charts</h3>
            <div style={{ color: '#aaa', marginBottom: 18 }}>Charts and graphs for compare session analytics (coming soon).</div>
            <button style={{ position: 'absolute', top: 18, right: 18, fontSize: '1.2em', background: '#c00', color: '#fff', borderRadius: 8 }} onClick={() => setShowScoring(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Compare; 