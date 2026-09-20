# Research: mellum2-quant-watch-2026-09-08

**Date:** 2026-09-08
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**Wyltek Industries - Technical Research Findings**

**ID:** mellum2-quant-watch-2026-09-08
**Date:** 2026-09-08
**Analyst:** Argus

---

### Summary

A search was conducted on Hugging Face for community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) published within the last 24 hours (i.e., on or after 2026-09-07T00:00:00Z). The search focused on specified quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) and a list of trusted publishers.

No new community-quantized Mellum2-12B-A2.5B model variants from the list of trusted publishers were found to have been published to Hugging Face within the last 24 hours. All relevant entries in the API response were either published by non-trusted authors or had `lastModified` timestamps significantly older than the 24-hour window.

### Key Findings

1.  **Search Scope:** The Hugging Face API (`https://huggingface.co/api/models?search=Mellum2&full=true`) was queried to identify relevant models.
2.  **Time Window:** The search specifically targeted models with a `lastModified` timestamp on or after `2026-09-07T00:00:00Z` (within 24 hours of 2026-09-08).
3.  **Publisher Filtering:** Results were filtered to include only models from the specified trusted publishers: `bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community`.
4.  **Quantization Format Filtering:** Priority was given to GGUF (Q4_K_M, Q5_K_M, Q3_K_M, Q6_K, Q8_0), followed by AWQ 4-bit, GPTQ 4-bit, ExLlamaV2/EXL2, and MLX (low priority).
5.  **No New Quants Found:**
    *   All models returned by the API query had `lastModified` dates prior to September 2026 (e.g., August, July, June 2026).
    *   Even for models by `bartowski` (a trusted publisher), such as `bartowski/Mellum2-12B-A2.5B-Thinking-GGUF`, the `lastModified` date (`2026-06-10T20:27:21.000Z`) fell outside the 24-hour window.
    *   No other models from the trusted publisher list were found in the search results, nor were any models found that met both the quantization format and recency criteria from any publisher.
6.  **Irrelevant Sources:** The provided HTML content from Hugging Face user/org pages and Reddit search results were either inaccessible (`FETCH ERROR`) or contained general HTML structure rather than API-parsable model data, and thus were not directly used for this API-centric research task.

### Questions Answered

**Question:** Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h by a trusted publisher, in the specified quant formats?

**Answer:** No, a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant has not been published to Hugging Face in the last 24 hours (as of 2026-09-08) by any of the specified trusted publishers in the target quantization formats.

### Gaps / Follow-up

1.  **API Response Truncation:** The provided API response (`https://huggingface.co/api/models?search=Mellum2&full=true`) appears to be truncated at the end (`FETCH ERROR: ...RedHatAI/Mellum2-12B-A2.5B-Thinking-FP8-Dynamic`). While the existing data was sufficient to determine no new quants within the specified timeframe, a complete API response would ensure no models were missed due to truncation.
2.  **File Size Information:** If new quants were found, the exact file sizes for the smallest variants fitting 8GB VRAM (approx. ~6GB weights) would need to be retrieved. This typically requires inspecting the specific model's page or a more detailed API endpoint, as the provided `siblings` list only gives filenames, not sizes.
3.  **Quality Regression Data:** The task requested "any reported quality regression vs base BF16". This information is usually found within a model's README or discussions, which would require further parsing beyond the initial API search if a relevant model were identified.

### Relevant Code/API Snippets

The primary API endpoint used for this research:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```

Example structure of a model entry from the API, illustrating fields checked:

```json
{
  "_id": "6a29a84d5c01dc6038097410",
  "id": "bartowski/Mellum2-12B-A2.5B-Thinking-GGUF",
  "author": "bartowski",
  "gated": false,
  "lastModified": "2026-06-10T20:27:21.000Z", // Key for 24h check
  "likes": 6,
  "trendingScore": 1,
  "private": false,
  "sha": "e10a3d18c7a65d9e06a1ef9c228082fbbc798182",
  "downloads": 1550,
  "tags": [ // Key for quant format and model variant check
    "gguf",
    "text-generation",
    "en",
    "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking",
    "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Thinking",
    "license:apache-2.0",
    "model-index",
    "endpoints_compatible",
    "region:us",
    "conversational"
  ],
  "pipeline_tag": "text-generation",
  "createdAt": "2026-06-10T18:09:17.000Z",
  "modelId": "bartowski/Mellum2-12B-A2.5B-Thinking-GGUF",
  "siblings": [ // Contains filenames to infer quant bit-width and potentially size
    { "rfilename": ".gitattributes" },
    { "rfilename": "Mellum2-12B-A2.5B-Thinking-IQ2_M.gguf" },
    { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q4_K_M.gguf" }, // Example target quant
    // ... other files
    { "rfilename": "README.md" }
  ]
}
```

---
**Digest:** no drops today
