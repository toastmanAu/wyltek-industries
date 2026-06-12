# Research: mellum2-quant-watch-2026-06-12

**Date:** 2026-06-12
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Wyltek Industries - Technical Research Findings

**ID:** mellum2-quant-watch-2026-06-12
**Date:** 2026-06-12

### Summary

This report details the findings of a 24-hour scan (ending 2026-06-12) for newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) on Hugging Face. The search prioritized GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, and MLX formats from a list of trusted publishers.

After analyzing the available Hugging Face API data, no new community-quantized Mellum2-12B-A2.5B model variants were found to have been published or significantly updated by trusted publishers within the specified 24-hour timeframe. All identified Mellum2-related models in the API response had `lastModified` or `createdAt` timestamps older than 2026-06-11T00:00:00Z.

### Key Findings

1.  **No New Quants Identified:** No community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) were published or updated by trusted publishers on Hugging Face within the last 24 hours (i.e., since 2026-06-11T00:00:00Z).
2.  **Latest Relevant Activity:** The most recent activity for a Mellum2 model from a non-JetBrains author was `yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF`, with a `lastModified` timestamp of `2026-06-09T09:17:02.000Z` and `createdAt` of `2026-06-09T08:08:57.000Z`. This is outside the 24-hour window.
3.  **Trusted Publisher Check:** While `mradermacher` is a trusted publisher, their most recent Mellum2-related model (`mradermacher/Mellum2-12B-A2.5B-Instruct-SFT-GGUF`) was last modified on `2026-06-05T08:26:59.000Z`, also outside the reporting window. No other trusted publishers had Mellum2-related models in the provided API response.
4.  **API Data Limitations:** The provided Hugging Face API output (`/api/models?search=Mellum2&full=true`) does not include individual file sizes or explicit quality regression metrics (e.g., perplexity, benchmark scores) directly within the top-level model metadata. This information would typically require parsing individual model cards or making additional API calls for file details.

### Questions Answered

**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

**Answer:** No new community-quantized versions of any JetBrains Mellum2-12B-A2.5B model variant have been published to Hugging Face by trusted publishers within the last 24 hours.

### Gaps / Follow-up

1.  **File Size Retrieval:** The current API endpoint does not provide file sizes directly. To fulfill the requirement of reporting "total file size for the smallest variant that fits 8GB VRAM (~6GB weights)", a more detailed API call (e.g., `https://huggingface.co/api/models/{repo_id}/tree/main`) or parsing of model pages would be necessary for any identified new quants.
2.  **Quality Regression Metrics:** Information regarding reported quality regression versus the base BF16 model is not available through the provided API endpoint. This typically resides within the model card's description or discussions section, which were inaccessible in this research task.
3.  **Comprehensive Search:** Several supplementary Hugging Face and Reddit search URLs resulted in fetch errors. While the primary API search was successful, these additional sources could potentially reveal community discussions or alternative publication methods not captured by the main API endpoint. Re-attempting access to these sources or exploring alternative community channels (e.g., Discord servers, specific quantization tools' forums) might be beneficial for future, higher-priority tasks.
4.  **Publisher Verification:** The current process relies on the `author` field in the API response. For non-JetBrains models, explicit verification against the "Trusted publishers" list is performed. This is a manual step in the analysis process that could be automated.

### Relevant Code/API Snippets

The primary API used for this research:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example structure of a model entry from the API:
```json
{
  "_id": "6a27ca194f7d11dcac666d66",
  "id": "yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF",
  "author": "yuxinlu1",
  "gated": false,
  "lastModified": "2026-06-09T09:17:02.000Z",
  "likes": 4,
  "trendingScore": 4,
  "private": false,
  "sha": "a9c7b1a32ead28d4a868ff31bbf9c15a97362cfe",
  "downloads": 100,
  "tags": [
    "gguf",
    "mellum",
    "mellum2",
    "code",
    "coding",
    "reasoning",
    "thinking",
    "moe",
    "llama.cpp",
    "local-llm",
    "text-generation",
    "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking",
    "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Thinking",
    "license:apache-2.0",
    "endpoints_compatible",
    "region:us",
    "conversational"
  ],
  "pipeline_tag": "text-generation",
  "library_name": "gguf",
  "createdAt": "2026-06-09T08:08:57.000Z",
  "modelId": "yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF",
  "siblings": [
    { "rfilename": ".gitattributes" },
    { "rfilename": "README.md" },
    { "rfilename": "mellum2-claude-Q2_K.gguf" },
    { "rfilename": "mellum2-claude-Q4_K_M.gguf" },
    { "rfilename": "mellum2-claude-Q6_K.gguf" },
    { "rfilename": "mellum2-claude-Q8_0.gguf" }
  ]
}
```
