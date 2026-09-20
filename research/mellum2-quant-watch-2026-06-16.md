# Research: mellum2-quant-watch-2026-06-16

**Date:** 2026-06-16
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Structured Findings Document

**Research Task ID:** mellum2-quant-watch-2026-06-16
**Date of Analysis:** 2026-06-16

### Summary

The search for community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) published to Hugging Face within the last 24 hours (since 2026-06-15T00:00:00Z) yielded no new results. All models found via the Hugging Face API with "Mellum2" in their name were last modified prior to the 24-hour window. No new GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, or MLX quantizations from trusted publishers were identified.

### Key Findings

1.  **No New Quantizations Found:** A comprehensive search of the Hugging Face API for models containing "Mellum2" revealed no new community-quantized model variants (Thinking, Instruct, or Base) published or updated by any trusted publisher within the last 24 hours.
2.  **Timestamp Analysis:** All listed models in the API response had `lastModified` timestamps earlier than 2026-06-15T00:00:00Z, falling outside the specified 24-hour window for new drops. The most recent modification date observed was `2026-06-12T10:47:58.000Z`.
3.  **Publisher Coverage:** The search covered models from various publishers, including JetBrains themselves, `yuxinlu1`, `jedisct1`, `josephmayo`, `sahilchachra`, `mradermacher`, `cyankiwi`, `mdamir97`, and `skilledu`. While some of these are not explicitly on the "trusted publishers" list, their models were still checked for recency. None of the explicitly trusted publishers (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community) had new Mellum2 quants in the last 24 hours.
4.  **Quantization Formats:** The existing Mellum2 quantized models found in the API response primarily consist of GGUF (various `Q_K_M`, `Q_K`, `Q8_0`, `MXFP4_MOE`, `BF16`, `IQ` variants) and some MLX formats. No recent AWQ, GPTQ, or ExLlamaV2/EXL2 quants were observed.

### Questions Answered

**Research Goal: Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.**

**Answer:** No, a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant has not been published to Hugging Face in the last 24 hours.

### Gaps / Follow-up

1.  **Incomplete Source Content:** Several provided URLs (e.g., `huggingface.co/models?search=mellum2&sort=createdAt`, `huggingface.co/bartowski`, `reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day`) resulted in "FETCH ERROR" or returned HTML content that was not parsable for structured model data. This may indicate a limitation in the current data retrieval method or temporary network issues. A more robust scraping or direct API access for these endpoints would be beneficial.
2.  **Explicit Quality Regression Data:** The Hugging Face API response for model listings does not directly provide information on "reported quality regression vs base BF16". This data typically resides within the model card's README or discussion sections, which were not accessible in a structured format from the provided API endpoint. Manual inspection of model cards would be required to gather this specific detail for any future new quants.
3.  **File Size Details:** While quantization types allow for estimation of file sizes, the exact file sizes for each specific quantized model were not directly available in the provided API output. To precisely determine the "total file size for the smallest variant that fits 8GB VRAM (~6GB weights)", a deeper dive into each model's file list (e.g., `https://huggingface.co/<repo_path>/tree/main`) would be necessary.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```
