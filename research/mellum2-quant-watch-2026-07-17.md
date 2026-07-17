# Research: mellum2-quant-watch-2026-07-17

**Date:** 2026-07-17
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Wyltek Industries - Technical Research Findings

**Research Task ID:** mellum2-quant-watch-2026-07-17
**Date:** 2026-07-17

### Summary

No new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) from trusted publishers were found published to Hugging Face in the last 24 hours (relative to 2026-07-17). All models identified via the Hugging Face API were last modified prior to June 12, 2026, and none were uploaded by the specified trusted publishers.

### Key Findings

1.  **No Recent Publications:** A comprehensive search of Hugging Face models tagged "Mellum2" revealed no models with a `lastModified` timestamp within the last 24 hours (i.e., after 2026-07-16T00:00:00Z). All listed models were last modified in June 2026 or earlier.
2.  **No Trusted Publisher Contributions:** None of the Mellum2 model variants found in the Hugging Face API response were published by the designated trusted publishers (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community). The majority were published by `JetBrains` or other community members not on the trusted list.
3.  **Identified Mellum2 Variants (Historical):** The search did identify several Mellum2-12B-A2.5B variants and their quantizations, though none meet the "last 24h" or "trusted publisher" criteria:
    *   `JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M` (Author: JetBrains, Last Modified: 2026-06-04)
    *   `JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q8_0` (Author: JetBrains, Last Modified: 2026-06-04)
    *   `yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF` (Author: yuxinlu1, Last Modified: 2026-06-09) - Contains Q2_K, Q4_K_M, Q6_K, Q8_0 GGUF files.
    *   `RJ000/Mellum2-12B-A2.5B-Thinking-GGUF` (Author: RJ000, Last Modified: 2026-06-02) - Contains Q4_K_M GGUF file.
    *   `JSchneemann/Mellum2-12B-A2.5B-Thinking-GGUF` (Author: JSchneemann, Last Modified: 2026-06-03) - Contains BF16, Q4_K_M, Q6_K, Q8_0 GGUF files.
    *   `shailesh83/Mellum2-Thinking-Q4_K_M` (Author: shailesh83, Last Modified: 2026-06-02) - Contains Q4_K_M GGUF file.
    *   `junwatu/Mellum2-12B-A2.5B-Instruct-GGUF` (Author: junwatu, Last Modified: 2026-06-02) - Contains Q4_K_M GGUF file.
    *   `CodeFault/Mellum2-12B-A2.5B-Instruct-GGUF` (Author: CodeFault, Last Modified: 2026-06-04) - Contains Q4_0, Q4_K_M, Q4_K_S, Q5_K_M, Q6_K GGUF files.
    *   MLX quants (4-bit, 8-bit) from `jedisct1` were also found, but are low priority and not recent.
    *   An FP8-Dynamic model from `RedHatAI` was found, but not a target format.
4.  **File Size Information Gap:** The Hugging Face API response (`https://huggingface.co/api/models?search=Mellum2&full=true`) provides a list of filenames (`siblings`) but does not include their respective sizes. This prevents direct calculation of whether a model variant fits the 8GB VRAM (~6GB weights) requirement without further API calls or manual inspection per model. However, for GGUF, Q4_K_M and Q3_K_M are generally expected to fit a 6GB weight budget for a 12B model.
5.  **Other Sources Unresponsive:** Attempts to query other specified sources (e.g., `https://huggingface.co/models?search=mellum2&sort=createdAt`, trusted publisher profile pages, Reddit) resulted in "FETCH ERROR" or HTML content that did not contain the required structured model data.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**
    No. Based on the provided Hugging Face API data, no new community-quantized Mellum2 models from either JetBrains or any of the specified trusted publishers have been published or modified within the last 24 hours (as of 2026-07-17).

### Gaps / Follow-up

1.  **Hugging Face API File Size Data:** The current API endpoint (`/api/models?search=Mellum2&full=true`) does not return file sizes for individual model files (`siblings`). To accurately assess VRAM fit (requirement 1c), a different API endpoint (e.g., `/api/models/{repo_id}/tree/main`) or additional parsing would be required to fetch file metadata, or a manual check of model cards.
2.  **Access to Prior Research Findings:** The instruction to "Do NOT re-report quants seen in previous days — check `~/.claude/shared/research-findings/`" could not be fulfilled due to lack of access. This report assumes all listed models are "new" in the context of the provided data, though the date filter ultimately made this distinction irrelevant for this specific task.
3.  **Robustness of External Source Fetching:** Multiple external sources (Hugging Face web UI, specific publisher profiles, Reddit) returned "FETCH ERROR". This suggests potential network issues, API rate limits, or changes in website structure that need to be investigated for future research tasks. Relying solely on the `/api/models` endpoint for this task proved sufficient given the date/publisher constraints.

### Relevant Code/API Snippets

The primary API used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example structure of a relevant model entry from the API response (truncated for brevity):

```json
{
  "_id": "6a203059c1afdbf3c1142408",
  "id": "JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M",
  "author": "JetBrains",
  "gated": false,
  "lastModified": "2026-06-04T11:17:07.000Z",
  "likes": 34,
  "trendingScore": 2,
  "private": false,
  "sha": "71a489e7b95efacf89feaaa6fe3b2995f3542409",
  "downloads": 5840,
  "tags": [
    "gguf",
    "mellum",
    "llama.cpp",
    "quantized",
    "moe",
    "thinking",
    "text-generation",
    "en",
    "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking",
    "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Thinking",
    "license:apache-2.0",
    "endpoints_compatible",
    "region:us",
    "conversational"
  ],
  "pipeline_tag": "text-generation",
  "library_name": "gguf",
  "createdAt": "2026-06-03T13:47:05.000Z",
  "modelId": "JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M",
  "siblings": [
    { "rfilename": ".gitattributes" },
    { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q4_K_M.gguf" },
    { "rfilename": "README.md" }
  ]
}
```
