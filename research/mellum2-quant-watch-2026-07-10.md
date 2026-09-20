# Research: mellum2-quant-watch-2026-07-10

**Date:** 2026-07-10
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Mellum2 Quantized Model Watch - 2026-07-10

**Research Task ID:** mellum2-quant-watch-2026-07-10
**Goal:** Check for community-quantized versions of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) published to Hugging Face in the last 24 hours.

---

### Summary

As of 2026-07-10, no new community-quantized versions of the JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) from the specified trusted publishers have been identified on Hugging Face within the last 24-hour period. All models found via the Hugging Face API search for "Mellum2" have `lastModified` timestamps prior to July 9, 2026.

The search prioritized GGUF (Q4_K_M, Q5_K_M, Q3_K_M, Q6_K, Q8_0), followed by AWQ 4-bit, GPTQ 4-bit, ExLlamaV2 / EXL2, and MLX formats. Trusted publishers included bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, and lmstudio-community. No new releases matching these criteria were observed.

### Key Findings

1.  **No New Quants in Last 24h:** A comprehensive search of the Hugging Face API for "Mellum2" models revealed no new community-quantized releases from the list of trusted publishers with a `lastModified` timestamp within the last 24 hours (i.e., from 2026-07-09 onwards).
2.  **Existing Quantized Models (Older):** The API response listed several quantized Mellum2 models, primarily in GGUF and MLX formats. However, their `lastModified` dates range from early to mid-June 2026, falling outside the specified 24-hour window.
    *   Examples of older GGUF quants:
        *   `yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF` (not a trusted publisher, last modified 2026-06-09)
        *   `JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M` (JetBrains is not a *community* quantizer, last modified 2026-06-04)
        *   `mradermacher/Mellum2-12B-A2.5B-Thinking-GGUF` (trusted publisher, last modified 2026-06-05)
        *   `mradermacher/Mellum2-12B-A2.5B-Instruct-i1-GGUF` (trusted publisher, last modified 2026-06-05)
    *   Examples of older MLX quants:
        *   `jedisct1/Mellum2-12B-A2.5B-Thinking-mlx-8bit` (not a trusted publisher, last modified 2026-06-02)
        *   `jedisct1/Mellum2-12B-A2.5B-Thinking-mlx-4bit` (not a trusted publisher, last modified 2026-06-02)
3.  **Publisher Verification:** Only `mradermacher` from the trusted list had published Mellum2 quants, but these were all older than the 24-hour target window. No models from `bartowski`, `unsloth`, `MaziyarPanahi`, `TheBloke`, `QuantFactory`, or `lmstudio-community` were found in the API response for Mellum2.
4.  **File Size Considerations:** While no new quants were found, the existing GGUF Q4_K_M variants (approx. 6GB) would fit the 8GB VRAM requirement for an RTX 3060 Ti, leaving room for KV cache.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?** No.
*   **Target quant formats in priority order:** No new quants were found in any of the specified formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX).
*   **Trusted publishers:** No new quants were found from `bartowski`, `unsloth`, `mradermacher`, `MaziyarPanahi`, `TheBloke`, `QuantFactory`, or `lmstudio-community` within the timeframe.

### Gaps / Follow-up

1.  **Hugging Face API Rate Limits/Completeness:** Confirm if the single API call `https://huggingface.co/api/models?search=Mellum2&full=true` provides an exhaustive list of *all* relevant models, or if pagination or more targeted searches (e.g., by tag `gguf` or by publisher) would be necessary for a truly exhaustive search. The `full=true` parameter usually indicates more detailed information, but not necessarily all models if the search term is too broad or narrow.
2.  **Definition of "Community-Quantized":** Clarify if official JetBrains quantized models (e.g., `JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M`) should be considered "community-quantized" or if the intent is strictly for third-party quantizers. For this report, I adhered to the explicit list of trusted *community* publishers.
3.  **Access to `~/.claude/shared/research-findings/`:** Without access to previous research findings, it's impossible to definitively "skip already-known repos." This report assumes all models in the provided API response are "known" if their `lastModified` date is outside the 24h window. If a model *was* updated within 24h but was previously reported, it would still be flagged as "new" by this method.

### Relevant Code/API Snippets

The primary API endpoint used for this research:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```

Example structure of a model entry from the API response, showing `lastModified` and `siblings` for file inspection:

```json
{
  "_id": "6a15633edc2400cb0346a317",
  "id": "JetBrains/Mellum2-12B-A2.5B-Instruct",
  "author": "JetBrains",
  "gated": false,
  "lastModified": "2026-06-12T10:46:44.000Z", // Key timestamp for 24h check
  "likes": 82,
  "trendingScore": 4,
  "private": false,
  "sha": "717997f0f5913a53cdb45931a358fab62da3c937",
  "downloads": 7087,
  "tags": ["transformers", "safetensors", "mellum", "text-generation", "conversational", "en", "arxiv:2605.31268", "license:apache-2.0", "model-index", "eval-results", "endpoints_compatible", "region:us"],
  "pipeline_tag": "text-generation",
  "library_name": "transformers",
  "createdAt": "2026-05-26T09:09:18.000Z",
  "modelId": "JetBrains/Mellum2-12B-A2.5B-Instruct",
  "siblings": [ // File list to check for quant formats
    { "rfilename": ".eval_results/mellum2.yaml" },
    { "rfilename": "README.md" },
    { "rfilename": "model-00001-of-00005.safetensors" },
    // ... other files, including potential .gguf, .awq, .safetensors (for MLX)
  ]
}
```

---
**Digest:** no drops today
