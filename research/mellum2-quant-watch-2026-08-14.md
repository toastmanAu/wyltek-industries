# Research: mellum2-quant-watch-2026-08-14

**Date:** 2026-08-14
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Wyltek Industries - Technical Research Findings

**ID:** mellum2-quant-watch-2026-08-14
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

As of 2026-08-14, no new community-quantized versions of the JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) have been published to Hugging Face by the specified trusted publishers within the last 24 hours. While some official JetBrains models were recently updated, these were not community-quantized versions in the target formats.

The search covered GGUF (Q4_K_M, Q5_K_M, Q3_K_M, Q6_K, Q8_0), AWQ 4-bit, GPTQ 4-bit, ExLlamaV2/EXL2, and MLX formats from trusted publishers including bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, and lmstudio-community. All identified Mellum2-related models from these publishers or in these formats had `lastModified` timestamps older than the 24-hour window (prior to 2026-08-13T10:20:47.000Z, assuming the current time of the request).

### Key Findings

1.  **No New Community Quants from Trusted Publishers:** A comprehensive scan of Hugging Face models matching "Mellum2" via the API (`https://huggingface.co/api/models?search=Mellum2&full=true`) revealed no new community-quantized models from the specified trusted publishers (`bartowski`, `unsloth`, `mradermacher`, `MaziyarPanahi`, `TheBloke`, `QuantFactory`, `lmstudio-community`) with a `lastModified` timestamp within the last 24 hours (i.e., on or after 2026-08-13T10:20:47.000Z).
2.  **Recent Official Model Updates (Non-Quantized):** The following official JetBrains models were updated within the last 24 hours, but they are the base `transformers` models (using `safetensors`) and not community-quantized versions in the requested formats:
    *   `JetBrains/Mellum2-12B-A2.5B-Thinking` (`lastModified`: "2026-08-13T10:20:47.000Z")
    *   `JetBrains/Mellum2-12B-A2.5B-Instruct-SFT` (`lastModified`: "2026-08-13T10:20:51.000Z")
    *   `JetBrains/Mellum2-12B-A2.5B-Thinking-SFT` (`lastModified`: "2026-08-13T10:20:54.000Z")
    *   `JetBrains/Mellum2-12B-A2.5B-Instruct` (`lastModified`: "2026-08-13T10:20:44.000Z")
3.  **Older Quantized Models Identified:** Several quantized Mellum2 models exist on Hugging Face, but their `lastModified` dates fall outside the 24-hour window, or they are from untrusted publishers. Examples include:
    *   `JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q8_0` (last modified 2026-06-04)
    *   `JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M` (last modified 2026-06-04)
    *   `bartowski/Mellum2-12B-A2.5B-Instruct-GGUF` (last modified 2026-06-10)
    *   `mlx-community/Mellum2-12B-A2.5B-Instruct-4bit` (last modified 2026-08-11)
    *   `mlx-community/Mellum2-12B-A2.5B-Instruct-mxfp4` (last modified 2026-08-11)
4.  **VRAM Fit Analysis (Theoretical):** For an RTX 3060 Ti 8GB (targeting ~6GB weights), the following quantization formats/bit-widths would theoretically fit for a 12B parameter model:
    *   GGUF: Q4_K_M (~6GB), Q3_K_M (~4.5GB)
    *   AWQ 4-bit (~6GB)
    *   GPTQ 4-bit (~6GB)
    *   ExLlamaV2 / EXL2 (typically 4-bit, ~6GB)
    *   MLX 4-bit (~6GB)
    Higher bit-width GGUF quants like Q8_0 (~12GB) or Q6_K (~9GB) would exceed the target VRAM.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    *   No, based on the provided API data and the specified criteria (trusted publishers, quantization formats, and `lastModified` timestamp within the last 24 hours of 2026-08-14).

### Gaps / Follow-up

1.  **Full File Size Information:** The provided API output (`full=true`) does not include individual file sizes, only `rfilename` lists. To accurately report "total file size for the smallest variant that fits 8GB VRAM", a more detailed API call per model or parsing of model cards would be required. For this specific task, this was not critical as no new quants were found.
2.  **Quality Regression Data:** No explicit "reported quality regression vs base BF16" information is available directly in the API JSON. This would typically be found within the model cards (README.md files) of individual quantized repositories.
3.  **Prior Research Findings Access:** The instruction to "Do NOT re-report quants seen in previous days — check `~/.claude/shared/research-findings/`" could not be fulfilled as I do not have access to a local filesystem. For future runs, integration with such a system would be necessary to avoid duplicate reporting.
4.  **API Rate Limits/Pagination:** The current API query might be subject to rate limits or pagination for very large result sets. For a more exhaustive search, handling these aspects would be important, though not critical for the current limited scope.
5.  **Alternative Search Methods:** The instruction specified using the HF API directly. Other search methods (e.g., Hugging Face website's "New Models" filter, community forums like r/LocalLLaMA) were attempted but resulted in fetch errors or HTML content not suitable for direct data extraction. Ensuring robust access to these sources could provide a broader view.

### Relevant Code/API Snippets

The primary API endpoint used for this research:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```

Example structure of a relevant model entry from the API response (hypothetical, if one were found):

```json
{
  "_id": "...",
  "id": "trusted_publisher/Mellum2-12B-A2.5B-Instruct-Q4_K_M",
  "author": "trusted_publisher",
  "gated": false,
  "lastModified": "2026-08-14T05:30:00.000Z", // Example: within last 24h
  "likes": 123,
  "trendingScore": 5,
  "private": false,
  "sha": "...",
  "downloads": 4567,
  "tags": ["gguf", "llama.cpp", "quantized", "instruct", "q4_k_m", "base_model:JetBrains/Mellum2-12B-A2.5B-Instruct", "license:apache-2.0"],
  "pipeline_tag": "text-generation",
  "library_name": "gguf",
  "createdAt": "2026-08-14T01:00:00.000Z",
  "modelId": "trusted_publisher/Mellum2-12B-A2.5B-Instruct-Q4_K_M",
  "siblings": [
    {"rfilename": ".gitattributes"},
    {"rfilename": "Mellum2-12B-A2.5B-Instruct-Q4_K_M.gguf"}, // File of interest
    {"rfilename": "README.md"}
  ]
}
```
