# GGUF Models Guide

GGUF (GPT-Generated Unified Format) is a binary format for storing large language models. This guide explains how to find, download, and use GGUF models with Inferno.

## What is GGUF?

GGUF is a file format designed for efficient storage and loading of large language models. It offers several advantages:

- **Efficient storage**: Compressed model weights reduce file size
- **Fast loading**: Optimized for quick model initialization
- **Cross-platform**: Works consistently across different operating systems
- **Metadata support**: Includes model information and configuration
- **Quantization support**: Allows for different precision levels (4-bit, 8-bit, 16-bit)

## Recommended Models for Beginners

Start with these well-tested models that work great with Inferno:

### Small Models (Good for testing and learning)
- **TinyLlama 1.1B** (~1-2 GB)
  - Fast inference, low memory usage
  - Good for experimentation
  - [Download from Hugging Face](https://huggingface.co/TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF)

### Medium Models (Balanced performance)
- **Mistral 7B** (~4-8 GB depending on quantization)
  - Excellent performance-to-size ratio
  - Great for most use cases
  - [Download from Hugging Face](https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.1-GGUF)

- **Llama 2 7B** (~4-8 GB)
  - Well-trained and widely compatible
  - Good for general text generation
  - [Download from Hugging Face](https://huggingface.co/TheBloke/Llama-2-7b-Chat-GGUF)

### Large Models (For advanced users with powerful hardware)
- **Llama 2 13B** (~8-16 GB)
  - Better performance than 7B models
  - Requires more RAM
  - [Download from Hugging Face](https://huggingface.co/TheBloke/Llama-2-13b-Chat-GGUF)

## Understanding Quantization

GGUF models come in different quantization levels, which affect both quality and resource requirements:

### Quantization Types
- **Q2_K**: 2-bit quantization (smallest, lowest quality)
- **Q3_K_M**: 3-bit quantization (small, moderate quality)
- **Q4_K_M**: 4-bit quantization (balanced, recommended)
- **Q5_K_M**: 5-bit quantization (larger, better quality)
- **Q6_K**: 6-bit quantization (large, high quality)
- **Q8_0**: 8-bit quantization (largest, highest quality)
- **F16**: 16-bit floating point (original quality, very large)

### Choosing Quantization

For most users, **Q4_K_M** provides the best balance of quality and performance:
```
Model: Mistral-7B-Instruct-v0.1-GGUF
File: mistral-7b-instruct-v0.1.Q4_K_M.gguf
Size: ~4.1 GB
Quality: Excellent for most tasks
```

## Where to Download Models

### Hugging Face (Primary Source)
[Hugging Face](https://huggingface.co/) hosts thousands of GGUF models:

1. **Search for GGUF models**: Use search term "GGUF" or "TheBloke"
2. **TheBloke's conversions**: User "TheBloke" provides high-quality GGUF conversions
3. **Official model pages**: Many model creators now provide GGUF versions

### Popular Model Collections
- [TheBloke's Models](https://huggingface.co/TheBloke): High-quality GGUF conversions
- [Microsoft's Models](https://huggingface.co/microsoft): Official Microsoft models
- [Meta's Llama Models](https://huggingface.co/meta-llama): Official Meta models

### Local Model Sources
- **Ollama**: Download models through Ollama and find GGUF files in cache
- **GPT4All**: Includes curated collection of GGUF models
- **LM Studio**: Provides easy model downloading interface

## Downloading Models

### Method 1: Direct Download from Hugging Face
1. Navigate to model page (e.g., TheBloke/Mistral-7B-Instruct-v0.1-GGUF)
2. Click on "Files and versions" tab
3. Choose your preferred quantization (Q4_K_M recommended)
4. Click download button or copy download link

### Method 2: Using Git LFS
```bash
# Install git-lfs if not already installed
git lfs install

# Clone specific model
git clone https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.1-GGUF

# Or download specific file
git lfs pull --include="*.Q4_K_M.gguf"
```

### Method 3: Using Python
```python
from huggingface_hub import hf_hub_download

# Download specific model file
model_path = hf_hub_download(
    repo_id="TheBloke/Mistral-7B-Instruct-v0.1-GGUF",
    filename="mistral-7b-instruct-v0.1.Q4_K_M.gguf",
    local_dir="./models"
)
```

## Model Storage and Organization

### Recommended Folder Structure
```
~/inferno-models/
├── 7b-models/
│   ├── mistral-7b-instruct-v0.1.Q4_K_M.gguf
│   ├── llama-2-7b-chat.Q4_K_M.gguf
│   └── tinyllama-1.1b-chat.Q4_K_M.gguf
├── 13b-models/
│   └── llama-2-13b-chat.Q4_K_M.gguf
└── specialized/
    ├── code-llama-7b.Q4_K_M.gguf
    └── mistral-7b-openorca.Q4_K_M.gguf
```

### Storage Tips
- Use descriptive filenames including model name and quantization
- Store on SSD for faster loading
- Keep models you use frequently in easily accessible locations
- Consider using symbolic links for frequently used models

## Using Models in Inferno

### Loading a Model
1. Launch Inferno backend and frontend
2. Click "Load Model" or "Browse"
3. Navigate to your model file
4. Select the `.gguf` file
5. Wait for loading to complete

### Model Loading Tips
- **First load takes longer**: Initial loading includes tokenizer setup
- **RAM usage spikes**: Memory usage increases significantly during loading
- **Check compatibility**: Ensure model is compatible with llama-cpp-python
- **Monitor progress**: Watch status indicators for loading progress

## Specialized Models

### Code Generation Models
- **Code Llama 7B**: Optimized for programming tasks
- **Wizard Coder**: Enhanced coding capabilities
- **StarCoder**: Trained on diverse programming languages

### Chat Models
- **Vicuna**: Fine-tuned for conversations
- **Alpaca**: Instruction-following model
- **OpenOrca**: Enhanced reasoning capabilities

### Domain-Specific Models
- **Medical models**: Trained on medical literature
- **Legal models**: Specialized for legal text
- **Scientific models**: Enhanced for research papers

## Troubleshooting Model Issues

### Common Problems

**Model won't load**
- Check file integrity (re-download if corrupted)
- Verify sufficient RAM (2x model size recommended)
- Ensure file isn't corrupted during download

**Out of memory errors**
- Try smaller quantization (Q4_K_M instead of Q6_K)
- Close other applications to free RAM
- Consider using a smaller model

**Slow inference**
- Use Q4_K_M quantization for better speed
- Enable GPU acceleration if available
- Try smaller models for faster response

**Poor quality output**
- Try higher quantization (Q6_K instead of Q4_K_M)
- Use a different model variant
- Adjust inference parameters (temperature, top-k)

### Model Compatibility
Inferno uses llama-cpp-python, which supports:
- ✅ Llama/Llama 2 models
- ✅ Mistral models
- ✅ Code Llama models
- ✅ Most instruction-tuned models
- ❓ Some experimental architectures may not work

## Performance Comparison

| Model Size | Quantization | File Size | RAM Usage | Inference Speed | Quality |
|------------|-------------|-----------|-----------|----------------|---------|
| 7B | Q4_K_M | ~4 GB | ~6-8 GB | Fast | Good |
| 7B | Q6_K | ~5.5 GB | ~8-10 GB | Medium | Better |
| 13B | Q4_K_M | ~7.5 GB | ~12-16 GB | Slower | Very Good |
| 13B | Q6_K | ~10 GB | ~16-20 GB | Slow | Excellent |

## Best Practices

1. **Start small**: Begin with 7B Q4_K_M models
2. **Test compatibility**: Verify models work before committing to large downloads
3. **Monitor resources**: Watch RAM and disk usage
4. **Keep backups**: Store working models safely
5. **Update regularly**: Check for newer versions of your favorite models
6. **Document settings**: Keep notes on which models work best for different tasks

## Further Reading

- [GGUF Format Specification](https://github.com/ggerganov/ggml/blob/master/docs/gguf.md)
- [llama.cpp Documentation](https://github.com/ggerganov/llama.cpp)
- [Hugging Face Model Hub](https://huggingface.co/models)
- [Model Quantization Guide](https://huggingface.co/docs/transformers/main/en/quantization)