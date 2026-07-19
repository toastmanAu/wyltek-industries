# Research: mellum2-quant-watch-2026-07-19

**Date:** 2026-07-19
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Wyltek Industries Technical Research Findings

**ID:** mellum2-quant-watch-2026-07-19
**Date:** 2026-07-19
**Analyst:** Argus

### Summary
This research task aimed to identify any newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) on Hugging Face within the last 24 hours (relative to 2026-07-19). The search focused on specific quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) from a list of trusted publishers.

Based on the available data from the Hugging Face API, no new community-quantized Mellum2 models or updates to existing ones were published by any publisher within the specified 24-hour window (2026-07-18 to 2026-07-19). All relevant entries in the API response showed `createdAt` and `lastModified` timestamps in June 2026, falling outside the target timeframe.

### Key Findings
1.  **Search Scope:** The search targeted Hugging Face for models matching "Mellum2" and filtered by `createdAt` or `lastModified` within the last 24 hours (2026-07-18 to 2026-07-19).
2.  **Quantization Formats:** Priority was given to GGUF (Q4_K_M, Q5_K_M, Q3_K_M, Q6_K, Q8_0), followed by AWQ 4-bit, GPTQ 4-bit, ExLlamaV2/EXL2, and MLX.
3.  **Trusted Publishers:** The search considered models from `bartowski`, `unsloth`, `mradermacher`, `MaziyarPanahi`, `TheBloke`, `QuantFactory`, and `lmstudio-community`.
4.  **API Results Analysis:** The `https://huggingface.co/api/models?search=Mellum2&full=true` endpoint returned a list of Mellum2 models. Upon inspection of their `createdAt` and `lastModified` timestamps, all entries were dated in June 2026.
    *   Example timestamp: `2026-06-04T11:17:07.000Z` (for `JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M`).
    *   No models were found with a `createdAt` or `lastModified` date of 2026-07-18 or 2026-07-19.
5.  **No New Quants Identified:** Consequently, no community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants were published or updated within the last 24 hours by the specified trusted publishers.

### Questions Answered
No drops today.

### Gaps / Follow-up
1.  **Source Content Access:** Multiple supplementary sources (e.g., `huggingface.co/models?search=mellum2&sort=createdAt`, individual publisher pages, Reddit search) resulted in `FETCH ERROR`. This indicates a potential issue with the data retrieval mechanism or access permissions, limiting the comprehensiveness of the search. Future research should ensure these sources are accessible.
2.  **Previous Findings Cache:** The instruction to "check `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files and skip already-known repos" could not be executed as this local path is inaccessible to the current environment. This means there's no mechanism to prevent re-reporting if older models were to be modified within the 24h window. Establishing access to this cache or providing a list of previously reported models is crucial for efficient future monitoring.
3.  **File Size Information:** The provided Hugging Face API response (`full=true`) does not directly include total file sizes for individual `.gguf` files within a repository's `siblings` list. To accurately determine if a model fits the 8GB VRAM (~6GB weights) requirement, an additional API call per model (e.g., `https://huggingface.co/api/models/{repo_id}/tree/main`) or parsing of model cards would be necessary to retrieve file sizes. This was not performed as no new quants were found.

### Relevant Code/API Snippets
The primary API endpoint used for this research:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```

Example of a model entry from the API response, illustrating the timestamp format:
```json
{
    "_id": "6a203059c1afdbf3c1142408",
    "id": "JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M",
    "author": "JetBrains",
    "gated": false,
    "lastModified": "2026-06-04T11:17:07.000Z",
    "likes": 35,
    "trendingScore": 3,
    "private": false,
    "sha": "71a489e7b95efacf89feaaa6fe3b2995f3542409",
    "downloads": 3493,
    "tags": ["gguf", "mellum", "llama.cpp", "quantized", "moe", "thinking", "text-generation", "en", "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking", "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Thinking", "license:apache-2.0", "endpoints_compatible", "region:us", "conversational"],
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
