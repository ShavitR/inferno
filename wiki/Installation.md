# Installation Guide

This guide will help you install and set up Inferno on your system.

## System Requirements

### Minimum Requirements
- **OS**: Windows 10/11, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **RAM**: 8 GB (16 GB recommended for larger models)
- **Storage**: 2 GB free space (plus space for your GGUF models)
- **Python**: 3.10 or higher
- **Node.js**: LTS version (18.x or 20.x)

### Recommended Requirements
- **RAM**: 16 GB or more
- **Storage**: SSD with 10+ GB free space
- **GPU**: CUDA-compatible GPU for faster inference (optional)

## Quick Install (Pre-built Releases)

> **Note**: Pre-built releases are planned for future versions. Currently, you need to build from source.

1. Download the latest release from [GitHub Releases](https://github.com/ShavitR/inferno/releases)
2. Extract the archive to your preferred location
3. Run the executable for your platform:
   - **Windows**: `inferno.exe`
   - **macOS**: `Inferno.app`
   - **Linux**: `./inferno`

## Build from Source

### Prerequisites

1. **Install Python 3.10+**
   ```bash
   # Check your Python version
   python --version
   ```

2. **Install Node.js LTS**
   - Download from [nodejs.org](https://nodejs.org/)
   - Or use a version manager like nvm:
   ```bash
   # Using nvm
   nvm install --lts
   nvm use --lts
   ```

3. **Install Rust (for Tauri)**
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   source ~/.cargo/env
   ```

### Clone and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShavitR/inferno.git
   cd inferno
   ```

2. **Set up the backend**
   ```bash
   cd backend
   
   # Create virtual environment
   python -m venv .venv
   
   # Activate virtual environment
   # On Windows:
   .venv\Scripts\activate
   # On macOS/Linux:
   source .venv/bin/activate
   
   # Install dependencies
   pip install -r requirements.txt
   pip install -r requirements-dev.txt  # For development
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   
   # Install dependencies
   npm install
   ```

### Running Inferno

1. **Start the backend server**
   ```bash
   cd backend
   source .venv/bin/activate  # Ensure virtual env is active
   python main.py
   ```

2. **Start the frontend (in a new terminal)**
   ```bash
   cd frontend
   npm run tauri dev
   ```

The Tauri application should open automatically. If not, check the terminal output for any error messages.

## Building for Production

To build a production release:

```bash
cd frontend
npm run tauri build
```

The built application will be available in `frontend/src-tauri/target/release/`.

## Docker Installation (Alternative)

> **Note**: Docker support is planned for future versions.

## Troubleshooting Installation

### Common Issues

**Python version issues**
```bash
# Use specific Python version
python3.10 -m venv .venv
```

**Rust compilation errors**
```bash
# Update Rust
rustup update
```

**Node.js dependency issues**
```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Permission errors on macOS/Linux**
```bash
# Make sure you have proper permissions
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

### Getting Help

If you encounter issues:
1. Check our [Common Issues](Common-Issues.md) page
2. Search existing [GitHub Issues](https://github.com/ShavitR/inferno/issues)
3. Create a new issue with:
   - Your operating system and version
   - Python and Node.js versions
   - Full error message and stack trace

## Next Steps

Once Inferno is installed:
1. Follow the [Getting Started Guide](Getting-Started.md)
2. Learn about [GGUF Models](GGUF-Models.md)
3. Explore the [User Interface](User-Interface.md)