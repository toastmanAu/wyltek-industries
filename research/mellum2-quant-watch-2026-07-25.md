# Research: mellum2-quant-watch-2026-07-25

**Date:** 2026-07-25
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**ID:** mellum2-quant-watch-2026-07-25
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

As of 2026-07-25, no new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) from the list of trusted publishers have been identified on Hugging Face within the last 24 hours. All existing quantized models found via the Hugging Face API were last modified prior to 2026-07-24T00:00:00Z, and many were published by authors not on the approved trusted publisher list.

The search specifically targeted GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, and MLX formats, prioritizing GGUF for RTX 3060 Ti 8GB compatibility. Despite a comprehensive API search, no models meeting the criteria for recency and publisher trust were found.

### Key Findings

1.  **No Recent Quants from Trusted Publishers:** A thorough scan of the Hugging Face API for "Mellum2" models revealed no new quantized versions published or modified by any of the specified trusted publishers (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community) within the last 24 hours (i.e., on or after 2026-07-24).
2.  **Existing Quants are Older:** The most recently modified Mellum2-related model found in the API response was `junwatu/Mellum2-12B-A2.5B-Instruct-GGUF`, last modified on 2026-07-22T01:13:55.000Z. This falls outside the 24-hour window. Furthermore, `junwatu` is not on the list of trusted publishers.
3.  **No Relevant Formats from Trusted Publishers within Window:** While various quantization formats (GGUF, MLX) exist for Mellum2 models on Hugging Face, none from the trusted publishers were updated or released within the specified timeframe. For instance, `bartowski/Mellum2-12B-A2.5B-Thinking-GGUF` contains multiple GGUF quants, but its last modification date was 2026-06-10T20:27:21.000Z.
4.  **Incomplete Data Sources:** Several supplementary Hugging Face and Reddit URLs provided in the source content resulted in `FETCH ERROR`, indicating that additional information from these sources could not be retrieved. The analysis is therefore based solely on the primary Hugging Face API response.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**
    No, a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant from a trusted publisher has not been published or modified on Hugging Face within the last 24 hours (as of 2026-07-25).

### Gaps / Follow-up

1.  **Access to `~/.claude/shared/research-findings/`:** The instruction to "Do NOT re-report quants seen in previous days — check `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files" could not be fulfilled. Future research would benefit from access to this internal knowledge base to avoid redundant reporting.
2.  **Unreachable External Sources:** The `FETCH ERROR` for several Hugging Face and Reddit URLs indicates potential missed information. While the primary API search is comprehensive for model listings, discussions or broader community announcements might have been missed. Investigating the cause of these fetch errors and ensuring access to these sources for future tasks is recommended.
3.  **File Size Details:** For any future new quants found, the task requires reporting the "total file size for the smallest variant that fits 8GB VRAM (~6GB weights leaving room for KV cache)". The provided API response does not include individual file sizes directly, only `rfilename` lists. This would require an additional API call per model or parsing model card details, which was not necessary for this specific task as no new quants were found.

---
no drops today
