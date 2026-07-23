# Research: mellum2-quant-watch-2026-07-23

**Date:** 2026-07-23
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Wyltek Industries - Technical Research Findings

**ID:** mellum2-quant-watch-2026-07-23
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

This research task aimed to identify any newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants on Hugging Face within the last 24 hours (relative to 2026-07-23). The search focused on specific quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) and a predefined list of trusted publishers.

After analyzing the provided Hugging Face API data, no new community-quantized Mellum2 models from the specified trusted publishers were found to have been released or updated within the last 24-hour window. One model (`junwatu/Mellum2-12B-A2.5B-Instruct-GGUF`) was modified within the timeframe, but its publisher (`junwatu`) is not on the approved list of trusted quantizers.

### Key Findings

1.  **No New Quants from Trusted Publishers:** No community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) from the trusted publishers (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community) were published or updated on Hugging Face between 2026-07-22T00:00:00Z and 2026-07-23T23:59:59Z.

2.  **Untrusted Publisher Activity:** One GGUF quantized model, `junwatu/Mellum2-12B-A2.5B-Instruct-GGUF`, was identified with a `lastModified` timestamp of `2026-07-22T01:13:55.000Z`, placing it within the 24-hour window. However, `junwatu` is not listed as a trusted publisher for this research task, so this model was excluded from the findings.

3.  **Existing Quants are Older:** All other Mellum2 quantized models found via the API search were last modified prior to the 24-hour window (e.g., in early June 2026) or were published by JetBrains directly (which are not considered "community-quantized" for this task).

### Questions Answered

**Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h from a trusted publisher?**

No drops today.

### Gaps / Follow-up

1.  **Incomplete API Response:** The provided `https://huggingface.co/api/models?search=Mellum2&full=true` source content appears to be truncated (`tFETCH ERROR`). A complete API response is necessary to ensure no relevant models were missed.
2.  **Web Scraping Failures:** Attempts to access Hugging Face model search results sorted by `createdAt` and individual publisher pages (e.g., `https://huggingface.co/bartowski`) resulted in `FETCH ERROR` for HTML content. This prevented a comprehensive manual verification or alternative search if the API was insufficient.
3.  **File Size Information:** The Hugging Face API response for model metadata (`/api/models?search=Mellum2&full=true`) does not directly provide file sizes for individual siblings (model files). To accurately determine if a quantized variant fits the 8GB VRAM (~6GB weights) requirement, an additional API call (e.g., `https://huggingface.co/api/models/{repo_id}/tree/main`) or web scraping would be needed for each potential candidate model. This was not performed as no qualifying models were found.
4.  **Quality Regression Data:** Information regarding reported quality regression versus the base BF16 model is typically found within the model card (`README.md`). Direct access to this content was not available through the provided API snippets, and web scraping failed.
5.  **Definition of "Community-Quantized":** While the task specifies "trusted publishers," a clearer definition of "community-quantized" versus official quantizations (e.g., by JetBrains) could be beneficial for future tasks, although in this instance, the publisher list implicitly defined it.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```

Example structure of a relevant model entry (hypothetical, if one were found and met criteria):

```json
{
  "_id": "...",
  "id": "trusted_publisher/Mellum2-12B-A2.5B-Thinking-Q4_K_M",
  "author": "trusted_publisher",
  "gated": false,
  "lastModified": "2026-07-22T15:30:00.000Z", // Within last 24h
  "likes": 123,
  "trendingScore": 5,
  "private": false,
  "sha": "...",
  "downloads": 1000,
  "tags": ["gguf", "mellum", "llama.cpp", "quantized", "moe", "thinking", "text-generation", "q4_k_m", "4-bit", "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking", "license:apache-2.0"],
  "pipeline_tag": "text-generation",
  "library_name": "gguf",
  "createdAt": "2026-07-22T14:00:00.000Z",
  "modelId": "trusted_publisher/Mellum2-12B-A2.5B-Thinking-Q4_K_M",
  "siblings": [
    {
      "rfilename": "Mellum2-12B-A2.5B-Thinking-Q4_K_M.gguf"
      // Note: Actual file size is not directly in this API response.
    },
    {
      "rfilename": "README.md"
    }
  ]
}
```
