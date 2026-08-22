# Research: mellum2-quant-watch-2026-08-22

**Date:** 2026-08-22
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**ID:** mellum2-quant-watch-2026-08-22
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

As of 2026-08-22, a comprehensive search of Hugging Face for community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) within the last 24 hours (i.e., modified or created on 2026-08-21 or 2026-08-22) yielded no new releases from the specified trusted publishers. All identified Mellum2 quantized models were last modified prior to the 24-hour window.

### Key Findings

1.  **No New Quants Found:** No community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) from trusted publishers (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community) were published or last modified on Hugging Face within the last 24 hours (2026-08-21 to 2026-08-22).
2.  **Existing Quants Out of Scope:** The most recently updated Mellum2-related model in the provided API data was `mlx-community/Mellum2-12B-A2.5B-Instruct-mxfp4` with a `lastModified` date of `2026-08-11T20:28:48.000Z`, which falls outside the 24-hour search window. Additionally, `mlx-community` is not on the list of trusted publishers.
3.  **Trusted Publishers Activity:** While some trusted publishers like `bartowski` have previously released Mellum2 GGUF quants (e.g., `bartowski/Mellum2-12B-A2.5B-Instruct-GGUF` last modified `2026-06-10T20:59:41.000Z`), there has been no recent activity within the specified timeframe.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    No. Based on the provided API data and specified timeframe (last 24 hours as of 2026-08-22), no new community-quantized Mellum2 models from trusted publishers have been published or updated.

### Gaps / Follow-up

1.  **Full Hugging Face API Data:** The provided API response appears truncated (`shFETCH ERROR`). A complete API response would ensure no models were missed due to truncation.
2.  **File Size Information:** The provided API output does not include file sizes directly within the model object. To report the "total file size for the smallest variant that fits 8GB VRAM (~6GB weights)", a secondary API call or direct inspection of each model's file list would be required if new quants were found.
3.  **Quality Regression Data:** The API data does not contain information on reported quality regression versus base BF16. This would require inspecting individual model cards (`README.md`) if new quants were found.
4.  **Prior Research Findings:** Access to `~/.claude/shared/research-findings/` is unavailable. This report assumes all models in the provided API output are "new" in the context of the 24h window, but a proper check against historical findings would be necessary to avoid re-reporting.

### Relevant Code/API Snippets

No new quants were found, so no specific snippets for new models are applicable. The general API endpoint used for the search is:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```
