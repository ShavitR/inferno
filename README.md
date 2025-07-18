# Inferno — Local LLM Behavior Debugger & Visualizer

Inferno is a native desktop application for debugging and visualizing local LLM (Large Language Model) inference. It enables users to load GGUF models (e.g., Mistral 7B), run token-by-token inference, and visualize generated tokens and top-k logits in real time.

## Features
- Load and run local GGUF LLM models (no cloud required)
- Real-time streaming of generated tokens
- Visualization of top-k logits and model confidence
- Minimal, user-friendly UI for prompt debugging and analysis
- Roadmap for multi-model comparison, attention maps, and more

## Quickstart
1. Install Python and dependencies (see `/backend/README.md`)
2. Build and run the Tauri + React frontend (see `/frontend/README.md`)
3. Launch the app and load a local GGUF model

## Documentation
- [Architecture](/docs/architecture.md)
- [Design Notes](/docs/design.md)
- [Roadmap](/docs/roadmap.md)
- [Troubleshooting](/docs/troubleshooting.md)

## License
See [LICENSE](LICENSE). 