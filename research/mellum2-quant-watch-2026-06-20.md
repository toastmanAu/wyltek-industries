# Research: mellum2-quant-watch-2026-06-20

**Date:** 2026-06-20
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Technical Research Findings: Mellum2 Quantization Watch

**ID:** mellum2-quant-watch-2026-06-20
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

As of 2026-06-20, no new community-quantized versions of the JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) from the specified trusted publishers have been identified on Hugging Face within the last 24 hours. All models matching the "Mellum2" search query in the provided API response had `lastModified` timestamps older than 2026-06-19T00:00:00.000Z.

Therefore, no new drops meeting the criteria were found.

### Key Findings

1.  **No Recent Activity from Trusted Publishers:** A comprehensive scan of the Hugging Face API for "Mellum2" models revealed no updates or new uploads from the designated trusted publishers (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community) within the last 24 hours (i.e., since 2026-06-19).
2.  **Existing Quantizations are Older:** Several quantized versions of Mellum2 models exist on Hugging Face, including GGUF and AWQ formats, but their `lastModified` dates precede the 24-hour window. For example, `mradermacher/Mellum2-12B-A2.5B-Thinking-i1-GGUF` (a trusted publisher) was last modified on `2026-06-05T02:58:15.000Z`, and `cyankiwi/Mellum2-12B-A2.5B-Thinking-AWQ-INT4` was last modified on `2026-06-05T09:06:22.000Z`.
3.  **Untrusted Publishers:** While some models were found that matched the quantization formats and model variants, their authors (`yuxinlu1`, `cyankiwi`, `mdamir97`, `skilledu`, `RJ000`, `jedisct1`, `JSchneemann`, `shailesh83`, `junwatu`) are not on the approved list of trusted publishers.
4.  **API Response Limitations:** The provided Hugging Face API JSON response does not include file sizes for individual model files, which is critical for determining the "smallest variant that fits 8GB VRAM (~6GB weights)". This would require additional API calls or parsing of individual model pages. However, this limitation did not impact the current finding as no new models were identified within the timeframe.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    No, based on the provided Hugging Face API data, no new community-quantized versions of Mellum2-12B-A2.5B model variants from trusted publishers have been published or updated within the last 24 hours (since 2026-06-19).

### Gaps / Follow-up

1.  **File Size Information:** The Hugging Face API response for `search=Mellum2` does not include file sizes for individual GGUF, AWQ, or other quantized files. To accurately determine the "smallest variant that fits 8GB VRAM (~6GB weights)", a follow-up API call to `https://huggingface.co/api/models/{repo_id}/tree/main` or similar would be required for each candidate model to list file details. This was not critical for today's "no drops" finding but would be essential if new models were found.
2.  **Quality Regression Data:** The API response does not directly expose reported quality regression metrics. This information would typically reside within the model card (`README.md`) of a specific repository, requiring further inspection of the model page.
3.  **Comprehensive Publisher Check:** The initial API search is broad. While the `author` field helps filter, a more robust check would involve iterating through each trusted publisher's profile (`https://huggingface.co/{publisher_name}/models`) and filtering their recent uploads for Mellum2 models. The provided HTML snippets for publisher pages indicate "FETCH ERROR" or general page content, suggesting direct API access to publisher-specific model lists might be more reliable.
4.  **Prior Research Findings Access:** The instruction mentions checking `~/.claude/shared/research-findings/` to avoid re-reporting. As this is an external system, I operated under the assumption that any model with a `lastModified` date outside the 24-hour window is considered "already-known" for the purpose of this specific "last 24h" check. If new models were found, explicit access to this shared directory would be necessary for accurate filtering.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example structure of a model entry from the API response (truncated for brevity, showing relevant fields):

```json
{
  "_id": "6a27ca194f7d11dcac666d66",
  "id": "yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF",
  "author": "yuxinlu1",
  "lastModified": "2026-06-09T09:17:02.000Z", // Key field for 24h check
  "tags": ["gguf", "mellum", "mellum2", "code", "thinking", "moe", "llama.cpp"], // Key for format and variant
  "siblings": [
    {"rfilename": "mellum2-claude-Q2_K.gguf"},
    {"rfilename": "mellum2-claude-Q4_K_M.gguf"}, // File names indicate quant types
    {"rfilename": "mellum2-claude-Q6_K.gguf"},
    {"rfilename": "mellum2-claude-Q8_0.gguf"}
  ],
  "modelId": "yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF"
}
```
