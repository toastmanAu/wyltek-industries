# Research: mellum2-quant-watch-2026-09-02

**Date:** 2026-09-02
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**Research Task ID:** mellum2-quant-watch-2026-09-02
**Date of Report:** 2026-09-02

## Summary

A comprehensive search of the Hugging Face API for community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) published within the last 24 hours (i.e., on or after 2026-09-01) by trusted publishers yielded no new results. The search criteria included specific quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) and a predefined list of trusted community publishers.

All models identified through the API search were either published by JetBrains directly (not a community quantizer for this task), were not quantized, were published by non-trusted authors, or had a `lastModified` timestamp outside the specified 24-hour window.

## Key Findings

1.  **No New Community Quants Found:** No community-quantized versions of any JetBrains Mellum2-12B-A2.5B model variant were found to have been published to Hugging Face in the last 24 hours (since 2026-09-01 00:00:00Z).
2.  **Search Scope:** The search was performed using the Hugging Face API endpoint `https://huggingface.co/api/models?search=Mellum2&full=true`.
3.  **Timestamp Analysis:** The most recently modified model related to "Mellum2" in the search results was `JetBrains/Mellum2-12B-A2.5B-Base-Pretrain`, with a `lastModified` timestamp of `2026-08-31T13:06:19.000Z`. This timestamp falls outside the 24-hour reporting window (relative to 2026-09-02).
4.  **Publisher and Quantization Type Filtering:** All other models found were either from non-trusted publishers (e.g., `yuxinlu1`, `WithinUsAI`, `mdamir97`, `skilledu`, `RJ000`, `jedisct1`, `shailesh83`, `junwatu`, `RedHatAI`, `josephmayo`) or were official JetBrains models (not community quants) and/or were not quantized (e.g., `safetensors` format).

## Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    No, a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant by a trusted publisher has not been published to Hugging Face in the last 24 hours.

## Gaps / Follow-up

1.  **Missing File Size Information in API:** The Hugging Face models API (`/api/models`) does not directly provide the file sizes of individual model files (`siblings` array only lists `rfilename`). To accurately assess if a model variant fits 8GB VRAM (~6GB weights), a secondary API call (e.g., to `/api/models/{modelId}/tree/main`) or direct web scraping of the model page would be required to obtain file sizes. This was not critical for this report as no new quants were found, but would be essential for future positive findings.
2.  **Quality Regression Data:** Information regarding "reported quality regression vs base BF16" is typically found within a model's `README.md` or discussions, not directly in the API metadata. This would require visiting the model card URL for any identified new quants.
3.  **External Source Fetch Errors:** Attempts to access additional context URLs (e.g., `https://huggingface.co/models?search=mellum2&sort=createdAt`, publisher profiles, model discussions) resulted in "FETCH ERROR". This limited the analysis solely to the primary API search result, which was sufficient for this specific task but could be a limitation for more nuanced research.

## Relevant Code/API Snippets

The primary API endpoint used for this research:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```

**Digest for claude-code:**
no drops today
