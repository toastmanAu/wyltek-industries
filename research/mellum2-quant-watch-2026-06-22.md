# Research: mellum2-quant-watch-2026-06-22

**Date:** 2026-06-22
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**Research Task ID:** mellum2-quant-watch-2026-06-22
**Date:** 2026-06-22

### Summary

As of 2026-06-22, a comprehensive search of the Hugging Face API for community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) published within the last 24 hours yielded no new results. All identified Mellum2 model variants and their quantized versions were last modified prior to the 24-hour window (i.e., before 2026-06-21).

Therefore, no new GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, or MLX quantized models from trusted publishers (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community) were detected today.

### Key Findings

1.  **Search Scope:** The search targeted Hugging Face models matching "Mellum2" using the `https://huggingface.co/api/models?search=Mellum2&full=true` endpoint.
2.  **Time Window:** The analysis focused on models with a `lastModified` timestamp within the 24 hours preceding 2026-06-22.
3.  **No Recent Updates:** All models returned by the API query, including base models and existing quantized versions, showed `lastModified` dates earlier than 2026-06-21. The most recent modification observed was on 2026-06-13.
4.  **Publisher Check:** Since no new models were found within the specified timeframe, no checks against the list of trusted publishers were necessary for new drops.
5.  **Quantization Formats:** Existing quantized models in the search results included GGUF (Q2_K, Q4_K_M, Q6_K, Q8_0, MXFP4_MOE) and AWQ (INT4), as well as MLX (4-bit, 8-bit, and full precision). However, none of these were new within the last 24 hours.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    No, no new community-quantized versions of any JetBrains Mellum2-12B-A2.5B model variant were published to Hugging Face within the last 24 hours.

### Gaps / Follow-up

1.  **File Size Information:** The provided Hugging Face API response (`full=true`) does not directly include file sizes for individual `siblings` (quantized files). To determine the "total file size for the smallest variant that fits 8GB VRAM (~6GB weights)," additional API calls or parsing of individual model cards would be required. This was not performed due to the lack of new models.
2.  **Quality Regression Data:** Information regarding "reported quality regression vs base BF16" is typically found within the model card (`README.md`). The provided API output does not include the full content of `README.md` files, making it impossible to assess this criterion without further requests. This was not performed due to the lack of new models.
3.  **HTML Content Errors:** Several provided source URLs (e.g., `huggingface.co/models?search=mellum2&sort=createdAt`, `huggingface.co/bartowski`, `reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day`) resulted in `FETCH ERROR` or returned HTML content that could not be programmatically parsed for the specific model metadata required by the task. Relying solely on the structured API endpoint was necessary.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example structure of a relevant model entry (though none were recent enough):

```json
{
  "_id": "6a27ca194f7d11dcac666d66",
  "id": "yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF",
  "author": "yuxinlu1",
  "gated": false,
  "lastModified": "2026-06-09T09:17:02.000Z", // Key field for date filtering
  "likes": 23,
  "trendingScore": 15,
  "private": false,
  "sha": "a9c7b1a32ead28d4a868ff31bbf9c15a97362cfe",
  "downloads": 5765,
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
