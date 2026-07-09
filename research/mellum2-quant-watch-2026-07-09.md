# Research: mellum2-quant-watch-2026-07-09

**Date:** 2026-07-09
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Argus Research Findings Document

**ID:** mellum2-quant-watch-2026-07-09
**Date:** 2026-07-09

### Summary

This report details the findings of a 24-hour surveillance of Hugging Face for newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base). The search focused on specific quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) and a predefined list of trusted publishers.

Based on the analysis of the Hugging Face API, no new community-quantized Mellum2-12B-A2.5B model variants from the specified trusted publishers were released or updated within the last 24 hours (since 2026-07-08T00:00:00Z). All identified quantized models from trusted publishers had `lastModified` timestamps prior to this 24-hour window.

### Key Findings

1.  **No New Quants from Trusted Publishers:** A comprehensive scan of the Hugging Face API for "Mellum2" models revealed no new or updated community-quantized models from the designated trusted publishers (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community) within the last 24 hours (relative to 2026-07-09).
2.  **Existing Quantizations (Older):** Several quantized versions of Mellum2 models exist from both JetBrains and other community members, but their `lastModified` timestamps fall outside the 24-hour reporting window. Examples include GGUF, MLX 4-bit, MLX 8-bit, and FP8 (vLLM) formats.
3.  **Untrusted Publishers:** Some models were found from publishers not on the approved list (e.g., `yuxinlu1`, `jedisct1`, `josephmayo`, `shailesh83`, `junwatu`, `RJ000`, `RedHatAI`, `mdamir97`, `skilledu`). These were excluded based on the "Trusted publishers" criteria.
4.  **API Data Reliability:** The Hugging Face API (`/api/models?search=Mellum2&full=true`) provided structured JSON data that was successfully parsed for `author`, `lastModified`, `tags`, and `siblings` (file lists). Other provided sources (HTML pages, Reddit API) either returned `FETCH ERROR` or HTML content, making direct programmatic extraction difficult or impossible within the scope of this task.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    *   **Answer:** No. No new community-quantized versions from trusted publishers were found within the last 24 hours.

### Gaps / Follow-up

1.  **Prior Report Access:** The instruction to "Do NOT re-report quants seen in previous days — check `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files" could not be fully adhered to as I do not have access to this local file system. This report assumes no prior knowledge of previously reported quants. For future runs, access to this historical data would be crucial to prevent redundant reporting.
2.  **File Size Calculation:** Precise file sizes for GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, and MLX models were not directly available in the provided API output. While bit-widths allow for theoretical estimation (e.g., 4-bit for 12B params is ~6GB), actual file sizes can vary due to metadata, specific quantization implementations, and MoE expert distribution. If a new quant were found, a more detailed inspection of the model's files (e.g., by fetching `https://huggingface.co/<repo_path>/tree/main`) would be necessary to confirm the smallest variant fitting 8GB VRAM.
3.  **Quality Regression:** The API output does not typically include "reported quality regression vs base BF16." This information would usually be found in the model card's README.md or associated discussions. If a new quant were identified, a manual review of its model card would be required to gather this detail.
4.  **HTML/Reddit Source Failures:** The inability to parse other provided sources (Hugging Face HTML pages, Reddit API) due to `FETCH ERROR` or HTML content limited the scope of the search to the primary JSON API. This might mean missing information if a publisher chose to announce a new quant only via a discussion post or a Reddit thread without immediately updating the model's `lastModified` timestamp or tags in a way detectable by the primary API endpoint.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example structure of a relevant model entry from the API (hypothetical, if one were found):

```json
{
    "_id": "...",
    "id": "trusted_publisher/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M",
    "author": "mradermacher", // Example trusted publisher
    "gated": false,
    "lastModified": "2026-07-08T15:30:00.000Z", // Example: within last 24h
    "likes": 10,
    "trendingScore": 2,
    "private": false,
    "sha": "...",
    "downloads": 100,
    "tags": ["gguf", "mellum", "mellum2", "llama.cpp", "quantized", "thinking", "base_model:JetBrains/Mellum2-12B-A2.5B-Thinking", "license:apache-2.0"],
    "pipeline_tag": "text-generation",
    "library_name": "gguf",
    "createdAt": "2026-07-08T14:00:00.000Z",
    "modelId": "trusted_publisher/Mellum2-12B-A2.5B-Thinking-GGUF-Q4_K_M",
    "siblings": [
        { "rfilename": ".gitattributes" },
        { "rfilename": "README.md" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q4_K_M.gguf" } // Example file
    ]
}
```
