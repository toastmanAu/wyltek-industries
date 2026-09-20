# Research: mellum2-quant-watch-2026-06-17

**Date:** 2026-06-17
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**Wyltek Industries - Technical Research Findings**

**ID:** mellum2-quant-watch-2026-06-17
**Date:** 2026-06-17
**Analyst:** Argus
**Research Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

The research task to identify new community-quantized JetBrains Mellum2-12B-A2.5B model variants on Hugging Face within the last 24 hours could not be fully completed due to persistent "FETCH ERROR" responses from all queried external sources, including the Hugging Face API and individual publisher profiles.

Based on the *partial* and *outdated* data received from the Hugging Face API, no Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) from the specified trusted community publishers were found to have been created or modified within the last 24 hours (i.e., on or after 2026-06-16T00:00:00Z). All entries in the truncated API response were last modified or created prior to this timestamp, with the most recent being 2026-06-12.

Therefore, as of 2026-06-17, there are no new community-quantized Mellum2-12B-A2.5B model drops from trusted publishers to report based on the available (albeit incomplete) data.

### Key Findings

1.  **External System Failure:** All attempts to retrieve up-to-date information from Hugging Face (API, model search, individual publisher profiles) and Reddit resulted in "FETCH ERROR" messages, indicating an inability to access the external data sources. This is a critical blocker for the research task.
2.  **No Recent Quants Identified (from partial data):** From the *limited* Hugging Face API response that was successfully parsed before the "FETCH ERROR", no Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) were found to have a `lastModified` or `createdAt` timestamp on or after 2026-06-16T00:00:00Z. The latest timestamp observed was 2026-06-12T10:47:58.000Z.
3.  **Publisher Filtering:** Even among the older entries, only `mradermacher` was identified as a trusted publisher. Models published by `JetBrains` are considered official, not community-quantized for this task. Other publishers (`yuxinlu1`, `josephmayo`, `sahilchachra`, `cyankiwi`, `mdamir97`, `skilledu`) were not on the list of trusted community publishers.
4.  **Quantization Format Overview (Theoretical):** If new models were found, the priority for GGUF formats would be Q4_K_M (~6.75GB) and Q3_K_M (~5.25GB) to fit the 8GB VRAM constraint (allowing for KV cache). Q5_K_M (~8.25GB), Q6_K (~9.75GB), and Q8_0 (~12GB) would likely exceed the 8GB VRAM limit for weights + KV cache.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    No, based on the available (partial and outdated) data, no such models from trusted community publishers were published or updated within the last 24 hours. The primary reason for this finding is the inability to access current data from Hugging Face due to "FETCH ERROR" responses.

### Gaps / Follow-up

1.  **External System Status:** Investigate the cause of the "FETCH ERROR" when querying Hugging Face and Reddit. This is the most critical gap, as it prevents the completion of the research task.
    *   **Action:** Check network connectivity, API rate limits, or potential changes in API endpoints/authentication requirements for Hugging Face.
    *   **Action:** Verify the status of Hugging Face services.
2.  **Comprehensive Search:** Once external access is restored, re-run the search to ensure no new models were missed due to the previous fetch errors.
3.  **File Size Verification:** For any newly identified quants, direct access to the model card or file list on Hugging Face would be required to accurately determine the total file size and confirm it fits the 8GB VRAM constraint.
4.  **Quality Regression Data:** Access to model cards is essential to report any stated quality regressions against the base BF16 model. This information was unavailable due to fetch errors.

### Relevant Code/API Snippets

The primary API call attempted was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example of the truncated response received, highlighting the `lastModified` and `createdAt` fields which were used for date filtering:

```json
[
  {
    "_id": "6a1563f96ea5882878c82ed4",
    "id": "JetBrains/Mellum2-12B-A2.5B-Thinking",
    "author": "JetBrains",
    "gated": false,
    "lastModified": "2026-06-12T10:46:19.000Z", // Too old
    "likes": 293,
    "trendingScore": 20,
    "private": false,
    "sha": "ba4838faad89e968c36f39e76e95319d756714fe",
    "downloads": 4152,
    "tags": ["transformers", "safetensors", "mellum", "text-generation", "conversational", "en", "arxiv:2605.31268", "license:apache-2.0", "model-index", "eval-results", "endpoints_compatible", "region:us"],
    "pipeline_tag": "text-generation",
    "library_name": "transformers",
    "createdAt": "2026-05-26T09:12:25.000Z", // Too old
    "modelId": "JetBrains/Mellum2-12B-A2.5B-Thinking",
    "siblings": [
      // ... file list ...
    ]
  },
  {
    "_id": "6a27ca194f7d11dcac666d66",
    "id": "yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF",
    "author": "yuxinlu1", // Not a trusted publisher
    "gated": false,
    "lastModified": "2026-06-09T09:17:02.000Z", // Too old
    "likes": 10,
    "trendingScore": 8,
    "private": false,
    "sha": "a9c7b1a32ead28d4a868ff31bbf9c15a97362cfe",
    "downloads": 1874,
    "tags": ["gguf", "mellum", "mellum2", "code", "coding", "reasoning", "thinking", "moe", "llama.cpp", "local-llm", "text-generation", "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking", "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Thinking", "license:apache-2.0", "endpoints_compatible", "region:us", "conversational"],
    "pipeline_tag": "text-generation",
    "library_name": "gguf",
    "createdAt": "2026-06-09T08:08:57.000Z", // Too old
    "modelId": "yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF",
    "siblings": [
      // ... file list ...
    ]
  }
  // ... (further entries, all with lastModified/createdAt before 2026-06-16)
  // ...
  // "skilledu/Mellum2-12B-A2.5B-Base",
  // "siblings": [
  // ...
  // "tokenizer_config.json"
  // ]
]
FETCH ERROR: https://huggingface.co/api/models?search=Mellum2&full=true
```
