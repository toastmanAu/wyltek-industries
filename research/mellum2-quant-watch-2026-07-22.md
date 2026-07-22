# Research: mellum2-quant-watch-2026-07-22

**Date:** 2026-07-22
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Argus Technical Research Findings

**ID:** mellum2-quant-watch-2026-07-22
**Date:** 2026-07-22

### Summary

This research task aimed to identify any newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) on Hugging Face within the last 24 hours. The search prioritized GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, and MLX formats from a list of trusted publishers.

Based on the provided Hugging Face API data (`https://huggingface.co/api/models?search=Mellum2&full=true`), no models or model updates matching the search criteria were found to have been published or modified within the last 24 hours relative to the research task date of 2026-07-22. All `lastModified` timestamps in the available API response were from June 2026, indicating they are older than the specified 24-hour window.

Significant limitations were encountered due to "FETCH ERROR" responses from most supplementary data sources (Hugging Face model search by creation date, specific publisher profiles, and Reddit). This prevented a comprehensive search across all specified channels and publishers.

### Key Findings

1.  **No New Quantized Mellum2 Models Found:** A direct query to the Hugging Face API for "Mellum2" models revealed no entries with a `lastModified` timestamp within the last 24 hours (i.e., from 2026-07-21 00:00:00Z to 2026-07-22 23:59:59Z). All listed models in the API response show `lastModified` dates in June 2026.
2.  **Existing Quantized Models (Older than 24h):** The API response does list several existing quantized Mellum2 models, primarily in GGUF format, from both JetBrains and community authors (e.g., `yuxinlu1`, `RJ000`, `JSchneemann`, `shailesh83`, `junwatu`). These include `Thinking` and `Instruct` variants.
    *   **GGUF Quantizations:** Multiple GGUF quants (Q4_K_M, Q6_K, Q8_0, Q2_K) are available for the `Thinking` variant. One GGUF Q4_K_M is available for the `Instruct` variant.
    *   **MLX Quantizations:** MLX 4-bit and 8-bit quants are available for the `Thinking` and `Instruct` variants from `jedisct1`.
    *   **FP8 Quantization:** One FP8-Dynamic model for the `Thinking` variant from `RedHatAI` is listed.
3.  **Missing Information in API Response:** The Hugging Face API response for `siblings` (file list) does not include file sizes. This is critical for determining if a model variant would fit within the 8GB VRAM constraint (~6GB weights). Similarly, direct information on "quality regression vs base BF16" is not present in the API response and would typically require parsing model cards.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    No, based on the provided Hugging Face API data, no new community-quantized versions or updates of JetBrains Mellum2-12B-A2.5B model variants have been published or modified within the last 24 hours (relative to 2026-07-22).

### Gaps / Follow-up

1.  **Incomplete Data Retrieval:** The majority of supplementary source URLs (Hugging Face model search, publisher profiles, Reddit) resulted in "FETCH ERROR" or HTML content not suitable for direct data extraction. This is a significant gap, as it means the search was not comprehensive across all specified trusted publishers and community channels.
    *   **Action:** Investigate the cause of "FETCH ERROR" for these URLs. If it's a transient issue, re-attempt data retrieval. If it's a structural issue (e.g., API changes, access restrictions), identify alternative methods for querying these sources or adjust the scope of future research tasks.
2.  **Missing File Size Information:** The Hugging Face API response for `siblings` does not include file sizes. To fulfill requirement (c) for any *new* quants, an additional step would be needed to query individual model repo files for their sizes.
    *   **Action:** If new quants are identified in future runs, implement a secondary API call (e.g., `https://huggingface.co/api/models/{repo_id}/tree/main`) or web scraping to retrieve file size information.
3.  **Missing Quality Regression Data:** The API response does not contain information regarding reported quality regression. This would typically be found in the model card (`README.md`).
    *   **Action:** If new quants are identified, a manual review or automated parsing of the model card would be required to extract this information.
4.  **ExLlamaV2 / EXL2 and GPTQ 4-bit Formats:** No models explicitly tagged with "ExLlamaV2", "EXL2", or "GPTQ 4-bit" were found in the provided API response, even among older quants. This might indicate a lack of community interest in these formats for Mellum2, or simply that no new models were released in these formats.
    *   **Action:** No immediate action, but note for future trend analysis.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

A sample structure of the relevant JSON objects from the API response, highlighting the `id` (repo path), `author`, `lastModified`, and `tags` fields:

```json
[
  {
    "_id": "6a1563f96ea5882878c82ed4",
    "id": "JetBrains/Mellum2-12B-A2.5B-Thinking",
    "author": "JetBrains",
    "gated": false,
    "lastModified": "2026-06-12T10:46:19.000Z", // Key field for date filtering
    "likes": 320,
    "trendingScore": 3,
    "private": false,
    "sha": "ba4838faad89e968c36f39e76e95319d756714fe",
    "downloads": 5014,
    "tags": ["transformers", "safetensors", "mellum", "text-generation", "conversational", "en", "arxiv:2605.31268", "license:apache-2.0", "model-index", "eval-results", "endpoints_compatible", "region:us"],
    "pipeline_tag": "text-generation",
    "library_name": "transformers",
    "createdAt": "2026-05-26T09:12:25.000Z",
    "modelId": "JetBrains/Mellum2-12B-A2.5B-Thinking",
    "siblings": [
      { "rfilename": ".eval_results/mellum2.yaml" },
      { "rfilename": "README.md" },
      // ... other files, no size information provided
      { "rfilename": "model-00001-of-00005.safetensors" }
    ]
  },
  {
    "_id": "6a27ca194f7d11dcac666d66",
    "id": "yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF",
    "author": "yuxinlu1", // Example of a community publisher
    "gated": false,
    "lastModified": "2026-06-09T09:17:02.000Z", // Older than 24h window
    "likes": 32,
    "trendingScore": 2,
    "private": false,
    "sha": "a9c7b1a32ead28d4a868ff31bbf9c15a97362cfe",
    "downloads": 8244,
    "tags": ["gguf", "mellum", "mellum2", "code", "coding", "reasoning", "thinking", "moe", "llama.cpp", "local-llm", "text-generation", "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking", "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Thinking", "license:apache-2.0", "endpoints_compatible", "region:us", "conversational"],
    "pipeline_tag": "text-generation",
    "library_name": "gguf",
    "createdAt": "2026-06-09T08:08:57.000Z",
    "modelId": "yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF",
    "siblings": [
      { "rfilename": "README.md" },
      { "rfilename": "mellum2-claude-Q2_K.gguf" }, // Example of a GGUF file
      { "rfilename": "mellum2-claude-Q4_K_M.gguf" },
      { "rfilename": "mellum2-claude-Q6_K.gguf" },
      { "rfilename": "mellum2-claude-Q8_0.gguf" }
    ]
  }
  // ... other model entries
]
```
