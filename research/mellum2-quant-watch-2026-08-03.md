# Research: mellum2-quant-watch-2026-08-03

**Date:** 2026-08-03
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**Research Task ID:** mellum2-quant-watch-2026-08-03
**Date:** 2026-08-03

### Summary

The research task aimed to identify any new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) published to Hugging Face within the last 24 hours. The search prioritized GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, and MLX formats from a list of trusted publishers.

Upon analyzing the provided Hugging Face API response for "Mellum2" models, no new quantized models were found that had been modified or published within the specified 24-hour window (i.e., on or after 2026-08-02). All listed models, including existing quantized versions, show `lastModified` timestamps from June and July 2026, with the most recent being from July 22, 2026.

### Key Findings

1.  **No New Quants in Last 24 Hours:** No community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) were published or last modified on Hugging Face within the last 24 hours (relative to 2026-08-03).
2.  **Existing Quants Identified (Not New):** The API response lists several existing quantized Mellum2 models, primarily in GGUF and MLX formats. These include:
    *   `JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M` (last modified 2026-06-04)
    *   `JetBrains/Mellum2-12B-A2.5B-Instruct-GGUF-Q4_K_M` (last modified 2026-06-04)
    *   `WithinUsAI/Mellum2-Thinker.Uncensored-12B-A2.5B-gguf` (last modified 2026-06-09)
    *   `bartowski/Mellum2-12B-A2.5B-Thinking-GGUF` (last modified 2026-06-10)
    *   `bartowski/Mellum2-12B-A2.5B-Instruct-GGUF` (last modified 2026-06-10)
    *   `RJ000/Mellum2-12B-A2.5B-Thinking-GGUF` (last modified 2026-06-02)
    *   `jedisct1/Mellum2-12B-A2.5B-Thinking-mlx-8bit` (last modified 2026-06-02)
    *   `jedisct1/Mellum2-12B-A2.5B-Thinking-mlx-4bit` (last modified 2026-06-02)
    *   `JSchneemann/Mellum2-12B-A2.5B-Thinking-GGUF` (last modified 2026-06-03)
    *   `shailesh83/Mellum2-Thinking-Q4_K_M` (last modified 2026-06-02)
    *   `junwatu/Mellum2-12B-A2.5B-Instruct-GGUF` (last modified 2026-07-22)
    *   `RedHatAI/Mellum2-12B-A2.5B-Thinking-FP8-Dynamic` (last modified 2026-06-12)
    *   `jedisct1/Mellum2-12B-A2.5B-Instruct-mlx-4bit` (last modified 2026-06-02)
    *   `jedisct1/Mellum2-12B-A2.5B-Instruct-mlx-8bit` (last modified 2026-06-02)
3.  **No AWQ, GPTQ, ExLlamaV2/EXL2 Quants:** Within the provided API response, no models tagged with AWQ, GPTQ, or ExLlamaV2/EXL2 quantization formats were found for Mellum2 variants, regardless of publication date.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    No, based on the provided Hugging Face API data, no community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) have been published or last modified within the last 24 hours.

### Gaps / Follow-up

1.  **Access to Prior Research Findings:** The instruction to "Do NOT re-report quants seen in previous days — check `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files" could not be fulfilled as I do not have access to this local directory. This means that if any of the *older* quants listed in the API response were considered "new" in a previous daily report, they would have been correctly skipped. However, since no quants were found within the *current* 24-hour window, this did not impact the primary finding for today.
2.  **Full File Size Information:** For the existing quants, the provided API response does not include individual file sizes, only the `rfilename`. To determine the "total file size for the smallest variant that fits 8GB VRAM (~6GB weights leaving room for KV cache)," a follow-up API call to the specific model repo's `https://huggingface.co/api/models/{repo_id}/tree/main` or similar would be required to sum the sizes of the GGUF files. This was not necessary for today's report as no new quants were found.
3.  **Quality Regression Data:** The provided API response does not contain information regarding reported quality regression vs. base BF16 for any models. This would typically be found in the model card (`README.md`) which would require parsing if a new quant were identified.

### Relevant Code/API Snippets

```json
// Snippet from the provided Hugging Face API response, showing the latest modified quantized model,
// which is still outside the 24-hour window for 2026-08-03.
{
    "_id": "6a1ed286c0fa89ba7a7df014",
    "id": "junwatu/Mellum2-12B-A2.5B-Instruct-GGUF",
    "author": "junwatu",
    "gated": false,
    "lastModified": "2026-07-22T01:13:55.000Z", // Not within 24 hours of 2026-08-03
    "likes": 2,
    "trendingScore": 0,
    "private": false,
    "sha": "79f1c3cd35ad0839263a19b6b73da4070eb73a66",
    "downloads": 190,
    "tags": [
        "gguf",
        "llama.cpp",
        "mellum2",
        "moe",
        "code",
        "quantized",
        "text-generation",
        "base_model:JetBrains/Mellum2-12B-A2.5B-Instruct",
        "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Instruct",
        "license:apache-2.0",
        "endpoints_compatible",
        "region:us",
        "conversational"
    ],
    "pipeline_tag": "text-generation",
    "createdAt": "2026-06-02T12:54:30.000Z",
    "modelId": "junwatu/Mellum2-12B-A2.5B-Instruct-GGUF",
    "siblings": [
        { "rfilename": ".gitattributes" },
        { "rfilename": "Mellum2-12B-A2.5B-Instruct-Q4_K_M.gguf" },
        { "rfilename": "README.md" }
    ]
}
```

**Digest:** no drops today
