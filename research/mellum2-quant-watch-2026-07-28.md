# Research: mellum2-quant-watch-2026-07-28

**Date:** 2026-07-28
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**Wyltek Industries - Technical Research Findings**

**ID:** mellum2-quant-watch-2026-07-28
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

As of 2026-07-28, a comprehensive search of the Hugging Face API for JetBrains Mellum2-12B-A2.5B model variants did not identify any new community-quantized models published by trusted publishers within the last 24 hours.

Several existing quantized models were identified, but their `lastModified` timestamps fall outside the specified 24-hour window (i.e., before 2026-07-27T00:00:00Z). Additionally, one recent GGUF model from an untrusted publisher was noted but excluded based on the specified criteria.

Therefore, no new Mellum2 quantized model drops from trusted sources were observed today.

### Key Findings

1.  **Hugging Face API Search Results:** The primary API endpoint `https://huggingface.co/api/models?search=Mellum2&full=true` returned a list of 23 models related to "Mellum2".
2.  **Timestamp Filtering:** All models from the provided API response had a `lastModified` timestamp earlier than 2026-07-27T00:00:00Z, with the exception of one:
    *   `junwatu/Mellum2-12B-A2.5B-Instruct-GGUF`: `lastModified: 2026-07-22T01:13:55.000Z`.
3.  **Trusted Publisher Check:** The model `junwatu/Mellum2-12B-A2.5B-Instruct-GGUF` is published by `junwatu`, which is not on the list of trusted publishers (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community).
4.  **No New Quants from Trusted Sources:** Based on the `lastModified` timestamps and the trusted publisher filter, no new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants from trusted publishers have been published to Hugging Face in the last 24 hours.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h by a trusted publisher?**
    No, no such models were found.

### Gaps / Follow-up

1.  **Source Content Accessibility:** Multiple provided Hugging Face URLs (e.g., `https://huggingface.co/models?search=mellum2&sort=createdAt`, individual publisher pages, and model discussion pages) resulted in "FETCH ERROR" or HTML content that could not be programmatically parsed for model data. This limited the scope of the search to the initial API call.
2.  **File Size and Quality Regression Data:** For any potential new quants, the API response for `full=true` does not directly provide total file size or reported quality regression versus base BF16. This information would require additional API calls to specific model repos (e.g., `https://huggingface.co/api/models/{repo_id}/tree/main`) and parsing of model cards (`README.md`), which was not feasible with the provided source content.

### Relevant Code/API Snippets

The primary API used for this research:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```

Example structure of a relevant model entry from the API response:

```json
{
    "_id": "6a1ed286c0fa89ba7a7df014",
    "id": "junwatu/Mellum2-12B-A2.5B-Instruct-GGUF",
    "author": "junwatu",
    "gated": false,
    "lastModified": "2026-07-22T01:13:55.000Z",
    "likes": 2,
    "trendingScore": 0,
    "private": false,
    "sha": "79f1c3cd35ad0839263a19b6b73da4070eb73a66",
    "downloads": 189,
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
    "library_name": "gguf",
    "createdAt": "2026-06-02T12:54:30.000Z",
    "modelId": "junwatu/Mellum2-12B-A2.5B-Instruct-GGUF",
    "siblings": [
        { "rfilename": ".gitattributes" },
        { "rfilename": "Mellum2-12B-A2.5B-Instruct-Q4_K_M.gguf" },
        { "rfilename": "README.md" }
    ]
}
```

---
no drops today
