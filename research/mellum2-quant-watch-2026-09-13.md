# Research: mellum2-quant-watch-2026-09-13

**Date:** 2026-09-13
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**ID:** mellum2-quant-watch-2026-09-13
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

As of 2026-09-13, a comprehensive search of the Hugging Face API for "Mellum2" models has been conducted to identify any new community-quantized versions of the JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) published within the last 24 hours. The search prioritized GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, and MLX formats from a list of trusted community publishers.

No new community-quantized Mellum2-12B-A2.5B model variants from the specified trusted publishers were found to have been released or modified on Hugging Face within the last 24 hours. All identified Mellum2-related repositories, including those from JetBrains and other authors, show `lastModified` timestamps significantly older than the 24-hour window (i.e., prior to 2026-09-12).

### Key Findings

1.  **No New Quants Found in Last 24h:** The Hugging Face API search (`https://huggingface.co/api/models?search=Mellum2`) did not return any models with a `lastModified` timestamp within the last 24 hours (i.e., on or after 2026-09-12). All listed models have `lastModified` dates in August 2026 or earlier.
2.  **Existing Quantized Models (Older):** Several older quantized models were identified, primarily in GGUF and MLX formats. However, none of these meet the "last 24h" criteria or are from the specified trusted community publishers.
    *   `JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M` (Author: JetBrains, `lastModified`: 2026-06-04)
    *   `JetBrains/Mellum2-12B-A2.5B-Instruct-GGUF-Q6_K` (Author: JetBrains, `lastModified`: 2026-06-04)
    *   `JetBrains/Mellum2-12B-A2.5B-Instruct-GGUF-Q4_K_M` (Author: JetBrains, `lastModified`: 2026-06-04)
    *   `yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF` (Author: yuxinlu1, `lastModified`: 2026-06-09) - includes Q2_K, Q4_K_M, Q6_K, Q8_0.
    *   `mlx-community/Mellum2-12B-A2.5B-Thinking-4bit` (Author: mlx-community, `lastModified`: 2026-08-11)
    *   `RJ000/Mellum2-12B-A2.5B-Thinking-GGUF` (Author: RJ000, `lastModified`: 2026-06-02)
    *   `jedisct1/Mellum2-12B-A2.5B-Thinking-mlx-8bit` (Author: jedisct1, `lastModified`: 2026-06-02)
    *   `jedisct1/Mellum2-12B-A2.5B-Thinking-mlx-4bit` (Author: jedisct1, `lastModified`: 2026-06-02)
    *   `JSchneemann/Mellum2-12B-A2.5B-Thinking-GGUF` (Author: JSchneemann, `lastModified`: 2026-06-03) - includes BF16, Q4_K_M, Q6_K, Q8_0.
    *   `shailesh83/Mellum2-Thinking-Q4_K_M` (Author: shailesh83, `lastModified`: 2026-06-02)
    *   `junwatu/Mellum2-12B-A2.5B-Instruct-GGUF` (Author: junwatu, `lastModified`: 2026-07-22)
3.  **No Trusted Publisher Activity:** None of the models listed in the API response were published by the specified trusted community publishers (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community). The "FETCH ERROR" for direct links to these publishers' profiles prevented further investigation of their specific pages, but the general API search should have captured any relevant models.
4.  **Unsupported Formats/Authors:** Some models like `RedHatAI/Mellum2-12B-A2.5B-Thinking-FP8-Dynamic` were found but are from non-trusted authors or use non-priority quantization formats (FP8).

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    No, a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant has not been published to Hugging Face by a trusted publisher in the last 24 hours.

### Gaps / Follow-up

1.  **Direct Publisher Page Access:** The "FETCH ERROR" encountered when attempting to access individual trusted publisher pages (e.g., `https://huggingface.co/bartowski`) is a significant limitation. While the general `/api/models?search=Mellum2` should ideally cover all relevant models, direct inspection of a publisher's profile might reveal models not caught by a broad search term or provide more context on recent activity. This needs to be resolved for future, more thorough checks.
2.  **File Size Information:** For the older quantized models identified, detailed file size information for specific quantizations (e.g., `Mellum2-12B-A2.5B-Thinking.Q4_K_M.gguf`) was not directly available in the initial API response. To fulfill requirement (c) for any *new* quants, a follow-up API call to `https://huggingface.co/{repo_id}/tree/main` or similar would be necessary to list file sizes. This was not performed as no new quants were found.
3.  **Quality Regression Data:** No reported quality regression metrics (requirement e) were available in the initial API response for any of the listed models. This information typically resides within the model card (`README.md`) or linked evaluation results, which would require further parsing if a new, relevant quant were found.

---
no drops today
