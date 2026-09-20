# Research: mellum2-quant-watch-2026-08-06

**Date:** 2026-08-06
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**ID:** mellum2-quant-watch-2026-08-06
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

## Structured Findings Document

### Summary
The analysis of Hugging Face API data for JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) was conducted to identify any newly published community-quantized versions within the last 24 hours (specifically, on 2026-08-05 or 2026-08-06). The search prioritized GGUF, AWQ 4-bit, GPTQ 4-bit, ExLlamaV2/EXL2, and MLX formats, and was restricted to a predefined list of trusted community publishers.

Based on the provided (and partially truncated) API response, no new community-quantized Mellum2-12B-A2.5B models from the specified trusted publishers were found to have been modified or published within the last 24 hours. All identified models, including those from trusted publishers, had `lastModified` timestamps prior to the 24-hour search window.

### Key Findings
1.  **No New Quants from Trusted Publishers:** No community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) from the trusted publisher list (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community) were found with a `lastModified` timestamp within the last 24 hours (i.e., between 2026-08-05T00:00:00Z and 2026-08-06T23:59:59Z).
2.  **Existing Quants are Older:** Several GGUF-quantized models from `bartowski` (a trusted publisher) were identified, such as `bartowski/Mellum2-12B-A2.5B-Thinking-GGUF` and `bartowski/Mellum2-12B-A2.5B-Instruct-GGUF`. However, their `lastModified` dates (e.g., 2026-06-10T20:27:21.000Z and 2026-06-10T20:59:41.000Z, respectively) fall outside the specified 24-hour window.
3.  **Non-Trusted Publishers:** Other quantized Mellum2 models were present in the API results from authors not on the trusted list (e.g., `yuxinlu1`, `WithinUsAI`, `RJ000`, `jedisct1`, `shailesh83`, `junwatu`, `RedHatAI`). These were excluded from the primary search goal, and their modification dates were also outside the 24-hour window.
4.  **API Response Truncation:** The provided Hugging Face API response was observed to be truncated (`likeFETCH ERROR`), which may indicate incomplete data. However, the analysis was performed strictly on the available data as per instructions.

### Questions Answered
No community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant has been published to Hugging Face in the last 24h by a trusted publisher. No drops today.

### Gaps / Follow-up
1.  **Complete API Data Retrieval:** The provided Hugging Face API response was truncated. A full, untruncated API response is essential to guarantee that no relevant models were missed during the search.
2.  **Detailed File Size Analysis:** The current API output does not include individual file sizes, which is necessary to precisely determine the "total file size for the smallest variant that fits 8GB VRAM (~6GB weights leaving room for KV cache)". This would require additional API calls per model to fetch specific file details or parsing of model cards.
3.  **Quality Regression Metrics:** Information regarding "reported quality regression vs base BF16" is not available directly in the API JSON. This data would typically be found within the model card's `README.md` or associated discussions, requiring further parsing or manual inspection.
4.  **MoE Expert Offload Specifics:** While GGUF supports MoE, the API output does not specify if the listed GGUF quants are specifically optimized or configured for MoE expert offload to CPU, or if their memory footprint with offload fits the 8GB VRAM target. This would require deeper analysis of model card details or `llama.cpp` specific metadata.
5.  **Access to Prior Research Findings:** Access to `~/.claude/shared/research-findings/` is critical to prevent re-reporting of previously identified quants. Without this, the current report relies solely on the `lastModified` timestamp for novelty.

### Relevant Code/API Snippets
The primary API endpoint utilized for this research:
```
https://huggingface.co/api/models?search=Mellum2&full=true
```

Example structure of a model entry from the API, highlighting `lastModified` and `author` fields used for filtering:
```json
{
  "_id": "6a29a84d5c01dc6038097410",
  "id": "bartowski/Mellum2-12B-A2.5B-Thinking-GGUF",
  "author": "bartowski",
  "gated": false,
  "lastModified": "2026-06-10T20:27:21.000Z", // Key field for 24h check
  "likes": 5,
  "trendingScore": 2,
  "private": false,
  "sha": "e10a3d18c7a65d9e06a1ef9c228082fbbc798182",
  "downloads": 3798,
  "tags": ["gguf", "text-generation", "en", "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking", "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Thinking", "license:apache-2.0", "model-index", "endpoints_compatible", "region:us", "conversational"],
  "pipeline_tag": "text-generation",
  "library_name": "gguf",
  "createdAt": "2026-06-10T18:09:17.000Z",
  "modelId": "bartowski/Mellum2-12B-A2.5B-Thinking-GGUF",
  "siblings": [
    {"rfilename": ".gitattributes"},
    {"rfilename": "Mellum2-12B-A2.5B-Thinking-IQ2_M.gguf"},
    {"rfilename": "Mellum2-12B-A2.5B-Thinking-IQ2_S.gguf"},
    {"rfilename": "Mellum2-12B-A2.5B-Thinking-IQ2_XS.gguf"},
    {"rfilename": "Mellum2-12B-A2.5B-Thinking-IQ3_M.gguf"},
    {"rfilename": "Mellum2-12B-A2.5B-Thinking-IQ3_XS.gguf"},
    {"rfilename": "Mellum2-12B-A2.5B-Thinking-IQ3_XXS.gguf"},
    {"rfilename": "Mellum2-12B-A2.5B-Thinking-IQ4_NL.gguf"},
    {"rfilename": "Mellum2-12B-A2.5B-Thinking-IQ4_XS.gguf"},
    {"rfilename": "Mellum2-12B-A2.5B-Thinking-Q2_K.gguf"},
    {"rfilename": "Mellum2-12B-A2.5B-Thinking-Q2_K_L.gguf"},
    {"rfilename": "Mellum2-12B-A2.5B-Thinking-Q3_K_L.gguf"},
    {"rfilename": "Mellum2-12B-A2.5B-Thinking-Q3_K_M.gguf"},
    {"rfilename": "Mellum2-12B-A2.5B-Thinking-Q3_K_S.gguf"},
    {"rfilename": "Mellum2-12B-A2.5B-Thinking-Q3_K_XL
