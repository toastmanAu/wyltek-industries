# Research: mellum2-quant-watch-2026-06-26

**Date:** 2026-06-26
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Mellum2 Quantization Watch - Findings Document

**ID:** mellum2-quant-watch-2026-06-26
**Date:** 2026-06-26

### Summary

As of 2026-06-26, no new community-quantized versions of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) have been published to Hugging Face by trusted publishers within the last 24 hours. All identified Mellum2-related models and their quantized variants from the Hugging Face API were last modified or created prior to 2026-06-25.

The search included models from JetBrains and community members, specifically filtering for GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, and MLX formats. While several quantized versions exist from various publishers, none fall within the specified 24-hour publication window.

### Key Findings

1.  **No New Quants in Last 24 Hours:** A comprehensive search of the Hugging Face API for "Mellum2" models, filtered by `createdAt` and `lastModified` timestamps, revealed no new community-quantized models or updates from any publisher within the 24-hour period preceding 2026-06-26. The most recent activity for any Mellum2-related model in the provided API output was on 2026-06-13.
2.  **Existing Quantized Models:** Several quantized versions of Mellum2 models exist on Hugging Face, primarily in GGUF format. These include:
    *   `yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF` (Thinking variant, GGUF Q2_K, Q4_K_M, Q6_K, Q8_0)
    *   `JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M` (Thinking variant, GGUF Q4_K_M)
    *   `JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q6_K` (Thinking variant, GGUF Q6_K)
    *   `JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q8_0` (Thinking variant, GGUF Q8_0)
    *   `mradermacher/Mellum2-12B-A2.5B-Instruct-GGUF` (Instruct variant, GGUF Q2_K, Q3_K_M, Q4_K_M, Q5_K_M, Q6_K, Q8_0, etc.) - from a trusted publisher.
    *   `mradermacher/Mellum2-12B-A2.5B-Instruct-i1-GGUF` (Instruct variant, GGUF Q2_K, Q3_K_M, Q4_K_M, Q5_K_M, Q6_K, etc., with imatrix) - from a trusted publisher.
    *   `phucngodev/Mellum2-12B-A2.5B-Thinking` (Thinking variant, GGUF Q2_K, Q4_K_M, Q6_K, Q8_0)
    *   `RJ000/Mellum2-12B-A2.5B-Thinking-GGUF` (Thinking variant, GGUF Q4_K_M)
    *   `jedisct1/Mellum2-12B-A2.5B-Thinking-mlx-4bit` (Thinking variant, MLX 4-bit)
    *   `JSchneemann/Mellum2-12B-A2.5B-Thinking-GGUF` (Thinking variant, GGUF Q4_K_M, Q6_K, Q8_0)
    *   `junwatu/Mellum2-12B-A2.5B-Instruct-GGUF` (Instruct variant, GGUF Q4_K_M)
3.  **Trusted Publishers Check:** Among the identified models, `mradermacher` is listed as a trusted publisher. However, their Mellum2 quants were last updated on 2026-06-04 and 2026-06-05, falling outside the 24-hour window. No Mellum2 quants were found from `bartowski`, `unsloth`, `MaziyarPanahi`, `TheBloke`, `QuantFactory`, or `lmstudio-community` in the provided API search results.
4.  **Quantization Formats:** GGUF is the predominant quantization format found for Mellum2 models. A single MLX 4-bit model was also identified. No AWQ, GPTQ, or ExLlamaV2/EXL2 quants were present in the API results.
5.  **Model Variants:** Quantized versions were found for the "Thinking" and "Instruct" variants. No community-quantized "Base" variant was explicitly identified, though some repos might contain it without explicit tagging.

### Questions Answered

**Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**

No, a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant has **not** been published to Hugging Face in the last 24 hours (relative to 2026-06-26). All relevant model entries in the provided Hugging Face API data have `lastModified` or `createdAt` timestamps older than 2026-06-25.

### Gaps / Follow-up

1.  **Missing File Sizes in API Response:** The provided Hugging Face API output (`https://huggingface.co/api/models?search=Mellum2&full=true`) does not include the file sizes for individual model files (`.gguf`, `.safetensors`, etc.) within the `siblings` array. This prevents accurate determination of whether a model variant fits the 8GB VRAM constraint (~6GB weights). To fulfill this requirement, a subsequent API call or web scrape to each model's specific page (`https://huggingface.co/<repo_path>/tree/main`) would be necessary to extract file size information.
2.  **Quality Regression Information:** The API output does not contain information regarding reported quality regression versus the base BF16 model. This data would typically be found within the model card (`README.md`) of each repository, requiring further inspection beyond the initial API call.
3.  **Comprehensive Publisher Check:** While the initial API search for "Mellum2" covers models, a direct check of each trusted publisher's profile page (e.g., `https://huggingface.co/bartowski`) would be needed to confirm if they host Mellum2 quants that might not appear in a general `search=Mellum2` query, or if they have recently updated their existing Mellum2 quants without changing the model's `lastModified` timestamp in the main model list. (Note: Attempting to access these URLs directly resulted in `FETCH ERROR` in the provided source content, preventing this deeper inspection).
4.  **Local Research Findings Access:** The instruction to "check ~/.claude/shared/research-findings/ for prior mellum2-quant-watch-* files" cannot be performed in this simulated environment. This means I cannot definitively confirm if any of the *older* quants identified were already reported in previous daily watches. My current assessment relies solely on the 24-hour timestamp filter.

### Relevant Code/API Snippets

The primary API endpoint used for this research:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example structure of a relevant model entry from the API:
```json
{
  "_id": "6a2d2fa56c4bde0e14b3c5d3",
  "id": "phucngodev/Mellum2-12B-A2.5B-Thinking",
  "author": "phucngodev",
  "gated": false,
  "lastModified": "2026-06-13T10:23:33.000Z",
  "likes": 1,
  "trendingScore": 1,
  "private": false,
  "sha": "4929e3f511b5e75e3b8b0be5984b4d30f2dcc070",
  "downloads": 215,
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
  "createdAt": "2026-06-13T10:23:33.000Z",
  "modelId": "phucngodev/Mellum2-12B-A2.5B-Thinking",
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
