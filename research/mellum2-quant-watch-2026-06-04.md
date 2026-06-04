# Research: mellum2-quant-watch-2026-06-04

**Date:** 2026-06-04
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Structured Findings Document

**ID:** mellum2-quant-watch-2026-06-04
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h by a trusted publisher, matching specified quantization formats and VRAM requirements.

---

### Summary

As of 2026-06-04, a comprehensive scan of Hugging Face models tagged with "Mellum2" was performed to identify newly published community-quantized variants of the JetBrains Mellum2-12B-A2.5B series within the last 24 hours. The search specifically targeted models from a list of trusted publishers and prioritized GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, and MLX quantization formats, with a preference for variants suitable for 8GB VRAM.

No new community-quantized Mellum2-12B-A2.5B model variants from the specified trusted publishers (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community) were found to have been published or significantly modified on Hugging Face within the last 24 hours (i.e., since 2026-06-03T00:00:00Z). Several non-trusted publishers did release quantized Mellum2 models within this timeframe, but these fall outside the scope of this research task.

### Key Findings

1.  **No New Quants from Trusted Publishers:** No models matching the Mellum2-12B-A2.5B variants (Thinking, Instruct, Base) were found to be published or updated by any of the designated trusted publishers on Hugging Face within the last 24 hours (2026-06-03T00:00:00Z to 2026-06-04TXXXXXXZ).
2.  **Non-Trusted Publisher Activity:** Several models from non-trusted publishers were identified with `lastModified` or `createdAt` timestamps within the last 24 hours. These include:
    *   `JSchneemann/Mellum2-12B-A2.5B-Thinking-GGUF` (lastModified: 2026-06-03T07:59:47.000Z)
    *   `CodeFault/Mellum2-12B-A2.5B-Instruct-GGUF` (lastModified: 2026-06-03T13:38:36.000Z)
    *   `CodeFault/Mellum2-12B-A2.5B-Thinking-GGUF` (lastModified: 2026-06-03T13:38:38.000Z)
    *   `dpcpw/Mellum2-12B-A2.5B-Thinking-GGUF-mixed-q4-q8` (lastModified: 2026-06-03T21:22:48.000Z)
    *   `Smoffyy/Mellum2-12B-A2.5B-Instruct-Thinking-Pure-GGUF` (lastModified: 2026-06-03T04:39:35.000Z)
    *   `sahilchachra/mellum2-12b-a2_5b-thinking-mxfp4-mlx` (lastModified: 2026-06-03T10:21:49.000Z)
    *   `sahilchachra/mellum2-12b-a2_5b-thinking-optiq-5bpw-mlx` (lastModified: 2026-06-03T10:23:15.000Z)
    These models offer various quantization formats (primarily GGUF and MLX) and target different Mellum2 variants. However, they are excluded based on the "Trusted publishers" criterion.

### Questions Answered

**Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h by a trusted publisher?**
No drops today.

### Gaps / Follow-up

1.  **Missing File Size Information in API Response:** The Hugging Face API endpoint `https://huggingface.co/api/models?search=Mellum2&full=true` does not provide file sizes within the `siblings` array. This prevents a direct assessment of whether a model variant's weights (e.g., ~6GB for 8GB VRAM) fit the specified VRAM requirements.
    *   **Follow-up:** To accurately determine file sizes, a secondary API call to `https://huggingface.co/api/models/{repo_id}/tree/main` or similar would be required for each identified model, or direct parsing of model cards/file lists on the Hugging Face website.
2.  **External Source Fetch Errors:** Attempts to retrieve information from `https://huggingface.co/models?search=mellum2&sort=createdAt`, `https://huggingface.co/bartowski`, `https://huggingface.co/unsloth`, `https://huggingface.co/mradermacher`, `https://huggingface.co/MaziyarPanahi`, `https://huggingface.co/QuantFactory`, `https://huggingface.co/lmstudio-community`, `https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions`, `https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions`, and `https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day` resulted in "FETCH ERROR" or boilerplate HTML, indicating these sources could not be processed for relevant model data. The primary API search was the only effective method.
    *   **Follow-up:** Investigate the cause of these fetch errors (e.g., rate limiting, WAF, incorrect parsing logic for HTML content) for future research tasks.
3.  **Quality Regression Data:** No reported quality regression metrics (vs. base BF16) were readily available in the initial API response for any of the identified quantized models (even those from non-trusted publishers). This information typically resides within the model card (`README.md`).
    *   **Follow-up:** If a relevant model from a trusted publisher is found, a deeper inspection of its model card would be necessary to extract quality regression data.

### Relevant Code/API Snippets

The primary API used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example structure of a model entry from the API response (simplified for brevity, focusing on relevant fields):

```json
{
    "_id": "6a1f5e05877783f0b3b2a5b2",
    "id": "CodeFault/Mellum2-12B-A2.5B-Instruct-GGUF",
    "author": "CodeFault",
    "lastModified": "2026-06-03T13:38:36.000Z",
    "createdAt": "2026-06-02T22:49:41.000Z",
    "tags": [
        "gguf",
        "llama.cpp",
        "instruct",
        "mellum",
        "mellum2",
        "moe",
        "quantized",
        "text-generation",
        "en",
        "base_model:JetBrains/Mellum2-12B-A2.5B-Instruct",
        "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Instruct",
        "license:apache-2.0",
        "endpoints_compatible",
        "region:us",
        "conversational"
    ],
    "modelId": "CodeFault/Mellum2-12B-A2.5B-Instruct-GGUF",
    "siblings": [
        { "rfilename": ".gitattributes" },
        { "rfilename": "Mellum2-12B-A2.5B-Instruct-Q4_0.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Instruct-Q4_K_M.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Instruct-Q4_K_S.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Instruct-Q5_K_M.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Instruct-Q6_K.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Instruct-Q8_0.gguf" },
        { "rfilename": "README.md" }
