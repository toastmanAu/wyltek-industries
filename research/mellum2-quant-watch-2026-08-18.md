# Research: mellum2-quant-watch-2026-08-18

**Date:** 2026-08-18
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Structured Findings Document

**ID:** mellum2-quant-watch-2026-08-18
**Date of Analysis:** 2026-08-18

### Summary

This research task aimed to identify any newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) on Hugging Face within the last 24 hours. The search focused on specific quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) from a predefined list of trusted publishers.

Based on the analysis of the provided Hugging Face API response, no new quantized Mellum2-12B-A2.5B model variants from the specified trusted publishers have been released within the last 24 hours (relative to 2026-08-18). All listed models, including those from trusted publishers and in target quantization formats, show `lastModified` timestamps several days or weeks prior to the 24-hour window.

### Key Findings

1.  **No New Quants Found in Last 24 Hours:** All models returned by the Hugging Face API search for "Mellum2" have `lastModified` timestamps older than the specified 24-hour window (i.e., before 2026-08-17T08:00:00Z). The most recent `lastModified` timestamp observed was `2026-08-13T10:20:54.000Z`.
2.  **Existing Quantized Models (Older):** Several quantized Mellum2 models exist on Hugging Face, including GGUF and MLX formats.
    *   **GGUF:** `JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q8_0` (author: JetBrains, last modified: 2026-06-04), `bartowski/Mellum2-12B-A2.5B-Instruct-GGUF` (author: bartowski, last modified: 2026-06-10).
    *   **MLX:** `mlx-community/Mellum2-12B-A2.5B-Instruct-4bit` (author: mlx-community, last modified: 2026-08-11), `mlx-community/Mellum2-12B-A2.5B-Instruct-mxfp4` (author: mlx-community, last modified: 2026-08-11).
3.  **Trusted Publishers Identified (for older models):** `JetBrains` and `bartowski` are among the trusted publishers who have previously released Mellum2 quants. No new releases from `unsloth`, `mradermacher`, `MaziyarPanahi`, `TheBloke`, `QuantFactory`, or `lmstudio-community` were found within the specified timeframe.
4.  **Model Variants:** Older quantized models were found for "Thinking" and "Instruct" variants. No specific quantized "Base" variant was identified in the provided API snippet, though the base model `JetBrains/Mellum2-12B-A2.5B-Base` exists.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    *   No, based on the provided API data, no such models from trusted publishers were found with a `lastModified` timestamp within the last 24 hours.

### Gaps / Follow-up

1.  **Missing File Size Information:** The provided Hugging Face API response (`full=true`) does not include file sizes for individual `siblings`. To accurately determine the "total file size for the smallest variant that fits 8GB VRAM (~6GB weights)", a secondary API call or parsing of model card pages would be required for any identified new models.
2.  **Missing Quality Regression Data:** The API response does not provide the content of `README.md` or model cards, which would be necessary to report "any reported quality regression vs base BF16". This would require additional HTTP requests to fetch the `README.md` content for any new models.
3.  **Inaccessible Local Cache:** The instruction to "check `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files and skip already-known repos" could not be executed. This analysis assumes no prior knowledge of reported repos.
4.  **Hugging Face HTML Fetch Errors:** Several HTML source URLs provided (`https://huggingface.co/models?search=mellum2&sort=createdAt`, `/bartowski`, etc.) resulted in `FETCH ERROR`. While the primary instruction was to use the API, these errors could indicate broader connectivity issues or changes in Hugging Face's web serving, which might impact future API calls if the `full=true` parameter is not always sufficient.
5.  **Specificity of "Last 24h":** The exact time of execution for "last 24h" is assumed to be 2026-08-18T08:00:00Z for this report. For future runs, a precise execution timestamp should be used to define the window.

### Relevant Code/API Snippets

The core API endpoint used for this research:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example structure of a model entry from the API response (truncated for brevity, showing relevant fields):

```json
[
  {
    "_id": "6a1563f96ea5882878c82ed4",
    "id": "JetBrains/Mellum2-12B-A2.5B-Thinking",
    "author": "JetBrains",
    "lastModified": "2026-08-13T10:20:47.000Z",
    "tags": ["transformers", "safetensors", "mellum", "text-generation", "conversational", "en", "arxiv:2605.31268", "license:apache-2.0", "model-index", "eval-results", "endpoints_compatible", "deploy:sagemaker", "region:us"],
    "modelId": "JetBrains/Mellum2-12B-A2.5B-Thinking",
    "siblings": [
      { "rfilename": ".eval_results/mellum2.yaml" },
      { "rfilename": "README.md" },
      { "rfilename": "model-00001-of-00005.safetensors" }
      // ... more files
    ]
  },
  {
    "_id": "6a29a85a51ba6f5825c03ca2",
    "id": "bartowski/Mellum2-12B-A2.5B-Instruct-GGUF",
    "author": "bartowski",
    "lastModified": "2026-06-10T20:59:41.000Z",
    "tags": ["gguf", "text-generation", "en", "base_model:JetBrains/Mellum2-12B-A2.5B-Instruct", "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Instruct", "license:apache-2.0", "model-index", "endpoints_compatible", "region:us", "conversational"],
    "modelId": "bartowski/Mellum2-12B-A2.5B-Instruct-GGUF",
    "siblings": [
      { "rfilename": "Mellum2-12B-A2.5B-Instruct-Q4_K_M.gguf" },
      { "rfilename": "Mellum2-12B-A2.5B-Instruct-Q5_K_M.gguf" },
      { "rfilename": "Mellum2-12B-A2.5B-Instruct-Q8_0.gguf" },
      { "rfilename": "README.md" }
      // ... many other GGUF files
    ]
  }
]
```
