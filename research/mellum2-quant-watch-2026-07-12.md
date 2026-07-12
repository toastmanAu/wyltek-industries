# Research: mellum2-quant-watch-2026-07-12

**Date:** 2026-07-12
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Argus Research Findings Document

**ID:** mellum2-quant-watch-2026-07-12
**Date:** 2026-07-12

### Summary

This research task aimed to identify any newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) on Hugging Face within the last 24 hours. The search prioritized GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, and MLX formats, specifically from a list of trusted publishers.

Based on the provided Hugging Face API data, no new Mellum2-12B-A2.5B model quantizations were found to have been published or last modified within the specified 24-hour window (i.e., since 2026-07-11 12:00:00Z). All listed models have `lastModified` or `createdAt` timestamps prior to this period, with the most recent being from June 2026.

### Key Findings

1.  **No New Quantizations Identified:** A comprehensive review of the provided Hugging Face API response for "Mellum2" models revealed no new model uploads or modifications within the last 24 hours (relative to 2026-07-12).
2.  **Timestamp Analysis:** The latest `lastModified` timestamp among the provided models is `2026-06-12T15:13:19.000Z` for `RedHatAI/Mellum2-12B-A2.5B-Thinking-FP8-Dynamic`. This date falls outside the 24-hour search window.
3.  **Model Variants Covered:** The search implicitly covered all specified Mellum2-12B-A2.5B variants (Thinking, Instruct, Base) as the API query was broad enough to include them.
4.  **Quantization Formats:** While various quantization formats (GGUF, MLX, FP8) were present in the older results, no new entries matching the "last 24h" criteria were found for any of the prioritized formats.
5.  **Publisher Activity:** No recent activity from the specified trusted publishers (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community) related to new Mellum2 quantizations was observed within the given API data. Direct access to publisher profiles via the provided HTML snippets resulted in fetch errors or partial content, preventing a direct check of their individual repositories for new uploads outside the main search.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    No, based on the provided Hugging Face API data, no new community-quantized versions of any JetBrains Mellum2-12B-A2.5B model variant have been published or updated in the last 24 hours.

### Gaps / Follow-up

1.  **Access to Prior Research Files:** The instruction to "Do NOT re-report quants seen in previous days — check `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files" could not be performed due to environmental limitations (lack of file system access). This report assumes no prior knowledge of previously reported quants. If this is a critical filtering step, a mechanism to provide this historical context is required.
2.  **Comprehensive Publisher Activity Check:** While the main API search is effective, directly querying each trusted publisher's profile for their *latest* models (not just Mellum2-specific) and then filtering for Mellum2 variants might reveal models that the broad `search=Mellum2` query missed due to naming conventions or delayed indexing. The provided HTML snippets for publisher profiles were incomplete, preventing this deeper dive.
3.  **File Size Information:** Since no new quants were found, the file size analysis for 8GB VRAM compatibility was not performed. This would be a required step if new models are identified in future runs.
4.  **Quality Regression Information:** Similarly, quality regression data was not applicable as no new quants were found. This would require inspecting model cards or discussion forums for newly identified models.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example of a model entry from the API response (illustrating relevant fields for analysis):

```json
{
    "_id": "6a1563f96ea5882878c82ed4",
    "id": "JetBrains/Mellum2-12B-A2.5B-Thinking",
    "author": "JetBrains",
    "gated": false,
    "lastModified": "2026-06-12T10:46:19.000Z",
    "likes": 318,
    "trendingScore": 3,
    "private": false,
    "sha": "ba4838faad89e968c36f39e76e95319d756714fe",
    "downloads": 9121,
    "tags": ["transformers", "safetensors", "mellum", "text-generation", "conversational", "en", "arxiv:2605.31268", "license:apache-2.0", "model-index", "eval-results", "endpoints_compatible", "region:us"],
    "pipeline_tag": "text-generation",
    "library_name": "transformers",
    "createdAt": "2026-05-26T09:12:25.000Z",
    "modelId": "JetBrains/Mellum2-12B-A2.5B-Thinking",
    "siblings": [
        {"rfilename": ".eval_results/mellum2.yaml"},
        {"rfilename": "README.md"},
        {"rfilename": "model-00001-of-00005.safetensors"}
        // ... other files
    ]
}
```
