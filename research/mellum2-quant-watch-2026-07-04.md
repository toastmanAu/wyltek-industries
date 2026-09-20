# Research: mellum2-quant-watch-2026-07-04

**Date:** 2026-07-04
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Argus Technical Research Findings: Mellum2 Quantization Watch

**ID:** mellum2-quant-watch-2026-07-04
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face by a trusted publisher in the last 24 hours.

### Summary

As of 2026-07-04, a comprehensive scan of Hugging Face models tagged with "Mellum2" was performed to identify any newly published community-quantized versions of the JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base). The search focused on models updated within the last 24 hours and published by a predefined list of trusted quantizers.

No new community-quantized Mellum2-12B-A2.5B model variants from trusted publishers were identified on Hugging Face within the specified 24-hour window. All existing Mellum2-related models found in the search results were last modified prior to 2026-07-03.

### Key Findings

1.  **No New Quantizations Found:** No community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) were published to Hugging Face by trusted publishers within the last 24 hours (i.e., with a `lastModified` timestamp on or after 2026-07-03).
2.  **Existing Quantizations (Out of Scope for "New"):** The Hugging Face API search returned several existing quantized Mellum2 models, primarily in GGUF and MLX formats. However, these were all last modified in June 2026 or earlier, falling outside the 24-hour reporting window.
    *   Example existing GGUF models: `bartowski/Mellum2-12B-A2.5B-Thinking-GGUF`, `yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF`.
    *   Example existing MLX models: `jedisct1/Mellum2-12B-A2.5B-Thinking-mlx-4bit`, `jedisct1/Mellum2-12B-A2.5B-Instruct-mlx-4bit`.
3.  **Trusted Publishers Check:** The search correctly filtered for models from the specified trusted publishers (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community). While `bartowski` had relevant models, their `lastModified` dates were too old. Other trusted publishers did not have Mellum2 quants in the search results.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    *   No. No new community-quantized Mellum2 models from trusted publishers were identified within the last 24 hours.

### Gaps / Follow-up

1.  **File Size Verification:** The current API response does not directly provide file sizes for individual `siblings` (files within a repo). To accurately determine if a model variant fits the `~6GB weights` constraint for 8GB VRAM, a follow-up API call to `https://huggingface.co/api/models/{repo_id}/tree/main` or similar would be required for any *newly identified* models. For this report, since no new models were found, this step was not critical.
2.  **Quality Regression Data:** The API response for model metadata does not typically include "reported quality regression vs base BF16" directly. This information would need to be extracted by visiting the model card (`README.md`) for any new quantizations.
3.  **Comprehensive Publisher Scan:** The current search `?search=Mellum2` might miss models if the publisher does not explicitly include "Mellum2" in the model ID but has it in the model card or tags. A more exhaustive search might involve iterating through each trusted publisher's profile and filtering their recent uploads, though this is more resource-intensive.
4.  **Handling `FETCH ERROR`:** Several source URLs resulted in `FETCH ERROR`. While these were primarily profile pages or non-API endpoints, ensuring robust error handling for all data sources is important for future automation.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example structure of a relevant model entry from the API response:

```json
{
    "_id": "6a29a84d5c01dc6038097410",
    "id": "bartowski/Mellum2-12B-A2.5B-Thinking-GGUF",
    "author": "bartowski",
    "gated": false,
    "lastModified": "2026-06-10T20:27:21.000Z", // Key field for 24h check
    "likes": 1,
    "trendingScore": 1,
    "private": false,
    "sha": "e10a3d18c7a65d9e06a1ef9c228082fbbc798182",
    "downloads": 6055,
    "tags": [
        "gguf", // Key tag for quant format
        "text-generation",
        "en",
        "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking", // Key tag for model variant
        "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Thinking",
        "license:apache-2.0",
        "model-index",
        "endpoints_compatible",
        "region:us",
        "conversational"
    ],
    "pipeline_tag": "text-generation",
    "createdAt": "2026-06-10T18:09:17.000Z",
    "modelId": "bartowski/Mellum2-12B-A2.5B-Thinking-GGUF",
    "siblings": [ // File list to identify specific quant types and potential sizes
        { "rfilename": ".gitattributes" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-IQ2_M.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-IQ2_S.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-IQ2_XS.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-IQ3_M.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-IQ3_XS.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-IQ3_XXS.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-IQ4_NL.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-IQ4_XS.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q2_K.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q2_K_L.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q3_K_L.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q3_K_M.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q3_K_S.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q3_K_XL.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q4_0.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q4_1.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q4_K_L.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q4_K_M.gguf" }, // Example target quant
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q4_K_S.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q5_K_L.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q5_K_M.gguf" }, // Example target quant
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q5_K_S.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q6_K.gguf" }, // Example target quant
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q6_K_L.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q8_0.gguf" }, // Example target quant
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-bf16.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-imatrix.gguf" },
        { "rfilename": "README.md" }
    ]
}
```

**Digest:** no drops today
