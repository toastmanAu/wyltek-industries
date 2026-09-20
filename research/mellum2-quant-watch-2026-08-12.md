# Research: mellum2-quant-watch-2026-08-12

**Date:** 2026-08-12
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**Wyltek Industries - Technical Research Findings**

**ID:** mellum2-quant-watch-2026-08-12
**Date:** 2026-08-12
**Analyst:** Argus

---

### Summary

This research task aimed to identify any newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) on Hugging Face within the last 24 hours (i.e., since 2026-08-11). The search focused on specific quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) and a predefined list of trusted publishers.

Based on the direct API query to Hugging Face for "Mellum2" models and subsequent filtering by `createdAt` and `lastModified` timestamps, no new quantized models from the specified trusted publishers were found to have been released or updated within the target 24-hour window.

### Key Findings

1.  **No New Quants from Trusted Publishers:** A comprehensive review of all "Mellum2" models listed via the Hugging Face API (`https://huggingface.co/api/models?search=Mellum2`) revealed no new community-quantized versions published by the trusted publishers (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community) within the last 24 hours (2026-08-11 to 2026-08-12).
2.  **Timestamp Analysis:** The most recent `lastModified` timestamp for any Mellum2 model in the provided API data was 2026-08-04T21:03:51.000Z (NANI-Nithin/Mellum2-12B-A2.5B-Instruct-GGUF), which falls outside the 24-hour target window.
3.  **Publisher Filtering:** Several quantized Mellum2 models exist from non-trusted publishers (e.g., JetBrains, NANI-Nithin, RJ000, jedisct1, JSchneemann, shailesh83, RedHatAI, skilledu, junwatu), but these were excluded as per the research task's criteria.
4.  **Quantization Formats Observed (Historical):** Historically, GGUF (Q4_K_M, MXFP4_MOE, IQ2_M, IQ2_S, IQ2_XS, IQ3_M, IQ3_XS, IQ3_XXS, IQ4_NL, IQ4_XS, Q2_K, Q2_K_L, Q3_K_L, Q3_K_M, Q3_K_S, Q3_K_XL, Q4_0, Q4_1, Q4_K_L, Q4_K_M, Q4_K_S, Q5_K_L, Q5_K_M, Q5_K_S, Q6_K, Q6_K_L, Q8_0, BF16, imatrix) and MLX (4-bit, 8-bit) formats have been published for Mellum2 variants, but none meet the recency and trusted publisher criteria. FP8-Dynamic was also noted.

### Questions Answered

**Q: Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h by a trusted publisher?**

**A:** No, a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant has not been published to Hugging Face in the last 24 hours by any of the specified trusted publishers.

### Gaps / Follow-up

1.  **Full File Size Information:** The provided API output does not include individual file sizes for GGUF or MLX models, which would be necessary to determine the "total file size for the smallest variant that fits 8GB VRAM (~6GB weights leaving room for KV cache)" if a new quant were found. This would require an additional API call per model or parsing model card pages.
2.  **Quality Regression Data:** The API output does not contain information regarding reported quality regression versus base BF16. This would typically be found within the model card (`README.md`) of a specific model, requiring further inspection if a new quant were identified.
3.  **Prior Research Findings Access:** The instruction to "Do NOT re-report quants seen in previous days — check `~/.claude/shared/research-findings/`" implies access to a local file system. For this task, it was assumed that if new quants were found, they would be genuinely new based on the `createdAt` timestamp, as no prior findings were provided for comparison.
4.  **Hugging Face UI/HTML Fetch Errors:** Several provided source URLs (e.g., `https://huggingface.co/models?search=mellum2&sort=createdAt`, `https://huggingface.co/bartowski`) resulted in "FETCH ERROR" or HTML content, indicating issues accessing or parsing these non-API endpoints. While the primary API search was successful, these errors could mask additional information if the API was incomplete or if manual inspection of model pages was required.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```
