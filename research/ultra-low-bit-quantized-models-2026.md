# Research: ultra-low-bit-quantized-models-2026

**Date:** 2026-03-22  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://huggingface.co/models?search=1bit&sort=trending, https://huggingface.co/models?search=bitnet&sort=trending, https://huggingface.co/bartowski, https://huggingface.co/unsloth, https://huggingface.co/microsoft/BitNet-b1.58-2B-4T, https://raw.githubusercontent.com/ggerganov/llama.cpp/master/docs/quantization.md

---

Date: 2026-03-22

## Summary
This research surveys ultra-low-bit quantized LLMs available on HuggingFace, focusing on 1-bit, 2-bit, and 3-bit models suitable for consumer hardware. Microsoft's BitNet b1.58 2B4T stands out as a native 1-bit LLM demonstrating performance comparable to full-precision models of similar size, with a GGUF variant for CPU inference. Unsloth AI offers GGUF quantizations, including 3-bit models, with claims of "superior accuracy & SOTA quantization performance," and also provides ultra-low-bit vision models. While GGUF is a prominent format, the content does not provide direct comparisons of quality between GGUF, EXL2, and HQQ at these bit depths. Running these models is supported by `bitnet.cpp` for BitNet and generally by GGUF-compatible runtimes, though specific `llama.cpp` flags or detailed Ollama/ExLlamaV2 support are not provided in the given content.

## 1. What are the best 1/2/3-bit models on HuggingFace right now that actually perform well?

Based on the provided content:

*   **Microsoft BitNet b1.58 2B4T**: This is highlighted as "the first open-source, native 1-bit Large Language Model (LLM) at the 2-billion parameter scale, developed by Microsoft Research." It is explicitly stated that this model "demonstrates that native 1-bit LLMs can achieve performance comparable to leading open-weight, full-precision models of similar size." This suggests it performs well for a 1-bit model.
    *   HuggingFace model: `microsoft/BitNet-b1.58-2B-4T`
*   **Unsloth Dynamic 2.0 Quants**: Unsloth AI claims "superior accuracy & SOTA quantization performance" for their Dynamic 2.0 GGUF + Quants. While specific bit depths (1, 2, 3-bit) are not universally listed for all models, the `unsloth/Qwen3.5-35B-A3B-GGUF` model explicitly indicates an "A3B" (3-bit) quantization. Other Unsloth GGUF models are also available, such as `unsloth/Qwen3.5-9B-GGUF` and `unsloth/Qwen3.5-27B-GGUF`, which are likely to include ultra-low bit depth options given the context of "Dynamic 2.0 Quants."

The content does not provide explicit "best" models for 2-bit or other 3-bit models beyond the `A3B` example, nor does it offer a comprehensive comparison of model performance across different ultra-low bit depths.

## 2. Which quantization formats (GGUF IQ1/IQ2/IQ3, EXL2, HQQ) give best quality at ultra-low bit depth?

The provided content mentions GGUF as a quantization format for both BitNet b1.58 and Unsloth models.
*   `microsoft/BitNet-b1.58-2B-4T-gguf` is available.
*   Unsloth AI's "Unsloth Dynamic 2.0 Quants" are described as "Dynamic GGUF + Quants" and claim to achieve "superior accuracy & SOTA quantization performance."

The content does not provide information or comparisons regarding EXL2 or HQQ formats, nor does it explicitly compare the quality of GGUF IQ1/IQ2/IQ3 against each other or other formats at ultra-low bit depths. It only states Unsloth's GGUF quants achieve "superior accuracy & SOTA quantization performance" in general.

## 3. What's the minimum hardware needed to run a capable model? Can a modern laptop CPU do it?

Yes, a modern laptop CPU can run capable ultra-low-bit models.
*   The `microsoft/BitNet-b1.58-2B-4T-gguf` model is explicitly stated to be "compatible with the bitnet.cpp library for CPU inference." This confirms that a CPU is sufficient for running this 1-bit model.
*   The research goal also mentions "consumer hardware (8GB VRAM or laptop CPU/RAM)," implying that models running on laptop CPU/RAM are a target.

The content does not specify minimum RAM or CPU core requirements, but the existence of CPU-compatible GGUF models indicates that dedicated GPU VRAM is not strictly necessary for all ultra-low-bit models.

## 4. How does BitNet b1.58 compare to post-hoc quantized models at the same bit depth?

The `microsoft/BitNet-b1.58-2B-4T` is described as a "native 1-bit Large Language Model (LLM)." Its technical report (arxiv:2504.12285) is titled "BitNet b1.58 2B4T Technical Report," and the model "demonstrates that native 1-bit LLMs can achieve performance comparable to leading open-weight, full-precision models of similar size."

