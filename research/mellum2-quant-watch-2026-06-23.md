# Research: mellum2-quant-watch-2026-06-23

**Date:** 2026-06-23
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Mellum2 Quantization Watch - 2026-06-23

**Research Task ID:** mellum2-quant-watch-2026-06-23
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

As of 2026-06-23, a comprehensive search of the Hugging Face API for "Mellum2" models has been conducted, focusing on updates within the last 24 hours (i.e., modified on or after 2026-06-22). The search specifically targeted GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, and MLX quantization formats from a list of trusted community publishers.

No new community-quantized versions of the JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) from the specified trusted publishers have been identified as published or updated on Hugging Face within the last 24 hours. All relevant Mellum2 quantized models found in the API results have `lastModified` timestamps prior to 2026-06-22.

### Key Findings

1.  **No New Quants Found:** No community-quantized Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) from the specified trusted publishers (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community) were published or updated on Hugging Face within the last 24 hours (2026-06-22 to 2026-06-23).
2.  **Existing Quants (Out of Scope for "New"):** Several quantized Mellum2 models exist on Hugging Face, primarily in GGUF format, but their `lastModified` dates are from earlier in June or May 2026. Examples include:
    *   `yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF` (last modified: 2026-06-09)
    *   `JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M` (last modified: 2026-06-04)
    *   `mradermacher/Mellum2-12B-A2.5B-Instruct-GGUF` (last modified: 2026-06-04)
    *   `phucngodev/Mellum2-12B-A2.5B-Thinking` (last modified: 2026-06-13)
3.  **Publisher Activity:** While `mradermacher` is a trusted publisher and has previously released Mellum2 GGUF quants, their latest modifications for these models were on 2026-06-04 and 2026-06-05, falling outside the 24-hour window. No other specified trusted publishers had Mellum2 models listed in the API results.
4.  **Quantization Formats:** The existing quantized models primarily utilize the GGUF format, offering various bit-widths (e.g., Q2_K, Q4_K_M, Q6_K, Q8_0, MXFP4_MOE, IQ4_XS, IQ1_M, IQ2_M, IQ3_M). No AWQ, GPTQ, or ExLlamaV2/EXL2 quants were observed in the API results, nor any MLX quants from trusted publishers within the timeframe.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    No, a review of the Hugging Face API as of 2026-06-23 indicates that no new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants from trusted publishers have been published or updated within the last 24 hours.

### Gaps / Follow-up

1.  **File Size Details from API:** The Hugging Face API endpoint `https://huggingface.co/api/models?search=Mellum2&full=true` does not directly provide file sizes for individual quantized files within a repository. This requires manual inspection of each model card or a more detailed API call per repository to determine the exact size of `*.gguf` or other quantized files. For future tasks, if exact file sizes are critical, a more granular API approach or direct web scraping of model pages would be necessary.
2.  **Quality Regression Reporting:** The Hugging Face API output does not contain explicit tags or fields for "reported quality regression vs base BF16." This information is typically found within the model card's `README.md` file. A manual review of model cards would be required to extract this detail for any newly identified quants.
3.  **Comprehensive Publisher Search:** The current API search `?search=Mellum2` might miss models if the publisher's name is not explicitly in the model ID but they have published a Mellum2 quant. A more robust search might involve iterating through each trusted publisher's profile and filtering their models by "Mellum2" in the name, then checking `lastModified`. However, this was outside the scope of the direct API search instruction.
4.  **Prior Research Findings Access:** Direct access to `~/.claude/shared/research-findings/` was not available. The filtering by `lastModified` within the last 24 hours was used as a proxy to identify truly "new" drops.

### Relevant Code/API Snippets

The primary API used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example structure of a relevant model entry from the API response:
```json
{
    "_id": "6a27ca194f7d11dcac666d66",
    "id": "yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF",
    "author": "yuxinlu1",
    "gated": false,
    "lastModified": "2026-06-09T09:17:02.000Z", // Key for 24h check
    "likes": 24,
    "trendingScore": 16,
    "private": false,
    "sha": "a9c7b1a32ead28d4a868ff31bbf9c15a97362cfe",
    "downloads": 6508,
    "tags": [ // Key for quant format and variant
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
        "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking",
        "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Thinking",
        "license:apache-2.0",
        "endpoints_compatible",
        "region:us",
        "conversational"
    ],
    "pipeline_tag": "text-generation",
    "library_name": "gguf",
    "createdAt": "2026-06-09T08:08:57.000Z",
    "modelId": "yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF",
    "siblings": [ // Key for specific quantized files and their implied bit-width
        { "rfilename": ".gitattributes" },
        { "rfilename": "README.md" },
        { "rfilename": "mellum2-claude-Q2_K.gguf" },
        { "rfilename": "mellum2-claude-Q4_K_M.gguf" },
        { "rfilename": "mellum2-claude-Q6_K.gguf" },
        { "rfilename": "mellum2-claude-Q8_0.gguf" }
    ]
}
```

---
**Digest:** no drops today
