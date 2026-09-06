# Research: mellum2-quant-watch-2026-09-06

**Date:** 2026-09-06
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Wyltek Industries - Technical Research Findings

**ID:** mellum2-quant-watch-2026-09-06
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

The research aimed to identify any newly published or updated community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) on Hugging Face within the last 24 hours (prior to 2026-09-06). The search focused on specific quantization formats (GGUF Q4_K_M, Q5_K_M, Q3_K_M, Q6_K, Q8_0; AWQ 4-bit; GPTQ 4-bit; ExLlamaV2/EXL2; MLX) from a predefined list of trusted publishers.

Based on the provided (partial) Hugging Face API response, no models matching the specified criteria were found to have been published or modified within the last 24 hours. All entries in the available data had `lastModified` timestamps older than 2026-09-05. A significant limitation of this analysis is the truncation of the primary API source content due to a "FETCH ERROR," which prevents a complete and definitive conclusion.

### Key Findings

1.  **No New Quants Found in Provided Data:** No community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) by trusted publishers were found with a `lastModified` timestamp within the last 24 hours (i.e., on or after `2026-09-05T09:00:00Z`).
2.  **Oldest `lastModified` Timestamp:** The most recent `lastModified` timestamp observed in the provided Hugging Face API data for any Mellum2 model was `2026-08-31T13:06:19.000Z` for `JetBrains/Mellum2-12B-A2.5B-Base-Pretrain`, which falls outside the specified 24-hour window.
3.  **Untrusted Publishers Identified:** Several Mellum2-related models were listed from publishers not on the approved list (e.g., `yuxinlu1`, `mlx-community`, `jedisct1`, `WithinUsAI`, `mdamir97`, `skilledu`, `RJ000`, `JSchneemann`, `shailesh83`, `junwatu`). These would have been filtered out even if their `lastModified` dates were recent.
4.  **Official JetBrains Models:** Official JetBrains models (e.g., `JetBrains/Mellum2-12B-A2.5B-Instruct`, `JetBrains/Mellum2-12B-A2.5B-Thinking`) were present but were either base/SFT models or older quantized versions, none updated within the last 24 hours.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**
    Based on the available (and incomplete) source data, **no drops today** were identified that meet the criteria of being a new or updated community-quantized Mellum2-12B-A2.5B model variant from a trusted publisher within the last 24 hours.

### Gaps / Follow-up

1.  **Incomplete API Response:** The primary data source (`https://huggingface.co/api/models?search=Mellum2&full=true`) was truncated with a "FETCH ERROR." This is a critical gap, as it means the analysis was performed on an incomplete dataset. A full, untruncated API response is essential for a comprehensive and definitive search.
2.  **HTML Source Content Unusable:** The supplementary HTML source content for Hugging Face search results and publisher profiles also indicated "FETCH ERROR" and could not be parsed for the required information, nor was it the instructed method for searching.
3.  **Detailed File Size and Quality Regression Data:** Had new quants been identified, further inspection of their `siblings` list (for file sizes) and model cards (for reported quality regressions) would have been necessary. This information was not extracted for existing models as they did not meet the "last 24h" criterion.

### Relevant Code/API Snippets

The primary API endpoint used for the search was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

The filtering logic applied to each model entry would involve checking the `lastModified` field against the 24-hour window (e.g., `2026-09-05T09:00:00Z` onwards for a report on `2026-09-06T09:00:00Z`), the `author` field against the list of trusted publishers, and the `tags` and `siblings` fields for the presence of target quantization formats (e.g., "gguf", "Q4_K_M.gguf", "4-bit").

Example structure of an entry from the API response, highlighting key fields for analysis:

```json
{
  "_id": "6a15633edc2400cb0346a317",
  "id": "JetBrains/Mellum2-12B-A2.5B-Instruct",
  "author": "JetBrains", // Check against trusted publishers
  "lastModified": "2026-08-13T10:20:44.000Z", // Check against 24h window
  "tags": ["transformers", "safetensors", "mellum", "text-generation", "conversational", "en", "arxiv:2605.31268", "license:apache-2.0", "model-index", "eval-results", "endpoints_compatible", "region:us"], // Check for quant tags
  "siblings": [
    // Example files to check for specific quant formats and sizes
    {"rfilename": "model-00001-of-00005.safetensors"},
    {"rfilename": "Mellum2-12B-A2.5B-Instruct-Q4_K_M.gguf"} // Example GGUF file
  ]
}
```
