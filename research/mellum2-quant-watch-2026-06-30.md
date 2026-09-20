# Research: mellum2-quant-watch-2026-06-30

**Date:** 2026-06-30
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Argus - Technical Research Findings

**Research Task ID:** mellum2-quant-watch-2026-06-30
**Date:** 2026-06-30

---

### Summary

A comprehensive search of the Hugging Face API for community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) published by trusted publishers within the last 24 hours (since 2026-06-29T00:00:00Z) yielded no new results. All identified quantized models from trusted publishers were last modified prior to this 24-hour window.

### Key Findings

1.  **Search Scope:** The search targeted Hugging Face models matching "Mellum2" using the API endpoint `https://huggingface.co/api/models?search=Mellum2&full=true`.
2.  **Timeframe:** The analysis focused on models with a `lastModified` timestamp on or after 2026-06-29T00:00:00Z.
3.  **Trusted Publishers:** The following publishers were considered trusted: bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community.
4.  **Quantization Formats & VRAM Target:** Priority was given to GGUF (Q4_K_M, Q5_K_M, Q3_K_M, Q6_K, Q8_0), followed by AWQ 4-bit, GPTQ 4-bit, ExLlamaV2 / EXL2, and MLX. For an RTX 3060 Ti 8GB, a target weight size of ~6GB was used, meaning GGUF Q4_K_M (approx. 6.0GB), Q3_K_M (approx. 4.5GB), or lower bit-widths would be suitable.
5.  **Search Results Analysis:**
    *   The API returned a list of Mellum2 models and their details.
    *   Each model's `author` and `lastModified` timestamp were inspected.
    *   Several quantized versions (primarily GGUF and MLX) were found from various authors.
    *   However, none of these models, whether from trusted or untrusted publishers, had a `lastModified` timestamp within the specified 24-hour window. The most recent `lastModified` date observed for any Mellum2 model was 2026-06-12T15:13:19.000Z.
6.  **Conclusion:** No new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants from trusted publishers were published to Hugging Face in the last 24 hours.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**
    No, no such models from trusted publishers were found with a `lastModified` timestamp within the last 24 hours (i.e., since 2026-06-29T00:00:00Z).

### Gaps / Follow-up

*   **File Size Details:** While the quantization formats and bit-widths were identified, the exact file sizes for each specific GGUF variant (e.g., `Mellum2-12B-A2.5B-Thinking-Q4_K_M.gguf`) were not directly available in the provided API snippet. This would require a follow-up API call to each specific model's `repo_id/tree/main` endpoint or a manual inspection of the model page to confirm the exact file sizes. However, for the purpose of identifying *new* drops, this was not critical as no new models were found.
*   **Quality Regression:** No information regarding reported quality regression versus base BF16 was available in the API response or the provided HTML snippets. This would typically be found in the model card (`README.md`) of a specific model, requiring a deeper dive into individual model pages if a new quant were identified.
*   **Prior Research Findings:** The instruction to "Do NOT re-report quants seen in previous days — check `~/.claude/shared/research-findings/`" could not be fulfilled due to lack of access to the specified file path. The current report relies solely on the `lastModified` timestamp to identify "new" drops.

### Relevant Code/API Snippets

The primary API endpoint used for this research:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```
