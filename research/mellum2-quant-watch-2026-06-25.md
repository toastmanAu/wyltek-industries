# Research: mellum2-quant-watch-2026-06-25

**Date:** 2026-06-25
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Mellum2 Quantization Watch - 2026-06-25

### Summary
This report details the findings from a search for newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants on Hugging Face within the last 24 hours. The search targeted specific quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) from a list of trusted publishers.

Based on the available (and partially truncated) Hugging Face API response, no new community-quantized Mellum2 model variants were published by the specified trusted publishers within the last 24 hours (i.e., with a `lastModified` timestamp on or after 2026-06-24). All identified Mellum2-related models in the provided API snippet have `lastModified` dates prior to this 24-hour window.

### Key Findings
1.  **No New Quants Found:** A comprehensive scan of the provided Hugging Face API results for "Mellum2" models, filtered by the "last 24 hours" criterion (i.e., `lastModified` on or after 2026-06-24), yielded no new community-quantized models from the specified trusted publishers.
2.  **Existing Quants are Older:** All Mellum2-related model entries in the provided API data, including those from trusted publishers like `mradermacher` and those with `gguf` or `mlx` tags, had `lastModified` timestamps ranging from 2026-06-02 to 2026-06-13, falling outside the 24-hour reporting window.
3.  **API Response Truncation:** The provided Hugging Face API response was truncated, indicated by a "FETCH ERROR" at the end of the JSON array. This means the search may not have covered all potential Mellum2 models on Hugging Face.

### Questions Answered
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

**Answer:** No community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) from the specified trusted publishers were found to have been published or modified on Hugging Face within the last 24 hours, based on the provided API data.

### Gaps / Follow-up
1.  **Full API Response:** The primary limitation was the truncated Hugging Face API response. A complete API fetch is required to ensure no models were missed.
2.  **File Size Information:** The Hugging Face API output did not include file sizes for individual model files (`siblings` array only lists filenames). To accurately report the "total file size for the smallest variant that fits 8GB VRAM (~6GB weights)", a follow-up API call per model or parsing of model cards would be necessary to retrieve this critical information.
3.  **Quality Regression Data:** The raw API output does not typically contain information regarding reported quality regressions versus the base BF16 model. This data would usually be found within the model card's description or discussion sections, requiring deeper inspection beyond the initial API call.
4.  **Prior Research Findings:** Access to `~/.claude/shared/research-findings/for prior mellum2-quant-watch-* files` was not available. This means any models that *were* found in the last 24 hours (if the API wasn't truncated) would have been reported as new, even if they were already known from previous days.

### Relevant Code/API Snippets
The primary API endpoint used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example structure of a relevant model entry (though none were new in this specific search):
```json
{
  "_id": "...",
  "id": "yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF",
  "author": "yuxinlu1",
  "gated": false,
  "lastModified": "2026-06-09T09:17:02.000Z", // Key timestamp for filtering
  "likes": 25,
  "trendingScore": 11,
  "private": false,
  "sha": "a9c7b1a32ead28d4a868ff31bbf9c15a97362cfe",
  "downloads": 7473,
  "tags": [ // Tags for quant format and base model variant
    "gguf",
    "mellum",
    "mellum2",
    "code",
    "coding",
    "reasoning",
    "thinking",
    "moe",
    "llama.cpp",
    "local-llm",
    "text-generation",
    "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking", // Identifies variant
    "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Thinking",
    "license:apache-2.0",
    "endpoints_compatible",
    "region:us",
    "conversational"
  ],
  "pipeline_tag": "text-generation",
  "library_name": "gguf", // Indicates quant library
  "createdAt": "2026-06-09T08:08:57.000Z",
  "modelId": "yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF",
  "siblings": [ // File list, but without sizes
    { "rfilename": ".gitattributes" },
    { "rfilename": "README.md" },
    { "rfilename": "mellum2-claude-Q2_K.gguf" },
    { "rfilename": "mellum2-claude-Q4_K_M.gguf" },
    { "rfilename": "mellum2-claude-Q6_K.gguf" },
    { "rfilename": "mellum2-claude-Q8_0.gguf" }
  ]
}
```
