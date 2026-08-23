# Research: mellum2-quant-watch-2026-08-23

**Date:** 2026-08-23
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Mellum2 Quantization Watch - 2026-08-23

### Summary
This report details the findings of a search for community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) published to Hugging Face within the last 24 hours (i.e., on or after 2026-08-22). The search focused on specific quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) and trusted publishers.

Based on the analysis of the provided Hugging Face API data, no new community-quantized Mellum2-12B-A2.5B model variants from the specified trusted publishers were found to have been published or updated within the last 24 hours. All relevant entries in the dataset had `lastModified` timestamps prior to 2026-08-22.

### Key Findings
1.  **No New Quantizations Found in Last 24 Hours:** A comprehensive scan of the provided Hugging Face API results for "Mellum2" models, filtered by `lastModified` timestamp, revealed no models updated or published by trusted community quantizers (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community) on or after 2026-08-22.
2.  **Latest Relevant Update:** The most recent `lastModified` timestamp among the Mellum2 models in the provided dataset was `2026-08-13T10:20:54.000Z` for `JetBrains/Mellum2-12B-A2.5B-Thinking-SFT`, which is not a community quantization and falls outside the 24-hour window.
3.  **Existing Quantizations (Outside Timeframe/Publisher Scope):** The dataset does contain various GGUF and MLX quantizations of Mellum2 models, but these were either published by JetBrains directly (not community) or by other users outside the trusted publisher list, and all had `lastModified` dates prior to the 24-hour window. Examples include:
    *   `bartowski/Mellum2-12B-A2.5B-Instruct-GGUF` (last modified 2026-06-10)
    *   `mlx-community/Mellum2-12B-A2.5B-Instruct-mxfp4` (last modified 2026-08-11)
    *   `RJ000/Mellum2-12B-A2.5B-Thinking-GGUF` (last modified 2026-06-02)
    *   `jedisct1/Mellum2-12B-A2.5B-Thinking-mlx-4bit` (last modified 2026-06-02)

### Questions Answered
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

**Answer:** No community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants from the specified trusted publishers were found to have been published or updated on Hugging Face in the last 24 hours (as of 2026-08-23).

### Gaps / Follow-up
1.  **Access to Prior Research Findings:** This analysis was performed without access to `~/.claude/shared/research-findings/` for previous `mellum2-quant-watch-*` files. Therefore, the determination of "new" quants is based solely on the provided API snapshot and the 24-hour window, not against a historical record of known quants. If a model was updated *before* the 24-hour window but *after* the last `mellum2-quant-watch` report, it would not be flagged as "new" by this specific query.
2.  **File Size Information in API:** The provided Hugging Face API response (`full=true`) does not include file sizes directly in the top-level model metadata. To determine the "total file size for the smallest variant that fits 8GB VRAM (~6GB weights leaving room for KV cache)", a deeper inspection of each model's `siblings` array and potentially further API calls or web scraping would be required. Given no new quants were found, this was not pursued.
3.  **Quality Regression Data:** The API response does not typically contain information regarding "reported quality regression vs base BF16". This would require parsing individual model cards (`README.md`) which is beyond the scope of the provided API data.
4.  **HTML Source Content:** The HTML snippets provided for `huggingface.co/models?search=mellum2&sort=createdAt`, `huggingface.co/bartowski`, `huggingface.co/unsloth`, `huggingface.co/mradermacher`, `huggingface.co/MaziyarPanahi`, `huggingface.co/QuantFactory`, `huggingface.co/lmstudio-community`, and `reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day` were either "FETCH ERROR" or general webpage content, not structured model data. They did not contribute to identifying new quants.

### Relevant Code/API Snippets
No new quants were found, so no specific snippets to report for new models.
The primary API endpoint used for this analysis was:
`https://huggingface.co/api/models?search=Mellum2&full=true`
