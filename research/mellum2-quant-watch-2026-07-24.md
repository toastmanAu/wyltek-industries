# Research: mellum2-quant-watch-2026-07-24

**Date:** 2026-07-24
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Structured Findings Document

**ID:** mellum2-quant-watch-2026-07-24
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

As of 2026-07-24, no new community-quantized versions of the JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) have been published to Hugging Face by any of the specified trusted publishers within the last 24 hours. The search was conducted using the Hugging Face API, filtering by model name, publisher, and modification timestamp. All identified Mellum2-related models from the API were last modified more than 24 hours prior to the research date.

### Key Findings

1.  **Search Scope:** The search targeted Hugging Face models matching "Mellum2" via the official API endpoint `https://huggingface.co/api/models?search=Mellum2&full=true`.
2.  **Timestamp Filtering:** Models were filtered to include only those `lastModified` within the 24-hour window preceding 2026-07-24. No models in the provided API response met this criterion. The most recent `lastModified` timestamp found was `2026-07-22T01:13:55.000Z` for `junwatu/Mellum2-12B-A2.5B-Instruct-GGUF`, which falls outside the 24-hour window.
3.  **Publisher Filtering:** The search also considered models published by the trusted list: `bartowski`, `unsloth`, `mradermacher`, `MaziyarPanahi`, `TheBloke`, `QuantFactory`, `lmstudio-community`. While some models from `bartowski` were found, their `lastModified` dates were in June 2026, making them too old. No models from other trusted publishers were found in the provided API output.
4.  **Quantization Formats:** The search prioritized GGUF (Q4_K_M, Q5_K_M, Q3_K_M, Q6_K, Q8_0), followed by AWQ 4-bit, GPTQ 4-bit, ExLlamaV2/EXL2, and MLX. Although various quantization formats (primarily GGUF and MLX) were present in the overall Mellum2 model list, none were recent enough to be considered new drops.
5.  **VRAM Fit (Not Applicable):** Since no new quants were found, the requirement to report on file size for 8GB VRAM compatibility was not triggered.

### Questions Answered

**Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**
No, a thorough search of the Hugging Face API for Mellum2 models, filtered by trusted publishers and a 24-hour modification window (relative to 2026-07-24), yielded no new community-quantized model drops.

### Gaps / Follow-up

1.  **Dynamic API Access:** The provided source content for non-API Hugging Face pages and Reddit indicated "FETCH ERROR". For future research, direct, live access to these platforms would be beneficial to ensure no information is missed, although the primary instruction was to use the HF API.
2.  **Explicit File Size Information:** The Hugging Face API response (`full=true`) does not directly provide file sizes for individual `rfilename` entries. Manual inspection of model cards or additional API calls would be required to accurately determine total file sizes for VRAM compatibility. For this report, general knowledge of quant sizes was used for hypothetical filtering, but precise data was unavailable.
3.  **Prior Research Findings Access:** The instruction to "check `~/.claude/shared/research-findings/` for prior mellum2-quant-watch-* files and skip already-known repos" could not be performed as this is an external system path. Assuming this check would be performed by the requesting agent (claude-code) or that the current search is for *any* new drop, not just *unseen* repos.

### Relevant Code/API Snippets

The primary API endpoint used for this research:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```
