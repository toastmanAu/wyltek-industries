# Research: mellum2-quant-watch-2026-09-19

**Date:** 2026-09-19
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Mellum2 Quantization Watch - 2026-09-19

**ID:** mellum2-quant-watch-2026-09-19
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

As of 2026-09-19, no new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) from the specified trusted publishers have been identified on Hugging Face within the last 24 hours. The search was conducted using the Hugging Face API, but the provided API response was incomplete, potentially limiting the scope of the findings.

All models found in the available API data were last modified prior to 2026-09-18, and none were published by the designated trusted publishers. Therefore, based on the accessible information, no new drops meet the criteria.

### Key Findings

1.  **No Recent Quantizations Found:** A review of the provided Hugging Face API data for "Mellum2" models revealed no entries with a `lastModified` timestamp within the last 24 hours (i.e., on or after 2026-09-18T00:00:00Z). All listed models were last updated in June, July, or August 2026.
2.  **No Trusted Publisher Matches:** None of the models listed in the provided API response were published by any of the specified trusted publishers (`bartowski`, `unsloth`, `mradermacher`, `MaziyarPanahi`, `TheBloke`, `QuantFactory`, `lmstudio-community`). The authors identified in the API response were primarily `JetBrains` and various individual users or organizations not on the trusted list (e.g., `yuxinlu1`, `RedHatAI`, `mdamir97`, `skilledu`, `RJ000`, `jedisct1`, `JSchneemann`, `shailesh83`, `junwatu`, `developerjeremylive`, `josephmayo`).
3.  **Quantization Formats and Variants:** While various quantization formats (GGUF, MLX) and model variants (Thinking, Instruct, Base) were present in the overall search results, none met the recency or publisher criteria. Specific GGUF quants like `Q8_0`, `Q6_K`, `Q4_K_M` were observed in older entries.

### Questions Answered

**Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h from a trusted publisher?**
No drops today.

### Gaps / Follow-up

1.  **Incomplete API Response:** The provided `https://huggingface.co/api/models?search=Mellum2&full=true` source content was truncated with a "FETCH ERROR". This means the search for Mellum2 models was incomplete, and there might be other models that were not included in the analysis. A full, untruncated API response is required for a comprehensive search.
2.  **File Size Information:** The provided API response only listed filenames (`rfilename`) within the `siblings` array but did not include their respective sizes. To accurately determine if a model variant fits the 8GB VRAM (~6GB weights) requirement, individual file sizes would need to be retrieved, likely requiring additional API calls per model or a more detailed initial API response.
3.  **Publisher Interpretation:** Clarification on whether organizational publishers (e.g., `RedHatAI`) are considered trusted if a known individual (e.g., `bartowski`) is affiliated with them, or if only direct user profiles are to be matched. For this report, an exact match to the provided trusted publisher names was assumed.
4.  **Quality Regression Data:** No information regarding reported quality regression versus base BF16 was available in the provided API snippet for any of the models. This would typically be found in the model card (`README.md`).

### Relevant Code/API Snippets

The primary API endpoint used for this research task was:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```

Example structure of a model entry from the API response:

```json
{
  "_id": "6a1563f96ea5882878c82ed4",
  "id": "JetBrains/Mellum2-12B-A2.5B-Thinking",
  "author": "JetBrains",
  "gated": false,
  "lastModified": "2026-08-13T10:20:47.000Z",
  "likes": 337,
  "trendingScore": 1,
  "private": false,
  "sha": "a7311550557e93cc706ab5dd3d879c1a11703ab4",
  "downloads": 2294,
  "tags": [
    "transformers",
    "safetensors",
    "mellum",
    "text-generation",
    "conversational",
    "en",
    "arxiv:2605.31268",
    "license:apache-2.0",
    "model-index",
    "eval-results",
    "endpoints_compatible",
    "deploy:sagemaker",
    "region:us"
  ],
  "pipeline_tag": "text-generation",
  "library_name": "transformers",
  "createdAt": "2026-05-26T09:12:25.000Z",
  "modelId": "JetBrains/Mellum2-12B-A2.5B-Thinking",
  "siblings": [
    { "rfilename": ".eval_results/mellum2.yaml" },
    { "rfilename": "README.md" },
    { "rfilename": "model-00001-of-00005.safetensors" }
    // ... truncated for brevity
  ]
}
```
