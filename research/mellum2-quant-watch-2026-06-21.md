# Research: mellum2-quant-watch-2026-06-21

**Date:** 2026-06-21
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Mellum2 Quantization Watch - Daily Report

**ID:** mellum2-quant-watch-2026-06-21
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

### Summary

As of 2026-06-21, no new community-quantized versions of the JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) have been published to Hugging Face within the last 24 hours. The search covered all specified quantization formats (GGUF, AWQ 4-bit, GPTQ 4-bit, ExLlamaV2/EXL2, MLX) and trusted publishers. All identified Mellum2-related models and their latest modifications predate the 24-hour window.

### Key Findings

1.  **Search Scope:** The search targeted Hugging Face for models matching "Mellum2" from specified trusted publishers (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community).
2.  **Time Window:** The analysis focused on models with a `lastModified` timestamp on or after 2026-06-20T00:00:00Z.
3.  **No New Quants Found:** All models returned by the Hugging Face API query had `lastModified` timestamps prior to 2026-06-20. The most recent modification observed was on 2026-06-12T10:47:58.000Z for `JetBrains/Mellum2-12B-A2.5B-Base`.
4.  **Quantization Formats Checked:** The search included checks for GGUF (Q4_K_M, Q5_K_M, Q3_K_M, Q6_K, Q8_0), AWQ 4-bit, GPTQ 4-bit, ExLlamaV2/EXL2, and MLX formats. While many existing quants were found (e.g., GGUF, AWQ, MLX), none were new within the specified timeframe.
5.  **Model Variants Covered:** Both base models and quantized versions of Mellum2-12B-A2.5B-Thinking, Mellum2-12B-A2.5B-Instruct, and Mellum2-12B-A2.5B-Base were included in the search results, but none met the recency criteria.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    No, a review of the Hugging Face API for Mellum2 models indicates no new community-quantized versions from the specified trusted publishers have been released or updated within the last 24 hours (since 2026-06-20T00:00:00Z).

### Gaps / Follow-up

1.  **Local Cache Check:** The instruction to check `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files could not be performed due to environmental limitations. This report assumes no prior knowledge of already-known repos. A manual cross-reference would be required if a local cache is maintained.
2.  **Incomplete API Responses:** Several provided source URLs (e.g., `https://huggingface.co/models?search=mellum2&sort=createdAt`, publisher profiles, model discussion pages, and Reddit search) resulted in "FETCH ERROR" or returned HTML content that was not parseable for structured model data. This limited the primary data source to the `https://huggingface.co/api/models?search=Mellum2&full=true` endpoint.
3.  **File Size and Quality Regression Details:** Without direct access to model cards (`README.md` files) or the ability to programmatically query individual file sizes, specific details on total file size for the smallest variant fitting 8GB VRAM (~6GB weights) and reported quality regressions vs. base BF16 could not be extracted for *new* quants. Since no new quants were found, this was not a blocker for the primary goal.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```

This API returns a JSON array of model objects, each containing metadata such as `id`, `author`, `lastModified`, `tags`, and `siblings` (file list). The `lastModified` field was crucial for filtering results within the 24-hour window. An example of a model entry structure:

```json
{
  "_id": "6a27ca194f7d11dcac666d66",
  "id": "yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF",
  "author": "yuxinlu1",
  "gated": false,
  "lastModified": "2026-06-09T09:17:02.000Z",
  "likes": 22,
  "trendingScore": 17,
  "private": false,
  "sha": "a9c7b1a32ead28d4a868ff31bbf9c15a97362cfe",
  "downloads": 5218,
  "tags": [
    "gguf",
    "mellum",
    "mellum2",
    "code",
    "coding",
    "reasoning",
    "thinking",
    "moe",
    "llama.cpp",
    "local-llm",
    "text-generation",
    "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking",
    "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Thinking",
    "license:apache-2.0",
    "endpoints_compatible",
    "region:us",
    "conversational"
  ],
  "pipeline_tag": "text-generation",
  "library_name": "gguf",
  "createdAt": "2026-06-09T08:08:57.000Z",
  "modelId": "yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF",
  "siblings": [
    { "rfilename": ".gitattributes" },
    { "rfilename": "README.md" },
    { "rfilename": "mellum2-claude-Q2_K.gguf" },
    { "rfilename": "mellum2-claude-Q4_K_M.gguf" },
    { "rfilename": "mellum2-claude-Q6_K.gguf" },
    { "rfilename": "mellum2-claude-Q8_0.gguf" }
  ]
}
```
