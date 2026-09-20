# Research: mellum2-quant-watch-2026-07-30

**Date:** 2026-07-30
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Structured Findings Document

**ID:** mellum2-quant-watch-2026-07-30
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

As of 2026-07-30, no new community-quantized versions of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) from the specified trusted publishers have been identified on Hugging Face within the last 24 hours. The search encompassed preferred quantization formats including GGUF (Q4_K_M, Q5_K_M, Q3_K_M, Q6_K, Q8_0), AWQ 4-bit, GPTQ 4-bit, ExLlamaV2/EXL2, and MLX.

All relevant model entries found via the Hugging Face API had `lastModified` timestamps predating the 24-hour window (i.e., before 2026-07-29 00:00:00 UTC). Several supplementary source URLs resulted in fetch errors, but the primary API search was successfully processed.

### Key Findings

1.  **No New Quants from Trusted Publishers:** A direct query to the Hugging Face API (`https://huggingface.co/api/models?search=Mellum2&full=true`) was executed. After filtering by the list of `Trusted publishers` (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community) and checking the `lastModified` timestamp, no models were found to have been published or updated within the last 24 hours (relative to 2026-07-30).
2.  **Latest Activity Outside Window:** The most recent `lastModified` timestamp observed for any Mellum2 model in the API results was `2026-07-22T01:13:55.000Z` for `junwatu/Mellum2-12B-A2.5B-Instruct-GGUF`. This timestamp falls outside the specified 24-hour monitoring window. Additionally, `junwatu` is not on the list of trusted publishers.
3.  **No Matching Quant Formats within Window:** Even if models from non-trusted publishers were considered, none of the identified Mellum2 variants with specified quantization formats (GGUF, MLX) had a `lastModified` date within the last 24 hours. No AWQ, GPTQ, or ExLlamaV2/EXL2 quants were observed in the results from any publisher within the relevant timeframe.

### Questions Answered

**Question:** Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?

**Answer:** No, a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant from a trusted publisher has not been published or updated on Hugging Face within the last 24 hours (as of 2026-07-30).

### Gaps / Follow-up

1.  **Inaccessible Profile Pages:** Several supplementary Hugging Face profile URLs (e.g., `https://huggingface.co/bartowski`, `https://huggingface.co/unsloth`, `https://huggingface.co/mradermacher`, `https://huggingface.co/MaziyarPanahi`, `https://huggingface.co/QuantFactory`, `https://huggingface.co/lmstudio-community`) and a Reddit search URL (`https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day`) resulted in "FETCH ERROR" messages. While the primary Hugging Face API search is expected to be comprehensive for model listings, direct inspection of these profiles could potentially reveal discussions or unlisted models not captured by the general search API, or provide context on reported quality regressions.
2.  **Prior Research Findings Access:** The instruction to "Do NOT re-report quants seen in previous days — check `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files" could not be fulfilled due to lack of access to the specified file system path. This report assumes that any model with a `lastModified` date outside the 24-hour window is considered "already-known" for the purpose of this specific daily watch. Future automation should integrate access to this historical data.
3.  **File Size Verification:** For any future findings, precise file sizes for the smallest variants fitting 8GB VRAM (~6GB weights) would require parsing the `siblings` array and potentially making additional API calls or scraping model pages to get file sizes, as the initial API output does not provide this detail directly.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```
