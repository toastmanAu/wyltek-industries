# Research: mellum2-quant-watch-2026-07-20

**Date:** 2026-07-20
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Wyltek Industries - Technical Research Findings

**ID:** mellum2-quant-watch-2026-07-20
**Date:** 2026-07-20
**Analyst:** Argus

### Summary

This research task aimed to identify any newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) on Hugging Face within the last 24 hours. The search prioritized GGUF (Q4_K_M, Q5_K_M, Q3_K_M, Q6_K, Q8_0), followed by AWQ 4-bit, GPTQ 4-bit, ExLlamaV2/EXL2, and MLX formats, from a list of trusted publishers.

Based on the provided Hugging Face API data, no new community-quantized Mellum2-12B-A2.5B model variants were published by any author, including the specified trusted publishers, within the last 24 hours (relative to 2026-07-20). All entries in the provided API response had a `lastModified` timestamp older than 2026-07-19T00:00:00Z.

### Key Findings

1.  **No New Quants Identified:** A comprehensive scan of the provided Hugging Face API response for "Mellum2" models revealed no entries with a `lastModified` timestamp within the last 24 hours (i.e., on or after 2026-07-19T00:00:00Z). The most recent `lastModified` date observed in the dataset was `2026-06-12T15:13:19.000Z`.
2.  **Existing Quant Formats (Older):** The provided data does show several older quantized versions of the Mellum2-12B-A2.5B-Thinking and Mellum2-12B-A2.5B-Instruct models, primarily in GGUF and MLX formats. These include:
    *   `JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M`
    *   `JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q8_0`
    *   `JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q6_K`
    *   `yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF` (containing Q2_K, Q4_K_M, Q6_K, Q8_0)
    *   `RJ000/Mellum2-12B-A2.5B-Thinking-GGUF` (containing Q4_K_M)
    *   `JSchneemann/Mellum2-12B-A2.5B-Thinking-GGUF` (containing BF16, Q4_K_M, Q6_K, Q8_0)
    *   `shailesh83/Mellum2-Thinking-Q4_K_M`
    *   `junwatu/Mellum2-12B-A2.5B-Instruct-GGUF` (containing Q4_K_M)
    *   `jedisct1/Mellum2-12B-A2.5B-Thinking-mlx-4bit`
    *   `jedisct1/Mellum2-12B-A2.5B-Thinking-mlx-8bit`
    *   `jedisct1/Mellum2-12B-A2.5B-Instruct-mlx-4bit`
    *   `jedisct1/Mellum2-12B-A2.5B-Instruct-mlx-8bit`
    *   One FP8 dynamic model: `RedHatAI/Mellum2-12B-A2.5B-Thinking-FP8-Dynamic` (not a target quant format, but noted).
3.  **Trusted Publishers:** While several trusted publishers (e.g., `bartowski`, `mradermacher`, `QuantFactory`, `lmstudio-community`) were listed in the task, none of the models found in the provided API response were published by these specific accounts within the specified 24-hour window. The existing quantized models were primarily from `JetBrains`, `yuxinlu1`, `RJ000`, `jedisct1`, `JSchneemann`, `shailesh83`, `junwatu`, and `RedHatAI`.

### Questions Answered

**Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**

No drops today.

### Gaps / Follow-up

1.  **Missing File Size Information:** The provided Hugging Face API response (`https://huggingface.co/api/models?search=Mellum2&full=true`) does not include individual file sizes for the `siblings` array. This prevents accurate calculation of "total file size for the smallest variant that fits 8GB VRAM (~6GB weights leaving room for KV cache)". To fulfill this requirement, a more detailed API call per model or direct scraping of model pages would be necessary.
    *   *Estimated sizes for a 12B model (BF16 is ~24GB):*
        *   GGUF Q4_K_M: ~6 GB (fits 8GB VRAM)
        *   GGUF Q5_K_M: ~7.5 GB (tight fit for 8GB VRAM)
        *   GGUF Q3_K_M: ~4.5 GB (fits 8GB VRAM)
        *   GGUF Q6_K: ~9 GB (unlikely to fit 8GB VRAM)
        *   GGUF Q8_0: ~12 GB (unlikely to fit 8GB VRAM)
        *   AWQ 4-bit: ~6 GB (fits 8GB VRAM)
        *   GPTQ 4-bit: ~6 GB (fits 8GB VRAM)
        *   ExLlamaV2/EXL2 (4-bit): ~6 GB (fits 8GB VRAM)
        *   MLX 4-bit: ~6 GB (fits 8GB VRAM)
        *   MLX 8-bit: ~12 GB (unlikely to fit 8GB VRAM)
2.  **Missing Quality Regression Data:** The provided API response does not contain information regarding reported quality regression versus the base BF16 model. This data is typically found within the model card (`README.md`) on Hugging Face. Direct access to model cards would be required to assess this.
3.  **Incomplete Hugging Face Data:** The HTML snippets for `https://huggingface.co/models?search=mellum2&sort=createdAt` and individual publisher pages (`bartowski`, `unsloth`, `mradermacher`, `MaziyarPanahi`, `QuantFactory`, `lmstudio-community`) indicated "FETCH ERROR" or were general webpage content, not structured API responses. This means the search was limited to the initial `api/models?search=Mellum2` endpoint, and any models from trusted publishers not returned by that specific search (or published very recently and not yet indexed) would have been missed.
4.  **Prior Research Findings:** The instruction to check `~/.claude/shared/research-findings/` for prior reports could not be executed due to environmental limitations. This report assumes no prior knowledge of previously reported Mellum2 quants.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```

This API returns a JSON array of model objects, each containing metadata such as `id`, `author`, `lastModified`, `tags`, and `siblings` (file list).

Example structure of a relevant model entry (older, but demonstrates data points):

```json
{
  "_id": "6a203059c1afdbf3c1142408",
  "id": "JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M",
  "author": "JetBrains",
  "gated": false,
  "lastModified": "2026-06-04T11:17:07.000Z",
  "likes": 35,
  "trendingScore": 2,
  "private": false,
  "sha": "71a489e7b95efacf89feaaa6fe3b2995f3542409",
  "downloads": 3392,
  "tags": [
    "gguf",
    "mellum",
    "llama.cpp",
    "quantized",
    "moe",
    "thinking",
    "text-generation",
    "en",
    "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking",
    "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Thinking",
    "license:apache-2.0",
    "endpoints_compatible",
    "region:us",
    "conversational"
  ],
  "pipeline_tag": "text-generation",
  "library_name": "gguf",
  "createdAt": "2026-06-03T13:47:05.000Z",
  "modelId": "JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M",
  "siblings": [
    { "rfilename": ".gitattributes" },
    { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q4_K_M.gguf" },
    { "rfilename": "README.md" }
  ]
}
```
