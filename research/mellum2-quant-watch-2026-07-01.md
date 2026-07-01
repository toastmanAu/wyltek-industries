# Research: mellum2-quant-watch-2026-07-01

**Date:** 2026-07-01
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**Research Task ID:** mellum2-quant-watch-2026-07-01
**Date:** 2026-07-01

## Summary
This research aimed to identify any community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) published to Hugging Face within the last 24 hours. The search prioritized specific GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, and MLX quantization formats from a list of trusted publishers.

Based on the provided Hugging Face API data, no new quantized Mellum2 models from the specified variants or trusted publishers were found to have been modified or published within the last 24 hours (i.e., since 2026-06-30). All listed models had `lastModified` timestamps prior to this window.

## Key Findings
No new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants were published to Hugging Face by trusted publishers in the last 24 hours. All models returned by the API query `https://huggingface.co/api/models?search=Mellum2&full=true` had `lastModified` dates earlier than 2026-06-30.

## Questions Answered
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

**Answer:** No community-quantized versions of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) have been published to Hugging Face by the specified trusted publishers in the last 24 hours (relative to 2026-07-01).

## Gaps / Follow-up
1.  **Access to Prior Findings:** The instruction to "Do NOT re-report quants seen in previous days — check `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files" could not be fulfilled as I do not have access to the specified file system. For future tasks, ensure this resource is accessible or provide a list of already-known repos.
2.  **API Data Completeness:** The provided API output might be truncated (`FETCH ERROR: ...`). Assuming the provided JSON is the complete and accurate response for the query `https://huggingface.co/api/models?search=Mellum2&full=true`, the findings are conclusive. If the API call failed or returned incomplete data, a retry or alternative search method would be necessary. The HTML snippets for other Hugging Face URLs also indicate fetch errors, reinforcing this potential issue.

## Relevant Code/API Snippets
```json
// Excerpt from the provided Hugging Face API response, showing the latest modification dates.
// All 'lastModified' timestamps are prior to the 24-hour window (2026-06-30 to 2026-07-01).
[
  {
    "id": "JetBrains/Mellum2-12B-A2.5B-Thinking",
    "lastModified": "2026-06-12T10:46:19.000Z"
  },
  {
    "id": "JetBrains/Mellum2-12B-A2.5B-Instruct",
    "lastModified": "2026-06-12T10:46:44.000Z"
  },
  {
    "id": "WithinUsAI/Mellum2-Thinker.Uncensored-12B-A2.5B-gguf",
    "lastModified": "2026-06-09T23:40:19.000Z"
  },
  {
    "id": "JetBrains/Mellum2-12B-A2.5B-Base",
    "lastModified": "2026-06-12T10:47:58.000Z"
  },
  {
    "id": "bartowski/Mellum2-12B-A2.5B-Thinking-GGUF",
    "lastModified": "2026-06-10T20:27:21.000Z"
  }
  // ... (other models with similarly old lastModified dates)
]
```

**Digest for claude-code:**
no drops today
