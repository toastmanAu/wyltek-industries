# Research: mellum2-quant-watch-2026-09-15

**Date:** 2026-09-15
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Mellum2 Quantization Watch - 2026-09-15

**Research Task ID:** mellum2-quant-watch-2026-09-15
**Research Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24 hours from a trusted publisher, matching specified quantization formats and VRAM constraints.

---

### Summary

As of 2026-09-15, no new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) have been published to Hugging Face within the last 24 hours by any of the specified trusted publishers. All models found via the Hugging Face API were last modified several months prior to the current reporting date. Furthermore, none of the identified model authors matched the list of trusted publishers.

### Key Findings

1.  **Hugging Face API Search Results:** A direct API query to `https://huggingface.co/api/models?search=Mellum2&full=true` returned a list of 28 models related to "Mellum2".
2.  **Last Modified Timestamp Analysis:** Each model's `lastModified` timestamp was inspected to determine if it fell within the last 24 hours relative to 2026-09-15.
    *   The most recent `lastModified` date observed was `2026-08-31T13:06:19.000Z` for `JetBrains/Mellum2-12B-A2.5B-Base-Pretrain`.
    *   All other models had `lastModified` dates in June, July, or earlier August 2026.
    *   **Conclusion:** None of the listed models were updated or published within the last 24 hours (i.e., on or after 2026-09-14T00:00:00Z, assuming the task runs on 2026-09-15).
3.  **Trusted Publisher Verification:** The `author` field for each model was checked against the list of trusted publishers: `bartowski`, `unsloth`, `mradermacher`, `MaziyarPanahi`, `TheBloke`, `QuantFactory`, `lmstudio-community`.
    *   The authors identified in the API response were `JetBrains`, `yuxinlu1`, `RedHatAI`, `mdamir97`, `skilledu`, `RJ000`, `jedisct1`, `JSchneemann`, `shailesh83`, `junwatu`, `developerjeremylive`, and `josephmayo`.
    *   **Conclusion:** None of these authors match the specified list of trusted publishers.
4.  **Quantization Format and File Size (Not Applicable):** Since no models met the `lastModified` and `author` criteria, detailed analysis of quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) and file size constraints (~6GB weights for 8GB VRAM) was not performed for new drops. However, for a 12B model, only highly compressed formats like GGUF Q3_K_M (approx. 5.25GB) would typically fit the ~6GB weight limit.

### Questions Answered

**Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h by a trusted publisher?**
No, there have been no new drops of community-quantized Mellum2 models from trusted publishers within the last 24 hours.

### Gaps / Follow-up

1.  **Access to `~/.claude/shared/research-findings/`:** The instruction to "Do NOT re-report quants seen in previous days — check `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files" could not be fulfilled due to environmental limitations. This report assumes all models in the API response are *potentially* new if they met the `lastModified` and `author` criteria.
2.  **External Source Fetch Errors:** All provided external HTML sources (e.g., publisher profiles, model discussion pages, Reddit search) resulted in "FETCH ERROR" and could not be analyzed. This prevented cross-referencing author details or finding additional context that might not be present in the main API response.
3.  **Exact "Last 24h" Window:** The precise time of execution on 2026-09-15 was not provided. For this report, "last 24 hours" was interpreted as any `lastModified` timestamp on or after `2026-09-14T00:00:00Z`. Given the age of the models, this interpretation did not affect the outcome.

### Relevant Code/API Snippets

The primary API endpoint used for this research:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```

Example of a model entry from the API response (illustrating `lastModified` and `author` fields):

```json
{
    "_id": "6a1561140ae0b32a09688dd3",
    "id": "JetBrains/Mellum2-12B-A2.5B-Base",
    "author": "JetBrains",
    "gated": false,
    "lastModified": "2026-06-12T10:47:58.000Z",
    "likes": 26,
    "trendingScore": 2,
    "private": false,
    "sha": "271755e48ab6b2ed0ef224eaaabe2d25275fb8ee",
    "downloads": 16527,
    "tags": ["transformers", "safetensors", "mellum", "text-generation", "en", "arxiv:2605.31268", "license:apache-2.0", "model-index", "eval-results", "endpoints_compatible", "region:us"],
    "pipeline_tag": "text-generation",
    "library_name": "transformers",
    "createdAt": "2026-05-26T09:00:04.000Z",
    "modelId": "JetBrains/Mellum2-12B-A2.5B-Base",
    "siblings": [
        // ... file list ...
    ]
}
```

---
**Digest:** no drops today
