# Research: mellum2-quant-watch-2026-06-29

**Date:** 2026-06-29
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Mellum2 Quantization Watch - Findings Document

**ID:** mellum2-quant-watch-2026-06-29
**Date:** 2026-06-29

### Summary

This report details the findings from a search for community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) published to Hugging Face within the last 24 hours. The search targeted specific quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) from a list of trusted publishers.

After a thorough analysis of the Hugging Face API response for "Mellum2" models, no new community-quantized models from the specified trusted publishers were found to have been updated or published within the last 24 hours (i.e., since 2026-06-28T00:00:00Z). All identified Mellum2 model variants and their existing quantizations had `lastModified` timestamps significantly older than the 24-hour window.

### Key Findings

1.  **No New Quantizations Found:** No community-quantized versions of any JetBrains Mellum2-12B-A2.5B model variant were published or updated on Hugging Face by the specified trusted publishers within the last 24 hours.
2.  **Existing Quantizations (Out of Scope):** Several quantized versions of Mellum2 models exist from both JetBrains (the original author) and other community members, but their `lastModified` dates fall outside the 24-hour reporting window. For instance, `mradermacher/Mellum2-12B-A2.5B-Instruct-GGUF` and `mradermacher/Mellum2-12B-A2.5B-Instruct-i1-GGUF` contain various GGUF quants from a trusted publisher, but their last modifications were on 2026-06-04 and 2026-06-05, respectively.
3.  **Publisher Filtering:** The search strictly adhered to the "trusted publishers" list (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community). Models from other authors, even if recently updated or quantized, were excluded. JetBrains' own quantized models were also excluded as they are the original authors, not "community-quantized" by a third-party publisher.
4.  **Date Filtering:** All `lastModified` timestamps in the provided API response were from June 12, 2026, or earlier, making them outside the 24-hour window relative to the research task date of 2026-06-29.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    *   No. Based on the provided Hugging Face API data and the specified criteria, no such models were found.

### Gaps / Follow-up

1.  **File Size Information:** The Hugging Face API response (`/api/models?search=Mellum2&full=true`) does not include file sizes within the `siblings` array. To accurately determine if a model variant "fits 8GB VRAM (~6GB weights leaving room for KV cache)", a subsequent API call to `https://huggingface.co/api/models/{repo_id}/tree/main` or similar would be required for each relevant model to fetch individual file sizes. This was not possible with the provided source content.
2.  **Quality Regression Data:** The API response does not directly provide "reported quality regression vs base BF16". This information would typically be found within the model card (`README.md`) of each repository, requiring an additional step of parsing or fetching the model card content.
3.  **Prior Research Findings:** The instruction to "check `~/.claude/shared/research-findings/` for prior mellum2-quant-watch-* files and skip already-known repos" could not be performed as I do not have access to a local filesystem. This report assumes all models in the provided API response are new to this specific check, but the date filtering effectively handles the "new" aspect.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example structure of a model entry from the API response:
```json
{
  "_id": "6a1563f96ea5882878c82ed4",
  "id": "JetBrains/Mellum2-12B-A2.5B-Thinking",
  "author": "JetBrains",
  "gated": false,
  "lastModified": "2026-06-12T10:46:19.000Z", // Key field for date check
  "likes": 308,
  "trendingScore": 8,
  "private": false,
  "sha": "ba4838faad89e968c36f39e76e95319d756714fe",
  "downloads": 27545,
  "tags": [ // Key field for quant format and model variant
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
    "region:us"
  ],
  "pipeline_tag": "text-generation",
  "library_name": "transformers",
  "createdAt": "2026-05-26T09:12:25.000Z",
  "modelId": "JetBrains/Mellum2-12B-A2.5B-Thinking",
  "siblings": [ // Contains filenames, but not sizes
    { "rfilename": ".eval_results/mellum2.yaml" },
    { "rfilename": "README.md" },
    { "rfilename": "model-00001-of-00005.safetensors" }
    // ... more files
  ]
}
```

---
**Digest:** no drops today
