# Getting Started with Inferno

This guide will walk you through your first experience with Inferno, from loading a model to running your first inference.

## Prerequisites

Before starting, make sure you have:
- [Installed Inferno](Installation.md) on your system
- Downloaded a GGUF model file (see [GGUF Models](GGUF-Models.md) for recommendations)
- At least 4-8 GB of free RAM (depending on model size)

## Step 1: Launch Inferno

1. **Start the backend server**
   ```bash
   cd backend
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   python main.py
   ```
   
   You should see output similar to:
   ```
   INFO: Starting Inferno backend server...
   INFO: WebSocket server running on ws://localhost:8765
   ```

2. **Launch the frontend application**
   ```bash
   cd frontend
   npm run tauri dev
   ```
   
   The Inferno application window should open.

## Step 2: Load Your First Model

1. **Click "Load Model"** in the main interface
2. **Browse and select your GGUF model file**
   - Recommended first models: Mistral 7B, Llama 2 7B, or similar
   - Model files typically have `.gguf` extension
3. **Wait for the model to load**
   - Loading may take 30 seconds to several minutes
   - Progress will be shown in the status bar
   - RAM usage will increase significantly

### Model Loading Tips
- Start with smaller models (7B parameters) for better performance
- Ensure you have enough RAM: roughly 2x the model size
- Place model files on an SSD for faster loading

## Step 3: Your First Inference

1. **Enter a prompt** in the text input area
   - Try something simple like: "The capital of France is"
   - Or: "Once upon a time, there was a"

2. **Configure inference settings** (optional)
   - **Temperature**: Controls randomness (0.1 = focused, 1.0 = creative)
   - **Top-k**: Number of top tokens to consider (40 is a good default)
   - **Max tokens**: Maximum length of generation (100-500 for testing)

3. **Click "Generate"** to start inference

## Step 4: Understanding the Visualization

As Inferno generates text, you'll see several visualization elements:

### Token Stream
- **Real-time tokens**: Each generated token appears as it's created
- **Color coding**: Different colors may indicate confidence levels
- **Timing**: Watch the speed of token generation

### Logits Visualization
- **Probability bars**: Shows the confidence for each possible next token
- **Top-k display**: Only the most likely tokens are shown
- **Real-time updates**: Changes with each new token

### Controls
- **Pause/Resume**: Stop generation at any time
- **Reset**: Clear current generation and start over
- **Export**: Save results for later analysis

## Step 5: Experiment and Learn

Try different prompts and settings:

### Creative Writing
```
Prompt: "In a world where gravity works backwards,"
Temperature: 0.8-1.0
Max tokens: 200
```

### Factual Queries
```
Prompt: "List the planets in our solar system:"
Temperature: 0.1-0.3
Max tokens: 100
```

### Code Generation
```
Prompt: "Write a Python function to calculate fibonacci numbers:"
Temperature: 0.2-0.5
Max tokens: 150
```

## Understanding What You're Seeing

### Token Visualization
- Each "token" is a piece of text (word, part of word, or punctuation)
- Tokens appear in real-time as the model generates them
- Color intensity may indicate how "confident" the model was

### Logits and Probabilities
- "Logits" are the raw scores the model assigns to each possible next token
- Higher scores = more likely to be chosen
- The visualization shows only the top candidates

### Generation Process
- The model processes your prompt token by token
- For each position, it predicts what should come next
- The process continues until completion or stopping criteria

## Common First-Time Questions

**Q: Why is generation slow?**
A: Model inference is compute-intensive. Larger models and longer sequences take more time. Consider using a smaller model or enabling GPU acceleration if available.

**Q: The output seems random/wrong?**
A: Try lowering the temperature (0.1-0.3) for more focused output, or use a different model that might be better trained for your use case.

**Q: Can I use any LLM model?**
A: Inferno currently supports GGUF format models. See our [GGUF Models guide](GGUF-Models.md) for compatible models and where to download them.

**Q: How much RAM do I need?**
A: Roughly 2x the model size in GB. A 7B model needs about 14-16 GB RAM. 4-bit quantized models need less.

## Next Steps

Now that you've run your first inference:

1. **Explore different models**: Try [various GGUF models](GGUF-Models.md)
2. **Learn prompt engineering**: Read our [Debugging Prompts guide](Debugging-Prompts.md)
3. **Understand the interface**: Dive deeper into the [User Interface Guide](User-Interface.md)
4. **Optimize performance**: Check out [Performance Optimization](Performance-Optimization.md)

## Troubleshooting

If you encounter issues:

- **Model won't load**: Check file path, format, and available RAM
- **Generation seems stuck**: Try reducing max tokens or restarting
- **Interface not updating**: Check WebSocket connection in browser dev tools
- **Out of memory errors**: Try a smaller model or close other applications

For more help, see our [Common Issues](Common-Issues.md) page or [open an issue](https://github.com/ShavitR/inferno/issues) on GitHub.