# Research: mellum2-quant-watch-2026-08-19

**Date:** 2026-08-19
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Research Findings Document - Mellum2 Quantization Watch

**ID:** mellum2-quant-watch-2026-08-19
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

This research task aimed to identify any newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B models (Thinking, Instruct, Base variants) on Hugging Face within the last 24 hours (i.e., on or after 2026-08-18T00:00:00Z). The search focused on specific quantization formats (GGUF, AWQ 4-bit, GPTQ 4-bit, ExLlamaV2/EXL2, MLX) and a list of trusted community publishers.

After analyzing the Hugging Face API response for "Mellum2" models, no new community-quantized models from the specified trusted publishers were found to have been released or updated within the target 24-hour window. All relevant models from trusted publishers identified in the search results had `lastModified` dates prior to 2026-08-18.

### Key Findings

1.  **No New Quants from Trusted Publishers:** No community-quantized versions of JetBrains Mellum2-12B-A2.5B models (Thinking, Instruct, Base) from the specified trusted publishers (`bartowski`, `unsloth`, `mradermacher`, `MaziyarPanahi`, `TheBloke`, `QuantFactory`, `lmstudio-community`) were published or updated on Hugging Face in the last 24 hours (relative to 2026-08-19).
2.  **Latest Relevant Modification Date:** The most recent `lastModified` date for any Mellum2 model in the provided API response was `2026-08-13T10:20:54.000Z` (for `JetBrains/Mellum2-12B-A2.5B-Thinking-SFT`), which falls outside the 24-hour reporting window.
3.  **Untrusted Publishers/Base Models:** Several Mellum2 models were identified, including base models from `JetBrains` and quantized models from other community members (e.g., `mlx-community`, `RJ000`, `jedisct1`, `JSchneemann`, `shailesh83`, `junwatu`, `RedHatAI`). However, these either did not originate from the list of trusted publishers or were not updated within the specified timeframe.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    No, a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant from a trusted publisher has not been published or updated to Hugging Face in the last 24 hours.

### Gaps / Follow-up

1.  **File Size Information:** The Hugging Face API response (`/api/models?search=Mellum2&full=true`) does not directly provide file sizes for individual model files (`.gguf`, `.safetensors`). To determine if a model fits the 8GB VRAM (~6GB weights) requirement, a follow-up API call to `https://huggingface.co/api/models/{repo_id}/tree/main` or inspecting the model card would be necessary. This was not performed as no new quants were found.
2.  **Quality Regression Data:** Information regarding reported quality regression versus the base BF16 model is typically found within the model card (`README.md`). Since no new quants were identified, this detail could not be extracted.
3.  **Comprehensive Search Scope:** The provided source content for `https://huggingface.co/models?search=mellum2&sort=createdAt` and various publisher pages resulted in "FETCH ERROR". This indicates that the provided data might be incomplete or that the external fetching process failed, potentially missing relevant new models if they were not captured by the initial `/api/models?search=Mellum2` call. A robust system would require successful retrieval from all specified sources.
4.  **Prior Research Findings Access:** The instruction to check `~/.claude/shared/research-findings/` for prior reports could not be executed. This report assumes no prior knowledge of Mellum2 quants.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```
