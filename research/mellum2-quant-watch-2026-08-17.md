# Research: mellum2-quant-watch-2026-08-17

**Date:** 2026-08-17
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**ID:** mellum2-quant-watch-2026-08-17
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

## Summary

No new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) from trusted publishers were found on Hugging Face within the last 24 hours (i.e., since 2026-08-16T00:00:00Z). All models identified via the Hugging Face API search for "Mellum2" had `lastModified` timestamps prior to this 24-hour window.

## Key Findings

1.  **Search Scope:** The search was conducted using the Hugging Face API endpoint `https://huggingface.co/api/models?search=Mellum2`.
2.  **Time Window:** The analysis focused on models with `lastModified` or `createdAt` timestamps on or after 2026-08-16T00:00:00Z (relative to the report date of 2026-08-17).
3.  **Model Variants:** The search included all specified Mellum2-12B-A2.5B variants: Thinking, Instruct, and Base.
4.  **Quantization Formats:** Priority was given to GGUF (Q4_K_M, Q5_K_M, Q3_K_M, Q6_K, Q8_0), followed by AWQ 4-bit, GPTQ 4-bit, ExLlamaV2 / EXL2, and MLX.
5.  **Trusted Publishers:** The authors of the models were checked against the list of trusted publishers: bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community.
6.  **No New Drops:** Upon reviewing all results from the specified API endpoint, the most recent `lastModified` timestamp found was `2026-08-13T10:20:54.000Z` for `JetBrains/Mellum2-12B-A2.5B-Thinking-SFT`. This timestamp falls outside the 24-hour reporting window. Therefore, no new or updated quantized models meeting the criteria were published in the last 24 hours.

## Questions Answered

**Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**
No, based on the provided Hugging Face API search results, no community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants from trusted publishers have been published or updated on Hugging Face in the last 24 hours.

## Gaps / Follow-up

1.  **Access to Prior Research Findings:** The instruction "check ~/.claude/shared/research-findings/ for prior mellum2-quant-watch-* files and skip already-known repos" could not be fulfilled as I do not have access to local file systems. This report assumes all models in the provided API output were *potentially* new if they met the timestamp criteria. If any models listed in the source were previously reported, this would lead to re-reporting.
2.  **Incomplete Source Content:** Several provided source links (e.g., `https://huggingface.co/models?search=mellum2&sort=createdAt` and individual publisher profile pages) resulted in "FETCH ERROR" or HTML content instead of structured API data. While the primary instruction was to use the `api/models?search=Mellum2` endpoint, these additional sources might contain models not captured by that specific search or provide more granular `createdAt` timestamps that could reveal new drops from trusted publishers.
3.  **Quality Regression Information:** The task requested "any reported quality regression vs base BF16." This information is typically found within a model's `README.md` or model card, which is not directly available in the provided API JSON snippet. If a new quant had been found, a follow-up would be required to visit the model card URL to extract this detail.

## Relevant Code/API Snippets

The core data used for this analysis was the `lastModified` field from the Hugging Face API response:

```json
[
  {
    "id": "JetBrains/Mellum2-12B-A2.5B-Thinking",
    "lastModified": "2026-08-13T10:20:47.000Z",
    // ... other fields
  },
  {
    "id": "JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q8_0",
    "lastModified": "2026-06-04T11:17:02.000Z",
    // ... other fields
  },
  {
    "id": "bartowski/Mellum2-12B-A2.5B-Instruct-GGUF",
    "lastModified": "2026-06-10T20:59:41.000Z",
    // ... other fields
  },
  {
    "id": "NANI-Nithin/Mellum2-12B-A2.5B-Instruct-GGUF",
    "lastModified": "2026-08-04T21:03:51.000Z",
    // ... other fields
  },
  {
    "id": "mlx-community/Mellum2-12B-A2.5B-Instruct-4bit",
    "lastModified": "2026-08-11T20:11:50.000Z",
    // ... other fields
  },
  {
    "id": "mlx-community/Mellum2-12B-A2.5B-Instruct-mxfp4",
    "lastModified": "2026-08-11T20:28:48.000Z",
    // ... other fields
  },
  // ... all other entries also had lastModified dates prior to 2026-08-16
]
```
