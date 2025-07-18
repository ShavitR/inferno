# Inferno Wiki

This directory contains the comprehensive wiki documentation for Inferno, a local LLM debugger and visualizer.

## Wiki Structure

The wiki is organized into several categories:

### 🚀 Getting Started
- **[Home](Home.md)** - Main wiki landing page with navigation
- **[Installation](Installation.md)** - Complete installation guide
- **[Getting Started](Getting-Started.md)** - First steps with Inferno
- **[FAQ](FAQ.md)** - Frequently asked questions

### 📚 Core Concepts
- **[Understanding LLM Inference](Understanding-LLM-Inference.md)** - How LLMs work and what Inferno shows
- **[GGUF Models](GGUF-Models.md)** - Working with GGUF format models
- **[Token Visualization](Token-Visualization.md)** - Understanding token streams (planned)

### 🛠️ Technical Documentation
- **[Architecture](Architecture.md)** - Detailed system architecture
- **[API Reference](API-Reference.md)** - Backend API docs (planned)
- **[Configuration](Configuration.md)** - Customization options (planned)

### 📖 Guides & Tutorials
- **[Model Loading](Model-Loading.md)** - Model management guide (planned)
- **[Debugging Prompts](Debugging-Prompts.md)** - Prompt engineering techniques (planned)
- **[Visualization Features](Visualization-Features.md)** - Using visualizations effectively (planned)
- **[Performance Optimization](Performance-Optimization.md)** - Getting best performance (planned)

### 👨‍💻 Development
- **[Contributing](Contributing.md)** - Comprehensive contribution guide
- **[Development Setup](Development-Setup.md)** - Dev environment setup (planned)
- **[Building from Source](Building-from-Source.md)** - Compilation guide (planned)
- **[Testing](Testing.md)** - Testing procedures (planned)

### 🔧 Troubleshooting
- **[Common Issues](Common-Issues.md)** - Solutions to frequent problems
- **[Error Messages](Error-Messages.md)** - Error explanations (planned)

## Contributing to the Wiki

### Wiki Structure Guidelines

1. **File Naming**: Use kebab-case for file names (e.g., `Getting-Started.md`)
2. **Internal Links**: Use relative links to other wiki pages: `[Page Name](Page-Name.md)`
3. **External Links**: Use full URLs for external resources
4. **Images**: Store in `images/` subdirectory (create if needed)

### Writing Guidelines

1. **Clear Headings**: Use descriptive section headers
2. **Code Examples**: Include practical, tested examples
3. **Cross-References**: Link to related wiki pages
4. **Screenshots**: Include visual aids where helpful
5. **Keep Updated**: Ensure information stays current

### Content Standards

- **Accuracy**: All technical information must be correct
- **Completeness**: Cover topics thoroughly
- **Clarity**: Write for users of all experience levels
- **Examples**: Provide concrete, working examples
- **Testing**: Verify all instructions work on fresh installations

### Adding New Pages

1. Create the markdown file in the `wiki/` directory
2. Add entry to the main [Home.md](Home.md) navigation
3. Link from relevant existing pages
4. Follow the established format and style
5. Test all instructions and code examples

### Markdown Conventions

#### Headers
```markdown
# Page Title (H1 - only one per page)
## Major Section (H2)
### Subsection (H3)
#### Details (H4)
```

#### Code Blocks
```markdown
# Bash commands
```bash
cd backend
python main.py
```

# Python code
```python
def example_function():
    return "Hello, World!"
```

# Configuration files
```json
{
  "temperature": 0.7,
  "max_tokens": 512
}
```
```

#### Links and References
```markdown
# Internal wiki links
[Installation Guide](Installation.md)

# External links
[Hugging Face](https://huggingface.co/)

# Anchor links within page
[Go to Section](#section-name)
```

#### Lists and Tables
```markdown
# Bulleted lists
- First item
- Second item
  - Nested item

# Numbered lists
1. First step
2. Second step

# Tables
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Value 1  | Value 2  | Value 3  |
```

#### Callouts and Emphasis
```markdown
> **Note**: Important information for users

**Bold text** for emphasis
*Italic text* for subtle emphasis
`code snippets` for commands or filenames
```

## Wiki Maintenance

### Regular Updates
- Review accuracy of installation instructions
- Update model recommendations as new models are released
- Verify links and references
- Update screenshots and examples

### Version Compatibility
- Mark content with version requirements where relevant
- Update breaking changes and migration guides
- Maintain backward compatibility information

### Quality Assurance
- Test all code examples and instructions
- Verify links work correctly
- Ensure consistent formatting and style
- Check for typos and grammar errors

## Local Development

To work on the wiki locally:

1. **Edit files** in the `wiki/` directory
2. **Preview markdown** using your editor or:
   ```bash
   # Using grip (GitHub-flavored markdown)
   pip install grip
   grip wiki/Home.md
   ```
3. **Test links** and verify formatting
4. **Commit changes** following project guidelines

## Deployment

This wiki can be deployed to:
- **GitHub Pages** (automatic from repository)
- **GitHub Wiki** (manual sync)
- **Documentation sites** (GitBook, Notion, etc.)
- **Static site generators** (Jekyll, Hugo, etc.)

The markdown files are designed to work with any markdown-compatible documentation platform.

## Help and Support

For wiki-related questions:
- **General questions**: Use [GitHub Discussions](https://github.com/ShavitR/inferno/discussions)
- **Content issues**: Open an [issue](https://github.com/ShavitR/inferno/issues)
- **Contributions**: Follow the [Contributing Guide](Contributing.md)

---

**Happy documenting!** 📚✨