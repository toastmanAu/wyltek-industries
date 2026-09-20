# Research: mellum2-quant-watch-2026-06-15

**Date:** 2026-06-15
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Research Findings: Mellum2 Quantization Watch

**ID:** mellum2-quant-watch-2026-06-15
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h by a trusted publisher, targeting specific quant formats and VRAM constraints.

### Summary

As of 2026-06-15, no new community-quantized versions of the JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) have been published to Hugging Face within the last 24 hours by any of the specified trusted publishers. All models identified via the Hugging Face API search for "Mellum2" had a `lastModified` timestamp prior to 2026-06-14, falling outside the 24-hour monitoring window.

### Key Findings

1.  **No New Quants Found:** A comprehensive search of the Hugging Face API for "Mellum2" models revealed no new quantized models published or updated by trusted community publishers within the last 24 hours (i.e., since 2026-06-14T00:00:00Z).
2.  **Existing Quantizations (Out of Scope for "New"):** Several quantized Mellum2 models exist on Hugging Face, including GGUF variants (Q4_K_M, Q6_K, Q8_0, MXFP4_MOE) for both Thinking and Instruct models, and some MLX versions. However, their `lastModified` timestamps (latest observed: 2026-06-12T10:47:58.000Z) predate the 24-hour reporting window.
3.  **Publisher Analysis:** While some models were published by `mradermacher` (a trusted publisher), their `lastModified` dates were also outside the 24-hour window (e.g., `mradermacher/Mellum2-12B-A2.5B-Thinking-Abliterated-i1-GGUF` last modified 2026-06-05T00:42:35.000Z). No models from `bartowski`, `unsloth`, `MaziyarPanahi`, `TheBloke`, `QuantFactory`, or `lmstudio-community` were found for Mellum2 variants within the specified timeframe.
4.  **Model Variants Covered:** The search covered all specified Mellum2-12B-A2.5B variants (Thinking, Instruct, Base).

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    *   No, no such models were found that meet the criteria of being published by a trusted publisher and modified within the last 24 hours.

### Gaps / Follow-up

1.  **File Size Information:** The Hugging Face API response (`/api/models?search=Mellum2&full=true`) does not include file sizes for individual `rfilename` entries. To accurately determine if a quantized model fits the 8GB VRAM constraint (~6GB weights), a follow-up API call or manual inspection of each model's "Files and versions" tab would be required for any newly identified models. For this report, since no new models were found, this was not a blocking issue.
2.  **Quality Regression Data:** Information regarding reported quality regression versus base BF16 models is typically found within a model's `README.md` or model card. The provided API output does not directly expose this information. For any future new quants, this would require fetching and parsing the model card content.
3.  **"Skip already-known repos" mechanism:** Without access to `~/.claude/shared/research-findings/`, this instruction could not be fully implemented. The current report relies solely on the "last 24h" and "trusted publisher" criteria.

### Relevant Code/API Snippets

The primary API endpoint used for this research:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```

Example structure of a model entry from the API, showing `lastModified` and `author` fields which were critical for filtering:

```json
{
  "_id": "6a1563f96ea5882878c82ed4",
  "id": "JetBrains/Mellum2-12B-A2.5B-Thinking",
  "author": "JetBrains",
  "gated": false,
  "lastModified": "2026-06-12T10:46:19.000Z", // Key field for "last 24h" check
  "likes": 288,
  "trendingScore": 36,
  "private": false,
  "sha": "ba4838faad89e968c36f39e76e95319d756714fe",
  "downloads": 3516,
  "tags": [ // Key field for "quantized" and format check
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
    "region:us"
  ],
  "pipeline_tag": "text-generation",
  "library_name": "transformers",
  "createdAt": "2026-05-26T09:12:25.000Z",
  "modelId": "JetBrains/Mellum2-12B-A2.5B-Thinking",
  "siblings": [ // Contains filenames, but not sizes
    { "rfilename": ".eval_results/mellum2.yaml" },
    { "rfilename": "model-00001-of-00005.safetensors" }
  ]
}
```
