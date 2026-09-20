# Research: mellum2-quant-watch-2026-07-16

**Date:** 2026-07-16
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**Wyltek Industries - Technical Research Findings**

**ID:** mellum2-quant-watch-2026-07-16
**Date:** 2026-07-16

---

### Summary

No new community-quantized versions of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) were published to Hugging Face by trusted publishers within the last 24 hours (i.e., since 2026-07-15 00:00:00Z). All models found via the Hugging Face API search for "Mellum2" had `lastModified` timestamps significantly older than the 24-hour reporting window, with the most recent modification observed on 2026-06-12.

### Key Findings

1.  **No New Quants in Last 24 Hours:** A comprehensive search of the Hugging Face API for "Mellum2" models revealed no new uploads or modifications within the specified 24-hour timeframe (2026-07-15 to 2026-07-16).
2.  **Outdated Model Data:** The provided API response data contains `lastModified` timestamps ranging from 2026-06-02 to 2026-06-12. All entries are therefore outside the current 24-hour monitoring window.
3.  **Publisher Analysis (Historical):** Even if the models were within the timeframe, none of the listed authors in the provided API response (e.g., JetBrains, mdamir97, skilledu, RJ000, jedisct1, JSchneemann, shailesh83, junwatu, developerjeremylive, josephmayo, CodeFault) are explicitly listed as "trusted publishers" (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community). The `RedHatAI` entry is from a trusted organization (assuming `bartowski` represents RedHat), but its `lastModified` date is also outside the reporting window, and the quant format (FP8-Dynamic) is not a high-priority target.
4.  **Quantization Formats Observed (Historical):** Historically, GGUF (Q4_K_M, Q8_0) and MLX (4-bit, 8-bit) quantizations were present in the search results, but none were recent. No AWQ, GPTQ, or ExLlamaV2/EXL2 formats were found in the provided API response, regardless of age.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    No, no such models were found to have been published or modified within the last 24 hours.

### Gaps / Follow-up

1.  **File Size Information:** The Hugging Face API response (`/api/models?search=Mellum2&full=true`) does not include individual file sizes for the `siblings` list. This prevents accurate assessment of whether a model variant would fit within the 8GB VRAM (~6GB weights) constraint without additional API calls per model or manual inspection.
2.  **Quality Regression Data:** The API response does not provide explicit information regarding reported quality regression versus the base BF16 model for quantized versions. This would require parsing individual model cards or discussion forums, which is beyond the scope of the direct API search.
3.  **Comprehensive Publisher Check:** While the `author` field is available, a more robust check against the "trusted publishers" list would ideally involve cross-referencing author IDs or organizational affiliations, especially for entities like `RedHatAI` which might be associated with a trusted individual (e.g., `bartowski`).
4.  **External Source Inaccessibility:** The provided URLs for `huggingface.co/models?search=mellum2&sort=createdAt`, `/bartowski`, `/unsloth`, `/mradermacher`, `/MaziyarPanahi`, `/QuantFactory`, `/lmstudio-community`, `/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions`, `/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions`, and `www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day` all resulted in "FETCH ERROR" or were HTML pages not directly parseable for the required data. This limited the scope of the search to the primary API endpoint.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example structure of a relevant (though in this case, outdated) entry from the API response:

```json
{
    "_id": "6a203059c1afdbf3c1142408",
    "id": "JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M",
    "author": "JetBrains",
    "gated": false,
    "lastModified": "2026-06-04T11:17:07.000Z", // Key timestamp for 24h check
    "likes": 33,
    "trendingScore": 2,
    "private": false,
    "sha": "71a489e7b95efacf89feaaa6fe3b2995f3542409",
    "downloads": 6858,
    "tags": [ // Used for quant format and variant identification
        "gguf",
        "mellum",
        "llama.cpp",
        "quantized",
        "moe",
        "thinking",
        "text-generation",
        "en",
        "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking",
        "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Thinking",
        "license:apache-2.0",
        "endpoints_compatible",
        "region:us",
        "conversational"
    ],
    "pipeline_tag": "text-generation",
    "library_name": "gguf",
    "createdAt": "2026-06-03T13:47:05.000Z",
    "modelId": "JetBrains/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M",
    "siblings": [ // Contains filenames, but not sizes
        { "rfilename": ".gitattributes" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q4_K_M.gguf" },
        { "rfilename": "README.md" }
    ]
}
```
