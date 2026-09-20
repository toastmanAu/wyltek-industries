# Research: mellum2-quant-watch-2026-08-01

**Date:** 2026-08-01
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**Wyltek Industries - Technical Research Findings**

**ID:** mellum2-quant-watch-2026-08-01
**Analyst:** Argus
**Date:** 2026-08-01

---

### Summary

This research task aimed to identify any community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) published to Hugging Face within the last 24 hours. The search prioritized GGUF, AWQ, GPTQ, and ExLlamaV2/EXL2 formats from a list of trusted publishers.

Based on the provided Hugging Face API data, no new community-quantized Mellum2-12B-A2.5B model variants from the specified trusted publishers have been released or updated within the last 24 hours (relative to 2026-08-01). The most recent relevant model modification found was on 2026-07-22, which falls outside the target timeframe.

### Key Findings

1.  **No New Quants Found:** A comprehensive scan of the Hugging Face API for "Mellum2" models, filtered by the specified trusted publishers and a 24-hour publication/modification window (relative to 2026-08-01), yielded no new results.
2.  **Latest Relevant Activity:** The most recent modification date for any Mellum2-related quantized model from a trusted publisher was `2026-07-22T01:13:55.000Z` for `junwatu/Mellum2-12B-A2.5B-Instruct-GGUF`. This timestamp is outside the 24-hour window preceding 2026-08-01.
3.  **Publisher Coverage:** The search included models from `JetBrains`, `WithinUsAI`, `bartowski`, `mdamir97`, `skilledu`, `RJ000`, `jedisct1`, `JSchneemann`, `shailesh83`, `junwatu`, and `RedHatAI`. Of these, `bartowski`, `junwatu`, `JSchneemann`, `RJ000`, `shailesh83`, and `jedisct1` had previously published quantized versions of Mellum2 variants.
4.  **Quantization Formats Observed (Historical):** The API output showed historical releases in GGUF (various `Q_K_M`, `Q_K`, `Q_0` types), MLX (4-bit, 8-bit), and FP8-Dynamic (for vLLM). No AWQ, GPTQ, or ExLlamaV2/EXL2 formats were found in the provided API snippet, even historically, from the listed publishers.

### Questions Answered

**Research Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

**Answer:** No community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants from the specified trusted publishers have been published or modified on Hugging Face within the last 24 hours (i.e., on 2026-07-31 or 2026-08-01).

### Gaps / Follow-up

1.  **File Size Information:** The Hugging Face API response (`https://huggingface.co/api/models?search=Mellum2&full=true`) does not include file sizes for individual `siblings` (model files). This prevents accurate determination of "total file size for the smallest variant that fits 8GB VRAM (~6GB weights)" without making assumptions or performing additional API calls per model to retrieve file details.
2.  **Quality Regression Reporting:** The provided API output does not contain explicit fields for "reported quality regression vs base BF16". This information would typically be found within a model's `README.md` or discussion section, which is not directly accessible via the provided API endpoint.
3.  **Incomplete Source Content:** Several provided source URLs (e.g., `https://huggingface.co/models?search=mellum2&sort=createdAt`, `https://huggingface.co/bartowski`, `https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day`) resulted in "FETCH ERROR" or HTML snippets, preventing their analysis for relevant model releases or discussions. This may indicate an issue with the data retrieval process for these secondary sources.
4.  **AWQ/GPTQ/ExLlamaV2/EXL2 Absence:** No models matching AWQ, GPTQ, or ExLlamaV2/EXL2 formats were found in the provided API data, even historically. Further investigation would be needed to confirm if these formats are simply not being used for Mellum2, or if the search criteria/data source is incomplete for these types.

### Relevant Code/API Snippets

The primary API endpoint used for this research:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```

Example of a historically found GGUF model entry (not within the last 24h, but shows structure):

```json
{
  "_id": "6a1ed286c0fa89ba7a7df014",
  "id": "junwatu/Mellum2-12B-A2.5B-Instruct-GGUF",
  "author": "junwatu",
  "gated": false,
  "lastModified": "2026-07-22T01:13:55.000Z",
  "likes": 2,
  "trendingScore": 0,
  "private": false,
  "sha": "79f1c3cd35ad0839263a19b6b73da4070eb73a66",
  "downloads": 187,
  "tags": [
    "gguf",
    "llama.cpp",
    "mellum2",
    "moe",
    "code",
    "quantized",
    "text-generation",
    "base_model:JetBrains/Mellum2-12B-A2.5B-Instruct",
    "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Instruct",
    "license:apache-2.0",
    "endpoints_compatible",
    "region:us",
    "conversational"
  ],
  "pipeline_tag": "text-generation",
  "library_name": "gguf",
  "createdAt": "2026-06-02T12:54:30.000Z",
  "modelId": "junwatu/Mellum2-12B-A2.5B-Instruct-GGUF",
  "siblings": [
    { "rfilename": ".gitattributes" },
    { "rfilename": "Mellum2-12B-A2.5B-Instruct-Q4_K_M.gguf" },
    { "rfilename": "README.md" }
  ]
}
```
