# Research: mellum2-quant-watch-2026-06-18

**Date:** 2026-06-18
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Wyltek Industries Technical Research Findings

**Research Task ID:** mellum2-quant-watch-2026-06-18
**Date of Report:** 2026-06-18

### Summary

This research aimed to identify any community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) published to Hugging Face within the last 24 hours. The search prioritized GGUF (Q4_K_M, Q5_K_M, Q3_K_M, Q6_K, Q8_0) and AWQ 4-bit formats, followed by GPTQ 4-bit, ExLlamaV2/EXL2, and MLX, specifically targeting models from a list of trusted publishers.

After analyzing the Hugging Face API response for "Mellum2" models and filtering by modification date and publisher, **no new community-quantized Mellum2-12B-A2.5B model variants were found to have been published by trusted publishers in the last 24 hours.** All identified quantized models were last modified prior to 2026-06-17.

### Key Findings

1.  **No Recent Quantized Models Found:** A comprehensive search of the Hugging Face API for "Mellum2" models, filtered for activity within the last 24 hours (i.e., `lastModified` on or after 2026-06-17), yielded no results matching the specified criteria for community-quantized versions.
2.  **Existing Quantized Models (Older):** Several quantized Mellum2 models exist on Hugging Face, but their `lastModified` timestamps predate the 24-hour window. Examples include:
    *   `yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF` (last modified 2026-06-09)
    *   `JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M` (last modified 2026-06-04)
    *   `mradermacher/Mellum2-12B-A2.5B-Thinking-i1-GGUF` (last modified 2026-06-05) - This is from a trusted publisher, but too old.
3.  **Publisher Filtering:** The search correctly applied the "trusted publishers" filter (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community). While some older quants were found, none from these publishers were updated within the last 24 hours.
4.  **Quantization Format Coverage:** The search considered the specified quantization formats: GGUF (Q4_K_M, Q5_K_M, Q3_K_M, Q6_K, Q8_0), AWQ 4-bit, GPTQ 4-bit, ExLlamaV2/EXL2, and MLX. No new models in these formats were found within the timeframe.
5.  **VRAM Constraint Context:** For a 12B parameter model, approximate file sizes for the target GGUF formats are:
    *   Q3_K_M: ~4.5 GB
    *   Q4_K_M: ~6 GB
    *   Q5_K_M: ~7.5 GB
    *   Q6_K: ~9 GB
    *   Q8_0: ~12 GB
    Models quantized to Q4_K_M or Q3_K_M would generally fit the 8GB VRAM target (allowing ~6GB for weights).

### Questions Answered

**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

**Answer:** No drops today. No community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants were found to have been published to Hugging Face by trusted publishers in the last 24 hours (as of 2026-06-18).

### Gaps / Follow-up

1.  **File Size Data in API:** The Hugging Face API (`/api/models?search=Mellum2&full=true`) does not directly provide file sizes for individual `siblings` (files). This required estimating sizes based on quantization bit-width. For future tasks, direct file size information would improve accuracy in determining VRAM fit.
2.  **Prior Research Findings Access:** The instruction to "Do NOT re-report quants seen in previous days — check ~/.claude/shared/research-findings/ for prior mellum2-quant-watch-* files" could not be fulfilled due to lack of access to the specified local path. This report assumes all models found in the API dump are "new" in the context of this specific search, but filters them out by `lastModified` date.
3.  **Incomplete API Response:** The last entry in the provided API source content (`JSchneemann/Mellum2-12B-A2.5B-Thinking-GGUF`) was truncated, preventing full analysis of that specific entry. While it was likely outside the 24-hour window based on the partial `createdAt` timestamp, a complete response is preferable.
4.  **Quality Regression Details:** The task requested "any reported quality regression vs base BF16". This information is typically found within a model's `README.md` or discussions, which were not fully accessible via the provided API or HTML snippets. Without direct access to model cards, this detail cannot be accurately reported.

### Relevant Code/API Snippets

**Hugging Face API Endpoint Used:**
`https://huggingface.co/api/models?search=Mellum2&full=true`

**Example API Response Structure (relevant fields for filtering):**
```json
[
  {
    "_id": "...",
    "id": "JetBrains/Mellum2-12B-A2.5B-Thinking",
    "author": "JetBrains",
    "gated": false,
    "lastModified": "2026-06-12T10:46:19.000Z", // Key for 24h filter
    "likes": 295,
    "trendingScore": 12,
    "private": false,
    "sha": "...",
    "downloads": 8377,
    "tags": ["transformers", "safetensors", "mellum", "text-generation", "conversational", "en", "arxiv:2605.31268", "license:apache-2.0", "model-index", "eval-results", "endpoints_compatible", "region:us"], // Key for quant format
    "pipeline_tag": "text-generation",
    "library_name": "transformers",
    "createdAt": "2026-05-26T09:12:25.000Z",
    "modelId": "JetBrains/Mellum2-12B-A2.5B-Thinking",
    "siblings": [ // Key for specific quant files and variants
      {"rfilename":".eval_results/mellum2.yaml"},
      {"rfilename":"README.md"},
      {"rfilename":"model-00001-of-00005.safetensors"}
    ]
  },
  // ... other model entries
]
```
