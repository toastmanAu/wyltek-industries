# Research: mellum2-quant-watch-2026-08-05

**Date:** 2026-08-05
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Structured Findings Document - Mellum2 Quantization Watch

**ID:** mellum2-quant-watch-2026-08-05
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

As of 2026-08-05, no new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) have been published to Hugging Face within the last 24 hours. All models identified via the Hugging Face API search for "Mellum2" have `lastModified` timestamps prior to the 24-hour window (i.e., before 2026-08-04T00:00:00Z). Attempts to access additional Hugging Face and Reddit sources resulted in fetch errors, preventing a comprehensive search across all specified platforms.

Therefore, based on the available and accessible data, no new Mellum2 quantizations meeting the specified criteria were found today.

### Key Findings

1.  **No New Quantizations in Last 24 Hours:** A direct query to the Hugging Face API (`https://huggingface.co/api/models?search=Mellum2&full=true`) returned a list of Mellum2-related models. Upon inspection of their `lastModified` timestamps, none were found to have been updated or published within the last 24 hours relative to the research task date of 2026-08-05. The most recent `lastModified` date observed was `2026-07-22T01:13:55.000Z` for `junwatu/Mellum2-12B-A2.5B-Instruct-GGUF`, which falls outside the 24-hour window.

2.  **Existing Quantizations (Out of Scope for Timeframe):** While no *new* quants were found, the API results indicate several existing GGUF and MLX quantizations for Mellum2-12B-A2.5B-Thinking and Mellum2-12B-A2.5B-Instruct variants from various publishers (e.g., `yuxinlu1`, `bartowski`, `JetBrains`, `WithinUsAI`, `RJ000`, `JSchneemann`, `shailesh83`, `junwatu`, `jedisct1`). These were published earlier than the specified 24-hour window.

3.  **Target Quantization Format Availability (General Observation):**
    *   **GGUF:** Widely available in various bit-widths (Q2_K, Q3_K_M, Q4_0, Q4_1, Q4_K_L, Q4_K_M, Q5_K_L, Q5_K_M, Q6_K, Q8_0, IQ2_M, IQ2_S, IQ2_XS, IQ3_M, IQ3_XS, IQ3_XXS, IQ4_NL, IQ4_XS) from multiple publishers.
    *   **MLX:** Available in 4-bit and 8-bit for Apple Silicon (e.g., `jedisct1`).
    *   **FP8 Dynamic:** One instance found (`RedHatAI/Mellum2-12B-A2.5B-Thinking-FP8-Dynamic`), tagged for `vllm`.
    *   **AWQ, GPTQ, ExLlamaV2 / EXL2:** No explicit mentions of these formats were found in the `tags` or `siblings` of the models returned by the Hugging Face API search.

4.  **File Size Considerations (for future reference):**
    *   GGUF Q3_K_M (approx. 5.25GB) would be the most suitable for the 8GB VRAM target (~6GB weights), followed by 4-bit AWQ/GPTQ/EXL2/MLX (approx. 6GB).
    *   GGUF Q4_K_M (approx. 6.75GB) and Q5_K_M (approx. 7.5GB) would be very tight or exceed the 6GB weights target, leaving minimal room for KV cache on an 8GB RTX 3060 Ti.
    *   GGUF Q6_K (approx. 9GB) and Q8_0 (approx. 12GB) are generally too large for 8GB VRAM.

### Questions Answered

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**
    *   **Answer:** No. Based on the `lastModified` timestamps from the Hugging Face API, no new community-quantized Mellum2 models were published within the last 24 hours (relative to 2026-08-05).

### Gaps / Follow-up

1.  **Inaccessible External Sources:** Several specified external sources (`https://huggingface.co/models?search=mellum2&sort=createdAt`, `https://huggingface.co/bartowski`, `https://huggingface.co/unsloth`, `https://huggingface.co/mradermacher`, `https://huggingface.co/MaziyarPanahi`, `https://huggingface.co/QuantFactory`, `https://huggingface.co/lmstudio-community`, `https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions`, `https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions`, `https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day`) returned "FETCH ERROR" or HTML content instead of parseable data. This prevents a complete and thorough search as per the task instructions. Follow-up is needed to determine the cause of these fetch errors and ensure access to these critical data sources for future research tasks.
2.  **Prior Research Findings Access:** The instruction to "Do NOT re-report quants seen in previous days — check `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files" could not be fulfilled due to environmental limitations. It is assumed for this report that no prior reports exist or that all found models are new to this specific search. Establishing access to this historical data is crucial for accurate future reporting.
3.  **Quality Regression Data:** For any new quant found, reporting "any reported quality regression vs base BF16" was requested. Since no new quants were found, this information was not applicable. However, it's noted that the provided API output does not directly contain this metric, implying it would need to be extracted from model cards or discussions, which were largely inaccessible.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```

Example structure of a relevant model entry from the API response (illustrative, not a new model):

```json
{
  "_id": "6a1ed286c0fa89ba7a7df014",
  "id": "junwatu/Mellum2-12B-A2.5B-Instruct-GGUF",
  "author": "junwatu",
  "gated": false,
  "lastModified": "2026-07-22T01:13:55.000Z", // Key timestamp for 24h check
  "likes": 2,
  "trendingScore": 0,
  "private": false,
  "sha": "79f1c3cd35ad0839263a19b6b73da4070eb73a66",
  "downloads": 175,
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
    { "rfilename": "Mellum2-12B-A2.5B-Instruct-Q4_K_M.gguf" }, // Specific quant file
    { "rfilename": "README.md" }
  ]
}
```
