# Research: mellum2-quant-watch-2026-08-11

**Date:** 2026-08-11
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**Research Task ID:** mellum2-quant-watch-2026-08-11
**Date:** 2026-08-11

## Summary

As Argus, a technical research analyst for Wyltek Industries, I have completed the scheduled check for new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) published to Hugging Face within the last 24 hours. My analysis involved querying the Hugging Face API for "Mellum2" models and filtering results by `lastModified` date and `author` against the list of trusted publishers, prioritizing GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, and MLX formats.

Based on the provided source content, no new community-quantized versions of any JetBrains Mellum2-12B-A2.5B model variant were published or significantly updated by trusted publishers on Hugging Face within the last 24 hours (i.e., on 2026-08-11). The most recent relevant update found was on 2026-08-04, which falls outside the specified 24-hour window.

## Key Findings

1.  **No New Quants Identified:** A comprehensive scan of the Hugging Face API results for "Mellum2" models revealed no new community-quantized models or updates by the specified trusted publishers within the last 24 hours (2026-08-11).
2.  **Existing Quants (Outside Window):** Several quantized Mellum2 models exist on Hugging Face, notably GGUF variants from `JetBrains` and `bartowski`, and MLX variants from `jedisct1`. However, their `lastModified` timestamps are all prior to 2026-08-11. The most recent modification observed was `NANI-Nithin/Mellum2-12B-A2.5B-Instruct-GGUF` on `2026-08-04T21:03:51.000Z`.
3.  **Trusted Publishers Check:** The `author` field was checked against `bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community`. While some models from `bartowski` and `jedisct1` (not explicitly listed as trusted but often associated with MLX quants) were found, none were updated within the target timeframe.

## Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    *   No, a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant has not been published or significantly updated by trusted publishers to Hugging Face in the last 24 hours (as of 2026-08-11).

## Gaps / Follow-up

1.  **File Size Information:** The Hugging Face API response (`/api/models?search=Mellum2&full=true`) does not directly provide file sizes for individual GGUF or other quantized files within a repository. To accurately determine if a model variant fits the 8GB VRAM (~6GB weights) requirement, a follow-up API call to `https://huggingface.co/api/models/{repo_id}/tree/main` or manual inspection of the model page would be necessary to retrieve specific file sizes. For this report, I had to rely on general knowledge of typical GGUF sizes for 12B models.
2.  **Quality Regression Data:** The API response does not include information on reported quality regression (e.g., perplexity, benchmark scores) compared to the base BF16 model. This information would typically reside within the model card (`README.md`), requiring a separate fetch and parsing.
3.  **Prior Research Findings Access:** The instruction to "Do NOT re-report quants seen in previous days — check ~/.claude/shared/research-findings/ for prior mellum2-quant-watch-* files" could not be fulfilled as I do not have access to the specified local file system path. This means any existing quants, even if old, were re-evaluated for the date filter.
4.  **HTML Source Content:** The provided HTML snippets for various Hugging Face user/org pages and Reddit search results (`https://huggingface.co/models?search=mellum2&sort=createdAt`, `https://huggingface.co/bartowski`, etc.) returned "FETCH ERROR" or general HTML, making them unusable for extracting specific model data. The primary data source was the structured JSON from the `/api/models` endpoint.

## Relevant Code/API Snippets

The primary API endpoint used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example structure of a relevant model entry from the API response:
```json
{
    "_id": "6a723fb90f1f65c9101220b6",
    "id": "NANI-Nithin/Mellum2-12B-A2.5B-Instruct-GGUF",
    "author": "NANI-Nithin",
    "gated": false,
    "lastModified": "2026-08-04T21:03:51.000Z", // Key field for date filtering
    "likes": 1,
    "trendingScore": 1,
    "private": false,
    "sha": "a677ddad1ba69229837408c919aa3ba7922ed30d",
    "downloads": 119,
    "tags": [ // Key field for format and variant identification
        "gguf",
        "llama.cpp",
        "ollama",
        "lm-studio",
        "quantization",
        "text-generation",
        "en",
        "base_model:JetBrains/Mellum2-12B-A2.5B-Instruct", // Indicates Instruct variant
        "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Instruct",
        "license:apache-2.0",
        "endpoints_compatible",
        "region:us",
        "conversational"
    ],
    "pipeline_tag": "text-generation",
    "library_name": "gguf",
    "createdAt": "2026-08-04T19:38:33.000Z",
    "modelId": "NANI-Nithin/Mellum2-12B-A2.5B-Instruct-GGUF",
    "siblings": [ // Contains file names, but not sizes
        { "rfilename": ".gitattributes" },
        { "rfilename": "Mellum2-Q4_K_M.gguf" },
        { "rfilename": "Mellum2-Q5_K_M.gguf" },
        { "rfilename": "Mellum2-Q6_K.gguf" },
        { "rfilename": "Mellum2-Q8_0.gguf" },
        { "rfilename": "README.md" }
    ]
}
```

**Digest:** no drops today
