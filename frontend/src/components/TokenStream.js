import React from 'react';

const tokens = [
  { text: 'The', id: 1 },
  { text: 'quick', id: 2 },
  { text: 'brown', id: 3 },
  { text: 'fox', id: 4 },
  { text: 'jumps', id: 5 },
  { text: 'over', id: 6 },
  { text: 'the', id: 7 },
  { text: 'lazy', id: 8 },
  { text: 'dog', id: 9 },
];
const currentTokenIdx = 4;

function TokenStream() {
  return (
    <div className="TokenStream">
      <h3>Token Stream</h3>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {tokens.map((token, idx) => (
          <span
            key={token.id}
            style={{
              padding: '0.2em 0.5em',
              borderRadius: 4,
              background: idx === currentTokenIdx ? 'var(--accent)' : '#333',
              color: idx === currentTokenIdx ? '#fff' : '#eee',
              fontWeight: idx === currentTokenIdx ? 'bold' : 'normal',
              fontSize: '1.1em',
            }}
          >
            {token.text}
          </span>
        ))}
      </div>
    </div>
  );
}

export default TokenStream; 