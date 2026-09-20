# Research: mellum2-quant-watch-2026-09-10

**Date:** 2026-09-10
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Structured Findings Document

**ID:** mellum2-quant-watch-2026-09-10
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

### Summary

As of 2026-09-10, no new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) from the specified trusted publishers have been identified on Hugging Face within the last 24 hours. All Mellum2 model entries found via the Hugging Face API had `lastModified` timestamps significantly older than the 24-hour window.

The search included checking for preferred quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) and specific trusted publishers. Due to multiple `FETCH ERROR` responses from other specified sources (Hugging Face web search, individual publisher profiles, Reddit), the analysis was primarily reliant on the direct Hugging Face API model search.

### Key Findings

1.  **No New Quants in Last 24 Hours:** A comprehensive review of the `lastModified` timestamps for all models matching "Mellum2" on the Hugging Face API (`https://huggingface.co/api/models?search=Mellum2&full=true`) indicates that no new or updated quantized models were published within the 24-hour period preceding 2026-09-10. The most recent `lastModified` date observed was 2026-08-31T13:06:19.000Z for `JetBrains/Mellum2-12B-A2.5B-Base-Pretrain`, which is outside the target window.
2.  **Existing Quantizations (Older):** Several quantized Mellum2 models exist on Hugging Face, but their `lastModified` dates fall outside the specified 24-hour window. These include:
    *   **GGUF:**
        *   `JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M` (last modified: 2026-06-04)
        *   `JetBrains/Mellum2-12B-A2.5B-Instruct-GGUF-Q4_K_M` (last modified: 2026-06-04)
        *   `RJ000/Mellum2-12B-A2.5B-Thinking-GGUF` (Q4_K_M, last modified: 2026-06-02)
        *   `JSchneemann/Mellum2-12B-A2.5B-Thinking-GGUF` (BF16, Q4_K_M, Q6_K, Q8_0, last modified: 2026-06-03)
        *   `shailesh83/Mellum2-Thinking-Q4_K_M` (last modified: 2026-06-02)
        *   `shailesh83/Mellum2-BF16` (last modified: 2026-06-02)
        *   `junwatu/Mellum2-12B-A2.5B-Instruct-GGUF` (Q4_K_M, last modified: 2026-07-22)
    *   **MLX:**
        *   `mlx-community/Mellum2-12B-A2.5B-Thinking-4bit` (last modified: 2026-08-11)
        *   `mlx-community/Mellum2-12B-A2.5B-Thinking-mxfp4` (4-bit, last modified: 2026-08-11)
        *   `mlx-community/Mellum2-12B-A2.5B-Instruct-4bit` (last modified: 2026-08-11)
        *   `mlx-community/Mellum2-12B-A2.5B-Instruct-mxfp4` (4-bit, last modified: 2026-08-11)
        *   `jedisct1/Mellum2-12B-A2.5B-Thinking-mlx-8bit` (last modified: 2026-06-02)
        *   `jedisct1/Mellum2-12B-A2.5B-Thinking-mlx-4bit` (last modified: 2026-06-02)
        *   `jedisct1/Mellum2-12B-A2.5B-Instruct-mlx-4bit` (last modified: 2026-06-02)
        *   `jedisct1/Mellum2-12B-A2.5B-Instruct-mlx-8bit` (last modified: 2026-06-02)
    *   **FP8:**
        *   `RedHatAI/Mellum2-12B-A2.5B-Thinking-FP8-Dynamic` (last modified: 2026-06-12)
3.  **Publisher Check:** The existing quants are from `JetBrains`, `mlx-community`, `RJ000`, `JSchneemann`, `shailesh83`, `junwatu`, and `RedHatAI`. While `mlx-community` is not explicitly on the "trusted publishers" list, it's a common community quantizer. `RedHatAI` is not on the trusted list. None of the explicitly trusted publishers (`bartowski`, `unsloth`, `mradermacher`, `MaziyarPanahi`, `TheBloke`, `QuantFactory`, `lmstudio-community`) had new Mellum2 quants in the last 24 hours.

### Questions Answered

**Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**

No, based on the `lastModified` timestamps from the Hugging Face API, no new community-quantized Mellum2-12B-A2.5B model variants have been published within the last 24 hours (relative to 2026-09-10).

### Gaps / Follow-up

1.  **API Access Reliability:** Multiple `FETCH ERROR` responses were received for direct URLs to trusted publisher profiles and the Hugging Face web search. This indicates potential issues with the scraping/fetching mechanism or temporary network issues, which could lead to incomplete data. A retry mechanism or alternative API endpoint for these sources should be considered for future research tasks.
2.  **File Size for VRAM Fit:** The task requested total file size for the smallest variant that fits 8GB VRAM (~6GB weights). While `siblings` lists filenames, the API response does not provide file sizes directly. This would require an additional API call per file or parsing model cards, which was not feasible within the current scope given the primary finding of "no new quants".
3.  **Quality Regression Data:** The API response does not directly provide information on "reported quality regression vs base BF16". This data would typically be found within the model card (`README.md`) or associated discussions, which were not accessible due to fetch errors.
4.  **`mlx-community` and `RedHatAI` as Trusted Publishers:** Clarification on whether `mlx-community` and `RedHatAI` should be considered trusted publishers for future searches, as they are actively quantizing Mellum2 models, albeit outside the 24h window for this specific query.

### Relevant Code/API Snippets

**Hugging Face API Call Used:**
`https://huggingface.co/api/models?search=Mellum2&full=true`

**Example of a model entry and its `lastModified` timestamp (illustrating why no new quants were found):**

```json
{
    "_id": "6a7b6e0dc8280e6f13ab55f7",
    "id": "mlx-community/Mellum2-12B-A2.5B-Thinking-4bit",
    "author": "mlx-community",
    "gated": false,
    "lastModified": "2026-08-11T19:08:45.000Z", // Outside 24h window for 2026-09-10
    "likes": 2,
    "trendingScore": 2,
    "private": false,
    "sha": "0821bd05a58a0d5aa5fec32b7738a84c060404dd",
    "downloads": 186,
    "tags": ["mlx", "safetensors", "mellum", "moe", "thinking", "4-bit", "text-generation", "conversational", "en", "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking", "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Thinking", "license:apache-2.0", "region:us"],
    "pipeline_tag": "text-generation",
    "library_name": "mlx",
    "createdAt": "2026-08-11T18:46:37.000Z",
    "modelId": "mlx-community/Mellum2-12B-A2.5B-Thinking-4bit",
    "siblings": [
        {"rfilename": ".gitattributes"},
        {"rfilename": "README.md"},
        {"rfilename": "chat_template.jinja"},
        {"rfilename": "config.json"},
        {"rfilename": "generation_config.json"},
        {"rfilename": "model-00001-of-00002.safetensors"},
        {"rfilename": "model-00002-of-00002.safetensors"},
        {"rfilename": "model.safetensors.index.json"},
        {"rfilename": "tokenizer.json"},
        {"rfilename": "tokenizer_config.json"}
    ]
}
```

**Digest for no new drops:**

`no drops today`
