# Research: mellum2-quant-watch-2026-08-08

**Date:** 2026-08-08
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Wyltek Industries - Technical Research Findings

**ID:** mellum2-quant-watch-2026-08-08
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

This research task aimed to identify any newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) on Hugging Face within the last 24 hours (relative to 2026-08-08). The search focused on specific quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) and trusted publishers.

Based on the provided Hugging Face API response, **no new community-quantized Mellum2-12B-A2.5B model variants were published or updated by any trusted publisher within the specified 24-hour window.** All models found in the search results had `lastModified` timestamps prior to 2026-08-07.

### Key Findings

1.  **Search Scope:** The search targeted Hugging Face models matching "Mellum2" in their ID, specifically looking for `JetBrains/Mellum2-12B-A2.5B-Thinking`, `JetBrains/Mellum2-12B-A2.5B-Instruct`, or `JetBrains/Mellum2-12B-A2.5B-Base` variants, or community quants based on them.
2.  **Timeframe Analysis:** The research task date is 2026-08-08. Therefore, the "last 24h" window covers modifications made on 2026-08-07 or 2026-08-08.
3.  **API Response Review:** All model entries in the provided `huggingface.co/api/models?search=Mellum2&full=true` source content showed `lastModified` timestamps in June or July 2026.
    *   The latest `lastModified` date observed was `2026-07-22T01:13:55.000Z` for `junwatu/Mellum2-12B-A2.5B-Instruct-GGUF`.
    *   Other relevant models from trusted publishers like `bartowski` also had `lastModified` dates in June 2026.
4.  **No New Quants Identified:** As all `lastModified` timestamps predate the 24-hour window (2026-08-07 to 2026-08-08), no new or updated community-quantized Mellum2 models were found according to the specified criteria.
5.  **Publisher Check:** While several models from trusted publishers (e.g., `bartowski`) were present in the search results, none of their `lastModified` dates fell within the required 24-hour timeframe.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**
    *   **Answer:** No, based on the provided data, no such models were published or updated within the last 24 hours (relative to 2026-08-08).

### Gaps / Follow-up

1.  **Incomplete Source Content:** Several provided URLs (e.g., `https://huggingface.co/models?search=mellum2&sort=createdAt`, `https://huggingface.co/bartowski`, `https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day`) resulted in "FETCH ERROR" or HTML snippets that did not contain the required structured model data. A robust search would require successful retrieval of data from all relevant endpoints.
2.  **Prior Findings Access:** The instruction mentions checking `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files to avoid re-reporting. As a simulated analyst, I do not have access to this directory. This could lead to re-reporting if new data were found and previous reports existed. For future tasks, access to this historical data or a mechanism to simulate it would be beneficial.
3.  **File Size Information:** If new quants were found, the task required reporting the "total file size for the smallest variant that fits 8GB VRAM (~6GB weights leaving room for KV cache)". The provided API response does not directly include file sizes for individual `gguf` files within a repository's `siblings` array. This would require an additional API call per model to `https://huggingface.co/api/models/{repo_id}/tree/main` or similar to get file metadata, or parsing the model card. This step was not necessary in this instance due to no new quants being found.
4.  **Quality Regression Data:** Similarly, "any reported quality regression vs base BF16" would typically be found in the model card (`README.md`). This information was not extracted or available in the provided API snippet.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```

This API returns a JSON array of model objects, each containing metadata such as `id`, `author`, `lastModified`, `tags`, and `siblings` (file list). The `lastModified` field was crucial for filtering results within the specified 24-hour window. The `tags` field was used to identify quantization formats (e.g., "gguf", "mlx", "4-bit") and model variants (e.g., "thinking", "instruct").
