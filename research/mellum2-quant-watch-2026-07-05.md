# Research: mellum2-quant-watch-2026-07-05

**Date:** 2026-07-05
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Wyltek Industries Technical Research Findings

**Research Task ID:** mellum2-quant-watch-2026-07-05
**Date:** 2026-07-05
**Analyst:** Argus

---

### Summary

This research aimed to identify any newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) on Hugging Face within the last 24 hours. The search targeted specific quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) from a list of trusted publishers.

Based on the analysis of the provided Hugging Face API data, **no new community-quantized Mellum2-12B-A2.5B model variants were published in the last 24 hours.** All identified Mellum2-related models in the API response had `lastModified` timestamps prior to 2026-07-04, falling outside the specified 24-hour window.

### Key Findings

1.  **No New Quants Found:** A comprehensive scan of the Hugging Face API for "Mellum2" models revealed no new community-quantized versions of JetBrains Mellum2-12B-A2.5B (Thinking, Instruct, Base) published or updated within the last 24 hours (relative to 2026-07-05).
2.  **Timestamp Analysis:** The most recent `lastModified` timestamp among all Mellum2 models in the provided API response was `2026-06-12T15:13:19.000Z` for `RedHatAI/Mellum2-12B-A2.5B-Thinking-FP8-Dynamic`. All other entries were older, indicating no activity within the 2026-07-04 to 2026-07-05 timeframe.
3.  **VRAM Constraint for 12B Models:** Even if new quants were found, the target hardware (RTX 3060 Ti 8GB with ~6GB VRAM for weights) presents a significant challenge for 12B parameter models. A 12B model in BF16 format is approximately 24GB. Common 4-bit GGUF quantizations (like Q4_K_M) typically reduce the size to around 45-50% of the BF16 size, which would still be approximately 10.8GB - 12GB. This size exceeds the 6GB VRAM allocation for weights, even with MoE expert offload to CPU. This implies that only highly aggressive quantization (e.g., Q2_K or similar, if available and performant) or a smaller base model would fit the specified VRAM constraint.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    *   **Answer:** No, no such models were found to have been published or updated within the last 24 hours.

### Gaps / Follow-up

1.  **Missing File Size Information:** The Hugging Face API response (`/api/models?search=Mellum2&full=true`) does not include file sizes for individual `rfilename` entries. This prevents accurate calculation of total file size for each quantized variant to verify the "smallest variant that fits 8GB VRAM (~6GB weights)" criterion. Manual inspection of each model card would be required to obtain this data.
2.  **Prior Research Files:** The instruction to "Do NOT re-report quants seen in previous days — check `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files" could not be fulfilled due to lack of access to the specified file path. This report assumes all models in the API response are "new" in the context of this specific search, though their `lastModified` dates already filtered them out.
3.  **Inaccessible Source Content:** Several provided source URLs (e.g., `https://huggingface.co/models?search=mellum2&sort=createdAt`, publisher profiles, model discussion pages, Reddit) returned `FETCH ERROR` or HTML content instead of structured data. This limited the search scope to the single `/api/models` JSON endpoint.
4.  **Feasibility of 12B on 8GB VRAM:** Further investigation is needed to determine if any 12B model, even with optimal quantization and MoE expert offload, can realistically operate with only ~6GB VRAM allocated for weights. The current understanding suggests this is unlikely for standard 4-bit quants.

### Relevant Code/API Snippets

**Hugging Face API Call:**

```bash
GET https://huggingface.co/api/models?search=Mellum2&full=true
```

**Example `lastModified` timestamps from API response (all outside 24h window):**

```json
[
  {
    "id": "JetBrains/Mellum2-12B-A2.5B-Thinking",
    "lastModified": "2026-06-12T10:46:19.000Z",
    "author": "JetBrains",
    "tags": ["transformers", "safetensors", "mellum", "text-generation"]
  },
  {
    "id": "yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF",
    "lastModified": "2026-06-09T09:17:02.000Z",
    "author": "yuxinlu1",
    "tags": ["gguf", "mellum", "mellum2", "llama.cpp"]
  },
  {
    "id": "bartowski/Mellum2-12B-A2.5B-Thinking-GGUF",
    "lastModified": "2026-06-10T20:27:21.000Z",
    "author": "bartowski",
    "tags": ["gguf", "text-generation"]
  },
  {
    "id": "RedHatAI/Mellum2-12B-A2.5B-Thinking-FP8-Dynamic",
    "lastModified": "2026-06-12T15:13:19.000Z",
    "author": "RedHatAI",
    "tags": ["safetensors", "mellum", "fp8", "vllm", "compressed-tensors"]
  }
  // ... other models with similar older timestamps
]
```
