# Research: mellum2-quant-watch-2026-09-16

**Date:** 2026-09-16
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Research Findings Document

**ID:** mellum2-quant-watch-2026-09-16
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary
As of 2026-09-16, no new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) have been published to Hugging Face by the specified trusted publishers within the last 24 hours. All identified Mellum2-related models and quantizations from the Hugging Face API were last modified prior to the 24-hour window (before 2026-09-15).

### Key Findings
1.  **No New Quants from Trusted Publishers:** A comprehensive search of the Hugging Face API for "Mellum2" models revealed no new uploads or modifications by the designated trusted publishers (`bartowski`, `unsloth`, `mradermacher`, `MaziyarPanahi`, `TheBloke`, `QuantFactory`, `lmstudio-community`) within the last 24 hours (i.e., since 2026-09-15).
2.  **Existing Mellum2 Models:** The API returned several existing Mellum2 models and some community-contributed quantizations. However, their `lastModified` timestamps predate the 24-hour search window, with the most recent being `2026-08-31T13:06:19.000Z` for `JetBrains/Mellum2-12B-A2.5B-Base-Pretrain`.
3.  **Untrusted Publishers:** Several Mellum2-related models were found from publishers not on the approved list (e.g., `yuxinlu1`, `RedHatAI`, `mdamir97`, `skilledu`, `RJ000`, `jedisct1`, `JSchneemann`, `shailesh83`, `junwatu`, `developerjeremylive`, `josephmayo`, `CodeFault`). These were excluded from the primary findings as per the research task's criteria.

### Questions Answered
**Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h by a trusted publisher?**
No, a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant has not been published to Hugging Face by a trusted publisher within the last 24 hours.

### Gaps / Follow-up
1.  **File Size and Quality Regression Details:** The provided API output does not include file sizes for individual quantized files or explicit reported quality regression metrics. If a new quant were found, this information would require a deeper inspection of the specific model repository's `siblings` list (to sum file sizes) and `README.md` or model card for quality details.
2.  **Prior Research Findings Access:** The instruction to "Do NOT re-report quants seen in previous days — check `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files" could not be fulfilled due to lack of access to the specified directory. This report assumes all findings are "new" for the purpose of this exercise.
3.  **HTML Source Content:** The additional HTML source content provided (e.g., `https://huggingface.co/models?search=mellum2&sort=createdAt`, publisher profiles) resulted in "FETCH ERROR" or general webpage content, not structured data. This did not provide additional actionable information beyond the API endpoint.

### Relevant Code/API Snippets

```json
// Hugging Face API call used for primary data extraction
GET https://huggingface.co/api/models?search=Mellum2&full=true

// Example of a model entry from the API response (truncated for brevity)
[
  {
    "_id": "6a1561140ae0b32a09688dd3",
    "id": "JetBrains/Mellum2-12B-A2.5B-Base",
    "author": "JetBrains",
    "gated": false,
    "lastModified": "2026-06-12T10:47:58.000Z", // Timestamp checked against 24h window
    "likes": 26,
    "trendingScore": 2,
    "private": false,
    "sha": "271755e48ab6b2ed0ef224eaaabe2d25275fb8ee",
    "downloads": 17419,
    "tags": ["transformers", "safetensors", "mellum", "text-generation", "en", "arxiv:2605.31268", "license:apache-2.0", "model-index", "eval-results", "endpoints_compatible", "region:us"],
    "pipeline_tag": "text-generation",
    "library_name": "transformers",
    "createdAt": "2026-05-26T09:00:04.000Z",
    "modelId": "JetBrains/Mellum2-12B-A2.5B-Base",
    "siblings": [
      // File list for size calculation and format identification
      {"rfilename":".eval_results/mellum2.yaml"},
      {"rfilename":".gitattributes"},
      {"rfilename":"README.md"},
      {"rfilename":"config.json"},
      {"rfilename":"generation_config.json"},
      {"rfilename":"mellum-logo-dark.svg"},
      {"rfilename":"model-00001-of-00005.safetensors"},
      {"rfilename":"model-00002-of-00005.safetensors"},
      {"rfilename":"model-00003-of-00005.safetensors"},
      {"rfilename":"model-00004-of-00005.safetensors"},
      {"rfilename":"model-00005-of-00005.safetensors"},
      {"rfilename":"model.safetensors.index.json"},
      {"rfilename":"special_tokens_map.json"},
      {"rfilename":"tokenizer.json"},
      {"rfilename":"tokenizer_config.json"}
    ]
  }
  // ... other model entries
]
```

---
**Digest:** no drops today
