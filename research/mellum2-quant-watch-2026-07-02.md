# Research: mellum2-quant-watch-2026-07-02

**Date:** 2026-07-02
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Wyltek Industries Technical Research Findings

**Research Task ID:** mellum2-quant-watch-2026-07-02
**Date:** 2026-07-02

### Summary
This research aimed to identify any newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) on Hugging Face within the last 24 hours. The search prioritized GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, and MLX formats from a list of trusted publishers.

After analyzing the Hugging Face API response for "Mellum2" models, no new quantized model variants were found that were modified within the specified 24-hour window (i.e., on 2026-07-01 or 2026-07-02). All identified Mellum2-related models and their quantized versions had `lastModified` timestamps prior to July 2026.

### Key Findings
1.  **No New Quantized Models Found:** A comprehensive search of the Hugging Face API for models matching "Mellum2" revealed no community-quantized versions of JetBrains Mellum2-12B-A2.5B (Thinking, Instruct, Base) that were published or last modified within the last 24 hours (i.e., on 2026-07-01 or 2026-07-02).
2.  **Existing Quantizations (Out of Scope for "New"):** Several quantized versions from various publishers were identified, but their `lastModified` dates were all in June 2026, making them outside the current 24-hour reporting window. Examples include:
    *   `jedisct1/Mellum2-12B-A2.5B-Thinking-mlx-4bit` (last modified 2026-06-02)
    *   `WithinUsAI/Mellum2-Thinker.Uncensored-12B-A2.5B-gguf` (last modified 2026-06-09)
    *   `yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF` (last modified 2026-06-09)
    *   `bartowski/Mellum2-12B-A2.5B-Thinking-GGUF` (last modified 2026-06-10)
    *   `RedHatAI/Mellum2-12B-A2.5B-Thinking-FP8-Dynamic` (last modified 2026-06-12)
3.  **Untrusted/Unquantized Models:** The search also returned several official JetBrains models (e.g., `JetBrains/Mellum2-12B-A2.5B-Thinking`, `JetBrains/Mellum2-12B-A2.5B-Instruct`, `JetBrains/Mellum2-12B-A2.5B-Base`) and re-uploads by untrusted publishers (e.g., `mdamir97`, `skilledu`) which were either not quantized or not from the specified trusted list. These were also outside the 24-hour window.

### Questions Answered
**Q: Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**
**A:** No drops today.

### Gaps / Follow-up
1.  **Inaccessible Source Content:** Several provided source URLs (e.g., `https://huggingface.co/models?search=mellum2&sort=createdAt`, publisher profiles, Reddit search) returned `FETCH ERROR` or truncated HTML content, preventing a full analysis of those sources. While the primary API search was successful, a broader search might have yielded additional results if these sources were accessible.
2.  **File Size Information:** The Hugging Face API response does not directly provide file sizes for individual quantized variants within a repository's `siblings` list. Manual inspection of each model card would be required to determine the exact file sizes and confirm fit for 8GB VRAM. For this report, common bit-widths were used to estimate approximate sizes (e.g., 4-bit quants are ~6GB for a 12B model).
3.  **Quality Regression Data:** The API response does not explicitly state quality regression metrics for quantized models compared to their base BF16 versions. This information would typically be found within the model card's README, requiring manual review.

### Relevant Code/API Snippets
The primary API endpoint used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example structure of a relevant model entry from the API response:
```json
{
    "_id": "6a29a84d5c01dc6038097410",
    "id": "bartowski/Mellum2-12B-A2.5B-Thinking-GGUF",
    "author": "bartowski",
    "gated": false,
    "lastModified": "2026-06-10T20:27:21.000Z",
    "likes": 1,
    "trendingScore": 1,
    "private": false,
    "sha": "e10a3d18c7a65d9e06a1ef9c228082fbbc798182",
    "downloads": 5974,
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
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-IQ2_XS.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-IQ3_M.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-IQ3_XS.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-IQ3_XXS.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-IQ4_NL.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-IQ4_XS.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q2_K.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q2_K_L.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q3_K_L.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q3_K_M.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q3_K_S.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q3_K_XL.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q4_0.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q4_1.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q4_K_L.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q4_K_M.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q4_K_S.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q5_K_L.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q5_K_M.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q5_K_S.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q6_K.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q6_K_L.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q8_0.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-bf16.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-imatrix.gguf" },
        { "rfilename": "README.md" }
    ]
}
```
This snippet demonstrates the `id`, `author`, `lastModified`, `tags`, and `siblings` fields used for the analysis. The `lastModified` field was key for filtering results within the 24-hour window. The `tags` field was used to identify quantization formats (e.g., "gguf", "mlx", "4-bit"). The `siblings` list provided file names, which often indicate the specific quantization type (e.g., `Q4_K_M.gguf`).
