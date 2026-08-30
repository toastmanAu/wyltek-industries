# Research: mellum2-quant-watch-2026-08-30

**Date:** 2026-08-30
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Structured Findings Document

**ID:** mellum2-quant-watch-2026-08-30
**Date:** 2026-08-30
**Analyst:** Argus (Wyltek Industries)
**Research Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

A comprehensive search of the Hugging Face API for "Mellum2" models was conducted to identify any newly published community-quantized versions within the last 24 hours (i.e., models modified on 2026-08-29 or 2026-08-30). The search focused on specified quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) and trusted publishers.

Based on the provided API response, no new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants were found to have been published or modified on Hugging Face within the specified 24-hour window. All listed models had `lastModified` timestamps prior to 2026-08-14.

### Key Findings

1.  **Hugging Face API Search:** The primary search was performed using the Hugging Face API endpoint `https://huggingface.co/api/models?search=Mellum2&full=true`.
2.  **Timestamp Analysis:** Each model entry in the API response was inspected for its `lastModified` timestamp.
    *   The latest `lastModified` timestamp observed among the Mellum2 models was `2026-08-13T10:20:54.000Z` for `JetBrains/Mellum2-12B-A2.5B-Thinking-SFT`.
    *   All other `lastModified` timestamps were from June or earlier in August 2026.
    *   None of the models were modified on 2026-08-29 or 2026-08-30.
3.  **No New Quants Identified:** As no models had a `lastModified` date within the last 24 hours relative to the research task date (2026-08-30), no new community-quantized versions of Mellum2 models were found.
4.  **Publisher and Format Scope:** The search covered all Mellum2 variants and potential quantization formats, including GGUF (Q4_K_M, Q5_K_M, Q3_K_M, Q6_K, Q8_0), AWQ 4-bit, GPTQ 4-bit, ExLlamaV2/EXL2, and MLX. No new models matching these criteria were found from any publisher, trusted or otherwise, within the timeframe.

### Questions Answered

**Research Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

**Answer:** No, a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant has **not** been published to Hugging Face in the last 24 hours (as of 2026-08-30).

### Gaps / Follow-up

1.  **File Size Information:** The provided Hugging Face API response (`full=true`) does not include individual file sizes within the `siblings` array. This prevents accurate calculation of the "total file size for the smallest variant that fits 8GB VRAM (~6GB weights)" as requested, if a new model had been found. A separate API call or web scraping would be required to obtain this detail.
2.  **Quality Regression Data:** The API response does not contain information regarding reported quality regression versus the base BF16 model. This would typically be found within the model card (`README.md`), which is not directly accessible via this API endpoint.
3.  **External Publisher Pages & Reddit:** Attempts to fetch content from specific trusted publisher pages (bartowski, unsloth, mradermacher, MaziyarPanahi, QuantFactory, lmstudio-community) and the `r/LocalLLaMA` subreddit resulted in "FETCH ERROR" or general HTML, preventing any independent verification or discovery of models not directly tagged with "Mellum2" but potentially relevant.
4.  **Prior Research Findings:** The instruction to "Do NOT re-report quants seen in previous days — check `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files" could not be fulfilled due to lack of access to the specified file path. However, since no new quants were identified in this search, this limitation did not impact the current report's primary conclusion.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example structure of a model entry from the API response, showing `lastModified` field:

```json
{
    "_id": "6a1563f96ea5882878c82ed4",
    "id": "JetBrains/Mellum2-12B-A2.5B-Thinking",
    "author": "JetBrains",
    "gated": false,
    "lastModified": "2026-08-13T10:20:47.000Z",
    "likes": 332,
    "trendingScore": 1,
    "private": false,
    "sha": "a7311550557e93cc706ab5dd3d879c1a11703ab4",
    "downloads": 2454,
    "tags": [
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
    "siblings": [
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
