# Research: mellum2-quant-watch-2026-08-29

**Date:** 2026-08-29
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**Wyltek Industries - Technical Research Findings**

**ID:** mellum2-quant-watch-2026-08-29
**Analyst:** Argus
**Date:** 2026-08-29

---

### Summary

This research task aimed to identify any newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) on Hugging Face within the last 24 hours. The search prioritized specific quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) from a list of trusted publishers.

After analyzing the provided Hugging Face API response, no new community-quantized Mellum2-12B-A2.5B model variants were found to have been published or modified within the specified 24-hour window (i.e., on or after 2026-08-28T00:00:00Z). All listed models had `lastModified` timestamps significantly older than this timeframe, with the most recent being from August 13, 2026.

### Key Findings

1.  **Search Scope:** The search was performed against the Hugging Face API endpoint `https://huggingface.co/api/models?search=Mellum2&full=true`.
2.  **Timeframe Analysis:** All model entries returned by the API query were inspected for their `lastModified` timestamp. The target window was "last 24 hours" relative to 2026-08-29.
3.  **No Recent Updates:** The most recent `lastModified` timestamp found among the Mellum2 models was `2026-08-13T10:20:54.000Z` for `JetBrains/Mellum2-12B-A2.5B-Thinking-SFT`. This date falls outside the 24-hour window preceding 2026-08-29.
4.  **No New Quants Identified:** Consequently, no community-quantized Mellum2-12B-A2.5B model variants meeting the "published in the last 24h" criterion were identified from the provided data.
5.  **Unusable Source Content:** Additional HTML source content provided (e.g., `https://huggingface.co/models?search=mellum2&sort=createdAt`, various user profiles, and model discussions) resulted in "FETCH ERROR" and contained HTML rather than structured API data, rendering them unusable for the direct API search method specified.

### Questions Answered

**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

**Answer:** No community-quantized versions of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) have been published or updated on Hugging Face within the last 24 hours as of 2026-08-29.

### Gaps / Follow-up

1.  **File System Access for Prior Quants:** The instruction to "Do NOT re-report quants seen in previous days — check `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files" could not be directly executed due to lack of access to the specified file system. This report relies solely on the `lastModified` timestamp from the Hugging Face API to determine "new" status.
2.  **Explicit File Sizes in API:** The Hugging Face API response (`/api/models?search=Mellum2&full=true`) does not provide explicit file sizes for individual model files within the `siblings` array. To accurately determine the "total file size for the smallest variant that fits 8GB VRAM (~6GB weights)", a secondary API call (e.g., to `https://huggingface.co/{repo_id}/tree/main`) or manual inspection would be required for any identified new quants. This was not necessary for this task as no new quants were found.
3.  **Quality Regression Information:** The API response does not directly expose "reported quality regression vs base BF16". This information would typically be found within the model card (`README.md`) or discussion sections, requiring further parsing if new quants were identified.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`
