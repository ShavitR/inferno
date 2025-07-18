import React from 'react';

const topK = [
  { token: 'fox', logit: 5.2, prob: 0.32 },
  { token: 'dog', logit: 4.8, prob: 0.21 },
  { token: 'cat', logit: 4.1, prob: 0.13 },
  { token: 'jumps', logit: 3.7, prob: 0.09 },
  { token: 'runs', logit: 3.2, prob: 0.07 },
];

function LogitsChart() {
  const maxLogit = Math.max(...topK.map(t => t.logit));
  return (
    <div className="LogitsChart">
      <h3>Top-k Logits</h3>
      <svg width={350} height={topK.length * 32}>
        {topK.map((t, i) => (
          <g key={t.token} transform={`translate(0,${i * 32})`}>
            <rect
              x={0}
              y={8}
              width={t.logit / maxLogit * 300}
              height={16}
              fill={i === 0 ? 'var(--accent)' : '#888'}
              rx={4}
            />
            <text x={310} y={20} fontSize={14} fill="#333">{(t.prob * 100).toFixed(1)}%</text>
            <text x={6} y={20} fontSize={14} fill="#fff">{t.token}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default LogitsChart; 