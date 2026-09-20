# Research: mellum2-quant-watch-2026-07-27

**Date:** 2026-07-27
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Research Findings: Mellum2 Quantization Watch

**ID:** mellum2-quant-watch-2026-07-27
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

As of 2026-07-27, no new community-quantized versions of the JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) have been published to Hugging Face within the last 24 hours. The search was conducted using the Hugging Face API, filtering for "Mellum2" models and then examining their creation and last modification timestamps. All identified quantized models were published or last updated prior to the 24-hour window preceding 2026-07-27.

### Key Findings

1.  **No New Quants Found in Last 24 Hours:** A comprehensive search of the Hugging Face API for "Mellum2" models, with a focus on `createdAt` and `lastModified` timestamps relative to 2026-07-27, revealed no new quantized model releases within the specified 24-hour window. The most recent activity for any Mellum2 model was a modification on 2026-07-22, which falls outside the reporting period.
2.  **Target Quant Formats:** The primary target quantization formats for `llama.cpp` (GGUF: Q4_K_M, Q5_K_M, Q3_K_M, Q6_K, Q8_0) and `vLLM/SGLang` (AWQ 4-bit) were considered. Other formats like GPTQ 4-bit, ExLlamaV2 / EXL2, and MLX were also prioritized.
3.  **Trusted Publishers:** The search included checking for models from the specified trusted publishers: bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, and lmstudio-community. While some existing Mellum2 quants from these publishers were identified in the broader search results, none were new within the last 24 hours.
4.  **Existing Quantized Models (Not New):** The API search returned several existing quantized Mellum2 models, primarily in GGUF and MLX formats, from various publishers (including JetBrains themselves, yuxinlu1, bartowski, RJ000, jedisct1, JSchneemann, shailesh83, junwatu, developerjeremylive). However, their `lastModified` and `createdAt` timestamps all predate 2026-07-26.
    *   Example of an existing GGUF model: `bartowski/Mellum2-12B-A2.5B-Thinking-GGUF` (last modified: 2026-06-10)
    *   Example of an existing MLX model: `jedisct1/Mellum2-12B-A2.5B-Thinking-mlx-4bit` (last modified: 2026-06-02)
    *   Example of an existing GGUF model (most recent activity, but still outside 24h window): `junwatu/Mellum2-12B-A2.5B-Instruct-GGUF` (last modified: 2026-07-22)

### Questions Answered

**Research Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

**Answer:** No, a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant has not been published to Hugging Face in the last 24 hours (relative to 2026-07-27).

### Gaps / Follow-up

1.  **Exact File Sizes for VRAM Fitting:** The Hugging Face API response (`/api/models?search=Mellum2&full=true`) does not provide individual file sizes within the `siblings` array. To accurately determine if a model's smallest variant fits within 8GB VRAM (targeting ~6GB weights), an additional API call per model or manual inspection of model pages would be required. For GGUF, typical sizes for Q3_K_M (~5.5GB), Q4_K_M (~6.7GB), and Q5_K_M (~7.5GB) would likely fit, while Q6_K (~8.5GB) and Q8_0 (~11GB) would exceed the target.
2.  **Reported Quality Regression:** The Hugging Face API metadata does not directly expose information regarding reported quality regression (e.g., perplexity, benchmark scores) versus the base BF16 model. This information would typically reside within the model card's `README.md` or linked evaluation results, requiring further parsing beyond the initial API call.
3.  **Source Content Fetch Errors:** Several provided source URLs (e.g., `https://huggingface.co/models?search=mellum2&sort=createdAt`, `https://huggingface.co/bartowski`, `https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day`) resulted in "FETCH ERROR" or HTML content, preventing automated extraction of relevant information. This limited the scope of the search to the primary `/api/models?search=Mellum2&full=true` endpoint. Future research should ensure these endpoints are accessible or alternative methods are provided.
4.  **Prior Research Findings Access:** The instruction to check `~/.claude/shared/research-findings/` for prior `melllum2-quant-watch-*` files could not be executed. This report assumes that any model with a `createdAt` or `lastModified` timestamp older than 2026-07-26 would have been previously reported.

### Relevant Code/API Snippets

The primary API endpoint used for this research:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```
