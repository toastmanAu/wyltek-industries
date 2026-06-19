# Research: mellum2-quant-watch-2026-06-19

**Date:** 2026-06-19
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**Wyltek Industries - Technical Research Findings**

**ID:** mellum2-quant-watch-2026-06-19
**Date:** 2026-06-19

---

### Summary

This research task aimed to identify any community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) published to Hugging Face within the last 24 hours. The search prioritized GGUF, AWQ 4-bit, GPTQ 4-bit, ExLlamaV2/EXL2, and MLX formats from a list of trusted publishers.

Based on the direct API query to Hugging Face, no new quantized Mellum2-12B-A2.5B model variants were found to have been published or updated within the specified 24-hour window (i.e., on or after 2026-06-18). All identified Mellum2 models and their quantized versions had `lastModified` timestamps preceding this period.

### Key Findings

1.  **No New Quantized Models Found:** A comprehensive search of Hugging Face models tagged with "Mellum2" via the API (`https://huggingface.co/api/models?search=Mellum2&full=true`) revealed no new community-quantized versions of the Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) published or updated within the last 24 hours (relative to 2026-06-19).
2.  **Existing Quantizations (Older):** The API response included several existing quantized models, primarily in GGUF and MLX formats. However, their `lastModified` timestamps were all prior to 2026-06-18. Examples include:
    *   `yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF` (last modified: 2026-06-09)
    *   `JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M` (last modified: 2026-06-04)
    *   `mradermacher/Mellum2-12B-A2.5B-Thinking-i1-GGUF` (last modified: 2026-06-05)
    *   `cyankiwi/Mellum2-12B-A2.5B-Thinking-AWQ-INT4` (last modified: 2026-06-05)
3.  **Publisher Verification:** While no new models were found, the existing models were from a mix of publishers, including `yuxinlu1`, `JetBrains`, `mradermacher`, `cyankiwi`, `RJ000`, `jedisct1`, `JSchneemann`, and `junwatu`. `mradermacher` is on the trusted list.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**
    *   No, no such models were found to have been published or updated within the last 24 hours.

### Gaps / Follow-up

1.  **Access to Prior Research Findings:** The instruction to "Do NOT re-report quants seen in previous days — check ~/.claude/shared/research-findings/ for prior mellum2-quant-watch-* files" could not be fulfilled due to lack of access to the specified file path. This report assumes all models in the API response are "new" for the purpose of date checking, but none met the 24h criteria anyway.
2.  **External Source Fetch Errors:** Attempts to access additional context from `https://huggingface.co/models?search=mellum2&sort=createdAt` and individual publisher profiles (e.g., `https://huggingface.co/bartowski`, `https://huggingface.co/unsloth`, etc.) resulted in `FETCH ERROR` messages. This prevented a broader search beyond the initial API query and direct verification of publisher activity on their profiles. While the primary instruction was to use the `/api/models?search=Mellum2` endpoint, these errors limit the ability to cross-reference or discover models not captured by that specific search term, or to confirm publisher status.
3.  **File Size Verification:** Since no new quants were found, the step to calculate "total file size for the smallest variant that fits 8GB VRAM (~6GB weights)" was not performed. This would require inspecting the `siblings` array for file sizes, which was not necessary given the date filter.
4.  **Quality Regression Data:** Similarly, as no new quants were found, information regarding "any reported quality regression vs base BF16" was not extracted.

### Relevant Code/API Snippets

The primary API endpoint used for this research:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```
