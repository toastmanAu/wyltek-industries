# Research: mellum2-quant-watch-2026-09-03

**Date:** 2026-09-03
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**Wyltek Industries - Technical Research Findings**

**ID:** mellum2-quant-watch-2026-09-03
**Date:** 2026-09-03
**Analyst:** Argus

---

### Summary

A comprehensive search of Hugging Face for community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) was conducted, targeting updates within the last 24 hours (2026-09-02 00:00:00Z to 2026-09-03 23:59:59Z). The search prioritized GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, and MLX formats from a list of trusted publishers.

No new community-quantized Mellum2-12B-A2.5B model variants were published to Hugging Face by the specified trusted publishers within the last 24 hours. The most recent modification date for any Mellum2 model found in the API response was 2026-08-31, which falls outside the defined 24-hour window.

### Key Findings

1.  **Hugging Face API Query:** The primary search was executed using the Hugging Face API endpoint `https://huggingface.co/api/models?search=Mellum2&full=true`.
2.  **Model Variants Scanned:** All listed Mellum2-12B-A2.5B models (Base, Instruct, Thinking, and their SFT/Pretrain variants) were inspected.
3.  **Last Modified Timestamp Analysis:** Each model's `lastModified` timestamp was compared against the 24-hour window prior to 2026-09-03.
    *   The most recent `lastModified` timestamp observed across all Mellum2 models in the API response was `2026-08-31T13:06:19.000Z` for `JetBrains/Mellum2-12B-A2.5B-Base-Pretrain`.
    *   All other models had `lastModified` dates earlier than 2026-08-31.
4.  **Trusted Publisher Filter:** While several models were from "JetBrains" (the original publisher) and others from community members like "yuxinlu1", "jedisct1", "WithinUsAI", "bartowski", "RJ000", and "shailesh83", none of these had a `lastModified` date within the specified 24-hour window.
5.  **Quantization Format and Size:** Due to no new models being found, detailed analysis of specific quantization formats (GGUF Q4_K_M, Q5_K_M, Q3_K_M, Q6_K, Q8_0; AWQ 4-bit; GPTQ 4-bit; ExLlamaV2/EXL2; MLX) and file sizes for VRAM fitting was not required for new drops. However, existing GGUF models from `bartowski` and `yuxinlu1` repositories do offer a range of quantizations, with Q3_K_M and Q4_K_M being the most suitable for the 8GB VRAM target.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    *   **Answer:** No, no community-quantized versions of any JetBrains Mellum2-12B-A2.5B model variant were published to Hugging Face by the specified trusted publishers within the last 24 hours (2026-09-02 00:00:00Z to 2026-09-03 23:59:59Z).

### Gaps / Follow-up

1.  **Incomplete API Response for File Details:** The Hugging Face API response (`full=true`) provides `rfilename` lists but does *not* include individual file sizes. This prevents precise calculation of "total file size for the smallest variant that fits 8GB VRAM (~6GB weights)" without making assumptions or performing additional API calls per model to retrieve file metadata. For future tasks, direct file size information in the initial API query would be beneficial.
2.  **Quality Regression Information:** The API response does not directly expose "reported quality regression vs base BF16". This information typically resides within the model card (`README.md`) which would require additional fetching and parsing for each relevant model.
3.  **Source Content Fetch Errors:** Several provided source URLs (e.g., `https://huggingface.co/models?search=mellum2&sort=createdAt`, `https://huggingface.co/bartowski`, `https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day`) resulted in "FETCH ERROR" or returned HTML content instead of structured data. This limited the scope of the search to only the primary Hugging Face API JSON response.
4.  **Prior Research Findings Access:** The instruction to "check `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files" could not be executed as this file system is not accessible. This report assumes no prior knowledge of previously reported quants.

---
**Digest:** no drops today
