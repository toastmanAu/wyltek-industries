# Research: mellum2-quant-watch-2026-06-11

**Date:** 2026-06-11
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Wyltek Industries Technical Research Findings

**Research Task ID:** mellum2-quant-watch-2026-06-11
**Date:** 2026-06-11

### Summary

This research task aimed to identify any newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) on Hugging Face within the last 24 hours. The search prioritized GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, and MLX formats from a list of trusted publishers.

After a thorough analysis of the Hugging Face API response for "Mellum2" models, no new community-quantized models from the specified trusted publishers were found to have been created or modified within the last 24 hours (i.e., on 2026-06-10 or 2026-06-11).

### Key Findings

No new community-quantized versions of any JetBrains Mellum2-12B-A2.5B model variant from the list of trusted publishers were published to Hugging Face in the last 24 hours. All relevant models from trusted publishers had their `lastModified` timestamp prior to 2026-06-10.

### Questions Answered

**Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**
No, based on the provided API data, no such models from the specified trusted publishers were published or updated within the last 24 hours (2026-06-10 to 2026-06-11).

### Gaps / Follow-up

1.  **File Size Information:** The Hugging Face API endpoint `https://huggingface.co/api/models?search=Mellum2&full=true` does not provide individual file sizes within the `siblings` array. This prevents accurate calculation of the "total file size for the smallest variant that fits 8GB VRAM (~6GB weights)". To obtain this, a subsequent API call or web scrape for each model's specific file list (e.g., `https://huggingface.co/{repo_id}/tree/main`) would be required, or reliance on general knowledge of quant file sizes. For future tasks, if file size is a strict requirement, an enhancement to the data retrieval method is needed.
2.  **Quality Regression Data:** The API response does not contain information regarding "reported quality regression vs base BF16". This data would typically be found within the model card (`README.md`) of each specific quantized model. Manual inspection of model cards would be necessary to fulfill this requirement.
3.  **Publisher Verification:** While the `author` field is used for publisher filtering, some models might be uploaded by untrusted users but are re-quantizations of models from trusted sources. The current method only checks the direct uploader.
4.  **"Previous Days" Check:** The instruction to "Do NOT re-report quants seen in previous days — check `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files" could not be fully executed as I do not have access to a persistent filesystem. This report assumes no prior knowledge of these specific models.

### Relevant Code/API Snippets

The primary API endpoint used for this research:
```
https://huggingface.co/api/models?search=Mellum2&full=true
```

Example structure of a model entry from the API response (truncated for brevity):
```json
{
  "_id": "6a1563f96ea5882878c82ed4",
  "id": "JetBrains/Mellum2-12B-A2.5B-Thinking",
  "author": "JetBrains",
  "gated": false,
  "lastModified": "2026-06-01T15:40:37.000Z",
  "likes": 280,
  "trendingScore": 101,
  "private": false,
  "sha": "eb3762abba113ee6399f9fccea5aab55b0c11624",
  "downloads": 18273,
  "tags": ["transformers", "safetensors", "mellum", "text-generation", "conversational", "en", "arxiv:2605.31268", "license:apache-2.0", "model-index", "eval-results", "endpoints_compatible", "region:us"],
  "pipeline_tag": "text-generation",
  "library_name": "transformers",
  "createdAt": "2026-05-26T09:12:25.000Z",
  "modelId": "JetBrains/Mellum2-12B-A2.5B-Thinking",
  "siblings": [
    {"rfilename": ".gitattributes"},
    {"rfilename": "README.md"},
    {"rfilename": "model-00001-of-00005.safetensors"},
    // ... other files ...
  ]
}
```