The provided content **does not directly compare BitNet b1.58 to *post-hoc quantized models* at the same bit depth.** It compares BitNet b1.58 to *full-precision models* of similar size. Therefore, a direct comparison as requested cannot be made from the given information.

## 5. Are there vision models available at ultra-low bit depth?

Yes, there are vision models available that are likely at ultra-low bit depths, primarily from Unsloth AI.
*   Unsloth AI's models, such as `unsloth/Qwen3.5-35B-A3B-GGUF`, `unsloth/Qwen3.5-9B-GGUF`, and `unsloth/Qwen3.5-27B-GGUF`, have the `pipeline_tag: "image-text-to-text"`. This indicates they are multi-modal models capable of handling image inputs, which are vision models. The `A3B` in one model name suggests a 3-bit quantization.
*   Unsloth also has a collection titled "Unsloth Diffusion GGUFs" which mentions "diffusion based models like Qwen-Image and FLUX." Diffusion models are a category of generative vision models. While the specific bit depths for all models in this collection are not detailed, the context of "ultra-low-bit-quantized-models" and "Unsloth Diffusion GGUFs" suggests they would include such variants.

## 6. What are the recommended tools/runtimes for running these (llama.cpp flags, Ollama support, ExLlamaV2)?

Based on the provided content:
*   **BitNet b1.58**: The `microsoft/BitNet-b1.58-2B-4T` model can be used with:
    *   `transformers` library (as indicated by "How to Use (with `transformers`)").
    *   `bitnet.cpp` library for CPU inference (as indicated by "How to Use (with `bitnet.cpp`)").
*   **Unsloth GGUF models**: These are GGUF format models. GGUF models are generally compatible with `llama.cpp` and `Ollama`.
    *   Unsloth mentions "Run and train models locally with the 🦥 Unsloth Studio web UI," which likely integrates with GGUF runtimes.

The provided content **does not offer specific `llama.cpp` flags, detailed Ollama support, or any information regarding ExLlamaV2** for running these ultra-low-bit models. The link to `ggerganov/llama.cpp/master/docs/quantization.md` resulted in a `FETCH ERROR: HTTP Error 404: Not Found`, preventing access to `llama.cpp` specific details.

## Gaps / Follow-up
1.  **Specific Bit Depths for Unsloth Models**: While Unsloth's `Qwen3.5-35B-A3B-GGUF` is explicitly 3-bit, the exact 1-bit, 2-bit, and other 3-bit variants for other Unsloth models (e.g., `Qwen3.5-9B-GGUF`, `Qwen3.5-27B-GGUF`, or diffusion models) are not specified in the provided content.
2.  **Quality Comparison of Quantization Formats**: The content lacks a direct comparison of quality and performance tradeoffs between GGUF (IQ1/IQ2/IQ3), EXL2, and HQQ at ultra-low bit depths.
3.  **Minimum Hardware Specifications**: While CPU inference is confirmed, specific minimum RAM, CPU core count, or VRAM (for GPU-accelerated inference if applicable) for different model sizes at ultra-low bit depths are not provided.
4.  **`llama.cpp` Flags and Ollama/ExLlamaV2 Details**: Specific command-line flags for `llama.cpp`, detailed instructions or support status for Ollama, and any information about ExLlamaV2 for these ultra-low-bit models are missing.
5.  **Performance vs. Quality Tradeoffs**: Beyond general statements, detailed benchmarks or comparative analyses of performance versus quality at 1-bit, 2-bit, and 3-bit depths across different models are not available.

## Relevant Code/API Snippets
*   **BitNet b1.58 `transformers` usage (conceptual, no actual code provided in content):**
    ```python
    # Example usage with transformers (as indicated by the model card)
    # from transformers import AutoModelForCausalLM, AutoTokenizer
    # model = AutoModelForCausalLM.from_pretrained("microsoft/BitNet-b1.58-2B-4T")
    # tokenizer = AutoTokenizer.from_pretrained("microsoft/BitNet-b1.58-2B-4T")
    # ...
    ```
*   **BitNet b1.58 `bitnet.cpp` usage (conceptual, no actual code provided in content):**
    ```bash
    # Example usage with bitnet.cpp (as indicated by the model card)
    # ./bitnet --model microsoft/bitnet-b1.58-2B-4T-gguf.bin --prompt "Hello, world!"
    # ...
    ```
*   **Unsloth GGUF models (conceptual, no actual code provided in content):**
    ```bash
    # Example usage with llama.cpp (for GGUF models)
    # ./main -m unsloth/Qwen3.5-35B-A3B-GGUF.gguf -p "What is the capital of France?"
    # Example usage with Ollama (for GGUF models)
    # ollama run unsloth/qwen3.5-35b-a3b-gguf "What is the capital of France?"
    ```