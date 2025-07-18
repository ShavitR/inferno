import React, { useState } from 'react';

function PromptInput() {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('mistral-7b');
  const [temperature, setTemperature] = useState(1.0);
  const [topK, setTopK] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send prompt, model, temperature, topK to backend
    alert(`Prompt: ${prompt}\nModel: ${model}\nTemp: ${temperature}\nTop-k: ${topK}`);
  };

  return (
    <form className="PromptInput" onSubmit={handleSubmit}>
      <select value={model} onChange={e => setModel(e.target.value)}>
        <option value="mistral-7b">Mistral 7B</option>
        <option value="llama-2-7b">Llama 2 7B</option>
        <option value="custom">Custom...</option>
      </select>
      <textarea
        placeholder="Enter your prompt here..."
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
      />
      <label>
        Temp
        <input
          type="number"
          min="0.1"
          max="2.0"
          step="0.1"
          value={temperature}
          onChange={e => setTemperature(Number(e.target.value))}
          style={{ width: 50 }}
        />
      </label>
      <label>
        Top-k
        <input
          type="number"
          min="1"
          max="50"
          value={topK}
          onChange={e => setTopK(Number(e.target.value))}
          style={{ width: 50 }}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default PromptInput; 