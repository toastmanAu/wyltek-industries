# Research: mellum2-quant-watch-2026-07-11

**Date:** 2026-07-11
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**Wyltek Industries - Technical Research Findings**

**Research Task ID:** mellum2-quant-watch-2026-07-11
**Date:** 2026-07-11

---

### Summary
This research aimed to identify any new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) published to Hugging Face within the last 24 hours (i.e., on or after 2026-07-10T00:00:00Z). The search focused on specific quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) and a list of trusted publishers.

Based on the provided Hugging Face API data, no new community-quantized Mellum2 models from the specified trusted publishers were found to have been updated or published within the last 24 hours. All entries in the API response had `lastModified` timestamps prior to the 24-hour window relevant to this report.

### Key Findings
1.  **No New Quants Identified:** A comprehensive scan of the Hugging Face API for "Mellum2" models, filtered by the specified trusted publishers and a `lastModified` timestamp within the last 24 hours (relative to 2026-07-11), yielded no results.
2.  **Existing Quants Out of Scope:** Several quantized Mellum2 models from both JetBrains and community members (e.g., `yuxinlu1`, `jedisct1`, `mradermacher`, `JSchneemann`, `shailesh83`, `junwatu`, `RedHatAI`) were present in the API response. However, their `lastModified` dates were all in June 2026, making them outside the current 24-hour reporting window. For instance, `mradermacher/Mellum2-12B-A2.5B-Thinking-GGUF` (a trusted publisher) was last modified on `2026-06-05T15:41:20.000Z`, and `yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF` was last modified on `2026-06-09T09:17:02.000Z`.
3.  **Target Quant Formats:** The existing models covered GGUF (various `Q_K_M`, `Q_K`, `Q_0` variants) and MLX (4-bit, 8-bit), indicating active community quantization efforts for Mellum2 models in general, though none are new today. AWQ, GPTQ, and ExLlamaV2/EXL2 formats were not observed in the provided API results, regardless of modification date.

### Questions Answered
**Research Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

**Answer:** No community-quantized versions of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) from the specified trusted publishers have been published or updated on Hugging Face in the last 24 hours.

### Gaps / Follow-up
1.  **Incomplete Source Data:** Several provided source URLs (e.g., `https://huggingface.co/models?search=mellum2&sort=createdAt`, `https://huggingface.co/bartowski`) resulted in "FETCH ERROR" or returned HTML content without the necessary structured `lastModified` timestamps. This prevented a complete programmatic analysis of all potential sources and trusted publishers.
2.  **File Size Information:** The API response does not directly provide file sizes for individual quantized files within a repository. To report the "total file size for the smallest variant that fits 8GB VRAM (~6GB weights)", a secondary API call or manual inspection of each model's `siblings` list and subsequent file metadata would be required. This was not performed as no new models were identified.
3.  **Quality Regression Data:** Information regarding "reported quality regression vs base BF16" is typically found within a model's README.md or discussion section. Since no new models were found, this step was not applicable. For future reports, if new models are found, a deeper dive into their respective model cards would be necessary.
4.  **"Already Known" Quants:** The instruction to "skip already-known repos" by checking `~/.claude/shared/research-findings/` was simulated by strictly adhering to the "last 24h" timestamp requirement. A real-world implementation would require access to a persistent record of previously reported quants.

### Relevant Code/API Snippets
The primary API endpoint used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example structure of a model entry from the API:
```json
{
  "_id": "6a27ca194f7d11dcac666d66",
  "id": "yuxinlu1/Mellum2-12B-A2.5B-Claude-4.6-4.8-Opus-Thinking-GGUF",
  "author": "yuxinlu1",
  "gated": false,
  "lastModified": "2026-06-09T09:17:02.000Z", // Key timestamp for filtering
  "likes": 29,
  "trendingScore": 3,
  "private": false,
  "sha": "a9c7b1a32ead28d4a868ff31bbf9c15a97362cfe",
  "downloads": 13259,
  "tags": ["gguf", "mellum", "mellum2", "code", "coding", "reasoning", "thinking", "moe", "llama.cpp", "local-llm", "text-generation", "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking", "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Thinking", "license:apache-2.0", "endpoints_compatible", "region:us", "conversational"],
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
