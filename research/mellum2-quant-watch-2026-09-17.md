# Research: mellum2-quant-watch-2026-09-17

**Date:** 2026-09-17
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Structured Findings Document

**ID:** mellum2-quant-watch-2026-09-17
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

As of 2026-09-17, no new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) have been published to Hugging Face by the specified trusted publishers within the last 24 hours. The search of the Hugging Face API revealed several Mellum2-related models, including some GGUF and MLX quants, but all had `lastModified` timestamps significantly older than the 24-hour window (i.e., before 2026-09-16). Furthermore, none of the identified models were published by the designated trusted publishers.

### Key Findings

1.  **No Recent Publications:** All models found via the Hugging Face API search for "Mellum2" had `lastModified` timestamps prior to 2026-09-16. The most recent modification date observed was `2026-08-31T13:06:19.000Z` for `JetBrains/Mellum2-12B-A2.5B-Base-Pretrain`, which falls outside the 24-hour target window (2026-09-16 00:00:00Z to 2026-09-17 23:59:59Z).
2.  **No Trusted Publishers:** None of the models listed in the API response were published by the specified trusted publishers: `bartowski`, `unsloth`, `mradermacher`, `MaziyarPanahi`, `TheBloke`, `QuantFactory`, or `lmstudio-community`.
3.  **Existing Quants (Not Recent/Trusted):**
    *   Several GGUF quantized models were identified, such as `yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF` (containing Q2_K, Q4_K_M, Q6_K, Q8_0), `JetBrains/Mellum2-12B-A2.5B-Instruct-GGUF-Q6_K`, `RJ000/Mellum2-12B-A2.5B-Thinking-GGUF` (Q4_K_M), `JSchneemann/Mellum2-12B-A2.5B-Thinking-GGUF` (Q4_K_M, Q6_K, Q8_0), `shailesh83/Mellum2-Thinking-Q4_K_M`, `junwatu/Mellum2-12B-A2.5B-Instruct-GGUF` (Q4_K_M), and `developerjeremylive/Mellum2-12B-A2.5B-Thinking-GGUF-etheroi` (Q4_K_M). However, these are all too old and/or from untrusted publishers.
    *   MLX quantized models (4-bit, 8-bit) were also found under `jedisct1/Mellum2-12B-A2.5B-Thinking-mlx-4bit`, `jedisct1/Mellum2-12B-A2.5B-Thinking-mlx-8bit`, `jedisct1/Mellum2-12B-A2.5B-Instruct-mlx-4bit`, and `jedisct1/Mellum2-12B-A2.5B-Instruct-mlx-8bit`. These are also too old and from an untrusted publisher.
    *   No AWQ, GPTQ, or ExLlamaV2/EXL2 quants were identified for Mellum2 models in the search results.
4.  **Unresponsive Sources:** Attempts to access other Hugging Face search results (e.g., `https://huggingface.co/models?search=mellum2&sort=createdAt`) and individual publisher profiles (e.g., `https://huggingface.co/bartowski`) resulted in "FETCH ERROR" or HTML content that did not provide direct model metadata. The Reddit search also failed. Therefore, the findings are solely based on the direct API query.

### Questions Answered

**Research Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

**Answer:** No, a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has not been published to Hugging Face by a trusted publisher in the last 24 hours.

### Gaps / Follow-up

1.  **File Size Information:** The Hugging Face API response (`https://huggingface.co/api/models?search=Mellum2&full=true`) does not include file sizes for individual model files (`rfilename`). This prevents determining "total file size for the smallest variant that fits 8GB VRAM (~6GB weights leaving room for KV cache)" as requested.
    *   **Follow-up:** Investigate alternative Hugging Face API endpoints or methods to retrieve file size metadata. Manual inspection of model cards would be required if API access is insufficient.
2.  **Reported Quality Regression:** The API response does not contain explicit fields for "reported quality regression vs base BF16." While quantization implies some regression, specific metrics are not available in the raw API data.
    *   **Follow-up:** If a new quant is found, a deeper dive into the model card (`README.md`) would be necessary to extract any reported quality metrics.
3.  **Prior Research Files Access:** The instruction "Do NOT re-report quants seen in previous days — check `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files" could not be fulfilled due to lack of access to the specified file system.
    *   **Follow-up:** Establish a mechanism for Argus to access and parse historical research findings to prevent duplicate reporting.
4.  **Hugging Face UI/Other API Issues:** Several provided source URLs resulted in "FETCH ERROR" or non-API HTML content. This limited the scope of the search to only one direct API endpoint.
    *   **Follow-up:** Investigate the cause of these fetch errors (e.g., rate limiting, incorrect API usage, temporary network issues) and ensure robust access to Hugging Face data for future research tasks.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example structure of a relevant model entry (if one had been found and met criteria):

```json
{
  "_id": "...",
  "id": "publisher/Mellum2-12B-A2.5B-Variant-Quant",
  "author": "trusted_publisher_name",
  "gated": false,
  "lastModified": "2026-09-16T14:30:00.000Z", // Example: within 24h
  "likes": 123,
  "trendingScore": 5,
  "private": false,
  "sha": "...",
  "downloads": 1000,
  "tags": ["gguf", "mellum", "llama.cpp", "quantized", "Q4_K_M", "text-generation", "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking", "license:apache-2.0"],
  "pipeline_tag": "text-generation",
  "library_name": "gguf",
  "createdAt": "2026-09-16T10:00:00.000Z",
  "modelId": "publisher/Mellum2-12B-A2.5B-Variant-Quant",
  "siblings": [
    {
      "rfilename": "Mellum2-12B-A2.5B-Variant-Q4_K_M.gguf" // File size would be needed here
    },
    {
      "rfilename": "README.md" // Quality regression might be found here
    }
  ]
}
```
