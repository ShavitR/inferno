import React from 'react';

function StatusBar({ status = 'disconnected', model = 'mistral-7b', state = 'idle' }) {
  let statusColor = status === 'connected' ? 'limegreen' : status === 'connecting' ? 'orange' : 'crimson';
  return (
    <div className="StatusBar" style={{ display: 'flex', gap: 16, alignItems: 'center', fontSize: 14 }}>
      <span>
        <b>Status:</b> <span style={{ color: statusColor }}>{status}</span>
      </span>
      <span>
        <b>Model:</b> {model}
      </span>
      <span>
        <b>Inference:</b> {state}
      </span>
    </div>
  );
}

export default StatusBar; 