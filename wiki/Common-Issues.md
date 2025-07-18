# Common Issues and Solutions

This page provides solutions to frequently encountered problems when using Inferno.

## Installation Issues

### Python Version Problems

**Issue**: `Python version 3.9 is not supported`
**Solution**: 
```bash
# Check your Python version
python --version

# Install Python 3.10 or higher
# On Ubuntu/Debian:
sudo apt update
sudo apt install python3.10 python3.10-venv

# On macOS with Homebrew:
brew install python@3.10

# On Windows: Download from python.org

# Use specific version for virtual environment
python3.10 -m venv .venv
```

### Node.js and npm Issues

**Issue**: `npm ERR! peer dep missing`
**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall with legacy peer deps
npm install --legacy-peer-deps

# Or use npm 8+
npm install
```

**Issue**: `command not found: npm`
**Solution**:
```bash
# Install Node.js LTS from nodejs.org
# Or use a version manager:

# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal and install Node.js
nvm install --lts
nvm use --lts
```

### Rust/Tauri Installation Issues

**Issue**: `cargo: command not found`
**Solution**:
```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Restart terminal or source the environment
source ~/.cargo/env

# Update Rust
rustup update
```

**Issue**: Tauri build fails with `failed to run custom build command for 'openssl-sys'`
**Solution**:
```bash
# On Ubuntu/Debian:
sudo apt install libssl-dev pkg-config

# On macOS:
brew install openssl pkg-config

# On Windows: Install Visual Studio Build Tools
```

## Model Loading Issues

### Model File Not Found

**Issue**: `FileNotFoundError: [Errno 2] No such file or directory`
**Solution**:
1. Verify the file path is correct
2. Check that the file exists and isn't corrupted
3. Ensure you have read permissions for the file
4. Try using absolute path instead of relative path

```bash
# Check file exists
ls -la /path/to/your/model.gguf

# Check file permissions
stat /path/to/your/model.gguf

# Use absolute path in Inferno
/home/username/models/mistral-7b.Q4_K_M.gguf
```

### Insufficient Memory

**Issue**: `RuntimeError: Failed to load model: not enough memory`
**Solution**:
1. **Check available RAM**:
   ```bash
   # Linux/macOS
   free -h
   # macOS specific
   vm_stat
   # Windows
   wmic OS get TotalVisibleMemorySize,FreePhysicalMemory
   ```

2. **Free up memory**:
   - Close other applications
   - Use a smaller model or lower quantization (Q4_K_M instead of Q6_K)
   - Restart your computer to clear memory leaks

3. **Choose appropriate model size**:
   - 8 GB RAM: TinyLlama 1.1B or small 7B models with Q4_K_M
   - 16 GB RAM: Most 7B models with Q6_K
   - 32 GB RAM: 13B models with Q4_K_M
   - 64 GB RAM: 13B models with Q6_K or larger models

### Corrupted Model Files

**Issue**: Model loads but generates garbage or crashes
**Solution**:
1. **Re-download the model**:
   ```bash
   # Check file integrity with sha256sum if hash is provided
   sha256sum model.gguf
   
   # Compare with expected hash from Hugging Face
   ```

2. **Verify file size**:
   - Compare actual file size with expected size
   - Incomplete downloads often result in smaller files

3. **Try a different model**:
   - Test with a known-good model like TinyLlama first
   - Verify the model format is actually GGUF

## Backend Connection Issues

### WebSocket Connection Failed

**Issue**: `WebSocket connection to 'ws://localhost:8765' failed`
**Solution**:

1. **Check backend is running**:
   ```bash
   cd backend
   source .venv/bin/activate
   python main.py
   
   # You should see:
   # INFO: WebSocket server running on ws://localhost:8765
   ```

2. **Check port availability**:
   ```bash
   # Linux/macOS
   lsof -i :8765
   netstat -an | grep 8765
   
   # Windows
   netstat -an | findstr 8765
   ```

3. **Firewall issues**:
   - Allow Python through firewall
   - Temporarily disable firewall to test
   - Check if antivirus is blocking connections

4. **Port conflicts**:
   - Another application might be using port 8765
   - Modify `config.py` to use a different port
   - Update frontend to match new port

### Backend Crashes on Startup

**Issue**: Backend exits immediately or crashes
**Solution**:
1. **Check Python environment**:
   ```bash
   # Ensure virtual environment is activated
   which python
   # Should show path to .venv/bin/python
   
   # Check dependencies are installed
   pip list | grep llama-cpp-python
   ```

2. **Install missing dependencies**:
   ```bash
   pip install -r requirements.txt
   
   # If issues persist, try reinstalling llama-cpp-python
   pip uninstall llama-cpp-python
   pip install llama-cpp-python --no-cache-dir
   ```

3. **Check for import errors**:
   ```bash
   python -c "import llama_cpp; print('OK')"
   ```

## Inference Issues

### Generation is Very Slow

**Issue**: Each token takes several seconds to generate
**Possible Causes & Solutions**:

1. **Model too large for your hardware**:
   - Try Q4_K_M instead of Q6_K or Q8_0
   - Use a smaller model (7B instead of 13B)

2. **Running out of RAM**:
   - Close other applications
   - Monitor memory usage during inference

3. **CPU-only inference**:
   - Check if GPU acceleration is available
   - Ensure CUDA drivers are installed if you have NVIDIA GPU

4. **Storage bottleneck**:
   - Move model files to SSD if on HDD
   - Ensure sufficient free space

### Generation Gets Stuck or Repeats

**Issue**: Model produces repetitive text or stops generating
**Solutions**:

1. **Adjust temperature**:
   - Too low (< 0.1): Increase to 0.3-0.7
   - Too high (> 1.5): Decrease to 0.8-1.2

2. **Check top-k and top-p settings**:
   - Try top-k = 40-50, top-p = 0.9
   - Avoid very restrictive settings

3. **Prompt engineering**:
   - Add more context to your prompt
   - Use different phrasing
   - Try a different model

4. **Model context limit**:
   - Model may have reached context window
   - Start a new conversation

### Poor Output Quality

**Issue**: Generated text is incoherent or incorrect
**Solutions**:

1. **Try different models**:
   - Some models are better for specific tasks
   - Instruction-tuned models (e.g., Mistral-Instruct) often work better

2. **Adjust quantization**:
   - Use Q6_K instead of Q4_K_M for better quality
   - Trade-off between quality and speed/memory

3. **Improve prompts**:
   - Be more specific and detailed
   - Provide examples of desired output
   - Use appropriate formatting

4. **Check model suitability**:
   - Code models for programming tasks
   - Chat models for conversations
   - Base models may need different prompting

## Frontend/UI Issues

### Application Won't Start

**Issue**: Tauri app doesn't open or crashes immediately
**Solution**:
1. **Check development server**:
   ```bash
   cd frontend
   npm run tauri dev
   
   # Check for error messages in terminal
   ```

2. **Clear build cache**:
   ```bash
   # Clear Tauri cache
   rm -rf src-tauri/target
   
   # Clear npm cache
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Check system requirements**:
   - Ensure graphics drivers are up to date
   - WebView2 on Windows (usually auto-installed)

