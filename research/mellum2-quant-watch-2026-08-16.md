# Research: mellum2-quant-watch-2026-08-16

**Date:** 2026-08-16
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Research Findings Document

**ID:** mellum2-quant-watch-2026-08-16
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

As of 2026-08-16, a comprehensive search of the Hugging Face API for community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) from specified trusted publishers within the last 24 hours (i.e., since 2026-08-15 08:16:00Z) yielded no new results. All identified Mellum2 model variants and their quantized versions from both JetBrains and other community members were last modified prior to the 24-hour reporting window.

Specifically, no new GGUF (Q4_K_M, Q5_K_M, Q3_K_M, Q6_K, Q8_0), AWQ 4-bit, GPTQ 4-bit, ExLlamaV2 / EXL2, or MLX quantized models were found from `bartowski`, `unsloth`, `mradermacher`, `MaziyarPanahi`, `TheBloke`, `QuantFactory`, or `lmstudio-community` within the specified timeframe.

### Key Findings

1.  **No New Quantized Models in Last 24 Hours:** No models matching the search criteria (`Mellum2` in model ID or tags) were found to have a `lastModified` timestamp within the last 24 hours (2026-08-15 08:16:00Z to 2026-08-16 08:16:00Z). The most recently modified model in the provided API output was `JetBrains/Mellum2-12B-A2.5B-Thinking-SFT` with a `lastModified` date of `2026-08-13T10:20:54.000Z`, which falls outside the reporting window.
2.  **Existing Quantized Models (Older):** The API search returned several existing quantized Mellum2 models, but all were published or last modified well before the 24-hour window. Examples include:
    *   `JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q8_0` (last modified 2026-06-04)
    *   `bartowski/Mellum2-12B-A2.5B-Instruct-GGUF` (last modified 2026-06-10)
    *   `mlx-community/Mellum2-12B-A2.5B-Instruct-4bit` (last modified 2026-08-11)
3.  **Publisher Filtering:** While some older quantized models were found from publishers not on the trusted list (e.g., `mlx-community`, `NANI-Nithin`, `jedisct1`), none of these were within the 24-hour window anyway.
4.  **Model Variants Covered:** The search encompassed potential quantizations of `Thinking`, `Instruct`, and `Base` variants of the Mellum2-12B-A2.5B model family.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    *   No. Based on the provided Hugging Face API data, no new community-quantized Mellum2-12B-A2.5B model variants from trusted publishers have been published or updated within the last 24 hours.

### Gaps / Follow-up

1.  **API Response Truncation:** The provided `https://huggingface.co/api/models?search=Mellum2&full=true` source content indicates a `FETCH ERROR` at the end. While the JSON array appears to be syntactically complete up to the last entry, it's possible that additional, more recent models were not included in the provided snippet due to this error. A full, untruncated API response would ensure complete coverage.
2.  **File Size Information in API:** The current API output (specifically the `siblings` array) only lists filenames, not their sizes. If a new quant were to be found, an additional API call or parsing of the model card would be required to determine the file sizes for VRAM compatibility.
3.  **Quality Regression Reporting:** No quality regression information was available in the provided API output for any of the models. This information would typically be found in the model card (`README.md`) if a new quant were released.

### Relevant Code/API Snippets

The primary API endpoint used for this research:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example structure of a model entry from the API response (illustrative, as no new models were found):
```json
{
  "_id": "...",
  "id": "JetBrains/Mellum2-12B-A2.5B-Thinking",
  "author": "JetBrains",
  "gated": false,
  "lastModified": "2026-08-13T10:20:47.000Z", // Key field for 24h check
  "likes": 331,
  "trendingScore": 2,
  "private": false,
  "sha": "a7311550557e93cc706ab5dd3d879c1a11703ab4",
  "downloads": 5089,
  "tags": ["transformers", "safetensors", "mellum", "text-generation", "conversational", "en", "arxiv:2605.31268", "license:apache-2.0", "model-index", "eval-results", "endpoints_compatible", "deploy:sagemaker", "region:us"],
  "pipeline_tag": "text-generation",
  "library_name": "transformers",
  "createdAt": "2026-05-26T09:12:25.000Z",
  "modelId": "JetBrains/Mellum2-12B-A2.5B-Thinking",
  "siblings": [
    {"rfilename":".eval_results/mellum2.yaml"},
    {"rfilename":"README.md"},
    {"rfilename":"model-00001-of-00005.safetensors"} // File list for size estimation
  ]
}
```

---
**Digest:** no drops today
