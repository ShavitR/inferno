# Backend Build & Development Guide (Inferno)

This guide is for developers who want to build, run, or contribute to the Inferno backend.

---

## 1. Environment Setup

- **Python:** 3.10+ required (recommend using [pyenv](https://github.com/pyenv/pyenv) or [Anaconda](https://www.anaconda.com/))
- **Virtual Environment:**
  ```bash
  python -m venv .venv
  source .venv/bin/activate  # or .venv\Scripts\activate on Windows
  ```

## 2. Install Dependencies

- All dependencies are listed in `requirements.txt`.
- Install with:
  ```bash
  pip install -r requirements.txt
  ```
- For development (linting, testing):
  ```bash
  pip install -r dev-requirements.txt  # if present
  ```

## 3. Running the Backend

- Main entry point: `main.py`
- Start the server:
  ```bash
  python main.py
  ```
- By default, the backend listens on `ws://localhost:8000` (configurable).

## 4. Testing

- Run all tests:
  ```bash
  pytest
  ```
- Linting (if configured):
  ```bash
  flake8 .
  ```

## 5. Development Tips

- **Model files:** Place GGUF models in a directory specified by config or CLI.
- **WebSocket API:** See `/docs/architecture.md` for protocol details.
- **Hot reload:** Use `watchdog` or similar tools for auto-restart on code changes.
- **Error handling:** Check logs for detailed tracebacks.

## 6. Contributing

- Please read [CONTRIBUTING.md](../CONTRIBUTING.md) before submitting PRs.
- Open issues for bugs, feature requests, or questions.

## 7. Troubleshooting

- **Dependency issues:**
  - Ensure Python 3.10+ is active in your environment.
  - Try `pip install --upgrade pip setuptools wheel` if builds fail.
- **Model loading errors:**
  - Check GGUF file path and permissions.
  - Ensure `llama-cpp-python` is installed and compatible with your hardware.
- **WebSocket connection issues:**
  - Confirm the backend is running and not blocked by a firewall.

---

For more details, see [../docs/architecture.md](../docs/architecture.md) and [../README.md](../README.md). 