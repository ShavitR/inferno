# Inferno — Local LLM Behavior Debugger & Visualizer

## Project TODOs & Roadmap

---

## 0. Project Setup & Architecture
- [ ] **Define project structure** (backend, frontend, shared, configs, docs, tests, build)
- [ ] **Select tech stack**
  - Backend: Python 3.10+, llama-cpp-python
  - Frontend: Tauri, React, D3.js or Recharts
  - Communication: WebSocket (binary/text streaming)
  - Packaging: Tauri for cross-platform desktop
- [ ] **Document architecture** (see `/docs/architecture.md`)
- [ ] **Set up monorepo or workspace management**

---

## 1. Backend (Python, llama-cpp-python)
- [ ] **Set up Python backend project**
  - [ ] Virtual environment, requirements.txt, pyproject.toml
  - [ ] Linting, formatting, pre-commit hooks
- [ ] **Model loading**
  - [ ] GGUF model file selection (local path)
  - [ ] Validate model file, error handling
  - [ ] Support for Mistral 7B and similar
- [ ] **Inference engine**
  - [ ] Token-by-token streaming inference
  - [ ] Extract logits for each token step
  - [ ] Configurable top-k sampling
  - [ ] Performance optimization (threading, batching)
- [ ] **WebSocket server**
  - [ ] Real-time streaming of tokens & logits
  - [ ] API: start/stop inference, send prompt, receive stream
  - [ ] Error handling, reconnection, status updates
- [ ] **Testing**
  - [ ] Unit tests for model loading, inference, streaming
  - [ ] Integration tests (backend only)
- [ ] **Docs**
  - [ ] Backend API reference
  - [ ] Model compatibility notes

---

## 2. Frontend (Tauri + React)
- [ ] **Tauri app setup**
  - [ ] Tauri config, build scripts, cross-platform support
  - [ ] Secure IPC between frontend and backend
- [ ] **React app structure**
  - [ ] Project skeleton, routing, state management
  - [ ] UI theming (dark/light)
- [ ] **WebSocket client**
  - [ ] Connect to backend, handle streaming data
  - [ ] Reconnect, error display, status indicators
- [ ] **Prompt input & controls**
  - [ ] Prompt textarea, submit/reset, model selection
  - [ ] Inference controls (start/stop, temperature, top-k)
- [ ] **Token stream visualization**
  - [ ] Real-time display of generated tokens
  - [ ] Highlight new/current token
  - [ ] Show token metadata (position, logit, probability)
- [ ] **Top-k logits visualization**
  - [ ] Bar chart or table for top-k tokens per step
  - [ ] Highlight most probable token
  - [ ] Show probability/confidence visually
- [ ] **UI/UX polish**
  - [ ] Responsive layout, accessibility
  - [ ] Minimal, user-friendly design
- [ ] **Testing**
  - [ ] Unit tests (React components, utils)
  - [ ] E2E tests (Tauri, WebSocket integration)
- [ ] **Docs**
  - [ ] User guide, UI walkthrough

---

## 3. WebSocket Communication
- [ ] **Define protocol**
  - [ ] Message types: prompt, token, logits, status, error
  - [ ] Serialization format (JSON, binary for logits?)
- [ ] **Implement backend server**
  - [ ] Async streaming, backpressure handling
- [ ] **Implement frontend client**
  - [ ] Robust reconnection, error handling
- [ ] **Testing**
  - [ ] Simulate dropped connections, malformed data

---

## 4. Configs & Templates
- [ ] **Backend config templates** (model path, server port, logging)
- [ ] **Frontend config templates** (theme, default server address)
- [ ] **Sample .env files**

---

## 5. Documentation
- [ ] **README.md** (project overview, quickstart)
- [ ] **CONTRIBUTING.md** (dev setup, code style, PR process)
- [ ] **LICENSE** (MIT or Apache 2.0)
- [ ] **/docs/**
  - [ ] architecture.md (system diagram, data flow)
  - [ ] design.md (UI/UX, visualization rationale)
  - [ ] roadmap.md (future features, vision)
  - [ ] troubleshooting.md (common issues)

---

## 6. Testing & QA
- [ ] **Unit tests** (backend, frontend)
- [ ] **Integration tests** (end-to-end streaming)
- [ ] **Manual QA checklist** (UI, error cases, performance)

---

## 7. Build, Packaging & Deployment
- [ ] **Tauri build setup** (Windows, macOS, Linux)
- [ ] **Python backend packaging** (standalone binary, venv)
- [ ] **Installer creation** (Tauri, NSIS, DMG, AppImage)
- [ ] **Release pipeline** (CI/CD, versioning)

---

## 8. Future Features & Stretch Goals
- [ ] **Multi-model comparison** (side-by-side inference)
- [ ] **Attention visualization** (attention maps, heads)
- [ ] **Prompt tokenization view**
- [ ] **Behavioral diffs** (compare outputs, logits)
- [ ] **Plugin system for custom visualizations**
- [ ] **Export/share session data**

---

## Notes & Challenges
- **llama-cpp-python**: Ensure compatibility with GGUF, optimize for local hardware (CPU/GPU)
- **WebSocket streaming**: Maintain low latency, handle large logit arrays efficiently
- **UI performance**: Visualizing logits for large vocabularies can be resource-intensive
- **Cross-platform**: Tauri and Python packaging must work seamlessly on all major OSes
- **Security**: Local-only, but still validate file inputs and IPC boundaries
- **Extensibility**: Design for future features (multi-model, plugins)

---

## Architecture Overview
- See `/docs/architecture.md` for diagrams and data flow
- Backend: Python (llama-cpp-python) —> WebSocket —> Frontend: Tauri + React
- MVP: Single model, token/logit streaming, minimal UI
- Future: Multi-model, advanced visualizations, extensibility 