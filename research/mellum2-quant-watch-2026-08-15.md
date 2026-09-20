# Research: mellum2-quant-watch-2026-08-15

**Date:** 2026-08-15
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Mellum2 Quantization Watch - 2026-08-15

**ID:** mellum2-quant-watch-2026-08-15
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h by a trusted publisher, targeting specific quant formats.

### Summary

As of 2026-08-15, a comprehensive search of the Hugging Face API for "Mellum2" models was conducted to identify any new community-quantized versions of the JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) published within the last 24 hours (i.e., on or after 2026-08-14 00:00:00 UTC). The search specifically focused on models from a predefined list of trusted publishers and prioritized GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, and MLX quantization formats.

No new community-quantized Mellum2-12B-A2.5B model variants from the specified trusted publishers were found to have been modified or published within the last 24 hours. All relevant models identified in the API response were either published by JetBrains directly (not considered community-quantized for this task) or had a `lastModified` timestamp prior to the 24-hour window, or were from untrusted publishers.

### Key Findings

1.  **No New Quants from Trusted Publishers:** No models matching the "JetBrains Mellum2-12B-A2.5B" naming convention and originating from the specified trusted publishers (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community) were found with a `lastModified` timestamp on or after 2026-08-14 00:00:00 UTC.
2.  **Existing Quants are Older or Untrusted:** The Hugging Face API search returned several Mellum2-related models. However, upon inspection:
    *   Models published directly by "JetBrains" are not considered community-quantized for this task.
    *   Models from trusted publishers like "bartowski" (e.g., `bartowski/Mellum2-12B-A2.5B-Instruct-GGUF`) had `lastModified` dates significantly older than the 24-hour window (e.g., 2026-06-10).
    *   Other quantized models (e.g., from `NANI-Nithin`, `mlx-community`, `RJ000`, `jedisct1`, `JSchneemann`, `shailesh83`, `junwatu`, `RedHatAI`) were either from untrusted publishers or also had `lastModified` dates outside the 24-hour window.
3.  **No Relevant Quant Formats in Timeframe:** Even if untrusted publishers were considered, no models with the specified quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) were updated or created within the last 24 hours.

### Questions Answered

**Q: Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**

**A:** No, a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant from a trusted publisher has not been published or modified on Hugging Face in the last 24 hours (i.e., on or after 2026-08-14 00:00:00 UTC).

### Gaps / Follow-up

1.  **File Size Information:** The Hugging Face API endpoint `https://huggingface.co/api/models?search=Mellum2&full=true` does not provide individual file sizes within the `siblings` array. If a new quant were found, determining the "total file size for the smallest variant that fits 8GB VRAM (~6GB weights)" would require additional API calls (e.g., to `https://huggingface.co/api/models/{repo_id}/tree/main`) or parsing model cards, which was not explicitly within the scope of "inspect each result's tags and file list" from the initial JSON response. This is a critical missing piece for full reporting.
2.  **Robustness of "lastModified" for "Published":** While `lastModified` is used as a proxy for "published in the last 24h", it might not strictly mean a *new* quantization was uploaded, but rather an existing one was updated (e.g., README change). For future tasks, clarifying if "published" means initial upload or any modification would be beneficial.
3.  **HTML Content Parsing:** Several provided source URLs returned `FETCH ERROR` or HTML content (e.g., `/models?search=mellum2&sort=createdAt`, `/r/LocalLLaMA/search.json`). The instruction specified searching the HF API directly via the JSON endpoint. If these HTML sources were intended for parsing, additional tools/libraries would be required.
4.  **Prior Research Findings Access:** The instruction to "Do NOT re-report quants seen in previous days — check `~/.claude/shared/research-findings/`" could not be fulfilled due to lack of access. This report assumes no prior knowledge of previously reported quants and relies solely on the `lastModified` timestamp and trusted publisher list for novelty.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```

This API call returns a JSON array of model objects, each containing metadata such as `id`, `author`, `lastModified`, `tags`, and `siblings` (file list). The `lastModified` field was crucial for filtering by publication date, and `author` and `tags` were used to identify trusted publishers and quantization formats.
