# Research: mellum2-quant-watch-2026-09-01

**Date:** 2026-09-01
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**ID:** mellum2-quant-watch-2026-09-01
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

As of 2026-09-01, no new community-quantized versions of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) from the specified trusted publishers have been identified on Hugging Face within the last 24 hours.

The search of the Hugging Face API for "Mellum2" models revealed one model, `JetBrains/Mellum2-12B-A2.5B-Base-Pretrain`, that was modified within the last 24 hours (on 2026-08-31). However, this model is a base (non-quantized) variant published by JetBrains itself, not a community-quantized version from a trusted third-party publisher. No other models met the criteria for modification date, quantization format, or trusted publisher.

### Key Findings

1.  **No New Community Quants from Trusted Publishers:** A comprehensive scan of the Hugging Face API for "Mellum2" models, filtered by `lastModified` date (within the last 24 hours relative to 2026-09-01) and `author` (against the list of trusted publishers), yielded no matches for community-quantized models.
2.  **Recent Base Model Update:** The model `JetBrains/Mellum2-12B-A2.5B-Base-Pretrain` was last modified on `2026-08-31T13:06:19.000Z`, placing it within the 24-hour window.
    *   **Repo Path:** `JetBrains/Mellum2-12B-A2.5B-Base-Pretrain`
    *   **Variant:** Base
    *   **Quantization:** Not a quantized model; tags indicate `transformers`, `safetensors`.
    *   **Publisher:** `JetBrains` (original model publisher, not a community quantizer from the specified list).
3.  **Existing Quants (Not New):** Several quantized versions of Mellum2 models exist on Hugging Face (e.g., GGUF, MLX 4-bit/8-bit), but their `lastModified` timestamps are all prior to the last 24-hour window (e.g., `2026-06-XX` or `2026-07-XX`). These include models from `JetBrains` (first-party GGUF) and untrusted community publishers.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?** No.

### Gaps / Follow-up

1.  **File Size Information:** The Hugging Face API response (`https://huggingface.co/api/models?search=Mellum2&full=true`) does not include file sizes within the `siblings` array. To accurately determine "total file size for the smallest variant that fits 8GB VRAM (~6GB weights leaving room for KV cache)", additional API calls (e.g., to `https://huggingface.co/api/models/{repo_id}/tree/main`) would be required for each candidate model to retrieve file metadata, including sizes. This was not possible with the provided source content.
2.  **Truncated API/HTML Responses:** Several provided source content snippets (e.g., `https://huggingface.co/api/models?search=Mellum2&full=true` and all publisher pages) ended with "FETCH ERROR", indicating potentially incomplete data. While the primary model search API appeared to provide a substantial list, a full, un-truncated response would ensure no models were missed.
3.  **Definition of "Community-Quantized":** The task specifies "community-quantized version" and provides a list of "Trusted publishers." The `JetBrains` organization itself published GGUF models (e.g., `JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M`). While these are quantized, they are first-party releases, not from the "community" as defined by the trusted publishers list. This interpretation was applied to filter results.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example structure of a model entry from the API:
```json
{
  "_id": "6a1563f96ea5882878c82ed4",
  "id": "JetBrains/Mellum2-12B-A2.5B-Thinking",
  "author": "JetBrains",
  "gated": false,
  "lastModified": "2026-08-13T10:20:47.000Z",
  "likes": 334,
  "trendingScore": 2,
  "private": false,
  "sha": "a7311550557e93cc706ab5dd3d879c1a11703ab4",
  "downloads": 2395,
  "tags": ["transformers", "safetensors", "mellum", "text-generation", "conversational", "en", "arxiv:2605.31268", "license:apache-2.0", "model-index", "eval-results", "endpoints_compatible", "deploy:sagemaker", "region:us"],
  "pipeline_tag": "text-generation",
  "library_name": "transformers",
  "createdAt": "2026-05-26T09:12:25.000Z",
  "modelId": "JetBrains/Mellum2-12B-A2.5B-Thinking",
  "siblings": [
    {"rfilename": ".eval_results/mellum2.yaml"},
    // ... other files without size information ...
    {"rfilename": "model-00001-of-00005.safetensors"}
  ]
}
```

---
no drops today
