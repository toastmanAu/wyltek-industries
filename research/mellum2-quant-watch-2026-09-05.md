# Research: mellum2-quant-watch-2026-09-05

**Date:** 2026-09-05
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Mellum2 Quantization Watch - 2026-09-05

**Summary**

This report details the findings from a search for community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) published to Hugging Face within the last 24 hours. The search prioritized GGUF, AWQ, GPTQ, and ExLlamaV2/EXL2 formats, with a secondary focus on MLX, from a list of trusted publishers.

Based on the analysis of the provided Hugging Face API data, no new community-quantized Mellum2-12B-A2.5B model variants from the specified trusted publishers were found to have been released or updated within the last 24 hours (i.e., since 2026-09-04T00:00:00Z). All identified models from trusted publishers had `lastModified` timestamps significantly older than the 24-hour window.

**Key Findings**

1.  **No New Quants from Trusted Publishers:** No new community-quantized Mellum2-12B-A2.5B model variants were published or updated by `bartowski`, `unsloth`, `mradermacher`, `MaziyarPanahi`, `TheBloke`, `QuantFactory`, or `lmstudio-community` within the last 24 hours as of 2026-09-05.
2.  **Existing Quantizations (Older):** The provided API data includes several existing quantized versions of Mellum2 models, primarily in GGUF and MLX formats. However, their `lastModified` dates predate the 24-hour search window.
    *   `yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF` (last modified 2026-06-09)
    *   `jedisct1/Mellum2-12B-A2.5B-Instruct-mlx-4bit` (last modified 2026-06-02)
    *   `JetBrains/Mellum2-12B-A2.5B-Instruct-GGUF-Q4_K_M` (last modified 2026-06-04)
    *   `bartowski/Mellum2-12B-A2.5B-Thinking-GGUF` (last modified 2026-06-10) - This is from a trusted publisher, but not recent.
    *   `mlx-community/Mellum2-12B-A2.5B-Instruct-mxfp4` (last modified 2026-08-11)
3.  **Model Variants Covered:** The existing quants cover both "Instruct" and "Thinking" variants of the Mellum2-12B-A2.5B model. No "Base" variants were identified in the provided API snippet, either quantized or original, from any publisher.
4.  **File Size Considerations (for future reference):** For a 12B model, target GGUF quantizations (Q4_K_M, Q3_K_M) are expected to be around 6GB and 4.5GB respectively, which would fit the 8GB VRAM requirement (leaving room for KV cache). Q5_K_M (approx 7.5GB) would be tight but potentially usable. Q6_K (approx 9GB) and Q8_0 (approx 12GB) would exceed the 8GB VRAM limit.

**Questions Answered**

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**
    *   No, no new community-quantized versions from the specified trusted publishers were found within the last 24 hours.

**Gaps / Follow-up**

1.  **Incomplete API Response:** The provided Hugging Face API response was truncated ("FETCH ERROR"). A complete API response is necessary to ensure no relevant models were missed due to truncation.
2.  **Explicit File Size Data:** The API response does not directly provide file sizes for individual `.gguf` or `.safetensors` files. Manual inspection of model cards or further API calls (e.g., `https://huggingface.co/api/models/{repo_id}/tree/main`) would be required to confirm exact file sizes and select the smallest variant fitting the VRAM constraint. For this report, file sizes were estimated based on bit-width.
3.  **Quality Regression Information:** The API response does not contain explicit tags or fields indicating "reported quality regression vs base BF16." This information would typically be found within the model card (`README.md`) or associated discussions, requiring deeper inspection.
4.  **"TheBloke" Activity:** The instruction notes "TheBloke (rare now)". While `TheBloke` is a trusted publisher, no models from this author appeared in the provided (truncated) API results for "Mellum2".
5.  **"Base" Variant Quants:** No quantized versions of the "Base" Mellum2-12B-A2.5B model were observed in the provided data. Further investigation would be needed to determine if any exist, even if older.

**Relevant Code/API Snippets**

```json
// Example of a model entry from the Hugging Face API response
{
    "_id": "6a29a84d5c01dc6038097410",
    "id": "bartowski/Mellum2-12B-A2.5B-Thinking-GGUF",
    "author": "bartowski",
    "gated": false,
    "lastModified": "2026-06-10T20:27:21.000Z", // Key timestamp for "last 24h" check
    "likes": 6,
    "trendingScore": 1,
    "private": false,
    "sha": "e10a3d18c7a65d9e06a1ef9c228082fbbc798182",
    "downloads": 1756,
    "tags": [
        "gguf", // Key tag for quant format
        "text-generation",
        "en",
        "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking", // Indicates base model variant
        "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Thinking",
        "license:apache-2.0",
        "model-index",
        "endpoints_compatible",
        "region:us",
        "conversational"
    ],
    "pipeline_tag": "text-generation",
    "library_name": "gguf",
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
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q3_K_M.gguf" }, // Example of a relevant quant file
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q3_K_S.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q3_K_XL.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q4_0.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q4_1.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q4_K_L.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q4_K_M.gguf" }, // Example of a relevant quant file
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q4_K_S.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q5_K_L.gguf" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q5_K_M.gguf" }, // Example of a relevant quant file
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

---
**No drops today.**
