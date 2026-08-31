# Research: mellum2-quant-watch-2026-08-31

**Date:** 2026-08-31
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Mellum2 Quantization Watch - 2026-08-31

**ID:** mellum2-quant-watch-2026-08-31
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

### Summary
As of 2026-08-31, no new community-quantized versions of the JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) from the list of trusted publishers have been identified on Hugging Face within the last 24 hours. All models found via the Hugging Face API search for "Mellum2" were last modified prior to August 30, 2026, with the most recent update being on 2026-08-13.

The search included filtering by specified quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) and a predefined list of trusted community publishers. No entries met both the recency and publisher criteria.

### Key Findings

1.  **No Recent Publications:** A comprehensive scan of the Hugging Face API for "Mellum2" models revealed no models with a `lastModified` timestamp within the last 24 hours (i.e., on 2026-08-30 or 2026-08-31). The most recent `lastModified` date observed was `2026-08-13T10:20:54.000Z` for `JetBrains/Mellum2-12B-A2.5B-Thinking-SFT`.
2.  **Publisher Filtering:** Even if models were recent, many listed models were published by "JetBrains" directly or by individuals not on the "trusted publishers" list (e.g., `mdamir97`, `skilledu`, `RJ000`, `jedisct1`, `JSchneemann`, `shailesh83`, `junwatu`, `RedHatAI`, `developerjeremylive`, `josephmayo`, `CodeFault`).
3.  **Quantization Format Coverage (Historical):** Historically, GGUF (Q4_K_M, Q6_K, Q8_0, MXFP4_MOE) and MLX (4-bit, 8-bit) quantized versions of Mellum2-12B-A2.5B-Thinking and Instruct variants have been published, but none recently or by trusted publishers. AWQ, GPTQ, and ExLlamaV2/EXL2 formats were not observed in the provided API response for any Mellum2 model, regardless of publisher or date.
4.  **File Size Considerations (General):** For a 12B model, GGUF Q3_K_M (~6.5GB) would be the most likely candidate to fit within the 8GB VRAM target (leaving ~6GB for weights after KV cache), but it would be a very tight fit. Other GGUF formats like Q4_K_M (~7.6GB), Q5_K_M (~8.5GB), Q6_K (~9.5GB), and Q8_0 (~12GB) would exceed the target weight limit for an 8GB RTX 3060 Ti.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    *   **Answer:** No. Based on the provided API data, no such models were published or last modified within the last 24 hours of 2026-08-31.

### Gaps / Follow-up

1.  **File Size Data:** The Hugging Face API response (`/api/models?search=Mellum2&full=true`) does not directly provide file sizes for individual model files (`.gguf`, `.safetensors`). To accurately determine if a model fits the 8GB VRAM constraint (specifically ~6GB for weights), a follow-up API call to `/api/models/{repo_id}/tree/main` or similar would be required to fetch file metadata including size. For this report, general knowledge of GGUF quantization sizes was used for estimation.
2.  **Quality Regression Information:** The API response does not contain information regarding reported quality regressions (e.g., perplexity, benchmark scores) compared to the base BF16 model. This information would typically be found within the model card (`README.md`), which would require parsing if a relevant model were found.
3.  **Comprehensive Quantization Type Detection:** While tags often indicate quantization, relying solely on tags might miss nuanced quantization types or models where the quantization is implied by the file extension but not explicitly tagged. A deeper inspection of model cards would be necessary for full certainty.
4.  **Trusted Publisher Search Scope:** The current search method relies on iterating through all "Mellum2" models and then filtering by author. A more efficient approach, if the HF API allowed it, would be to search within specific author namespaces (e.g., `huggingface.co/bartowski?search=Mellum2`). However, the provided API endpoint `https://huggingface.co/api/models?search=Mellum2` is global.

### Relevant Code/API Snippets

The primary API endpoint used for this research:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example structure of a relevant model entry (hypothetical, if found):

```json
{
    "_id": "...",
    "id": "trusted_publisher/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M",
    "author": "trusted_publisher",
    "gated": false,
    "lastModified": "2026-08-30T15:30:00.000Z", // Example: within last 24h
    "likes": 123,
    "trendingScore": 5,
    "private": false,
    "sha": "...",
    "downloads": 1000,
    "tags": ["gguf", "mellum", "llama.cpp", "quantized", "moe", "thinking", "4-bit", "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking", "license:apache-2.0"],
    "pipeline_tag": "text-generation",
    "library_name": "gguf",
    "createdAt": "2026-08-30T10:00:00.000Z",
    "modelId": "trusted_publisher/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M",
    "siblings": [
        {"rfilename": ".gitattributes"},
        {"rfilename": "Mellum2-12B-A2.5B-Thinking-Q4_K_M.gguf"}, // Target file
        {"rfilename": "README.md"}
    ]
}
```
