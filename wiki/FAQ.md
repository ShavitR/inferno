# Frequently Asked Questions (FAQ)

This page answers the most commonly asked questions about Inferno.

## Getting Started

### Q: What is Inferno?
**A:** Inferno is a desktop application for visualizing and debugging Large Language Model (LLM) inference in real-time. It lets you load local GGUF models, run inference, and see exactly how the model generates text token by token.

### Q: What makes Inferno different from other LLM tools?
**A:** Inferno focuses on **visualization and understanding**. While other tools help you use LLMs, Inferno helps you understand how they work by showing the inference process in real-time, including token generation and probability distributions.

### Q: Do I need an internet connection to use Inferno?
**A:** No! Inferno runs completely locally on your machine. Once you have the application and models downloaded, you can use it offline.

## Installation and Setup

### Q: What are the system requirements?
**A:** 
- **Minimum**: 8 GB RAM, Python 3.10+, Node.js LTS
- **Recommended**: 16+ GB RAM, SSD storage, modern CPU
- **OS**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)

### Q: Why do I need both Python and Node.js?
**A:** Inferno uses a hybrid architecture:
- **Python backend**: Handles model loading and inference using llama-cpp-python
- **Tauri frontend**: Provides the desktop interface using React and Rust

### Q: Can I use pre-built binaries instead of building from source?
**A:** Pre-built releases are planned for future versions. Currently, you need to build from source, but we provide detailed instructions in our [Installation Guide](Installation.md).

## Models and Compatibility

### Q: What model formats does Inferno support?
**A:** Inferno currently supports **GGUF format models only**. This includes most popular models like Mistral, Llama 2, Code Llama, and many others that have been converted to GGUF.

