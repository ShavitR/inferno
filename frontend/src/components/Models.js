import React, { useState, useRef } from 'react';

const initialModels = [
  {
    name: 'llama3-8b-instruct',
    provider: 'HuggingFace',
    size: '8B',
    quant: 'Q4_K_M',
    path: '/models/llama3-8b-instruct.gguf',
    tags: ['chat', 'general-purpose'],
    loaded: true,
    details: 'Llama 3, 8B instruct, general-purpose chat model.',
    context: 8192,
    tokenizer: 'LlamaTokenizer',
    license: 'Apache 2.0',
    source: 'downloaded',
    chatTemplate: 'ChatML',
    benchmark: '15 tok/s',
    memory: '6.2GB',
    card: 'https://huggingface.co/meta-llama/Meta-Llama-3-8B-Instruct',
    activity: [
      { time: '2024-07-18 14:22', action: 'Loaded', details: 'User loaded model.' },
      { time: '2024-07-18 14:25', action: 'Used', details: 'Prompt: "Summarize this article"' },
    ],
  },
  {
    name: 'mistral-7b',
    provider: 'Ollama',
    size: '7B',
    quant: 'Q4_0',
    path: '/models/mistral-7b.gguf',
    tags: ['chat', 'code'],
    loaded: false,
    details: 'Mistral 7B, fast and efficient.',
    context: 4096,
    tokenizer: 'MistralTokenizer',
    license: 'Apache 2.0',
    source: 'custom',
    chatTemplate: 'Alpaca',
    benchmark: '18 tok/s',
    memory: '4.2GB',
    card: '',
    activity: [
      { time: '2024-07-17 10:10', action: 'Loaded', details: 'User loaded model.' },
    ],
  },
];

const allTags = [
  { tag: 'chat', color: '#ff9800' },
  { tag: 'code', color: '#1976d2' },
  { tag: 'embedding', color: '#43e97b' },
  { tag: 'general-purpose', color: '#b388ff' },
];
const allProviders = [
  { name: 'HuggingFace', icon: '🤗' },
  { name: 'Ollama', icon: '🦙' },
  { name: 'Custom', icon: '🗂️' },
];

function getProviderIcon(provider) {
  const found = allProviders.find(p => p.name === provider);
  return found ? found.icon : '🗂️';
}
function getTagColor(tag) {
  const found = allTags.find(t => t.tag === tag);
  return found ? found.color : '#888';
}

