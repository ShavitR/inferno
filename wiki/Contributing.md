# Contributing to Inferno

Thank you for your interest in contributing to Inferno! This guide will help you get started with contributing to the project.

## Table of Contents
- [Ways to Contribute](#ways-to-contribute)
- [Development Setup](#development-setup)
- [Code Guidelines](#code-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Community Guidelines](#community-guidelines)

## Ways to Contribute

### 🐛 Bug Reports
- Report bugs through [GitHub Issues](https://github.com/ShavitR/inferno/issues)
- Include detailed reproduction steps
- Provide system information and error messages
- Test with the latest version first

### 💡 Feature Requests
- Suggest new features via GitHub Issues
- Describe the use case and expected behavior
- Consider implementation complexity
- Check if similar requests already exist

### 📝 Documentation
- Improve existing documentation
- Add new wiki pages or guides
- Fix typos or unclear explanations
- Translate documentation (future)

### 🔧 Code Contributions
- Fix bugs and implement features
- Improve performance and optimization
- Add tests and improve test coverage
- Refactor and clean up code

### 🎨 Design and UX
- Improve the user interface
- Enhance visualizations
- Design new features
- Improve accessibility

## Development Setup

### Prerequisites

Ensure you have the following installed:
- **Python 3.10+** with pip
- **Node.js LTS** (18.x or 20.x)
- **Rust** (latest stable)
- **Git** for version control

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/inferno.git
   cd inferno
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/ShavitR/inferno.git
   ```

### Backend Development Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv .venv
   
   # Activate virtual environment
   # On Windows:
   .venv\Scripts\activate
   # On macOS/Linux:
   source .venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   pip install -r requirements-dev.txt
   ```

4. **Install pre-commit hooks**:
   ```bash
   pre-commit install
   ```

5. **Run tests**:
   ```bash
   pytest
   ```

6. **Start development server**:
   ```bash
   python main.py
   ```

### Frontend Development Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run tauri dev
   ```

### Development Workflow

1. **Keep your fork updated**:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** and commit regularly
4. **Push to your fork** and create a pull request

## Code Guidelines

### Python (Backend)

#### Style and Formatting
- **Code formatter**: Black with line length 88
- **Import sorting**: isort
- **Linting**: flake8
- **Type hints**: Use type annotations for all functions

```python
# Example: Good Python code style
from typing import Dict, List, Optional

import asyncio
from dataclasses import dataclass

from llama_cpp import Llama


@dataclass
class InferenceConfig:
    temperature: float = 0.7
    max_tokens: int = 512
    top_k: int = 40


async def generate_tokens(
    model: Llama, 
    prompt: str, 
    config: InferenceConfig
) -> List[Dict[str, float]]:
    """Generate tokens with logits information.
    
    Args:
        model: The loaded GGUF model
        prompt: Input text prompt
        config: Inference configuration
        
    Returns:
        List of token and logit information
    """
    # Implementation here
    pass
```

#### Testing
- Write tests for all new functionality
- Use pytest for testing framework
- Aim for high test coverage
- Include both unit and integration tests

```python
# Example: Test structure
import pytest
from unittest.mock import Mock

from inferno.inference.engine import InferenceEngine


@pytest.fixture
def mock_model():
    return Mock()


@pytest.fixture
def inference_engine(mock_model):
    return InferenceEngine(mock_model)


def test_token_generation(inference_engine, mock_model):
    # Test implementation
    pass


@pytest.mark.asyncio
async def test_streaming_inference(inference_engine):
    # Async test implementation
    pass
```

#### Error Handling
- Use specific exception types
- Provide clear error messages
- Handle edge cases gracefully
- Log important events and errors

```python
# Example: Good error handling
class ModelLoadError(Exception):
    """Raised when model fails to load."""
    pass


def load_model(path: str) -> Llama:
    try:
        if not path.endswith('.gguf'):
            raise ModelLoadError(f"Invalid model format: {path}")
        
        model = Llama(model_path=path)
        return model
    except Exception as e:
        logger.error(f"Failed to load model {path}: {e}")
        raise ModelLoadError(f"Could not load model: {e}") from e
```

### TypeScript/React (Frontend)

#### Style and Formatting
- **Code formatter**: Prettier
- **Linting**: ESLint with TypeScript rules
- **Type safety**: Strict TypeScript configuration

```typescript
// Example: Good TypeScript/React code style
import React, { useState, useEffect, useCallback } from 'react';

interface TokenVisualizationProps {
  tokens: Token[];
  onTokenClick?: (token: Token) => void;
  highlightIndex?: number;
}

interface Token {
  text: string;
  logits: number[];
  timestamp: number;
  confidence: number;
}

export const TokenVisualization: React.FC<TokenVisualizationProps> = ({
  tokens,
  onTokenClick,
  highlightIndex
}) => {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  const handleTokenClick = useCallback((token: Token) => {
    setSelectedToken(token);
    onTokenClick?.(token);
  }, [onTokenClick]);

  useEffect(() => {
    // Effect logic here
  }, [tokens]);

  return (
    <div className="token-visualization">
      {tokens.map((token, index) => (
        <TokenDisplay
          key={`${token.timestamp}-${index}`}
          token={token}
          isHighlighted={index === highlightIndex}
          onClick={() => handleTokenClick(token)}
        />
      ))}
    </div>
  );
};
```

#### Component Guidelines
- Use functional components with hooks
- Implement proper TypeScript interfaces
- Handle loading and error states
- Optimize for performance with React.memo, useMemo, useCallback

#### State Management
- Use React hooks for local state
- Consider context for shared state
- Implement proper error boundaries
- Handle async operations correctly

### Documentation

#### Code Comments
- Comment complex logic and algorithms
- Explain "why" not just "what"
- Keep comments up to date with code changes
- Use docstrings for functions and classes

#### API Documentation
- Document all public functions and classes
- Include parameter types and return values
- Provide usage examples
- Document error conditions

#### Wiki and Guides
- Write clear, step-by-step instructions
- Include code examples and screenshots
- Test instructions on fresh installations
- Update docs when features change

## Pull Request Process

### Before Submitting

1. **Test your changes**:
   ```bash
   # Backend tests
   cd backend && pytest
   
   # Frontend tests
   cd frontend && npm test
   
   # Integration testing
   # Start backend and frontend, test manually
   ```

2. **Run code quality checks**:
   ```bash
   # Backend
   black backend/
   isort backend/
   flake8 backend/
   
   # Frontend
   cd frontend && npm run lint
   cd frontend && npm run format
   ```

3. **Update documentation** if needed
4. **Write clear commit messages**

### Pull Request Guidelines

#### Title and Description
- Use a clear, descriptive title
- Reference related issues with `Fixes #123` or `Addresses #123`
- Explain what changes were made and why
- Include screenshots for UI changes

#### Example PR Description
```markdown
## Summary
Implements real-time logits visualization for token generation.

## Changes
- Added LogitsVisualization component with D3.js charts
- Updated WebSocket message format to include logits data
- Added logits extraction to inference engine
- Updated backend streaming to send logits with each token

## Testing
- [x] Unit tests pass
- [x] Integration tests with multiple models
- [x] Manual testing with 7B and 13B models
- [x] Performance tested with long sequences

## Screenshots
![Logits Visualization](screenshot.png)

Fixes #45
```

#### Review Process
1. **Automated checks** must pass (tests, linting, build)
2. **Code review** by maintainers
3. **Address feedback** and update as needed
4. **Final approval** and merge

### Commit Message Format

Use conventional commit format:
```
type(scope): brief description

Longer description if needed

Fixes #123
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples**:
```
feat(frontend): add real-time logits visualization

fix(backend): handle model loading errors gracefully

docs(wiki): update installation guide for Windows

test(inference): add unit tests for token generation
```

## Issue Guidelines

### Bug Reports

Use the bug report template and include:
- **Clear title** describing the issue
- **Steps to reproduce** the problem
- **Expected vs actual behavior**
- **System information** (OS, Python version, etc.)
- **Error messages** and stack traces
- **Model information** if relevant

### Feature Requests

Use the feature request template and include:
- **Clear description** of the proposed feature
- **Use case** and motivation
- **Proposed implementation** (if you have ideas)
- **Alternatives considered**
- **Additional context** or mockups

### Good vs Bad Issues

**Good Bug Report**:
```
Title: Model loading fails with "insufficient memory" error on 16GB system

**Description:**
When loading Mistral-7B-Instruct Q4_K_M model on a system with 16GB RAM, 
the application crashes with "RuntimeError: insufficient memory" even though 
system monitor shows 8GB available.

**Steps to reproduce:**
1. Start Inferno backend and frontend
2. Click "Load Model"
3. Select mistral-7b-instruct-v0.1.Q4_K_M.gguf (4.1GB file)
4. Click "Load"

**Expected:** Model loads successfully
**Actual:** Error message and crash

**System:**
- OS: Ubuntu 22.04
- Python: 3.10.8
- RAM: 16GB (8GB available)
- Model file: 4.1GB Q4_K_M quantization

**Error message:**
RuntimeError: Failed to load model: llama_model_load_internal: not enough memory
```

**Bad Bug Report**:
```
Title: Doesn't work

Model won't load. Please fix.
```

## Community Guidelines

### Code of Conduct

Be respectful and inclusive:
- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

### Communication

- **Be clear and concise** in communications
- **Ask questions** if something is unclear
- **Provide context** when reporting issues
- **Be patient** with response times
- **Help others** when you can

### Collaboration

- **Review others' PRs** when possible
- **Share knowledge** and best practices
- **Suggest improvements** constructively
- **Credit contributors** appropriately
- **Welcome newcomers** to the project

## Development Tips

### Debugging

#### Backend Debugging
```bash
# Run with debug logging
PYTHONPATH=. python -m uvicorn main:app --reload --log-level debug

# Use debugger
import pdb; pdb.set_trace()

# Or with ipdb for better interface
import ipdb; ipdb.set_trace()
```

#### Frontend Debugging
- Use browser dev tools (F12 in Tauri app)
- Add console.log statements
- Use React Developer Tools
- Check WebSocket messages in Network tab

### Performance Optimization

#### Backend Performance
- Profile with `cProfile` or `py-spy`
- Monitor memory usage with `memory_profiler`
- Optimize hot paths and loops
- Use async/await for I/O operations

#### Frontend Performance
- Use React.memo for expensive components
- Implement virtualization for large lists
- Optimize re-renders with useMemo/useCallback
- Monitor with React DevTools Profiler

### Testing Strategies

#### Unit Testing
- Test individual functions in isolation
- Mock external dependencies
- Cover edge cases and error conditions
- Aim for high code coverage

#### Integration Testing
- Test component interactions
- Test WebSocket communication
- Test with real models (in CI)
- Test cross-platform compatibility

#### Manual Testing
- Test with different models and sizes
- Test performance with various hardware
- Test UI responsiveness and usability
- Test error handling and edge cases

## Getting Help

If you need help with development:

1. **Check existing documentation** and wiki pages
2. **Search GitHub issues** for similar questions
3. **Ask in GitHub Discussions** for development questions
4. **Join community discussions** (Discord/Slack if available)
5. **Reach out to maintainers** for specific guidance

## Recognition

Contributors will be recognized in:
- **README.md** contributors section
- **GitHub contributors** page
- **Release notes** for significant contributions
- **Hall of fame** for major contributors

Thank you for contributing to Inferno! Your help makes this project better for everyone. 🚀