### Visualization Not Updating

**Issue**: Token stream or logits display doesn't update
**Solutions**:
1. **Check WebSocket connection**:
   - Open browser dev tools (F12 in app)
   - Look for WebSocket errors in console

2. **Restart both frontend and backend**:
   ```bash
   # Stop both processes and restart
   cd backend && python main.py &
   cd frontend && npm run tauri dev
   ```

3. **Clear application data**:
   - Close app completely
   - Clear any cached data
   - Restart application

### Performance Issues in UI

**Issue**: UI becomes slow or unresponsive
**Solutions**:
1. **Reduce visualization complexity**:
   - Lower number of displayed tokens
   - Reduce update frequency if possible

2. **Hardware acceleration**:
   - Ensure GPU acceleration is enabled
   - Update graphics drivers

3. **Close other applications**:
   - Free up system resources
   - Monitor CPU and memory usage

## Platform-Specific Issues

### Windows Issues

**Issue**: `'python' is not recognized as an internal or external command`
**Solution**:
```bash
# Use py launcher instead
py -3.10 -m venv .venv
.venv\Scripts\activate
```

**Issue**: Antivirus blocking execution
**Solution**:
- Add Inferno directory to antivirus exclusions
- Temporarily disable real-time protection for testing

### macOS Issues

**Issue**: `"Inferno" cannot be opened because the developer cannot be verified`
**Solution**:
```bash
# Remove quarantine attribute
xattr -r -d com.apple.quarantine Inferno.app

# Or allow in System Preferences > Security & Privacy
```

**Issue**: Permission denied errors
**Solution**:
```bash
# Make sure you have proper permissions
chmod +x Inferno.app/Contents/MacOS/inferno
```

### Linux Issues

**Issue**: Missing system dependencies
**Solution**:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install build-essential libssl-dev pkg-config python3.10-dev

# CentOS/RHEL/Fedora
sudo yum install gcc openssl-devel pkgconfig python310-devel
# or
sudo dnf install gcc openssl-devel pkgconf python3.10-devel
```

**Issue**: WebView/GTK issues
**Solution**:
```bash
# Install webkit2gtk
sudo apt install webkit2gtk-4.0-dev libgtk-3-dev
```

## Getting Additional Help

### Gathering Debug Information

When reporting issues, include:

1. **System information**:
   ```bash
   # Operating system and version
   uname -a  # Linux/macOS
   
   # Python version
   python --version
   
   # Node.js version
   node --version
   
   # Available memory
   free -h  # Linux
   ```

2. **Error messages**: Complete error output from terminal

3. **Steps to reproduce**: Exact sequence that triggers the issue

4. **Model information**: Model name, size, quantization type

### Community Resources

- **GitHub Issues**: [https://github.com/ShavitR/inferno/issues](https://github.com/ShavitR/inferno/issues)
- **Discussions**: [https://github.com/ShavitR/inferno/discussions](https://github.com/ShavitR/inferno/discussions)
- **Wiki**: Browse other wiki pages for detailed guides
- **FAQ**: Check our [FAQ page](FAQ.md) for quick answers

### Before Opening an Issue

1. Search existing issues for similar problems
2. Try the solutions on this page
3. Test with a different model (e.g., TinyLlama)
4. Verify your installation follows the official guide
5. Gather debug information as described above

Most issues are related to environment setup, model compatibility, or resource constraints. Following the installation guide carefully and using recommended models usually resolves most problems.