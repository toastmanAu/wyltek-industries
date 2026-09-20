# Research: mellum2-quant-watch-2026-08-09

**Date:** 2026-08-09
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**Wyltek Industries - Technical Research Findings**

**ID:** mellum2-quant-watch-2026-08-09
**Analyst:** Argus
**Date:** 2026-08-09

---

### Summary

This research task aimed to identify any newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) on Hugging Face within the last 24 hours. The search prioritized GGUF, AWQ 4-bit, GPTQ 4-bit, and ExLlamaV2/EXL2 formats, with MLX as a low priority, from a list of trusted publishers.

Based on the provided Hugging Face API data, **no new community-quantized Mellum2-12B-A2.5B model variants were published or updated by any publisher (trusted or otherwise) within the last 24 hours relative to the research date of 2026-08-09.** The most recent `lastModified` timestamp observed across all Mellum2 models in the search results was `2026-07-22T01:13:55.000Z`, which falls outside the specified 24-hour window.

### Key Findings

1.  **No New Quants in Last 24 Hours:** All Mellum2 model entries in the provided Hugging Face API response have `lastModified` or `createdAt` timestamps significantly older than the 24-hour window preceding 2026-08-09. The latest timestamp is `2026-07-22T01:13:55.000Z`.
2.  **Existing Quant Formats:** The search results indicate the presence of Mellum2 models quantized in:
    *   **GGUF:** Multiple variants (Q4_K_M, Q2_K, Q3_K_L, Q3_K_M, Q3_K_S, Q3_K_XL, Q4_0, Q4_1, Q4_K_L, Q4_K_S, Q5_K_L, Q5_K_M, Q5_K_S, Q6_K, Q6_K_L, Q8_0, IQ2_M, IQ2_S, IQ2_XS, IQ3_M, IQ3_XS, IQ3_XXS, IQ4_NL, IQ4_XS, BF16, imatrix, MXFP4_MOE).
    *   **MLX:** 4-bit and 8-bit variants.
    *   **FP8-Dynamic:** One model from RedHatAI.
3.  **Missing Quant Formats:** No models explicitly tagged with AWQ 4-bit, GPTQ 4-bit, or ExLlamaV2/EXL2 formats were found in the provided API search results for Mellum2.
4.  **Model Variants:** Quantized versions of both "Thinking" and "Instruct" variants of Mellum2-12B-A2.5B were found in the broader search results (though not new). No explicitly quantized "Base" variant was identified.
5.  **Trusted Publishers:** Of the specified trusted publishers, only `bartowski` was found to have published Mellum2 quantized models in the provided API search results. Their models were last modified on `2026-06-10`. Other trusted publishers (`unsloth`, `mradermacher`, `MaziyarPanahi`, `TheBloke`, `QuantFactory`, `lmstudio-community`) did not appear in the `api/models?search=Mellum2` results.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**
    *   **Answer:** No, no such models were published or updated within the last 24 hours (relative to 2026-08-09). The most recent activity for any Mellum2 model in the provided data was on 2026-07-22.

### Gaps / Follow-up

1.  **File Size Information:** The provided Hugging Face API output does not include file sizes for individual model files (`.gguf`, `.safetensors`, etc.). To determine the "total file size for the smallest variant that fits 8GB VRAM (~6GB weights leaving room for KV cache)", direct access to model file metadata (e.g., via `https://huggingface.co/api/models/{repo_id}/tree/main`) or manual inspection of model pages would be required.
2.  **Quality Regression Data:** Information regarding "any reported quality regression vs base BF16" is not present in the API metadata. This data would typically be found within the `README.md` file of each model repository, requiring an additional fetch and parsing step for each relevant model.
3.  **De-duplication against prior research:** The instruction to check `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files could not be executed due to environmental limitations. This report assumes all models in the provided API snippet are "known" unless their `lastModified` or `createdAt` falls within the 24-hour window.
4.  **Comprehensive Trusted Publisher Check:** While the `api/models?search=Mellum2` query covers all models containing "Mellum2", a more direct check of each trusted publisher's profile (e.g., `https://huggingface.co/{publisher_name}/models?search=Mellum2`) would confirm if they host Mellum2 models that might not be caught by the general search string (e.g., if the model name doesn't contain "Mellum2" but is a Mellum2 variant). However, the provided source content for individual publisher profiles indicated fetch errors, preventing this deeper inspection.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example structure of a relevant model entry from the API response (showing `bartowski/Mellum2-12B-A2.5B-Thinking-GGUF`):

```json
{
  "_id": "6a29a84d5c01dc6038097410",
  "id": "bartowski/Mellum2-12B-A2.5B-Thinking-GGUF",
  "author": "bartowski",
  "gated": false,
  "lastModified": "2026-06-10T20:27:21.000Z",
  "likes": 5,
  "trendingScore": 2,
  "private": false,
  "sha": "e10a3d18c7a65d9e06a1ef9c228082fbbc798182",
  "downloads": 3226,
  "tags": [
    "gguf",
    "text-generation",
    "en",
    "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking",
    "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Thinking",
    "license:apache-2.0",
    "model-index",
    "endpoints_compatible",
    "region:us",
    "conversational"
  ],
  "pipeline_tag": "text-generation",
  "createdAt": "2026-06-10T18:09:17.000Z",
  "modelId": "bartowski/Mellum2-12B-A2.5B-Thinking-GGUF",
  "siblings": [
    { "rfilename": ".gitattributes" },
    { "rfilename": "Mellum2-12B-A2.5B-Thinking-IQ2_M.gguf" },
    { "rfilename": "Mellum2-12B-A2.5B-Thinking-IQ2_S.gguf" },
    // ... many other GGUF files ...
    { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q8_0.gguf" },
    { "rfilename": "README.md" }
  ]
}
```
