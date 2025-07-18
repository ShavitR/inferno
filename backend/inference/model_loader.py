"""
Model loader and inference logic for GGUF LLMs.
"""

class ModelLoader:
    def __init__(self, model_path: str):
        """Load GGUF model from the given path."""
        pass

    def infer(self, prompt: str):
        """Run inference on the prompt, yield tokens and logits step-by-step."""
        yield from () 