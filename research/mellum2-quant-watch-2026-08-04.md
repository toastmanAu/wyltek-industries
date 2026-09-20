# Research: mellum2-quant-watch-2026-08-04

**Date:** 2026-08-04
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Wyltek Industries - Argus Research Findings

**ID:** mellum2-quant-watch-2026-08-04
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

As of 2026-08-04, no new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) have been published to Hugging Face by the specified trusted publishers within the last 24 hours. All Mellum2 model variants found via the Hugging Face API were last modified prior to the 24-hour window (before 2026-08-03T00:00:00Z).

### Key Findings

1.  **No New Quants from Trusted Publishers:** A comprehensive search of the Hugging Face API for "Mellum2" models revealed no new or updated community-quantized models from the designated trusted publishers (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community) within the last 24 hours (2026-08-03T00:00:00Z to 2026-08-04T00:00:00Z).
2.  **Timestamp Analysis:** All models listed in the provided API response, including those from JetBrains directly and other non-trusted community members, had `lastModified` timestamps earlier than 2026-08-03. The most recent `lastModified` date observed was 2026-07-22T01:13:55.000Z for `junwatu/Mellum2-12B-A2.5B-Instruct-GGUF`, which is outside the 24-hour window and from a non-trusted publisher.
3.  **Publisher Filtering:** Several quantized Mellum2 models exist on Hugging Face (e.g., from `yuxinlu1`, `WithinUsAI`, `mdamir97`, `skilledu`, `RJ000`, `jedisct1`, `JSchneemann`, `shailesh83`, `junwatu`, `RedHatAI`), but these are not from the list of trusted community publishers and were therefore excluded from the primary search criteria. Official JetBrains GGUF quants were also excluded as they are not "community-quantized" by the specified definition.
4.  **Quantization Format and Size Considerations (Hypothetical):** Had a new quant been found, a 4-bit GGUF (e.g., Q4_K_M) or other 4-bit formats (AWQ, GPTQ, EXL2, MLX) for a 12B model would typically result in a file size of approximately 6GB (12B parameters * 4 bits/parameter), fitting the 8GB VRAM target with room for KV cache. 3-bit GGUF (Q3_K_M) would be around 4.5GB. 6-bit (Q6_K) and 8-bit (Q8_0) GGUF would likely exceed the 6GB weight limit for a 12B model.

### Questions Answered

**Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**
No drops today.

### Gaps / Follow-up

1.  **File Size Verification:** The Hugging Face API response (`/api/models?search=Mellum2&full=true`) does not directly provide file sizes for individual model files. While bit-width allows for estimation, direct file size information would be more precise for confirming VRAM fit. A follow-up API call to specific model repos (`/api/models/{repo_id}/tree/main`) would be required to retrieve exact file sizes.
2.  **Prior Research Findings Access:** The instruction to "Do NOT re-report quants seen in previous days — check `~/.claude/shared/research-findings/`" could not be fulfilled due to lack of access to the specified file path. This report assumes no prior knowledge of Mellum2 quantizations.
3.  **Incomplete Source Content:** Several provided source URLs resulted in "FETCH ERROR" (e.g., `https://huggingface.co/models?search=mellum2&sort=createdAt`, `https://huggingface.co/bartowski`, `https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day`). While the primary API endpoint was successfully queried, these errors indicate potential missed information from other relevant sources, particularly community discussions or broader new releases.
4.  **Quality Regression Details:** The task requested "any reported quality regression vs base BF16." This information is typically found within model cards or discussion sections. Since no new models were found, and the provided HTML snippets for discussion pages also resulted in fetch errors, this detail could not be extracted.

### Relevant Code/API Snippets

The primary API used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example structure of a model entry from the API response (truncated for brevity):
```json
{
    "_id": "6a1563f96ea5882878c82ed4",
    "id": "JetBrains/Mellum2-12B-A2.5B-Thinking",
    "author": "JetBrains",
    "gated": false,
    "lastModified": "2026-06-12T10:46:19.000Z",
    "likes": 329,
    "trendingScore": 5,
    "private": false,
    "sha": "ba4838faad89e968c36f39e76e95319d756714fe",
    "downloads": 5141,
    "tags": ["transformers", "safetensors", "mellum", "text-generation", "conversational", "en", "arxiv:2605.31268", "license:apache-2.0", "model-index", "eval-results", "endpoints_compatible", "region:us", "deploy:sagemaker"],
    "pipeline_tag": "text-generation",
    "library_name": "transformers",
    "createdAt": "2026-05-26T09:12:25.000Z",
    "modelId": "JetBrains/Mellum2-12B-A2.5B-Thinking",
    "siblings": [
        {"rfilename": ".eval_results/mellum2.yaml"},
        {"rfilename": "README.md"},
        {"rfilename": "model-00001-of-00005.safetensors"},
        // ... more files
    ]
}
```
