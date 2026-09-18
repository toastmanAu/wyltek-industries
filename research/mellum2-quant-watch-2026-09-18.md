# Research: mellum2-quant-watch-2026-09-18

**Date:** 2026-09-18
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Mellum2 Quantization Watch - 2026-09-18

**ID:** mellum2-quant-watch-2026-09-18
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

As of 2026-09-18, no new community-quantized versions of the JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) have been published to Hugging Face within the last 24 hours by the specified trusted publishers. All identified Mellum2-related models and quantizations in the Hugging Face API response have `lastModified` timestamps significantly older than the 24-hour window (i.e., before 2026-09-17).

Therefore, for today's watch, there are no new drops to report that meet the criteria.

### Key Findings

1.  **No New Quants Found:** A comprehensive search of the Hugging Face API for "Mellum2" models revealed no new quantized versions published or updated within the last 24 hours (since 2026-09-17).
2.  **Existing Quantizations (Out of Scope for "New"):** Several quantized Mellum2 models exist on Hugging Face, primarily in GGUF format, but their `lastModified` timestamps predate the 24-hour reporting window. Examples include:
    *   `yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF` (last modified 2026-06-09)
    *   `JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q8_0` (last modified 2026-06-04)
    *   `JetBrains/Mellum2-12B-A2.5B-Instruct-GGUF-Q6_K` (last modified 2026-06-04)
    *   Other MLX and FP8 models were also found, but none were recently updated or from the specified trusted publishers.
3.  **Publisher Filtering:** While some models from non-trusted publishers (e.g., `yuxinlu1`, `RJ000`, `jedisct1`, `JSchneemann`, `shailesh83`, `junwatu`, `mdamir97`, `skilledu`, `josephmayo`, `RedHatAI`) were identified, none of these had a `lastModified` date within the last 24 hours. The specified trusted publishers (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community) did not have any Mellum2 models updated in the last 24 hours in the provided API response.
4.  **Source Content Limitations:** Several auxiliary sources (Hugging Face user/org pages, Reddit) resulted in "FETCH ERROR" or were general HTML content, providing no specific model release information. The primary data source was the Hugging Face models API.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**
    *   **Answer:** No, based on the provided Hugging Face API data, no such models from trusted publishers have been published or updated within the last 24 hours.

### Gaps / Follow-up

1.  **Full File Size Data:** The Hugging Face API response for `siblings` only lists filenames. To accurately determine "total file size for the smallest variant that fits 8GB VRAM (~6GB weights)", a secondary API call or direct inspection of each model's files would be required. This was not performed as no new quants were found.
2.  **Quality Regression Data:** Information on "reported quality regression vs base BF16" is typically found in the model card (`README.md`) or associated discussions. This data is not available directly from the `/api/models` endpoint and would require fetching individual model cards. This was not performed as no new quants were found.
3.  **Comprehensive Publisher Check:** The current search relies on `?search=Mellum2`. A more thorough check for trusted publishers might involve iterating through each trusted publisher's profile (`https://huggingface.co/<publisher_name>`) and filtering their models for "Mellum2" and recent activity, rather than relying solely on the general search API. However, the provided source content for publisher profiles resulted in "FETCH ERROR".
4.  **Prior Research Findings:** The instruction to "check `~/.claude/shared/research-findings/` for prior mellum2-quant-watch-* files and skip already-known repos" could not be executed due to environment limitations. This means the report is based purely on the current API snapshot and `lastModified` dates.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```

Example structure of relevant data points from the API response:

```json
{
    "_id": "...",
    "id": "repo_path/model_name",
    "author": "publisher_name",
    "lastModified": "2026-MM-DDTHH:MM:SS.000Z",
    "tags": ["gguf", "mellum", "llama.cpp", "quantized", "moe", "thinking", "4-bit", "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking"],
    "siblings": [
        {"rfilename": "README.md"},
        {"rfilename": "model_variant_Q4_K_M.gguf"},
        {"rfilename": "model_variant_Q6_K.gguf"}
    ],
    "modelId": "repo_path/model_name"
}
```
