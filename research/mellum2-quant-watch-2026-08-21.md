# Research: mellum2-quant-watch-2026-08-21

**Date:** 2026-08-21
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**Research Task ID:** mellum2-quant-watch-2026-08-21
**Date of Analysis:** 2026-08-21

## Summary

This research aimed to identify any newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) on Hugging Face within the last 24 hours (i.e., since 2026-08-20 00:00:00Z). The search focused on specific quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) and a predefined list of trusted publishers.

Based on the analysis of the Hugging Face API response for "Mellum2" models, no new community-quantized models from the specified trusted publishers were found to have been modified or published within the last 24 hours. All relevant entries from trusted publishers had `lastModified` timestamps prior to 2026-08-20.

## Key Findings

1.  **Search Scope:** The search targeted models containing "Mellum2" in their ID, specifically looking for variants of `Mellum2-12B-A2.5B-Thinking`, `Mellum2-12B-A2.5B-Instruct`, or `Mellum2-12B-A2.5B-Base`.
2.  **Timeframe:** The analysis covered the period from 2026-08-20 00:00:00Z to 2026-08-21 (current time of analysis).
3.  **Trusted Publishers Filter:** Each model's `author` field was checked against the list of trusted publishers: `bartowski`, `unsloth`, `mradermacher`, `MaziyarPanahi`, `TheBloke`, `QuantFactory`, `lmstudio-community`.
4.  **Quantization Format Check:** For any models passing the publisher and timestamp filters, their `tags` and `siblings` (file list) would have been inspected for desired quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX).
5.  **No Recent Drops from Trusted Publishers:**
    *   Several Mellum2 model variants were found in the API response.
    *   Only one model, `bartowski/Mellum2-12B-A2.5B-Instruct-GGUF`, was from a trusted publisher (`bartowski`).
    *   However, its `lastModified` timestamp was "2026-06-10T20:59:41.000Z", which falls outside the last 24-hour window.
    *   All other models listed in the API response were either not from a trusted publisher or had `lastModified` dates well before the 24-hour cutoff.
6.  **File Size Consideration (Not Applicable):** Since no new quants were identified, the requirement to report the smallest variant fitting 8GB VRAM was not applicable.

## Questions Answered

**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

**Answer:** No new community-quantized versions of any JetBrains Mellum2-12B-A2.5B model variant from trusted publishers have been published to Hugging Face in the last 24 hours.

## Gaps / Follow-up

1.  **Prior Research Findings Access:** The instruction to "check `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files" could not be fulfilled as I do not have access to this internal file system. This means any models reported as "new" in this document would be based solely on the `lastModified` timestamp and trusted publisher filter, without cross-referencing against historical findings.
2.  **Source Content Fetch Errors:** Multiple provided source URLs (e.g., `https://huggingface.co/models?search=mellum2&sort=createdAt`, `https://huggingface.co/bartowski`, `https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day`) resulted in "FETCH ERROR" or returned HTML content that was not parsable for the required technical details. This limited the analysis to the single successful API call. Future research should ensure robust access to all specified data sources.
3.  **"mlx-community" vs. "mlx" clarification:** The trusted publishers list includes `lmstudio-community` but not `mlx-community`. The MLX quantization format is listed as low priority. It is assumed that `mlx-community` is not a trusted publisher, but this could be clarified if there's a distinction intended between the `mlx` format and `mlx-community` as a publisher.

## Relevant Code/API Snippets

The primary API endpoint used for this research was:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```
