# Research: mellum2-quant-watch-2026-07-13

**Date:** 2026-07-13
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**Research Task ID:** mellum2-quant-watch-2026-07-13
**Date:** 2026-07-13

## Summary

This research aimed to identify any newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) on Hugging Face within the last 24 hours (relative to 2026-07-13). The search prioritized specific quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2, MLX) and focused on models uploaded by a list of trusted community publishers.

Upon analyzing the provided Hugging Face API response for models matching "Mellum2", no new quantized models from the specified trusted publishers were found to have been created or modified within the 24-hour window. The most recent `lastModified` timestamp observed in the dataset was 2026-06-12T15:13:19.000Z, which is over a month prior to the research date.

Therefore, no new community-quantized Mellum2 model drops were identified on Hugging Face today from the specified sources.

## Key Findings

1.  **No New Quants Identified:** No community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) from the list of trusted publishers were found with a `lastModified` or `createdAt` timestamp within the last 24 hours (i.e., on 2026-07-12 or 2026-07-13).
2.  **Timestamp Analysis:** The most recent `lastModified` date across all Mellum2 models in the provided API response was `2026-06-12T15:13:19.000Z` for `RedHatAI/Mellum2-12B-A2.5B-Thinking-FP8-Dynamic`. This falls significantly outside the 24-hour target window.
3.  **Publisher Filtering:** Of the listed trusted publishers, only `mradermacher` had Mellum2-related quantized models in the provided data. However, these models (`mradermacher/Mellum2-12B-A2.5B-Thinking-GGUF`, `mradermacher/Mellum2-12B-A2.5B-Instruct-i1-GGUF`, `mradermacher/Mellum2-12B-A2.5B-Thinking-Abliterated-GGUF`) were last modified on 2026-06-05 and 2026-06-04, confirming they are not new drops.
4.  **Quantization Format Availability (Historical):** The provided data shows existing GGUF and MLX (4-bit, 8-bit) quantized models for Mellum2-12B-A2.5B-Thinking and Instruct variants. No AWQ, GPTQ, or ExLlamaV2/EXL2 formats were present in the provided (partial) API response.

## Questions Answered

*   **Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.**
    No drops today.

## Gaps / Follow-up

1.  **Incomplete API Response:** The provided Hugging Face API response (`https://huggingface.co/api/models?search=Mellum2&full=true`) appears to be truncated with a `FETCH ERROR`. This means the analysis was performed on an incomplete dataset, and there might be more recent Mellum2 models not included in the provided source. A full, untruncated API response is necessary for a comprehensive search.
2.  **File Size Information:** The provided API output for model `siblings` only lists filenames, not their sizes. If new quants were identified, additional API calls or manual inspection would be required to determine file sizes for VRAM compatibility.
3.  **Quality Regression Data:** Information regarding reported quality regression versus base BF16 models is not directly available in the provided API JSON. This would typically necessitate parsing model cards or discussion forums, which was not applicable as no new quants were found.
4.  **Prior Research Findings Access:** The instruction to cross-reference with `~/.claude/shared/research-findings/` could not be executed in this environment. It is assumed that this step would be performed if new quants were discovered.

## Relevant Code/API Snippets

The primary API endpoint used for this research was:
```
https://huggingface.co/api/models?search=Mellum2&full=true
```

Key fields for filtering and analysis included:
*   `lastModified`: Timestamp for recent activity.
*   `createdAt`: Timestamp for initial publication.
*   `author`: To identify trusted publishers.
*   `tags`: To identify quantization formats (e.g., "gguf", "mlx", "quantized") and model variants (e.g., "thinking", "instruct").
*   `siblings`: To list associated files, which would require further querying for size.

Example structure of a relevant entry:
```json
{
  "_id": "...",
  "id": "mradermacher/Mellum2-12B-A2.5B-Thinking-GGUF",
  "author": "mradermacher", // Trusted publisher
  "gated": false,
  "lastModified": "2026-06-05T15:41:20.000Z", // Check against 24h window
  "likes": 1,
  "trendingScore": 1,
  "private": false,
  "sha": "...",
  "downloads": 376,
  "tags": ["transformers", "gguf", "en", "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking", "quantized"],
  "pipeline_tag": "text-generation",
  "library_name": "transformers",
  "createdAt": "2026-06-04T12:11:52.000Z",
  "modelId": "mradermacher/Mellum2-12B-A2.5B-Thinking-GGUF",
  "siblings": [
    {"rfilename": ".gitattributes"},
    {"rfilename": "Mellum2-12B-A2.5B-Thinking.Q4_K_M.gguf"}, // Check quant format and bit-width
    {"rfilename": "README.md"} // Link to model card for quality regression
  ]
}
```
