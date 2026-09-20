# Research: mellum2-quant-watch-2026-07-26

**Date:** 2026-07-26
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Structured Findings Document

**ID:** mellum2-quant-watch-2026-07-26
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

As of 2026-07-26, no new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) from the specified trusted publishers were found to have been published or updated on Hugging Face within the last 24 hours. The search was conducted using the Hugging Face API, targeting preferred quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) and a list of trusted model uploaders.

All models identified via the API search for "Mellum2" had `lastModified` timestamps older than the 24-hour window preceding 2026-07-26. The most recently modified Mellum2-related model found was `junwatu/Mellum2-12B-A2.5B-Instruct-GGUF`, last updated on `2026-07-22T01:13:55.000Z`, which falls outside the target timeframe and is from an untrusted publisher.

### Key Findings

1.  **Search Scope:** The search targeted models containing "Mellum2" in their ID, specifically looking for variants of `Mellum2-12B-A2.5B` (Thinking, Instruct, Base).
2.  **Target Quantization Formats:** Priority was given to GGUF (Q4_K_M, Q5_K_M, Q3_K_M, Q6_K, Q8_0), followed by AWQ 4-bit, GPTQ 4-bit, ExLlamaV2/EXL2, and MLX.
3.  **Trusted Publishers:** The search was restricted to models published by `bartowski`, `unsloth`, `mradermacher`, `MaziyarPanahi`, `TheBloke`, `QuantFactory`, and `lmstudio-community`.
4.  **Timeframe Analysis:** The "last 24h" window for publication/modification was defined as 2026-07-25T00:00:00Z to 2026-07-26T<current_time>Z.
5.  **API Search Results:** The `https://huggingface.co/api/models?search=Mellum2&full=true` API endpoint returned a list of Mellum2-related models.
6.  **No Recent Updates:** Upon inspection of the `lastModified` timestamps for all returned models, none were found to have been updated within the specified 24-hour window. The most recent `lastModified` timestamp observed was `2026-07-22T01:13:55.000Z` for `junwatu/Mellum2-12B-A2.5B-Instruct-GGUF`.
7.  **Publisher Check:** Even if the `junwatu` model had been updated within the timeframe, `junwatu` is not listed as a trusted publisher. No models from trusted publishers were found with recent modifications.
8.  **Irrelevant Sources:** Other provided source content (Hugging Face profile pages and Reddit search results) either returned "FETCH ERROR" or were not direct API responses for model listings, thus not providing relevant data for this specific research task.

### Questions Answered

**Q: Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h from a trusted publisher?**

**A:** No drops today. No community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants from trusted publishers were found to have been published or updated on Hugging Face within the last 24 hours as of 2026-07-26.

### Gaps / Follow-up

1.  **File Size Information:** The initial Hugging Face API (`/api/models?search=Mellum2&full=true`) does not directly provide file sizes for individual model files (`.gguf`, `.safetensors`, etc.). To fulfill the requirement of reporting "total file size for the smallest variant that fits 8GB VRAM (~6GB weights)", a secondary API call (e.g., to `/api/models/{repo_id}/tree/main` or parsing model card HTML) would be necessary for any identified new quants.
2.  **Prior Research Findings Access:** The instruction to "Do NOT re-report quants seen in previous days — check `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files" could not be fulfilled due to lack of access to the specified file path. This research assumes all models found within the timeframe are "new" unless explicitly filtered by `lastModified` date.
3.  **API Robustness:** Several provided source URLs resulted in "FETCH ERROR" or were not direct API responses as specified. Ensuring reliable access to the target API endpoints is crucial for future research tasks.

### Relevant Code/API Snippets

The primary API endpoint used for model discovery and initial filtering:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```