function Models() {
  const [models, setModels] = useState(initialModels);
  const [selected, setSelected] = useState(models[0]);
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [providerFilter, setProviderFilter] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const listRef = useRef();

  const handleAddModel = () => alert('Add Model (file picker coming soon)');
  const handleSelect = (model) => setSelected(model);
  const handleImport = () => alert('Import/Upload coming soon');
  const handleDelete = (model) => { setDeleteTarget(model); setShowDelete(true); };
  const confirmDelete = () => {
    setModels(models.filter(m => m !== deleteTarget));
    setShowDelete(false);
    setDeleteTarget(null);
    if (selected === deleteTarget) setSelected(models[0] || null);
  };
  const cancelDelete = () => { setShowDelete(false); setDeleteTarget(null); };

  // Keyboard navigation
  const handleKeyDown = e => {
    if (!filteredModels.length) return;
    const idx = filteredModels.indexOf(selected);
    if (e.key === 'ArrowDown') {
      setSelected(filteredModels[Math.min(idx + 1, filteredModels.length - 1)]);
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      setSelected(filteredModels[Math.max(idx - 1, 0)]);
      e.preventDefault();
    }
  };

  // Drag-and-drop import (visual only)
  const handleDragOver = e => { e.preventDefault(); setDragActive(true); };
  const handleDragLeave = e => { e.preventDefault(); setDragActive(false); };
  const handleDrop = e => { e.preventDefault(); setDragActive(false); alert('Model file dropped (import coming soon)'); };

  const filteredModels = models.filter(m =>
    (!search || m.name.toLowerCase().includes(search.toLowerCase())) &&
    (!tagFilter || m.tags.includes(tagFilter)) &&
    (!providerFilter || m.provider === providerFilter)
  );

  return (
    <div style={{ display: 'flex', gap: 32, maxWidth: 1200, margin: '0 auto', padding: '1.5rem 0' }}>
      {/* Sidebar/Card List */}
      <div
        style={{ flex: 1, minWidth: 260, position: 'relative' }}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        ref={listRef}
        aria-label="Model list"
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
          <input
            type="text"
            placeholder="Search models..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, padding: '0.4em 0.8em', borderRadius: 7, border: '1px solid #333', fontSize: '0.97em', marginRight: 8 }}
            aria-label="Search models"
          />
          <button onClick={handleAddModel} style={{ fontWeight: 700, fontSize: '0.97em', boxShadow: '0 2px 8px #ff980033' }} title="Add new model">➕ Add Model</button>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          <select value={providerFilter} onChange={e => setProviderFilter(e.target.value)} style={{ flex: 1, borderRadius: 7, fontSize: '0.97em' }} aria-label="Filter by provider">
            <option value="">All Providers</option>
            {allProviders.map(p => <option key={p.name}>{p.name}</option>)}
          </select>
          <select value={tagFilter} onChange={e => setTagFilter(e.target.value)} style={{ flex: 1, borderRadius: 7, fontSize: '0.97em' }} aria-label="Filter by tag">
            <option value="">All Tags</option>
            {allTags.map(t => <option key={t.tag}>{t.tag}</option>)}
          </select>
        </div>
        {/* Drag-and-drop import zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            border: dragActive ? '2.5px dashed #ff9800' : '2px dashed #333',
            borderRadius: 10,
            padding: dragActive ? '2.2em 1em' : '1.2em 1em',
            marginBottom: 12,
            background: dragActive ? 'rgba(255,152,0,0.08)' : 'rgba(255,255,255,0.01)',
            color: dragActive ? '#ff9800' : '#888',
            textAlign: 'center',
            fontWeight: 600,
            fontSize: '0.98em',
            transition: 'all 0.18s',
            outline: dragActive ? '2px solid #ff9800' : 'none',
            cursor: 'pointer',
          }}
          aria-label="Import model drag-and-drop zone"
        >
          {dragActive ? 'Drop model file here to import' : 'Drag & drop GGUF/ggml file here to import'}
        </div>
        <div style={{ maxHeight: 420, overflowY: 'auto', marginTop: 6 }}>
          {filteredModels.length === 0 && (
            <div style={{ color: '#888', padding: 18, textAlign: 'center' }}>
              <svg width="60" height="60" style={{ marginBottom: 8 }}><circle cx="30" cy="30" r="28" fill="#222" /><text x="30" y="38" textAnchor="middle" fontSize="32" fill="#ff9800">🤖</text></svg>
              <div>No models found.</div>
            </div>
          )}
          {filteredModels.map((m, idx) => (
            <div
              key={m.name}
              onClick={() => handleSelect(m)}
              style={{
                background: selected === m ? 'linear-gradient(90deg, #ff9800 0%, #1976d2 100%)' : 'rgba(255,255,255,0.03)',
                color: selected === m ? '#fff' : '#eee',
                borderRadius: 10,
                marginBottom: 10,
                padding: '1em 1.1em',
                boxShadow: selected === m ? '0 2px 12px #ff980055' : '0 1px 4px #0001',
                cursor: 'pointer',
                border: selected === m ? '2px solid #ff9800' : '1.5px solid #222',
                transition: 'all 0.18s',
                fontWeight: 600,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                outline: selected === m ? '2px solid #ff9800' : 'none',
                position: 'relative',
              }}
              tabIndex={0}
              aria-label={`Model: ${m.name}`}
              title={m.details}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <span style={{ fontSize: '1.2em', marginRight: 7 }}>{getProviderIcon(m.provider)}</span>
                <span style={{ fontWeight: 700 }}>{m.name}</span>
                {m.loaded && <span style={{ marginLeft: 8, background: 'limegreen', color: '#fff', borderRadius: 6, padding: '0.13em 0.6em', fontSize: '0.92em', boxShadow: '0 0 8px #0f0a' }} title="Loaded">●</span>}
              </div>
              <div style={{ fontSize: '0.93em', color: selected === m ? '#fff' : '#aaa', marginBottom: 2 }}>{m.provider} • {m.size} • {m.quant}</div>
              <div style={{ fontSize: '0.93em', color: selected === m ? '#fff' : '#aaa', marginBottom: 2 }}>
                {m.tags.map(t => <span key={t} style={{ background: getTagColor(t), color: '#fff', borderRadius: 5, padding: '0.1em 0.5em', marginRight: 4, fontSize: '0.92em' }}>{t}</span>)}
              </div>
              <div style={{ fontSize: '0.92em', color: selected === m ? '#fff' : '#aaa' }}>{m.path}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18, textAlign: 'center' }}>
          <button onClick={handleImport} style={{ fontWeight: 600, fontSize: '0.97em', background: '#1976d2', borderRadius: 7 }} title="Import or register a new model">📤 Import / Register Model</button>
        </div>
      </div>
      {/* Details Panel */}
      <div style={{ flex: 2, minWidth: 340, background: 'rgba(255,255,255,0.04)', borderRadius: 16, boxShadow: '0 1px 12px #0002', padding: '2.1em 2.2em', animation: 'fadeInModelDetails 0.7s', position: 'relative' }}>
        <style>{`
          @keyframes fadeInModelDetails {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: none; }
          }
        `}</style>
        {selected ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ fontWeight: 700, fontSize: '1.18em', color: '#ff9800', marginRight: 12 }}>{selected.name}</div>
              <span style={{ background: selected.loaded ? 'limegreen' : '#c00', color: '#fff', borderRadius: 6, padding: '0.18em 0.7em', fontSize: '0.93em', marginRight: 8 }}>{selected.loaded ? 'Loaded' : 'Not loaded'}</span>
              <span style={{ background: '#222', color: '#fff', borderRadius: 6, padding: '0.18em 0.7em', fontSize: '0.93em' }}>{selected.provider}</span>
            </div>
            <div style={{ color: '#888', marginBottom: 10 }}>{selected.details}</div>
            <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginBottom: 10 }}>
              <div><b>Size:</b> {selected.size}</div>
              <div><b>Quant:</b> {selected.quant}</div>
              <div><b>Context:</b> {selected.context}</div>
              <div><b>Tokenizer:</b> {selected.tokenizer}</div>
              <div><b>Memory:</b> {selected.memory}</div>
              <div><b>Benchmark:</b> {selected.benchmark}</div>
            </div>
            <div style={{ marginBottom: 10 }}><b>Tags:</b> {selected.tags.map(t => <span key={t} style={{ background: getTagColor(t), color: '#fff', borderRadius: 5, padding: '0.1em 0.5em', marginRight: 4, fontSize: '0.92em' }}>{t}</span>)}</div>
            <div style={{ marginBottom: 10 }}><b>Path:</b> <span style={{ color: '#fff', background: '#222', borderRadius: 4, padding: '0.1em 0.4em' }}>{selected.path}</span></div>
            <div style={{ marginBottom: 10 }}><b>License:</b> {selected.license} &nbsp; <b>Source:</b> {selected.source} &nbsp; <b>Chat Template:</b> {selected.chatTemplate}</div>
            <div style={{ marginBottom: 10 }}>
              <b>Model Card:</b> {selected.card ? <a href={selected.card} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'underline' }}>View</a> : <span style={{ color: '#888' }}>N/A</span>}
            </div>
            {/* Progress bar placeholder for download/import */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ height: 8, background: '#222', borderRadius: 5, overflow: 'hidden', marginBottom: 8, width: 180, maxWidth: '100%' }}>
                <div style={{ width: '60%', height: '100%', background: 'linear-gradient(90deg, #ff9800 0%, #1976d2 100%)', borderRadius: 5, transition: 'width 0.5s' }} />
              </div>
              <button style={{ fontWeight: 600, fontSize: '0.97em', marginRight: 8 }} title="Configure model">🛠 Configure</button>
              <button style={{ fontWeight: 600, fontSize: '0.97em', marginRight: 8 }} title="Refresh model info">🔄 Refresh</button>
              <button style={{ fontWeight: 600, fontSize: '0.97em', marginRight: 8 }} title="Download model">📦 Download</button>
              <button style={{ fontWeight: 600, fontSize: '0.97em', marginRight: 8 }} title="Delete model" onClick={() => handleDelete(selected)}>❌ Delete</button>
            </div>
            <div style={{ marginBottom: 10 }}>
              <b>Recent Activity:</b>
              <ul style={{ marginTop: 6, marginBottom: 0, fontSize: '0.97em' }}>
                {selected.activity.map((a, i) => <li key={i}>{a.time} — {a.action} <span style={{ color: '#888' }}>{a.details}</span></li>)}
              </ul>
            </div>
            {/* Confirmation dialog for delete */}
            {showDelete && deleteTarget === selected && (
              <div style={{ position: 'absolute', top: 40, left: 40, right: 40, background: '#222', color: '#fff', borderRadius: 12, boxShadow: '0 2px 16px #000a', padding: 24, zIndex: 10, textAlign: 'center', animation: 'fadeInModelDetails 0.3s' }}>
                <div style={{ fontWeight: 700, fontSize: '1.1em', marginBottom: 12 }}>Delete model <span style={{ color: '#ff9800' }}>{deleteTarget.name}</span>?</div>
                <div style={{ marginBottom: 18, color: '#aaa' }}>This action cannot be undone.</div>
                <button style={{ background: '#c00', marginRight: 12 }} onClick={confirmDelete}>Delete</button>
                <button style={{ background: '#1976d2' }} onClick={cancelDelete}>Cancel</button>
              </div>
            )}
          </>
        ) : <div style={{ color: '#888' }}>Select a model to see details.</div>}
      </div>
    </div>
  );
}

export default Models; 