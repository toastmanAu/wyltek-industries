# Research: mellum2-quant-watch-2026-09-14

**Date:** 2026-09-14
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Research Findings: Mellum2 Quantization Watch

**ID:** mellum2-quant-watch-2026-09-14
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

As of 2026-09-14, no new community-quantized versions of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, or Base) have been published to Hugging Face within the last 24 hours (i.e., since 2026-09-13T00:00:00Z). The most recently modified Mellum2 model found in the search results was updated on 2026-08-31, which falls outside the specified 24-hour window.

Therefore, no new drops meeting the criteria were identified today.

### Key Findings

1.  **Search Scope:** The Hugging Face API (`https://huggingface.co/api/models?search=Mellum2&full=true`) was queried to retrieve all models matching "Mellum2".
2.  **Timestamp Analysis:** Each model's `lastModified` timestamp was inspected against the target 24-hour window (2026-09-13T00:00:00Z to 2026-09-14T23:59:59Z).
    *   The latest `lastModified` timestamp observed across all returned models was `2026-08-31T13:06:19.000Z` for `JetBrains/Mellum2-12B-A2.5B-Base-Pretrain`.
    *   All other Mellum2 models listed in the API response had `lastModified` dates prior to 2026-08-31.
3.  **No Recent Publications:** No models were found to have been published or updated within the specified 24-hour period. Consequently, no further checks for quantization format, publisher, file size, or quality regression were necessary for new drops.
4.  **Publisher and Format Overview (for historical context, not new drops):** While no new models were found, the existing Mellum2 quants in the search results include various formats (GGUF, MLX, FP8) and are from a mix of publishers, some of which are not on the explicitly trusted list (e.g., `yuxinlu1`, `mlx-community`, `mdamir97`, `skilledu`, `RJ000`, `jedisct1`, `JSchneemann`, `shailesh83`, `developerjeremylive`, `josephmayo`).

### Questions Answered

**Research Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

**Answer:** No, a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant has not been published to Hugging Face in the last 24 hours.

### Gaps / Follow-up

1.  **Prior Research Findings Access:** The instruction to "Do NOT re-report quants seen in previous days — check `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files" could not be fulfilled due to lack of access to the specified file path. This report assumes that any model with a `lastModified` date outside the 24-hour window is considered "already-known" and thus not a "new drop".
2.  **Quality Regression Information:** The API output does not directly provide information on "reported quality regression vs base BF16". This would require parsing the `README.md` of individual model cards, which is beyond the scope of a direct API query analysis.
3.  **Exact File Sizes:** While GGUF file sizes can be estimated based on bit-width and parameter count (assuming ~2.5B active parameters for MoE VRAM calculations), the exact file sizes for specific GGUF variants (e.g., `Mellum2-12B-A2.5B-Thinking.Q3_K_M.gguf`) are not directly available in the top-level API response and would require deeper inspection of each model's `siblings` list and potentially additional API calls or web scraping.
4.  **Publisher Clarification:** The `RedHatAI` organization published a model. While `bartowski` is listed as a trusted publisher and is a Senior ML Engineer at RedHat, it's unclear if `RedHatAI` as an organization should be considered a "trusted publisher" for this task.

### Relevant Code/API Snippets

```
https://huggingface.co/api/models?search=Mellum2&full=true
```
