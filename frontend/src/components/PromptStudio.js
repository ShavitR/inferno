import React from 'react';
import PromptInput from './PromptInput';
import TokenStream from './TokenStream';
import LogitsChart from './LogitsChart';

function PromptStudio() {
  return (
    <div>
      <h2>🎨 Prompt Studio</h2>
      <PromptInput />
      <TokenStream />
      <LogitsChart />
    </div>
  );
}

export default PromptStudio; 