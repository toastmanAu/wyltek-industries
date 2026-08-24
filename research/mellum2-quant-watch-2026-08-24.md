# Research: mellum2-quant-watch-2026-08-24

**Date:** 2026-08-24
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Wyltek Industries - Technical Research Findings

**ID:** mellum2-quant-watch-2026-08-24
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

This research task aimed to identify any newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) on Hugging Face within the last 24 hours (relative to 2026-08-24). The search prioritized specific quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) and trusted publishers.

Upon analyzing the provided Hugging Face API output, no models matching the "Mellum2-12B-A2.5B" naming convention were found to have a `lastModified` timestamp within the specified 24-hour window (i.e., on or after 2026-08-23T00:00:00Z). All listed Mellum2 models were last modified prior to this timeframe. Consequently, no new quantized models were identified for reporting.

### Key Findings

1.  **No New Quants Identified:** No community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) were found to be published or updated on Hugging Face within the last 24 hours (relative to 2026-08-24).
2.  **API Data Timestamps:** All Mellum2-related entries in the provided Hugging Face API response had `lastModified` dates earlier than 2026-08-23. For example, the most recent modification observed was `mlx-community/Mellum2-12B-A2.5B-Instruct-mxfp4` on `2026-08-11T20:28:48.000Z`, which falls outside the 24-hour window.
3.  **Source Content Limitations:** Several provided source URLs (e.g., Hugging Face search, individual publisher pages, Reddit) resulted in "FETCH ERROR" or generic HTML content, rendering them unusable for direct data extraction. The primary source for model metadata was the `huggingface.co/api/models?search=Mellum2&full=true` JSON output.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    No, based on the provided data, no such models were published or updated within the specified 24-hour period.

### Gaps / Follow-up

1.  **Missing File Size Information:** The Hugging Face API output (`/api/models?search=Mellum2&full=true`) does not include file size details for individual model files (`rfilename`). This prevents the calculation of "total file size for the smallest variant that fits 8GB VRAM (~6GB weights)" as required by the task.
    *   **Follow-up:** A more detailed API endpoint or web scraping of individual model pages would be necessary to obtain file size information.
2.  **Missing Quality Regression Data:** The API output does not contain any explicit "reported quality regression vs base BF16" metrics. This information is typically found within a model's README or discussions section.
    *   **Follow-up:** Manual inspection of model cards (READMEs) and discussion tabs for any identified new quants would be required to gather this data.
3.  **Inaccessible/Truncated Source Content:** Several provided URLs were inaccessible or returned incomplete data ("FETCH ERROR"). This limited the scope of the search.
    *   **Follow-up:** Investigate the cause of the `FETCH ERROR` for the additional sources to ensure comprehensive future searches. The `shaFETCH ERROR` at the end of the primary API output also suggests potential truncation, meaning there might be more models that were not included in the provided snippet.
4.  **Prior Research Findings Access:** The instruction to "Do NOT re-report quants seen in previous days — check `~/.claude/shared/research-findings/`" could not be fulfilled due to lack of access. This means any models found (if any were new) might have been previously reported.
    *   **Follow-up:** Establish a mechanism to access and query historical research findings for de-duplication.

### Relevant Code/API Snippets

The primary API used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example structure of a model entry from the API:
```json
{
  "_id": "6a1563f96ea5882878c82ed4",
  "id": "JetBrains/Mellum2-12B-A2.5B-Thinking",
  "author": "JetBrains",
  "gated": false,
  "lastModified": "2026-08-13T10:20:47.000Z", // Key field for date filtering
  "likes": 332,
  "trendingScore": 1,
  "private": false,
  "sha": "a7311550557e93cc706ab5dd3d879c1a11703ab4",
  "downloads": 3937,
  "tags": [ // Used to identify quant format and variant
    "transformers",
    "safetensors",
    "mellum",
    "text-generation",
    "conversational",
    "en",
    "arxiv:2605.31268",
    "license:apache-2.0",
    "model-index",
    "eval-results",
    "endpoints_compatible",
    "deploy:sagemaker",
    "region:us"
  ],
  "pipeline_tag": "text-generation",
  "library_name": "transformers",
  "createdAt": "2026-05-26T09:12:25.000Z",
  "modelId": "JetBrains/Mellum2-12B-A2.5B-Thinking",
  "siblings": [ // File list, but without sizes
    { "rfilename": ".eval_results/mellum2.yaml" },
    { "rfilename": ".gitattributes" },
    { "rfilename": "README.md" },
    { "rfilename": "chat_template.jinja" },
    { "rfilename": "config.json" },
    { "rfilename": "generation_config.json" },
    { "rfilename": "mellum-logo-dark.svg" },
    { "rfilename": "mellum_evals_grid_1700.jpg" },
    { "rfilename": "model-00001-of-00005.safetensors" },
    { "rfilename": "model-00002-of-00005.safetensors" },
    { "rfilename": "model-00003-of-00005.safetensors" },
    { "rfilename": "model-00004-of-00005.safetensors" },
    { "rfilename": "model-00005-of-00005.safetensors" },
    { "rfilename": "model.safetensors.index.json" },
    { "rfilename": "special_tokens_map.json" },
    { "rfilename": "tokenizer.json" },
    { "rfilename": "tokenizer_config.json" }
  ]
}
```

---
**Digest:** no drops today
