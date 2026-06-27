# Research: mellum2-quant-watch-2026-06-27

**Date:** 2026-06-27
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**Wyltek Industries - Technical Research Findings**

**ID:** mellum2-quant-watch-2026-06-27
**Date:** 2026-06-27

---

### Summary

This research task aimed to identify any newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) on Hugging Face within the last 24 hours. The search prioritized GGUF (Q4_K_M, Q5_K_M, Q3_K_M, Q6_K, Q8_0), followed by AWQ, GPTQ, ExLlamaV2/EXL2, and MLX formats, specifically from a list of trusted publishers.

Based on the provided (and partially truncated) Hugging Face API response, no new community-quantized Mellum2-12B-A2.5B models from the specified trusted publishers were found to have been modified or published within the last 24 hours (i.e., since 2026-06-26T10:00:00Z). All entries in the provided dataset had `lastModified` timestamps prior to this 24-hour window.

### Key Findings

No new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants from the trusted publishers were identified on Hugging Face within the last 24 hours.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**
    No. Based on the provided data, no models matching the criteria (Mellum2, community-quantized, from trusted publishers, and modified in the last 24 hours) were found.

### Gaps / Follow-up

1.  **Incomplete Hugging Face API Response:** The provided `https://huggingface.co/api/models?search=Mellum2&full=true` source content was truncated with a "FETCH ERROR". This means the search might not have covered all relevant models on Hugging Face, and new quants could exist beyond the provided data. A full, untruncated API response is required for a comprehensive search.
2.  **Lack of Prior Research Findings Access:** The instruction to "Do NOT re-report quants seen in previous days — check ~/.claude/shared/research-findings/ for prior mellum2-quant-watch-* files" could not be fulfilled due to lack of access to the specified directory. This report therefore relies solely on the `lastModified` timestamp to determine "newness" within the 24-hour window, rather than comparing against a historical record of known quants.
3.  **Missing File Size Information in API:** The Hugging Face API response (`siblings` array) only lists filenames, not their sizes. To accurately determine "total file size for the smallest variant that fits 8GB VRAM (~6GB weights)", a secondary API call or web scraping would be necessary for each potential candidate model to retrieve file metadata including size. For this report, estimated sizes based on quantization type were considered conceptually, but no actual file sizes could be extracted.
4.  **Absence of Quality Regression Data:** The request asked for "any reported quality regression vs base BF16". This information is typically found within a model's `README.md` or discussions. Since no new quants were found, this specific detail could not be extracted. If new quants are identified in future searches, their model cards would need to be thoroughly reviewed for this information.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example structure of a model entry (relevant fields for this task):
```json
{
  "id": "yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF",
  "author": "yuxinlu1",
  "lastModified": "2026-06-09T09:17:02.000Z", // Key for "last 24h" filter
  "tags": [ // Key for quant format, bit-width, and base model variant
    "gguf",
    "mellum",
    "mellum2",
    "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking",
    // ... other tags
  ],
  "siblings": [ // Contains filenames, but not sizes
    {"rfilename": "mellum2-claude-Q2_K.gguf"},
    {"rfilename": "mellum2-claude-Q4_K_M.gguf"},
    {"rfilename": "mellum2-claude-Q6_K.gguf"},
    {"rfilename": "mellum2-claude-Q8_0.gguf"}
  ],
  "modelId": "yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF"
}
```
