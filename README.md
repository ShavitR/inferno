<!-- BANNER -->
<p align="center">
  <img src="https://svgshare.com/i/16kA.svg" alt="Inferno Banner" width="100%"/>
</p>

<h1 align="center">Inferno — Local LLM Debugger & Visualizer</h1>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
  <a href="https://github.com/ShavitR/inferno"><img src="https://img.shields.io/github/stars/ShavitR/inferno?style=social" alt="GitHub stars"></a>
  <img src="https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-orange" alt="Platform">
  <img src="https://img.shields.io/badge/python-3.10%2B-blue" alt="Python 3.10+">
  <img src="https://img.shields.io/badge/node.js-LTS-green" alt="Node.js LTS">
  <img src="https://img.shields.io/badge/tauri-%5E1.0-yellow" alt="Tauri">
  <a href="https://github.com/ShavitR/inferno/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome"></a>
  <img src="https://img.shields.io/badge/made%20with-%E2%9D%A4-red" alt="Made with Love">
</p>

---

> **Inferno** is a next-gen desktop app for debugging and visualizing local LLM (Large Language Model) inference. Load GGUF models (e.g., Mistral 7B), run token-by-token inference, and see the mind of your model—live, in color, on your own machine.

---

## 🖼️ Live Preview

<p align="center">
  <img src="docs/demo-screenshot.png" alt="Inferno Demo" width="700" style="border-radius:18px;box-shadow:0 4px 32px #0003;"/>
  <br>
  <i>See it in action! (Add your own screenshot or GIF here)</i>
</p>

---

## 🚀 Features

<table>
  <tr>
    <td width="50%">
      <ul>
        <li>🧠 <b>Load & run local GGUF LLM models</b></li>
        <li>⚡ <b>Real-time streaming of generated tokens</b></li>
        <li>📊 <b>Top-k logits & confidence visualization</b></li>
        <li>🎨 <b>Modern, minimal UI for prompt debugging</b></li>
      </ul>
    </td>
    <td width="50%">
      <ul>
        <li>⚔️ <b>Multi-model comparison</b> <i>(roadmap)</i></li>
        <li>🗺️ <b>Attention maps & advanced visualizations</b> <i>(roadmap)</i></li>
        <li>🔒 <b>100% local, privacy-first</b></li>
        <li>🖥️ <b>Cross-platform: Windows, macOS, Linux</b></li>
      </ul>
    </td>
  </tr>
</table>

---

## 🛠️ Quickstart

### Backend (Python)
```bash
# 1. Setup Python 3.10+ and a virtual environment
python -m venv .venv
source .venv/bin/activate  # or .venv\Scripts\activate on Windows

# 2. Install dependencies
pip install -r backend/requirements.txt

# 3. Run the backend server
cd backend
python main.py
```

### Frontend (Tauri + React)
```bash
# 1. Install Node.js (LTS recommended)
# 2. Install dependencies
cd frontend
npm install

# 3. Start the Tauri app (dev mode)
npm run tauri dev
```

---

## 📚 Documentation
- [Architecture](docs/architecture.md)
- [Design Notes](docs/design.md)
- [Roadmap](docs/roadmap.md)
- [Troubleshooting](docs/troubleshooting.md)
- [Contributing](CONTRIBUTING.md)

---

## 🌐 Community & Support

- 💬 <b>Questions?</b> Open an <a href="https://github.com/ShavitR/inferno/issues">Issue</a> or join the (future) <b>Discussions</b> tab!
- 🛠️ <b>Want to contribute?</b> See <a href="CONTRIBUTING.md">CONTRIBUTING.md</a> and our roadmap.
- 🧑‍💻 <b>PRs and feedback are always welcome!</b>

---

## 🤝 Credits & License

- **Lead:** AI Engineer
- **Contributors:** Inferno Team, Open Source Community
- **License:** [MIT](LICENSE)

---

<p align="center" style="font-size:1.1em;">
  <b>⭐ Star this repo to support the project!</b><br>
  <i>Made with ❤️ by the Inferno Team</i>
</p> 