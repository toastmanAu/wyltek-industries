# Research: mellum2-quant-watch-2026-08-28

**Date:** 2026-08-28
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Research Findings: Mellum2 Quantized Model Watch (2026-08-28)

**ID:** mellum2-quant-watch-2026-08-28
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

As of 2026-08-28, no new community-quantized versions of the JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) have been published to Hugging Face within the last 24 hours. A comprehensive search of the Hugging Face API for "Mellum2" models revealed that all existing entries have `lastModified` or `createdAt` timestamps prior to 2026-08-27, indicating no recent uploads matching the specified criteria.

The search included checking for preferred quantization formats (GGUF, AWQ 4-bit, GPTQ 4-bit, ExLlamaV2/EXL2, MLX) from a list of trusted publishers. No models from these publishers or others met the recency requirement.

### Key Findings

1.  **No New Quants Found:** A direct query to the Hugging Face API (`https://huggingface.co/api/models?search=Mellum2&full=true`) returned a list of Mellum2-related models. Upon inspection of their `lastModified` and `createdAt` timestamps, none were found to be within the last 24 hours (i.e., on or after 2026-08-27T00:00:00Z). The most recent `lastModified` date observed in the provided data was 2026-08-13T10:20:54.000Z.
2.  **Publisher Scope:** The search implicitly covered models from both JetBrains (the original publisher) and various community quantizers. While several community-quantized models exist (e.g., by `RJ000`, `jedisct1`, `JSchneemann`, `shailesh83`, `junwatu`, `CodeFault`, `developerjeremylive`, `josephmayo`), none of their `lastModified` timestamps fell within the specified 24-hour window.
3.  **Quantization Formats and VRAM Fit:** Due to the absence of new models, no specific analysis of quantization formats (GGUF Q4_K_M, Q5_K_M, Q3_K_M, Q6_K, Q8_0; AWQ 4-bit; GPTQ 4-bit; ExLlamaV2/EXL2; MLX) or file sizes for 8GB VRAM compatibility was required.
4.  **Quality Regression:** No new models meant no new reported quality regressions to assess.

### Questions Answered

**Q: Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**
**A:** No, a thorough review of the Hugging Face API data for "Mellum2" models indicates that no community-quantized versions of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) have been published to Hugging Face in the last 24 hours (since 2026-08-27T00:00:00Z).

### Gaps / Follow-up

1.  **Local File Check:** The instruction to "check `~/.claude/shared/research-findings/` for prior mellum2-quant-watch-* files and skip already-known repos" could not be performed as I do not have access to local file systems. This means any previously reported quants would have been re-evaluated if they met the "last 24h" criteria, though none did in this instance.
2.  **External Source Access:** Several provided source URLs (e.g., `https://huggingface.co/models?search=mellum2&sort=createdAt`, publisher profiles, Reddit search) resulted in "FETCH ERROR" or HTML content that could not be programmatically parsed for model data. While the primary instruction was to use the HF API directly, if new quants were announced or discussed on these platforms without being immediately reflected in the API search results, they would have been missed.
3.  **API Rate Limits/Pagination:** The provided API snippet is a static JSON array. In a live scenario, large search results might be paginated, and rate limits could apply. This analysis assumes the provided JSON is a complete and current snapshot for the query.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

A representative snippet of the data structure for a model, showing the `lastModified` field critical for the "last 24h" check:

```json
{
    "_id": "6a1563f96ea5882878c82ed4",
    "id": "JetBrains/Mellum2-12B-A2.5B-Thinking",
    "author": "JetBrains",
    "gated": false,
    "lastModified": "2026-08-13T10:20:47.000Z", // Key timestamp for recency check
    "likes": 332,
    "trendingScore": 1,
    "private": false,
    "sha": "a7311550557e93cc706ab5dd3d879c1a11703ab4",
    "downloads": 2667,
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
        // ... file list ...
    ]
}
```
