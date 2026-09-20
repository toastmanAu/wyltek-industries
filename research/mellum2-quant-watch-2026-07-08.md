# Research: mellum2-quant-watch-2026-07-08

**Date:** 2026-07-08
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Wyltek Industries Technical Research Findings

**Research Task ID:** mellum2-quant-watch-2026-07-08
**Date:** 2026-07-08

### Summary

This research aimed to identify any newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) on Hugging Face within the last 24 hours. The search prioritized GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, and MLX formats from a list of trusted publishers.

Upon analysis of the provided Hugging Face API data, no new community-quantized Mellum2 model variants were found that were published or last modified within the specified 24-hour window (i.e., on or after 2026-07-07T00:00:00Z). All listed models, including those from trusted publishers and those featuring desired quantization formats, show `lastModified` dates in early to mid-June 2026, making them older than the 24-hour requirement.

### Key Findings

1.  **No New Quants in Last 24 Hours:** No models matching the "Mellum2" search query on the Hugging Face API (`https://huggingface.co/api/models?search=Mellum2&full=true`) were found to have a `lastModified` timestamp within the last 24 hours relative to 2026-07-08. The most recent `lastModified` date observed in the provided data is `2026-06-12T10:47:58.000Z`.
2.  **Publisher Check:** While several models were from trusted publishers (e.g., `mradermacher`), their `lastModified` dates fell outside the 24-hour window. Other models with recent `lastModified` dates were from non-trusted publishers or were the original JetBrains models, not community quants.
3.  **Quantization Formats:** The API data did show models with GGUF and MLX quantization formats, which are among the target formats. However, none of these met the recency criteria.
    *   **GGUF examples (too old):**
        *   `yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF` (Q2_K, Q4_K_M, Q6_K, Q8_0)
        *   `JetBrains/Mellum2-12B-A2.5B-Instruct-GGUF-MXFP4_MOE` (MXFP4_MOE)
        *   `mradermacher/Mellum2-12B-A2.5B-Thinking-GGUF` (various Q-types)
        *   `mradermacher/Mellum2-12B-A2.5B-Instruct-i1-GGUF` (various Q-types)
        *   `mradermacher/Mellum2-12B-A2.5B-Thinking-Abliterated-GGUF` (various Q-types)
        *   `RJ000/Mellum2-12B-A2.5B-Thinking-GGUF` (Q4_K_M)
        *   `JSchneemann/Mellum2-12B-A2.5B-Thinking-GGUF` (BF16, Q4_K_M, Q6_K, Q8_0)
    *   **MLX examples (too old):**
        *   `jedisct1/Mellum2-12B-A2.5B-Thinking-mlx-4bit` (4-bit)
        *   `jedisct1/Mellum2-12B-A2.5B-Thinking-mlx-8bit` (8-bit)
        *   `jedisct1/Mellum2-12B-A2.5B-Instruct-mlx-4bit` (4-bit)
        *   `sahilchachra/mellum2-12b-a2_5b-thinking-mxfp4-mlx` (MXFP4, 4-bit)
4.  **File Size and VRAM Fit:** This analysis step was not reached as no models met the initial criteria of being published within the last 24 hours by a trusted publisher.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    *   No, based on the provided API data, no such models were published or last modified within the last 24 hours.

### Gaps / Follow-up

1.  **"FETCH ERROR" for HTML Sources:** All provided HTML source links (e.g., `https://huggingface.co/models?search=mellum2&sort=createdAt`, publisher profiles, model discussion pages) resulted in "FETCH ERROR". This prevented:
    *   Verifying the activity of trusted publishers beyond what was in the main API search.
    *   Accessing model cards for details on reported quality regressions (point `e` in the reporting requirements).
    *   Potentially finding models that might not have appeared in the direct API search for "Mellum2" but are related or newly uploaded by a trusted publisher.
2.  **Definition of "Published":** The task specifies "published to Hugging Face in the last 24h". The API `lastModified` field was used as a proxy for this. It is possible a model was "published" (first created) earlier but `lastModified` recently. However, the task implies looking for *new activity* on the model. If "published" strictly means `createdAt`, the provided API output does not include `createdAt` for all entries, only `lastModified`. Assuming `lastModified` is the relevant timestamp for "new activity" within the 24h window.
3.  **Prior Research Findings:** The instruction to "check `~/.claude/shared/research-findings/` for prior mellum2-quant-watch-* files and skip already-known repos" could not be performed as I do not have access to this file system. This report assumes all models in the provided API output are "new" for evaluation against the 24h window, but none passed the time filter.

### Relevant Code/API Snippets

The core of the analysis relied on parsing the JSON response from the Hugging Face API. An example of a relevant entry and its key fields:

```json
{
    "_id": "6a216b88dbd63e7b14027b71",
    "id": "mradermacher/Mellum2-12B-A2.5B-Thinking-GGUF",
    "author": "mradermacher",
    "gated": false,
    "lastModified": "2026-06-05T15:41:20.000Z", // Key field for 24h check
    "likes": 1,
    "trendingScore": 1,
    "private": false,
    "sha": "14c41be53af302dd663d5d5d0bb24f21293c9d28",
    "downloads": 1799,
    "tags": [ // Key field for quant format and variant
        "transformers",
        "gguf",
        "en",
        "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking",
        "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Thinking",
        "license:apache-2.0",
        "endpoints_compatible",
        "region:us",
        "conversational"
    ],
    "library_name": "transformers",
    "createdAt": "2026-06-04T12:11:52.000Z",
    "modelId": "mradermacher/Mellum2-12B-A2.5B-Thinking-GGUF",
    "siblings": [ // Key for file list and sizes
        { "rfilename": ".gitattributes" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking.IQ4_XS.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking.Q2_K.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking.Q3_K_L.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking.Q3_K_M.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking.Q3_K_S.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking.Q4_K_M.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking.Q4_K_S.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking.Q5_K_M.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking.Q5_K_S.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking.Q6_K.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking.Q8_0.gguf" },
        { "rfilename": "README.md" }
    ]
}
```

---
**Digest:** no drops today
