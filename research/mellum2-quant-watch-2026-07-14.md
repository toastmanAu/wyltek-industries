# Research: mellum2-quant-watch-2026-07-14

**Date:** 2026-07-14
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Wyltek Industries Technical Research Findings

**Research Task ID:** mellum2-quant-watch-2026-07-14
**Date:** 2026-07-14

### Summary

This report details the findings of a 24-hour monitoring sweep for new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) published on Hugging Face. The search focused on specific quantization formats (GGUF, AWQ 4-bit, GPTQ 4-bit, ExLlamaV2/EXL2, MLX) from a list of trusted publishers.

Based on the analysis of the Hugging Face API, no new community-quantized Mellum2-12B-A2.5B model variants from the specified trusted publishers were released within the last 24 hours (i.e., since 2026-07-13). All identified Mellum2-related models and their quantized versions were last modified prior to this 24-hour window.

### Key Findings

1.  **No New Quantized Models:** A comprehensive search of the Hugging Face API for "Mellum2" models revealed no new community-quantized versions (Thinking, Instruct, or Base variants) published by the specified trusted publishers within the last 24 hours (relative to 2026-07-14).
2.  **Existing Quantizations are Older:** Several quantized Mellum2 models exist on Hugging Face, including GGUF and MLX formats, some from trusted publishers like `mradermacher`. However, their `lastModified` timestamps indicate they were all published or updated prior to 2026-06-12, well outside the 24-hour monitoring window.
3.  **Target Formats and Publishers Present (Historically):** The search confirmed that models matching the "Mellum2" naming convention and some of the desired quantization formats (e.g., GGUF, MLX) are indeed present on Hugging Face, and some are from trusted publishers. This indicates the search criteria are valid for identifying relevant models when they are released.

### Questions Answered

**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

**Answer:** No drops today. No community-quantized versions of any JetBrains Mellum2-12B-A2.5B model variant from the specified trusted publishers were published to Hugging Face in the last 24 hours.

### Gaps / Follow-up

1.  **Inaccessible Source Content:** Several provided source URLs (e.g., `https://huggingface.co/models?search=mellum2&sort=createdAt`, `https://huggingface.co/bartowski`, `https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day`) resulted in "FETCH ERROR" or returned HTML content that could not be programmatically parsed as an API response. While the primary instruction was to use the `/api/models?search=Mellum2` endpoint, these additional sources could potentially contain relevant information if they were accessible and parseable.
    *   **Action:** Investigate the cause of "FETCH ERROR" for non-API Hugging Face links and Reddit. If these are intended as supplementary data sources, ensure they are provided in a machine-readable format or that a parsing mechanism is available.
2.  **File Size Information:** For any future findings, the current Hugging Face API response (`full=true`) does not directly provide total file sizes for individual `.gguf` or `.safetensors` files within a repository's `siblings` list. To accurately determine the "total file size for the smallest variant that fits 8GB VRAM (~6GB weights)", a secondary API call or web scraping of the model page would be required for each candidate file.
    *   **Action:** For future research tasks requiring file size, either (a) request an API endpoint that includes file sizes in the `siblings` array, or (b) implement a follow-up step to query individual file metadata or parse model pages.
3.  **Quality Regression Data:** The current API response does not include "reported quality regression vs base BF16" directly in the model metadata. This information would typically be found within the model card (`README.md`).
    *   **Action:** For future findings, a mechanism to extract and summarize relevant sections from the `README.md` of new models would be necessary to fulfill this requirement.

### Relevant Code/API Snippets

No new quants were found, so no specific code/API snippets for new models are applicable for this report. The primary API endpoint used was:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```
