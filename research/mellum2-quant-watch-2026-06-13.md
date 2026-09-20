# Research: mellum2-quant-watch-2026-06-13

**Date:** 2026-06-13
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Mellum2 Quant Watch - Findings Document

**ID:** mellum2-quant-watch-2026-06-13
**Date:** 2026-06-13

### Summary

This research task aimed to identify any newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) on Hugging Face within the last 24 hours. The search prioritized specific GGUF quantization formats (Q4_K_M, Q5_K_M, Q3_K_M, Q6_K, Q8_0) suitable for RTX 3060 Ti 8GB, followed by AWQ 4-bit, GPTQ 4-bit, ExLlamaV2/EXL2, and MLX. Only models from a predefined list of trusted community publishers were considered.

Based on the analysis of the Hugging Face API (`https://huggingface.co/api/models?search=Mellum2&full=true`), no new community-quantized Mellum2-12B-A2.5B model variants from the specified trusted publishers were released or updated within the last 24 hours (relative to 2026-06-13). All relevant quantized models from trusted publishers had `lastModified` timestamps prior to the 24-hour window.

### Key Findings

1.  **No New Quantized Models from Trusted Publishers:** A comprehensive scan of the Hugging Face API for "Mellum2" models, filtered by the list of trusted community publishers (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community), revealed no new or updated quantized models within the last 24 hours.
2.  **Existing Quantized Models (Not Recent/Not Trusted):**
    *   Several GGUF quantized versions of Mellum2-12B-A2.5B (Thinking and Instruct variants) exist, published by `JetBrains` (e.g., `JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M`, `JetBrains/Mellum2-12B-A2.5B-Instruct-GGUF-Q8_0`). However, `JetBrains` is not on the list of trusted community publishers for this task. Their `lastModified` dates were also outside the 24-hour window (e.g., `2026-06-04`).
    *   Quantized models by `mradermacher` (a trusted publisher) such as `mradermacher/Mellum2-12B-A2.5B-Thinking-i1-GGUF` and `mradermacher/Mellum2-12B-A2.5B-Instruct-SFT-GGUF` were found, offering various GGUF quants (Q2_K, Q3_K_L/M/S, Q4_0/1, Q4_K_M/S, Q5_K_M/S, Q6_K, Q8_0). However, their `lastModified` timestamps (`2026-06-05`) fall outside the specified 24-hour window.
    *   Other quantized models from non-trusted publishers (e.g., `yuxinlu1`, `josephmayo`, `jedisct1`, `sahilchachra`) were also identified but were excluded due to publisher criteria and/or `lastModified` date.
3.  **API Limitations:** The Hugging Face API response for `full=true` provides `rfilename` for siblings but does not include file sizes directly within the initial model metadata. This necessitates additional API calls or web scraping for each file to determine individual file sizes, which was not performed for this task due to the primary finding of no new quants.

### Questions Answered

**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

**Answer:** No, a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant from the specified trusted publishers has not been published to Hugging Face in the last 24 hours.

### Gaps / Follow-up

1.  **File Size Information:** The current API query (`/api/models?search=Mellum2&full=true`) does not provide individual file sizes. To fulfill the requirement of reporting "total file size for the smallest variant that fits 8GB VRAM (~6GB weights)", a follow-up API call to `https://huggingface.co/api/models/{repo_id}/tree/main` or similar, or direct web scraping of model pages, would be necessary for each identified quantized model.
2.  **Quality Regression Data:** Information regarding "reported quality regression vs base BF16" is typically found within a model's `README.md` or discussion sections. The provided API response does not include this content directly. Further parsing of model cards or discussions would be required.
3.  **Prior Research Findings:** The instruction to "check `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files and skip already-known repos" could not be executed as this environment path is inaccessible. This means all models matching the search criteria (regardless of age, before filtering by `lastModified`) were considered for initial analysis.
4.  **HTML Source Content:** The additional HTML source content provided (e.g., `https://huggingface.co/models?search=mellum2&sort=createdAt`, publisher profiles, Reddit search) resulted in "FETCH ERROR" or general website HTML, providing no actionable data for the specific research goal. This confirms the primary reliance on the direct API endpoint.

### Relevant Code/API Snippets

The primary API endpoint used for this research:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```

Example structure of a relevant model entry from the API response (though none met all criteria for "new drop"):

```json
{
  "_id": "6a217cbebb1cb0d0d602b221",
  "id": "mradermacher/Mellum2-12B-A2.5B-Thinking-i1-GGUF",
  "author": "mradermacher",
  "gated": false,
  "lastModified": "2026-06-05T02:58:15.000Z", // Not within last 24h
  "likes": 4,
  "trendingScore": 2,
  "private": false,
  "sha": "e0572142f9abf0e23b01296cdfa3c13b53d8fc5c",
  "downloads": 9031,
  "tags": [
    "transformers",
    "gguf",
    "en",
    "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking",
    "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Thinking",
    "license:apache-2.0",
    "endpoints_compatible",
    "region:us",
    "imatrix",
    "conversational"
  ],
  "library_name": "transformers",
  "createdAt": "2026-06-04T13:25:18.000Z",
  "modelId": "mradermacher/Mellum2-12B-A2.5B-Thinking-i1-GGUF",
  "siblings": [
    { "rfilename": ".gitattributes" },
    { "rfilename": "Mellum2-12B-A2.5B-Thinking.i1-IQ1_M.gguf" },
    { "rfilename": "Mellum2-12B-A2.5B-Thinking.i1-IQ1_S.gguf" },
    { "rfilename": "Mellum2-12B-A2.5B-Thinking.i1-IQ2_M.gguf" },
    { "rfilename": "Mellum2-12B-A2.5B-Thinking.i1-IQ2_S.gguf" },
    { "rfilename": "Mellum2-12B-A2.5B-Thinking.i1-IQ2_XS.gguf" },
    { "rfilename": "Mellum2-12B-A2.5B-Thinking.i1-IQ2_XXS.gguf" },
    { "rfilename": "Mellum2-12B-A2.5B-Thinking.i1-IQ3_M.gguf" },
    { "rfilename": "Mellum2-12B-A2.5B-Thinking.i1-IQ3_S.gguf" },
    { "rfilename": "Mellum2-12B-A2.5B-Thinking.i1-IQ3_XS.gguf" },
    { "rfilename": "Mellum2-12B-A2.5B-Thinking.i1-IQ3_XXS.gguf" },
    { "rfilename": "Mellum2-12B-A2.5B-Thinking.i1-IQ4_NL.gguf" },
    { "rfilename": "Mellum2-12B-A2.5B-Thinking.i1-IQ4_XS.gguf" },
    { "rfilename": "Mellum2-12B-A2.5B-Thinking.i1-Q2_K.gguf" },
    { "rfilename": "Mellum2-12B-A2.5B-Thinking.i1-Q2_K_S.gguf" },
    { "rfilename": "Mellum2-12B-A2.5B-Thinking.i1-Q3_K_L.gguf" },
    { "rfilename": "Mellum2-12B-A2.5B-Thinking.i1-Q3_K_M.gguf" },
    { "rfilename": "Mellum2-12B-A2.5B-Thinking.i1-Q3_K_S.gguf" },
    { "rfilename": "Mellum2-12B-A2.5B-Thinking.i1-Q4_0.gguf" },
    { "rfilename": "Mellum2-12B-A2.5B-Thinking.i1-Q4_1.gguf" },
    { "rfilename": "Mellum2-12B-A2.5B-Thinking.i1-Q4_K_M.gguf" },
    { "rfilename": "Mellum2-12B-
