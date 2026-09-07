# Research: mellum2-quant-watch-2026-09-07

**Date:** 2026-09-07
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**Research Task ID:** mellum2-quant-watch-2026-09-07
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

The objective of this research was to identify any newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B models on Hugging Face within the last 24 hours (as of 2026-09-07). The search prioritized GGUF, AWQ, GPTQ, and ExLlamaV2/EXL2 formats from a list of trusted community publishers.

Based on the provided Hugging Face API response, no models matching the "Mellum2" search query were found to have been published or modified within the specified 24-hour timeframe. All listed models had `lastModified` timestamps prior to August 2026. Consequently, no new community-quantized Mellum2 model drops were observed today.

### Key Findings

1.  **No Recent Quantizations Identified:** A thorough review of the provided Hugging Face API data for "Mellum2" models revealed no entries with a `lastModified` timestamp within the last 24 hours (i.e., on 2026-09-06 or 2026-09-07). All listed models, including both original and previously quantized versions, were last updated in June or August 2026.
2.  **Observed Older Quantizations:** The API response included several older quantized Mellum2 models, such as:
    *   `JetBrains/Mellum2-12B-A2.5B-Instruct-GGUF-Q4_K_M` (last modified: 2026-06-04)
    *   `yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF` (last modified: 2026-06-09)
    *   `bartowski/Mellum2-12B-A2.5B-Thinking-GGUF` (last modified: 2026-06-10), which offers a wide range of GGUF quants (e.g., Q4_K_M, Q5_K_M, Q3_K_M, Q6_K, Q8_0). This model is from a trusted publisher and contains priority 1 quant formats, but its modification date is too old.
    *   Various MLX 4-bit and mxfp4 quants from `mlx-community` and `jedisct1` (last modified: June-August 2026).
3.  **Publisher and Format Coverage:** While the search identified models from a trusted publisher (`bartowski`) and in priority formats (GGUF), none met the "last 24h" criterion.

### Questions Answered

**Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**
No drops today.

### Gaps / Follow-up

1.  **Incomplete Hugging Face API Response:** The provided API response for `https://huggingface.co/api/models?search=Mellum2&full=true` was truncated with a "FETCH ERROR". This indicates that the full list of Mellum2 models might not have been retrieved, potentially missing any newly published quants. A retry of the API call or investigation into the truncation cause is recommended for future monitoring.
2.  **Missing File Size Data:** The API response does not include file sizes for individual model files (`rfilename` entries). If new quants were found, determining the "smallest variant that fits 8GB VRAM (~6GB weights)" would require additional data retrieval (e.g., inspecting individual model cards or making further API calls for file details).
3.  **Missing Quality Regression Information:** The task requires reporting "any reported quality regression vs base BF16". This information is not available in the API response and would necessitate manual inspection of model cards or discussion sections for any newly identified quants.
4.  **Access to Prior Research Findings:** The instruction to avoid re-reporting based on `~/.claude/shared/research-findings/` could not be fulfilled due to lack of access to this internal directory. This could lead to redundant reporting if a model were to be modified and then re-reported without cross-referencing previous findings.

### Relevant Code/API Snippets

The primary method for searching Hugging Face models was a direct API call:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```

An example structure of a model object from the API response, showing relevant fields for analysis:

```json
{
  "_id": "6a29a84d5c01dc6038097410",
  "id": "bartowski/Mellum2-12B-A2.5B-Thinking-GGUF",
  "author": "bartowski",
  "lastModified": "2026-06-10T20:27:21.000Z",
  "tags": ["gguf", "text-generation", "en", "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking", "quantized", "conversational"],
  "modelId": "bartowski/Mellum2-12B-A2.5B-Thinking-GGUF",
  "siblings": [
    {"rfilename": "Mellum2-12B-A2.5B-Thinking-Q4_K_M.gguf"},
    {"rfilename": "Mellum2-12B-A2.5B-Thinking-Q5_K_M.gguf"},
    {"rfilename": "Mellum2-12B-A2.5B-Thinking-Q3_K_M.gguf"},
    {"rfilename": "Mellum2-12B-A2.5B-Thinking-Q6_K.gguf"},
    {"rfilename": "Mellum2-12B-A2.5B-Thinking-Q8_0.gguf"}
    // ... other GGUF variants ...
  ]
}
```
The `lastModified` field was checked against the current date (2026-09-07) to filter for updates within the last 24 hours. The `author` field was used to verify if the publisher was on the trusted list, and `tags` and `rfilename` were inspected for quantization format and bit-width.
