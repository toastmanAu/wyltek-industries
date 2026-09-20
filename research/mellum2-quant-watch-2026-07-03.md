# Research: mellum2-quant-watch-2026-07-03

**Date:** 2026-07-03
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Wyltek Industries - Technical Research Findings

**Research Task ID:** mellum2-quant-watch-2026-07-03
**Date of Report:** 2026-07-03

### Summary

This research was conducted to identify any newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) on Hugging Face within the last 24 hours. The search prioritized GGUF (Q4_K_M, Q5_K_M, Q3_K_M, Q6_K, Q8_0), followed by AWQ 4-bit, GPTQ 4-bit, ExLlamaV2/EXL2, and MLX formats, specifically targeting variants suitable for 8GB VRAM (approx. 6GB weights). Trusted publishers were also considered.

A direct query to the Hugging Face API for "Mellum2" models was performed. After analyzing the `lastModified` timestamps of all returned models, it was determined that no new community-quantized Mellum2-12B-A2.5B models from the specified variants or trusted publishers have been uploaded or modified on Hugging Face within the last 24 hours (relative to 2026-07-03).

### Key Findings

1.  **No New Quants Found:** No community-quantized versions of JetBrains Mellum2-12B-A2.5B (Thinking, Instruct, Base) models were found to have been published or updated on Hugging Face within the last 24 hours. All models returned by the API query had `lastModified` timestamps prior to 2026-07-02.
2.  **Existing Quantizations (Out of Scope for "New"):** The Hugging Face API search returned several existing quantized Mellum2 models, primarily in GGUF and MLX formats. These include:
    *   `jedisct1/Mellum2-12B-A2.5B-Thinking-mlx-4bit` (MLX 4-bit, Thinking variant, last modified 2026-06-02)
    *   `jedisct1/Mellum2-12B-A2.5B-Instruct-mlx-4bit` (MLX 4-bit, Instruct variant, last modified 2026-06-02)
    *   `yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF` (GGUF, Thinking variant, last modified 2026-06-09, contains Q2_K, Q4_K_M, Q6_K, Q8_0)
    *   `bartowski/Mellum2-12B-A2.5B-Thinking-GGUF` (GGUF, Thinking variant, last modified 2026-06-10, contains various GGUF quants including Q3_K_M, Q4_K_M, Q5_K_M, Q6_K, Q8_0)
    *   `RedHatAI/Mellum2-12B-A2.5B-Thinking-FP8-Dynamic` (FP8, Thinking variant, last modified 2026-06-12)
3.  **VRAM Compatibility Analysis (Hypothetical for new quants):**
    *   A 12B model in Q4_K_M GGUF or 4-bit AWQ/GPTQ/MLX/FP8 formats would typically result in a model size of approximately 6GB (12 billion parameters * 0.5 bytes/parameter), fitting the 8GB VRAM requirement with sufficient room for KV cache.
    *   Q3_K_M GGUF would be even smaller (~4.5GB), offering more KV cache headroom.
    *   Q5_K_M GGUF (~7.5GB) and Q6_K GGUF (~9GB) would likely exceed the ~6GB weight target for comfortable 8GB VRAM usage.
    *   Q8_0 GGUF (~12GB) would not fit an 8GB VRAM card.
4.  **Publisher Status:** While `bartowski` is a trusted publisher and has Mellum2 GGUF quants, these were not updated within the last 24 hours. No other specified trusted publishers (`unsloth`, `mradermacher`, `MaziyarPanahi`, `TheBloke`, `QuantFactory`, `lmstudio-community`) were identified as authors of Mellum2 models in the provided API response.

### Questions Answered

**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

**Answer:** No, a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has not been published or updated on Hugging Face in the last 24 hours (as of 2026-07-03).

**Digest:** no drops today

### Gaps / Follow-up

1.  **Full API Access:** The provided source content for `https://huggingface.co/models?search=mellum2&sort=createdAt` and individual publisher profiles (`/bartowski`, `/unsloth`, etc.) resulted in `FETCH ERROR`. While the primary API endpoint `https://huggingface.co/api/models?search=Mellum2&full=true` was accessible and sufficient for the immediate task, ensuring full API access for all specified endpoints would provide a more robust and comprehensive search capability for future tasks.
2.  **Precise "Last 24h" Definition:** The current interpretation assumes "last 24h" relative to the report date (2026-07-03). For future tasks, specifying the exact "current time" (e.g., `2026-07-03T14:30:00Z`) would allow for more precise filtering of `lastModified` timestamps.
3.  **Quality Regression Data:** The task requested reporting "any reported quality regression vs base BF16". While this information would typically be found in model cards or discussions, no new models were found, thus no such data was extracted. If new quants are found in the future, a systematic approach to extract this qualitative data from model cards or linked discussions should be established.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```

This endpoint returns a JSON array of model objects, each containing metadata such as `id`, `author`, `lastModified`, `tags`, and `siblings` (file list).

**Example of a model entry structure (simplified for relevance):**
```json
[
  {
    "_id": "6a1563f96ea5882878c82ed4",
    "id": "JetBrains/Mellum2-12B-A2.5B-Thinking",
    "author": "JetBrains",
    "lastModified": "2026-06-12T10:46:19.000Z",
    "tags": ["transformers", "safetensors", "mellum", "text-generation", "conversational", "en", "arxiv:2605.31268", "license:apache-2.0", "model-index", "eval-results", "endpoints_compatible", "region:us"],
    "siblings": [
      {"rfilename": "model-00001-of-00005.safetensors"},
      // ... other files
    ]
  },
  {
    "_id": "6a29a84d5c01dc6038097410",
    "id": "bartowski/Mellum2-12B-A2.5B-Thinking-GGUF",
    "author": "bartowski",
    "lastModified": "2026-06-10T20:27:21.000Z",
    "tags": ["gguf", "text-generation", "en", "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking", "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Thinking", "license:apache-2.0", "model-index", "endpoints_compatible", "region:us", "conversational"],
    "siblings": [
      {"rfilename": "Mellum2-12B-A2.5B-Thinking-Q4_K_M.gguf"},
      {"rfilename": "Mellum2-12B-A2.5B-Thinking-Q5_K_M.gguf"},
      {"rfilename": "Mellum2-12B-A2.5B-Thinking-Q3_K_M.gguf"},
      {"rfilename": "Mellum2-12B-A2.5B-Thinking-Q6_K.gguf"},
      {"rfilename": "Mellum2-12B-A2.5B-Thinking-Q8_0.gguf"},
      // ... other GGUF variants
    ]
  }
]
```
