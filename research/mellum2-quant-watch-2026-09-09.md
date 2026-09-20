# Research: mellum2-quant-watch-2026-09-09

**Date:** 2026-09-09
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**Research Task ID:** mellum2-quant-watch-2026-09-09
**Date:** 2026-09-09

## Summary

This research aimed to identify any newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) on Hugging Face within the last 24 hours. The search focused on specific quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) and trusted publishers.

Based on the provided Hugging Face API data, no new community-quantized Mellum2-12B-A2.5B model variants from trusted publishers were found to have been updated or published within the last 24 hours (relative to 2026-09-09). All relevant entries in the API response had `lastModified` timestamps prior to 2026-09-08T00:00:00.000Z.

## Key Findings

No new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) from trusted publishers were identified on Hugging Face within the last 24 hours.

## Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**
    No. All models found via the Hugging Face API search for "Mellum2" had `lastModified` timestamps older than 24 hours from the research date of 2026-09-09.

## Gaps / Follow-up

1.  **Incomplete API Response:** The provided Hugging Face API output for `https://huggingface.co/api/models?search=Mellum2&full=true` appears to be truncated ("FETCH ERROR" at the end). This means the search might not have covered all potentially relevant models. A full, untruncated API response is required for a comprehensive search.
2.  **External Source Failures:** Attempts to access other specified sources (e.g., `huggingface.co/models?search=mellum2&sort=createdAt`, specific publisher pages, and Reddit) resulted in "FETCH ERROR" or HTML content, preventing programmatic data extraction. This limits the scope of the search to only the partial API response provided.
3.  **File Size and Quality Regression Data:** Since no new models were identified, the specific details regarding total file size for VRAM fitment and reported quality regression versus base BF16 could not be collected. This information would need to be extracted from the model cards of any newly identified quants.

## Relevant Code/API Snippets

The primary API endpoint used for this research:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example of a model entry from the provided (truncated) API response, illustrating the `lastModified` field which was critical for filtering:

```json
{
    "_id": "6a7b6e0dc8280e6f13ab55f7",
    "id": "mlx-community/Mellum2-12B-A2.5B-Thinking-4bit",
    "author": "mlx-community",
    "gated": false,
    "lastModified": "2026-08-11T19:08:45.000Z",
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
