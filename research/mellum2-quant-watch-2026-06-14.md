# Research: mellum2-quant-watch-2026-06-14

**Date:** 2026-06-14
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Research Findings Document

**ID:** mellum2-quant-watch-2026-06-14
**Date:** 2026-06-14

### Summary

As of 2026-06-14, a comprehensive search of the Hugging Face API for community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) over the last 24 hours has yielded no new publications. All identified Mellum2 model repositories, including those from trusted publishers and community members, show `lastModified` timestamps prior to 2026-06-13T00:00:00Z, falling outside the specified 24-hour window.

Therefore, no new quantized Mellum2 models fitting the criteria (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX formats) have been published by trusted sources or the community within the reporting period.

### Key Findings

1.  **No New Quantized Models in Last 24 Hours:** The Hugging Face API search for "Mellum2" models, filtered by `lastModified` date, revealed no updates or new model publications between 2026-06-13T00:00:00Z and 2026-06-14T23:59:59Z. The most recent `lastModified` timestamp observed was `2026-06-12T10:47:58.000Z`.
2.  **Existing Quantized Models (Outside Window):** Several quantized Mellum2 models exist on Hugging Face, including GGUF and MLX formats, from both JetBrains and community publishers (e.g., `yuxinlu1`, `mradermacher`, `josephmayo`, `jedisct1`, `sahilchachra`). However, these were all published or last modified prior to the 24-hour reporting window.
3.  **Trusted Publishers Check:** While `mradermacher` is a listed trusted publisher and has Mellum2 GGUF quants, their latest modifications also predate the 24-hour window. No new quants were found from `bartowski`, `unsloth`, `MaziyarPanahi`, `TheBloke`, `QuantFactory`, or `lmstudio-community` for Mellum2 within the timeframe.
4.  **API Access Issues:** Attempts to access supplementary Hugging Face and Reddit URLs resulted in fetch errors, indicating potential network or access restrictions for those specific endpoints. The primary API call (`/api/models?search=Mellum2&full=true`) was successful.

### Questions Answered

**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

**Answer:** No drops today. No community-quantized versions of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) have been published to Hugging Face in the last 24 hours (since 2026-06-13T00:00:00Z).

### Gaps / Follow-up

1.  **File Size Information:** The Hugging Face API response for `full=true` does not include the file sizes of individual `rfilename` entries within the `siblings` array. To determine the "total file size for the smallest variant that fits 8GB VRAM (~6GB weights)", a subsequent API call or web scraping of each model's `tree/main` endpoint would be required for any newly identified models.
2.  **Quality Regression Data:** The API response does not directly provide information on "reported quality regression vs base BF16". This data would typically be found within the model card (`README.md`) of a specific quantized model, requiring further inspection if new quants were found.
3.  **Inaccessible Sources:** The provided URLs for `https://huggingface.co/models?search=mellum2&sort=createdAt`, `https://huggingface.co/bartowski`, `https://huggingface.co/unsloth`, `https://huggingface.co/mradermacher`, `https://huggingface.co/MaziyarPanahi`, `https://huggingface.co/QuantFactory`, `https://huggingface.co/lmstudio-community`, `https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions`, `https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions`, and `https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day` resulted in fetch errors. While the primary API call was successful, these additional sources could potentially contain relevant discussions or alternative listings not captured by the direct API search.
4.  **Prior Research Findings Access:** The instruction to "check `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files and skip already-known repos" could not be fulfilled due to lack of access to the specified file system. This report assumes all models in the provided API dump are "new" in terms of evaluation, although none met the 24h criteria.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```

This API returns a JSON array of model objects, each containing metadata such as `id`, `author`, `lastModified`, `tags`, and a `siblings` array listing files in the repository. The `lastModified` field was crucial for filtering results within the specified 24-hour window. An example structure of a relevant model entry:

```json
{
  "_id": "6a27ca194f7d11dcac666d66",
  "id": "yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF",
  "author": "yuxinlu1",
  "gated": false,
  "lastModified": "2026-06-09T09:17:02.000Z",
  "likes": 4,
  "trendingScore": 4,
  "private": false,
  "sha": "a9c7b1a32ead28d4a868ff31bbf9c15a97362cfe",
  "downloads": 996,
  "tags": [
    "gguf",
    "mellum",
    "mellum2",
    "code",
    "coding",
    "reasoning",
    "thinking",
    "moe",
    "llama.cpp",
    "local-llm",
    "text-generation",
    "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking",
    "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Thinking",
    "license:apache-2.0",
    "endpoints_compatible",
    "region:us",
    "conversational"
  ],
  "pipeline_tag": "text-generation",
  "library_name": "gguf",
  "createdAt": "2026-06-09T08:08:57.000Z",
  "modelId": "yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF",
  "siblings": [
    { "rfilename": ".gitattributes" },
    { "rfilename": "README.md" },
    { "rfilename": "mellum2-claude-Q2_K.gguf" },
    { "rfilename": "mellum2-claude-Q4_K_M.gguf" },
    { "rfilename": "mellum2-claude-Q6_K.gguf" },
    { "rfilename": "mellum2-claude-Q8_0.gguf" }
  ]
}
```
