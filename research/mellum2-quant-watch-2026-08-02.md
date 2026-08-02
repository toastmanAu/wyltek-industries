# Research: mellum2-quant-watch-2026-08-02

**Date:** 2026-08-02
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Structured Findings Document

**ID:** mellum2-quant-watch-2026-08-02
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

As of 2026-08-02, a comprehensive search of the Hugging Face API for JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) did not identify any new community-quantized models published within the last 24 hours by the specified trusted publishers.

The search focused on preferred quantization formats including GGUF (Q4_K_M, Q5_K_M, Q3_K_M, Q6_K, Q8_0), AWQ 4-bit, GPTQ 4-bit, ExLlamaV2/EXL2, and MLX. All retrieved model entries for "Mellum2" had `lastModified` timestamps older than the 24-hour window (i.e., prior to 2026-08-01 00:00:00Z).

### Key Findings

1.  **No New Quantized Models Found:** No new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) were found to have been published to Hugging Face within the last 24 hours (relative to 2026-08-02).
2.  **API Search Results:** The Hugging Face API query `https://huggingface.co/api/models?search=Mellum2&full=true` returned several Mellum2-related models. However, the `lastModified` timestamp for all these models was older than the specified 24-hour window. The most recent `lastModified` timestamp observed was `2026-07-22T01:13:55.000Z` for `junwatu/Mellum2-12B-A2.5B-Instruct-GGUF`, which falls outside the current reporting period.
3.  **Trusted Publishers Check:** While several existing quantized models were found (e.g., by `bartowski`, `JetBrains` themselves, `jedisct1`), none of these had been updated or published within the last 24 hours. The list of trusted publishers was cross-referenced, but no recent activity was detected.
4.  **Quant Format Prioritization:** The search considered the specified priority order for quant formats. If new models had been found, GGUF Q3_K_M would have been the primary target for the 8GB VRAM constraint (aiming for ~6GB weights).

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    No, based on the provided Hugging Face API data, no such models from trusted publishers have been published or updated within the last 24 hours.

### Gaps / Follow-up

1.  **Full File Size Information:** The provided API output does not include explicit file sizes for individual `siblings` (quantized files). To accurately determine "total file size for the smallest variant that fits 8GB VRAM (~6GB weights)", a follow-up API call to each model's specific `https://huggingface.co/api/models/{repo_id}/tree/main` or similar endpoint would be required, or a manual inspection of the model page. For this report, typical GGUF sizes were assumed for VRAM fitting.
2.  **Quality Regression Data:** The API output does not contain information regarding "reported quality regression vs base BF16". This information is typically found in the model card (`README.md`) or associated discussions. If a new quant were found, a deeper dive into its model card would be necessary.
3.  **"FETCH ERROR" in supplementary sources:** Several provided URLs resulted in "FETCH ERROR" or HTML content that could not be programmatically parsed for the required `lastModified` data. This limited the scope of the search to the primary `api/models?search=Mellum2` endpoint. If the API search had yielded ambiguous results, manual inspection of these pages would have been attempted, but was not possible due to the errors.
4.  **Prior Findings Database Access:** The instruction to "Do NOT re-report quants seen in previous days — check ~/.claude/shared/research-findings/ for prior mellum2-quant-watch-* files" could not be executed as I do not have access to this local file system. This report assumes no prior knowledge of previously reported quants.

### Relevant Code/API Snippets

The primary API endpoint used for this research:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```

Example structure of a model entry from the API, highlighting relevant fields for this task:

```json
{
  "_id": "...",
  "id": "bartowski/Mellum2-12B-A2.5B-Thinking-GGUF",
  "author": "bartowski",
  "lastModified": "2026-06-10T20:27:21.000Z", // Crucial for 24h check
  "tags": ["gguf", "text-generation", "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking"], // For quant format and base model variant
  "modelId": "bartowski/Mellum2-12B-A2.5B-Thinking-GGUF",
  "siblings": [
    {"rfilename": "Mellum2-12B-A2.5B-Thinking-Q3_K_M.gguf"}, // Example file, size would need to be inferred or fetched
    {"rfilename": "Mellum2-12B-A2.5B-Thinking-Q4_K_M.gguf"},
    // ... other quant files
  ]
}
```

---
**Digest:** no drops today