### Q: Where can I download GGUF models?
**A:** The best source is [Hugging Face](https://huggingface.co/). Search for "GGUF" or check out TheBloke's collection of high-quality GGUF conversions. See our [GGUF Models Guide](GGUF-Models.md) for specific recommendations.

### Q: How much RAM do I need for different models?
**A:** As a rule of thumb, you need about **2x the model file size** in available RAM:
- **7B model (Q4_K_M)**: ~4 GB file = 8 GB RAM needed
- **13B model (Q4_K_M)**: ~7 GB file = 14 GB RAM needed
- **70B model (Q4_K_M)**: ~40 GB file = 80 GB RAM needed

### Q: Can I use OpenAI GPT models or other API-based models?
**A:** No, Inferno is designed for local models only. It needs direct access to the model's internals to show token-by-token generation and logits visualization.

### Q: What's the difference between Q4_K_M, Q6_K, and other quantization types?
**A:** These refer to how much the model weights are compressed:
- **Q4_K_M**: 4-bit quantization, good balance of quality and size (recommended)
- **Q6_K**: 6-bit quantization, larger but better quality
- **Q8_0**: 8-bit quantization, largest but highest quality
- **F16**: Full 16-bit precision, original quality but very large

## Usage and Features

### Q: What can I see in Inferno's visualizations?
**A:** Inferno shows you:
- **Real-time token generation**: Watch text appear token by token
- **Probability distributions**: See how confident the model is about each choice
- **Top-k logits**: View the most likely next tokens at each step
- **Generation parameters**: Control temperature, top-k, and other settings

### Q: How do I interpret the probability bars?
**A:** The bars show the model's confidence for each possible next token:
- **Longer bars**: Higher probability/confidence
- **Multiple similar bars**: Model is uncertain between options
- **One dominant bar**: Model is very confident about the next token

### Q: Can I pause generation in the middle?
**A:** Yes! You can pause, resume, or stop generation at any time. This is useful for examining the model's state at specific points.

### Q: Can I save or export my sessions?
**A:** Export functionality is planned for future versions. Currently, you can copy text from the interface manually.

## Performance and Optimization

### Q: Why is inference slow on my machine?
**A:** Several factors affect speed:
- **Model size**: Larger models take longer
- **Hardware**: CPU speed and RAM bandwidth matter
- **Quantization**: Higher precision (Q8, F16) is slower than lower (Q4)
- **Sequence length**: Longer texts take progressively longer

### Q: Does Inferno support GPU acceleration?
**A:** GPU support depends on the underlying llama-cpp-python library. If you have a CUDA-compatible GPU and the right drivers, it may automatically accelerate inference.

### Q: How can I make inference faster?
**A:** Try these optimizations:
- Use Q4_K_M quantization instead of higher precision
- Use smaller models (7B instead of 13B)
- Ensure models are stored on an SSD
- Close other memory-intensive applications
- Use shorter prompts when possible

## Troubleshooting

### Q: The model won't load. What should I check?
**A:** Common issues and solutions:
1. **File path**: Ensure the GGUF file exists and path is correct
2. **RAM**: Check you have enough available memory (2x model size)
3. **File corruption**: Try re-downloading the model
4. **Format**: Ensure the file is actually a GGUF model (.gguf extension)

### Q: I get "WebSocket connection failed" errors. How do I fix this?
**A:** This usually means the backend isn't running or isn't accessible:
1. Make sure the Python backend is running (`python main.py`)
2. Check that no firewall is blocking port 8765
3. Verify the backend shows "WebSocket server running" message
4. Try restarting both backend and frontend

### Q: Generation seems stuck or very slow. What's wrong?
**A:** Try these solutions:
1. **Reduce max tokens**: Set a lower limit (e.g., 100 instead of 1000)
2. **Check temperature**: Very low values (< 0.1) can cause repetition
3. **Monitor RAM**: Ensure you're not running out of memory
4. **Restart**: Sometimes reloading the model helps

### Q: The output quality is poor. How can I improve it?
**A:** Consider these factors:
1. **Model choice**: Some models are better for specific tasks
2. **Quantization**: Try Q6_K instead of Q4_K_M for better quality
3. **Temperature**: Adjust between 0.3-0.8 for different styles
4. **Prompt engineering**: Be more specific in your prompts

## Development and Contributing

### Q: Can I contribute to Inferno?
**A:** Yes! We welcome contributions. See our [Contributing Guide](Contributing.md) for details on how to get started.

### Q: How do I report bugs or request features?
**A:** Please use our [GitHub Issues](https://github.com/ShavitR/inferno/issues) page. Include:
- Your operating system and version
- Steps to reproduce the issue
- Error messages (if any)
- Model and settings you were using

### Q: Is Inferno open source?
**A:** Yes, Inferno is licensed under the MIT license. You can view, modify, and distribute the source code freely.

### Q: What's on the roadmap for future versions?
**A:** Planned features include:
- Pre-built releases for easy installation
- Multi-model comparison views
- Attention visualization
- Session export and import
- Performance optimizations
- GPU acceleration improvements

## Technical Questions

### Q: How does Inferno communicate between frontend and backend?
**A:** Inferno uses WebSockets for real-time communication. The Python backend streams token and logit data to the Tauri frontend, which updates the visualizations in real-time.

### Q: Can I use Inferno programmatically or via API?
**A:** Currently, Inferno is designed as a desktop application. However, the backend provides a WebSocket API that could potentially be used by other clients.

### Q: What libraries does Inferno use under the hood?
**A:** Key dependencies include:
- **Backend**: llama-cpp-python, FastAPI, WebSockets
- **Frontend**: Tauri (Rust), React, TypeScript
- **Model support**: GGML/GGUF format via llama.cpp

### Q: How accurate are the probability visualizations?
**A:** The probabilities shown are the actual values computed by the model during inference. They represent the model's internal confidence levels and are as accurate as the model's own calculations.

## Privacy and Security

### Q: Does Inferno send my data anywhere?
**A:** No. Inferno runs completely locally. Your prompts, generated text, and models never leave your machine.

### Q: Are my conversations stored or logged?
**A:** Inferno doesn't automatically save conversations. All data exists only in memory during your session unless you manually save it.

### Q: Is it safe to use Inferno with sensitive or proprietary data?
**A:** Since everything runs locally and no data is transmitted, Inferno is as secure as your local machine. However, always follow your organization's data handling policies.

## Licensing and Legal

### Q: Can I use Inferno commercially?
**A:** Yes, Inferno is licensed under MIT, which allows commercial use. However, check the licenses of any models you use, as they may have their own restrictions.

### Q: Do I need to credit Inferno if I use it in my research?
**A:** While not required by the license, we appreciate citations if Inferno helps with your research or work.

---

**Still have questions?** 
- Check our [Common Issues](Common-Issues.md) page
- Browse the full [wiki](Home.md) for detailed guides
- [Open an issue](https://github.com/ShavitR/inferno/issues) on GitHub
- Join the community discussions (coming soon)