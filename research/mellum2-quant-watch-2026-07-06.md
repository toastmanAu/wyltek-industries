# Research: mellum2-quant-watch-2026-07-06

**Date:** 2026-07-06
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Structured Findings Document

**ID:** mellum2-quant-watch-2026-07-06
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

As of 2026-07-06, no new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) have been published to Hugging Face within the last 24 hours by the specified trusted publishers. All models found via the Hugging Face API search for "Mellum2" had `lastModified` timestamps predating the 24-hour window (i.e., before 2026-07-05).

Therefore, there are no new Mellum2 quants to report today.

### Key Findings

1.  **Hugging Face API Search Executed:** A direct query to the Hugging Face API (`https://huggingface.co/api/models?search=Mellum2&full=true`) was performed to retrieve relevant model information.
2.  **Timestamp Filtering:** Each model entry's `lastModified` timestamp was evaluated against the 24-hour window (relative to 2026-07-06). All retrieved models showed `lastModified` dates in June 2026, indicating they were published or updated more than 24 hours ago.
3.  **No New Quants Identified:** No models matching the criteria (community-quantized, trusted publisher, Mellum2 variant, published/updated in the last 24 hours) were found. The search included checking for GGUF, AWQ 4-bit, GPTQ 4-bit, ExLlamaV2 / EXL2, and MLX formats.
4.  **Trusted Publishers Check:** While the `author` field was inspected for each model, the primary filter of `lastModified` date rendered further checks for specific publishers unnecessary as no recent updates were present.

### Questions Answered

**Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**
No, a review of the Hugging Face API for "Mellum2" models indicates that no new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants have been published or updated within the last 24 hours.

### Gaps / Follow-up

1.  **Prior Research Findings Access:** The instruction to "Do NOT re-report quants seen in previous days — check `~/.claude/shared/research-findings/` for prior mellum2-quant-watch-* files" could not be fully executed as I do not have direct file system access. This report assumes that any model with a `lastModified` timestamp outside the 24-hour window is considered "already-known" for the purpose of this specific daily check.
2.  **Hugging Face Web Scrape Failures:** Several provided source URLs (e.g., `https://huggingface.co/models?search=mellum2&sort=createdAt`, `https://huggingface.co/bartowski`, etc.) resulted in "FETCH ERROR" or returned HTML content rather than structured API data. This prevented any additional verification or discovery beyond the initial API call. Future research might benefit from more robust web scraping capabilities or direct access to a comprehensive, filterable API.
3.  **Quality Regression Data:** The provided API output for models does not explicitly include "reported quality regression vs base BF16" in the tags or file list. If new quants were found, this information would likely need to be extracted from the model card's `README.md` file, which would require an additional fetch per model.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```
