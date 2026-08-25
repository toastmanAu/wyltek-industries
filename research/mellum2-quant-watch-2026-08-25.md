# Research: mellum2-quant-watch-2026-08-25

**Date:** 2026-08-25
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**Wyltek Industries - Technical Research Findings**

**ID:** mellum2-quant-watch-2026-08-25
**Date:** 2026-08-25
**Analyst:** Argus

---

### Summary

This research aimed to identify any community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) published to Hugging Face within the last 24 hours (i.e., from 2026-08-24 to 2026-08-25). The search focused on specific quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) and a predefined list of trusted community publishers.

Based on the provided Hugging Face API search results, no new quantized models matching the criteria (Mellum2 family, specific variants, target quant formats, and trusted publishers) were found to have been published or last modified within the specified 24-hour window. The most recent `lastModified` timestamp among the relevant models in the provided data was 2026-08-13, which falls outside the 24-hour scope.

### Key Findings

1.  **No New Quants Found:** A comprehensive review of the provided Hugging Face API data for "Mellum2" models revealed no new community-quantized versions of JetBrains Mellum2-12B-A2.5B (Thinking, Instruct, Base) published or last modified by trusted publishers within the last 24 hours (relative to 2026-08-25).
2.  **Timestamp Analysis:** All models listed in the `huggingface.co/api/models?search=Mellum2&full=true` source had `lastModified` or `createdAt` timestamps predating 2026-08-24. The latest timestamp observed was `2026-08-13T10:20:54.000Z`.
3.  **Publisher Filtering:** The analysis strictly adhered to the provided list of trusted publishers (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community). Models from other authors (e.g., JetBrains, mlx-community, RJ000, jedisct1, shailesh83, junwatu, RedHatAI, developerjeremylive, josephmayo, CodeFault) were excluded from the "new quant" consideration, even if their timestamps were recent, as they were not on the trusted list.
4.  **Data Source Limitations:** Other provided source content (Hugging Face model list sorted by `createdAt`, individual publisher pages, Reddit search) resulted in "FETCH ERROR" or general HTML, preventing their use for specific model metadata extraction and timestamp verification.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**
    *   No, based on the provided Hugging Face API data, no such models from the specified trusted publishers have been published or last modified within the last 24 hours (from 2026-08-24 to 2026-08-25).

### Gaps / Follow-up

1.  **Live API Access:** The primary limitation was the static nature of the provided API response. A live query to the Hugging Face API at the time of analysis (2026-08-25) would be necessary to capture truly real-time updates.
2.  **Full File Metadata:** The provided API snippet does not include file sizes for individual `siblings`. To accurately determine if a model's smallest variant fits the 8GB VRAM (~6GB weights) requirement, a more detailed API call or manual inspection of each model repository would be needed. This was not a critical blocker as no new quants were found, but it would be essential if new models were identified.
3.  **Quality Regression Data:** The API response does not typically include "reported quality regression vs base BF16". This information would usually be found within the model card (`README.md`) of the specific repository, requiring further inspection if a new quant were found.
4.  **Trusted Publisher Scope:** Clarification on whether "mlx-community" or other community-sounding authors should be considered "trusted" if they are not explicitly listed. For this report, strict adherence to the provided list was maintained.

### Relevant Code/API Snippets

The core of the analysis involved iterating through the JSON response from the Hugging Face API:

```json
[
  {
    "_id": "6a2030dd2a6293b98908ceff",
    "id": "JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-MXFP4_MOE",
    "author": "JetBrains",
    "gated": false,
    "lastModified": "2026-06-04T11:17:08.000Z", // Check this timestamp
    "likes": 12,
    "trendingScore": 1,
    "private": false,
    "sha": "d6d873e43daee513323970697c625b682b9f88d4",
    "downloads": 378,
    "tags": ["gguf", "mellum", "llama.cpp", "quantized", "moe", "thinking", "text-generation", "en", "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking", "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Thinking", "license:apache-2.0", "endpoints_compatible", "region:us", "conversational"],
    "pipeline_tag": "text-generation",
    "library_name": "gguf",
    "createdAt": "2026-06-03T13:49:17.000Z",
    "modelId": "JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-MXFP4_MOE",
    "siblings": [
      { "rfilename": ".gitattributes" },
      { "rfilename": "Mellum2-12B-A2.5B-Thinking-MXFP4_MOE.gguf" }, // Infer quant type and potential size
      { "rfilename": "README.md" }
    ]
  },
  // ... other model entries ...
]
```
