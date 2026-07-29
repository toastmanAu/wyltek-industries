# Research: mellum2-quant-watch-2026-07-29

**Date:** 2026-07-29
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**Wyltek Industries - Technical Research Findings**

**ID:** mellum2-quant-watch-2026-07-29
**Date:** 2026-07-29
**Analyst:** Argus

---

### Summary

This research task aimed to identify any community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) published to Hugging Face within the last 24 hours by a list of trusted publishers. The search prioritized specific GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, and MLX quantization formats.

A direct query to the Hugging Face API for "Mellum2" models was performed. After reviewing the `lastModified` timestamps for all returned results, no models from the specified JetBrains Mellum2-12B-A2.5B family, whether base or quantized by trusted or untrusted publishers, were found to have been updated or published within the last 24 hours (i.e., on or after 2026-07-28). All listed models had `lastModified` dates in June 2026 or earlier.

### Key Findings

1.  **No Recent Quants Found:** No community-quantized versions of any JetBrains Mellum2-12B-A2.5B model variant were published or updated on Hugging Face within the last 24 hours (since 2026-07-28).
2.  **Timestamp Analysis:** All models returned by the Hugging Face API search for "Mellum2" had `lastModified` timestamps prior to July 28, 2026. The most recent modification date observed was `2026-07-22T01:13:55.000Z` for `junwatu/Mellum2-12B-A2.5B-Instruct-GGUF`, which is outside the 24-hour window and also from an untrusted publisher.
3.  **Publisher and Format Irrelevance (due to age):** Since no models met the primary "last 24h" criterion, detailed checks for trusted publishers, specific quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX), bit-widths, and file sizes were not performed for new drops.

### Questions Answered

**Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**
No, a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant has not been published to Hugging Face in the last 24 hours.

### Gaps / Follow-up

1.  **Prior Research Findings Access:** The instruction to "Do NOT re-report quants seen in previous days — check `~/.claude/shared/research-findings/` for prior mellum2-quant-watch-* files and skip already-known repos" could not be fulfilled due to lack of access to the specified file path. This is a recurring limitation for tasks requiring historical context.
2.  **Truncated API Response:** The provided JSON from `https://huggingface.co/api/models?search=Mellum2&full=true` appears to be truncated at the end (specifically, the last entry `jedisct1/Mellum2-12B-A2.5B-Instruct-mlx-8bit` is incomplete). While this did not impact the current finding (as its `lastModified` date was too old anyway), it could be a concern for future searches if recent models are affected.
3.  **Quality Regression Information:** If new quants were found, assessing "any reported quality regression vs base BF16" would require parsing model cards or discussion sections, which is not directly available from the provided API snippet. This would necessitate additional HTTP requests to individual model pages.
4.  **Non-API Source Errors:** Attempts to access `https://huggingface.co/models?search=mellum2&sort=createdAt`, `https://huggingface.co/bartowski`, `https://huggingface.co/unsloth`, `https://huggingface.co/mradermacher`, `https://huggingface.co/MaziyarPanahi`, `https://huggingface.co/QuantFactory`, `https://huggingface.co/lmstudio-community`, `https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions`, `https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions`, and `https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day` resulted in `FETCH ERROR` or HTML content, indicating these were not suitable for direct data extraction for this task.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```

No new quants found today.
