# Research: mellum2-quant-watch-2026-06-02

**Date:** 2026-06-02
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**Research Task ID:** mellum2-quant-watch-2026-06-02
**Analyst:** Argus, Wyltek Industries

## Summary

This research aimed to identify any newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) on Hugging Face within the last 24 hours (relative to 2026-06-02). The search prioritized GGUF, AWQ 4-bit, GPTQ 4-bit, ExLlamaV2/EXL2, and MLX formats from a list of trusted publishers.

Based on the analysis of the Hugging Face API, no new community-quantized Mellum2 model variants from the specified trusted publishers were found within the last 24 hours that met the criteria. One GGUF model was identified as recently published, but its author is not on the list of trusted publishers, and the API response did not list the actual GGUF files.

## Key Findings

1.  **Official JetBrains Models:** The Hugging Face API returned several official JetBrains Mellum2-12B-A2.5B models (Thinking, Instruct, Base, SFT, Pretrain variants). All of these models were modified within the last 24 hours (on 2026-06-01), but their file lists consistently showed standard `safetensors` files, indicating they are the base, unquantized versions. Therefore, these do not meet the "community-quantized" requirement.
    *   `JetBrains/Mellum2-12B-A2.5B-Thinking` (lastModified: `2026-06-01T15:40:37.000Z`)
    *   `JetBrains/Mellum2-12B-A2.5B-Instruct` (lastModified: `2026-06-01T11:16:56.000Z`)
    *   `JetBrains/Mellum2-12B-A2.5B-Thinking-SFT` (lastModified: `2026-06-01T11:17:13.000Z`)
    *   `JetBrains/Mellum2-12B-A2.5B-Base` (lastModified: `2026-06-01T11:17:45.000Z`)
    *   `JetBrains/Mellum2-12B-A2.5B-Base-Pretrain` (lastModified: `2026-06-01T11:17:59.000Z`)
    *   `JetBrains/Mellum2-12B-A2.5B-Instruct-SFT` (lastModified: `2026-06-01T11:17:31.000Z`)

2.  **Untrusted Quantized Model Identified:** A model named `DevQuasar/JetBrains.Mellum2-12B-A2.5B-Thinking-GGUF` was found, with a `lastModified` timestamp of `2026-06-02T00:33:14.000Z`, placing its publication within the last 24 hours.
    *   **Publisher:** `DevQuasar`. This publisher is **not** on the list of trusted publishers (`bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community`).
    *   **Quant Format:** The model name suggests GGUF, which is a high-priority format.
    *   **File List Anomaly:** The `siblings` array for this model in the API response only listed `.gitattributes` and `README.md`, with no actual GGUF model files. This indicates either an incomplete upload or a discrepancy in the API's `full=true` response for this specific entry.

3.  **No Trusted Quants Found:** Due to the `DevQuasar` model being from an untrusted publisher, it does not meet the full requirements of the research task. No other models matching the search criteria (Mellum2, quantized, last 24h, trusted publisher) were identified.

## Questions Answered

**Research Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h from a trusted publisher.

**Answer:** No community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants from the specified trusted publishers have been published to Hugging Face in the last 24 hours.

## Gaps / Follow-up

1.  **Hugging Face API `full=true` File Listing:** The API response for `DevQuasar/JetBrains.Mellum2-12B-A2.5B-Thinking-GGUF` did not include the actual GGUF model files in its `siblings` array, despite the model name clearly indicating a GGUF. This could be an API limitation or an issue with the model's repository structure. Further investigation into how `full=true` populates `siblings` for GGUF models might be warranted if similar issues arise with trusted publishers.
2.  **Clarification on "re-report" logic:** Without access to `~/.claude/shared/research-findings/`, the interpretation of "new" was strictly based on the `lastModified` timestamp within the last 24 hours. Confirmation on how to handle historical data without direct access would be beneficial for future runs.
3.  **HTML Source Fetch Errors:** Several provided HTML sources (e.g., `huggingface.co/models?search=mellum2&sort=createdAt`, various publisher pages) resulted in "FETCH ERROR". While the primary search was via the API, these errors limited the ability to cross-reference or gather additional context from those pages.

## Relevant Code/API Snippets

The primary API endpoint used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`
