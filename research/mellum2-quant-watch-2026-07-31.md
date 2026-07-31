# Research: mellum2-quant-watch-2026-07-31

**Date:** 2026-07-31
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**Wyltek Industries - Technical Research Findings**

**ID:** mellum2-quant-watch-2026-07-31
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

This report details the findings from a search for newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants on Hugging Face within the last 24 hours (2026-07-30T00:00:00Z to 2026-07-31T23:59:59Z). The search focused on specific quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) and a predefined list of trusted community publishers.

Based on the provided Hugging Face API data, no new community-quantized Mellum2-12B-A2.5B model variants from the specified trusted publishers were found to have been created or modified within the last 24-hour window. All relevant model entries in the API response were last updated or created prior to the specified timeframe.

### Key Findings

1.  **Search Scope:** The search targeted models containing "Mellum2" in their ID, published by `bartowski`, `unsloth`, `mradermacher`, `MaziyarPanahi`, `TheBloke`, `QuantFactory`, or `lmstudio-community`.
2.  **Time Window:** The analysis focused on models with `createdAt` or `lastModified` timestamps between `2026-07-30T00:00:00Z` and `2026-07-31T23:59:59Z`.
3.  **API Results Analysis:** All models returned by the Hugging Face API search for "Mellum2" had `lastModified` and `createdAt` timestamps earlier than the specified 24-hour window. The most recent modification date observed for any Mellum2 model was `2026-07-22T01:13:55.000Z` for `junwatu/Mellum2-12B-A2.5B-Instruct-GGUF`, but `junwatu` is not on the list of trusted publishers.
4.  **No New Quants Found:** Consequently, no community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants meeting the criteria were identified as published within the last 24 hours by trusted publishers.

### Questions Answered

**Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**
No, a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant from the specified trusted publishers has not been published to Hugging Face in the last 24 hours (as of 2026-07-31).

### Gaps / Follow-up

1.  **Access to Prior Research Findings:** The instruction to "Do NOT re-report quants seen in previous days — check `~/.claude/shared/research-findings/` for prior `mellu m2-quant-watch-*` files" could not be fulfilled due to lack of access to the specified directory. For this report, all entries in the provided API output were treated as potentially new, but none met the time criteria.
2.  **Incomplete Source Content:** Several provided source URLs (e.g., `https://huggingface.co/models?search=mellum2&sort=createdAt`, `https://huggingface.co/bartowski`, `https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day`) resulted in "FETCH ERROR" or HTML output instead of the expected JSON or relevant data. This prevented a comprehensive search beyond the initial API call. Follow-up is needed to ensure all specified data sources are accessible and correctly parsed.
3.  **File Size Details:** Since no new quants were identified, the specific file sizes for variants fitting 8GB VRAM and reported quality regressions could not be extracted. This information would be critical if new models are found in future checks.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example of a model entry from the API response, illustrating the fields checked:

```json
{
  "_id": "6a1ed286c0fa89ba7a7df014",
  "id": "junwatu/Mellum2-12B-A2.5B-Instruct-GGUF",
  "author": "junwatu", // Not a trusted publisher
  "gated": false,
  "lastModified": "2026-07-22T01:13:55.000Z", // Outside 24h window for 2026-07-31
  "likes": 2,
  "trendingScore": 0,
  "private": false,
  "sha": "79f1c3cd35ad0839263a19b6b73da4070eb73a66",
  "downloads": 186,
  "tags": ["gguf", "llama.cpp", "mellum2", "moe", "code", "quantized", "text-generation", "base_model:JetBrains/Mellum2-12B-A2.5B-Instruct", "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Instruct", "license:apache-2.0", "endpoints_compatible", "region:us", "conversational"],
  "pipeline_tag": "text-generation",
  "library_name": "gguf",
  "createdAt": "2026-06-02T12:54:30.000Z", // Outside 24h window for 2026-07-31
  "modelId": "junwatu/Mellum2-12B-A2.5B-Instruct-GGUF",
  "siblings": [
    { "rfilename": ".gitattributes" },
    { "rfilename": "Mellum2-12B-A2.5B-Instruct-Q4_K_M.gguf" }, // Example of a GGUF file
    { "rfilename": "README.md" }
  ]
}
```

---
**Digest:** no drops today
