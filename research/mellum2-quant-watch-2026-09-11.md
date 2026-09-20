# Research: mellum2-quant-watch-2026-09-11

**Date:** 2026-09-11
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**Wyltek Industries - Technical Research Findings**

**ID:** mellum2-quant-watch-2026-09-11
**Date:** 2026-09-11
**Analyst:** Argus

---

### Summary

This report details the findings of a search for newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants on Hugging Face within the last 24 hours (2026-09-10 to 2026-09-11). The search focused on specific quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) and a predefined list of trusted publishers.

Based on the analysis of the provided Hugging Face API data, no new community-quantized Mellum2-12B-A2.5B model variants from the specified trusted publishers were found to have been modified or published within the last 24-hour window. All relevant model entries in the API response showed `lastModified` timestamps prior to September 10, 2026.

### Key Findings

1.  **No New Quantized Models Found:** No community-quantized versions of JetBrains Mellum2-12B-A2.5B (Thinking, Instruct, Base) models from the specified trusted publishers were found to have a `lastModified` timestamp within the last 24 hours (i.e., on 2026-09-10 or 2026-09-11).
2.  **API Data Timestamps:** All Mellum2-related models listed in the Hugging Face API response had `lastModified` dates ranging from June to August 2026, falling outside the requested 24-hour monitoring window.
3.  **Publisher Filtering:** The search correctly applied the filter for trusted publishers (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community). No models from these specific authors were found within the timeframe. Models from `JetBrains` (official), `mlx-community`, `RedHatAI`, `mdamir97`, `skilledu`, `RJ000`, and `jedisct1` were present but either not from trusted community publishers or outside the timeframe.
4.  **Unusable Source Content:** Several provided source URLs (e.g., `https://huggingface.co/models?search=mellum2&sort=createdAt`, `https://huggingface.co/bartowski`, `https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day`) resulted in "FETCH ERROR" or HTML content that was not directly parsable for the required model metadata, thus limiting the analysis to the primary API endpoint.

### Questions Answered

**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

**Answer:** No, a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant from a trusted publisher has not been published or modified on Hugging Face in the last 24 hours (as of 2026-09-11).

### Gaps / Follow-up

1.  **File Size Retrieval:** The Hugging Face API response (`/api/models?search=Mellum2&full=true`) does not directly provide the total file size for each model variant. To fulfill requirement (c) "total file size for the smallest variant that fits 8GB VRAM (~6GB weights leaving room for KV cache)", a follow-up API call to each model's specific endpoint (e.g., `https://huggingface.co/<repo_path>/tree/main`) or parsing of the model card would be necessary to sum the sizes of individual files.
2.  **Quality Regression Information:** Information regarding reported quality regression vs. base BF16 (requirement e) is not available directly in the `/api/models` endpoint. This data would typically be found within the model card (`README.md`) of a specific repository, requiring further retrieval and parsing.
3.  **Prior Research Findings Access:** The instruction to "Do NOT re-report quants seen in previous days — check `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files" could not be fulfilled due to lack of access to the specified local directory. This report assumes a fresh search against the 24-hour window.
4.  **Source Content Reliability:** Multiple provided source URLs returned "FETCH ERROR" or unparseable HTML. Ensuring reliable access to all specified data sources would improve the comprehensiveness of future reports.
5.  **Publisher Definition Clarity:** While `bartowski` is a trusted publisher, `RedHatAI` appeared as an author in the API response. Clarification on whether organizations associated with trusted individuals (e.g., `RedHatAI` for `bartowski`) should also be considered trusted publishers for community quants would be beneficial.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example structure of a model entry from the API response (truncated for brevity):

```json
{
  "_id": "6a1563f96ea5882878c82ed4",
  "id": "JetBrains/Mellum2-12B-A2.5B-Thinking",
  "author": "JetBrains",
  "gated": false,
  "lastModified": "2026-08-13T10:20:47.000Z",
  "likes": 336,
  "trendingScore": 2,
  "private": false,
  "sha": "a7311550557e93cc706ab5dd3d879c1a11703ab4",
  "downloads": 2392,
  "tags": [
    "transformers",
    "safetensors",
    "mellum",
    "text-generation",
    "conversational",
    "en",
    "arxiv:2605.31268",
    "license:apache-2.0",
    "model-index",
    "eval-results",
    "endpoints_compatible",
    "deploy:sagemaker",
    "region:us"
  ],
  "pipeline_tag": "text-generation",
  "library_name": "transformers",
  "createdAt": "2026-05-26T09:12:25.000Z",
  "modelId": "JetBrains/Mellum2-12B-A2.5B-Thinking",
  "siblings": [
    { "rfilename": ".eval_results/mellum2.yaml" },
    { "rfilename": "README.md" },
    { "rfilename": "model-00001-of-00005.safetensors" }
    // ... other files
  ]
}
```
