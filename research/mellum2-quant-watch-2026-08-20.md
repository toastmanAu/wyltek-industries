# Research: mellum2-quant-watch-2026-08-20

**Date:** 2026-08-20
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Research Findings Document

**ID:** mellum2-quant-watch-2026-08-20
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

As of 2026-08-20, a comprehensive search of the Hugging Face API for "Mellum2" models was conducted to identify any new community-quantized versions of the JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) published by trusted publishers within the last 24 hours.

The search focused on preferred quantization formats including GGUF (Q4_K_M, Q5_K_M, Q3_K_M, Q6_K, Q8_0), AWQ 4-bit, GPTQ 4-bit, ExLlamaV2/EXL2, and MLX. No new quantized models from the specified trusted publishers (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community) were found to have been modified or created within the 24-hour reporting window (i.e., on or after 2026-08-19T00:00:00Z).

### Key Findings

No new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants from the list of trusted publishers were identified on Hugging Face within the last 24 hours (since 2026-08-19T00:00:00Z). All relevant model entries found via the Hugging Face API had `lastModified` timestamps prior to this reporting window.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    No, no such models from trusted publishers were found within the specified timeframe.

### Gaps / Follow-up

1.  **Definition of "Community-Quantized" and "Trusted Publishers":** The task explicitly lists "Trusted publishers". Some models were found from authors like `mlx-community`, `jedisct1`, `RJ000`, `JSchneemann`, `shailesh83`, `junwatu`, and `RedHatAI`. While `mlx-community` sounds like a community, it is not explicitly on the provided "Trusted publishers" list. Clarification is needed on whether "community-quantized" implies *any* community member or strictly those on the trusted list. For this report, only the explicitly listed trusted publishers were considered.
2.  **File Size Information:** The Hugging Face API output (`/api/models?search=Mellum2&full=true`) does not directly provide file sizes for individual `siblings` (model files). This would require additional API calls to each model's specific `/blob/main/` endpoint or parsing the model card, which was outside the scope of the direct API search instruction. For future tasks, direct file size retrieval would be beneficial for precise VRAM fitting analysis.
3.  **Quality Regression Data:** No direct information regarding reported quality regression versus base BF16 was available in the API metadata. This typically resides within the model card (`README.md`), which would require further parsing.
4.  **Source Content Access Issues:** Several provided source URLs (e.g., `https://huggingface.co/models?search=mellum2&sort=createdAt`, various publisher profiles, and Reddit search) resulted in "FETCH ERROR" or HTML content that was not programmatically parseable for the required model metadata. This limited the search to the primary `api/models?search=Mellum2&full=true` endpoint.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example structure of a model entry from the API, illustrating fields checked:

```json
{
  "_id": "6a7b822a7dfbf5d1669a16fe",
  "id": "mlx-community/Mellum2-12B-A2.5B-Instruct-mxfp4",
  "author": "mlx-community", // Checked against trusted publishers
  "gated": false,
  "lastModified": "2026-08-11T20:28:48.000Z", // Crucial for 24h window check
  "likes": 2,
  "trendingScore": 1,
  "private": false,
  "sha": "fe9fb71c4de41c2aefd13f2868b1f0abca9868ff",
  "downloads": 451,
  "tags": [ // Checked for quant formats and model variant
    "mlx",
    "safetensors",
    "mellum",
    "moe",
    "instruct", // Model variant
    "mxfp4", // Quant format
    "text-generation",
    "conversational",
    "en",
    "base_model:JetBrains/Mellum2-12B-A2.5B-Instruct",
    "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Instruct",
    "license:apache-2.0",
    "4-bit", // Bit-width
    "region:us"
  ],
  "pipeline_tag": "text-generation",
  "library_name": "mlx",
  "createdAt": "2026-08-11T20:12:26.000Z",
  "modelId": "mlx-community/Mellum2-12B-A2.5B-Instruct-mxfp4",
  "siblings": [ // File list for inferring specific quant files and potential sizes
    { "rfilename": ".gitattributes" },
    { "rfilename": "README.md" },
    { "rfilename": "chat_template.jinja" },
    { "rfilename": "config.json" },
    { "rfilename": "generation_config.json" },
    { "rfilename": "model-00001-of-00002.safetensors" },
    { "rfilename": "model-00002-of-00002.safetensors" },
    { "rfilename": "model.safetensors.index.json" },
    { "rfilename": "tokenizer.json" },
    { "rfilename": "tokenizer_config.json" }
  ]
}
```
