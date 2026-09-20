# Research: mellum2-quant-watch-2026-08-10

**Date:** 2026-08-10
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Mellum2 Quantization Watch - 2026-08-10

**Summary**
This report details the findings of a search for newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) on Hugging Face within the last 24 hours (as of 2026-08-10). The search focused on specific quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) and a predefined list of trusted publishers.

Based on the analysis of the Hugging Face API, no new community-quantized versions of any JetBrains Mellum2-12B-A2.5B model variant from the specified trusted publishers have been released to Hugging Face in the last 24 hours. All identified Mellum2 quantized models from trusted publishers were last modified prior to the 24-hour window.

**Key Findings**

1.  **Search Scope:** The search targeted models containing "Mellum2" in their ID, specifically looking for quantized versions of the 12B-A2.5B Thinking, Instruct, or Base variants.
2.  **Timeframe:** The search was restricted to models `lastModified` within the last 24 hours relative to 2026-08-10.
3.  **Quantization Formats:** Priority was given to GGUF (Q4_K_M, Q5_K_M, Q3_K_M, Q6_K, Q8_0), followed by AWQ 4-bit, GPTQ 4-bit, ExLlamaV2/EXL2, and MLX.
4.  **Trusted Publishers:** The search was filtered to include only models from `bartowski`, `unsloth`, `mradermacher`, `MaziyarPanahi`, `TheBloke`, `QuantFactory`, and `lmstudio-community`.
5.  **API Results Analysis:** The Hugging Face API returned several Mellum2 models, including some GGUF and MLX quantized versions. However, upon inspecting the `lastModified` timestamps for all relevant models, none were updated within the 24-hour window (i.e., on 2026-08-09 or 2026-08-10).
6.  **Publisher Filtering:** Among the models found, only those by `bartowski` were from a trusted publisher. These `bartowski` models (`bartowski/Mellum2-12B-A2.5B-Thinking-GGUF` and `bartowski/Mellum2-12B-A2.5B-Instruct-GGUF`) were last modified on `2026-06-10`, falling outside the 24-hour reporting window.

**Questions Answered**

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**
    No, a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant from a trusted publisher has not been published to Hugging Face in the last 24 hours.

**Gaps / Follow-up**

1.  **File Size Information:** The Hugging Face API response for `full=true` does not directly provide file sizes for individual `siblings` (files within a repository). To accurately determine the "total file size for the smallest variant that fits 8GB VRAM (~6GB weights leaving room for KV cache)", a subsequent API call to `https://huggingface.co/api/models/{repo_id}/tree/main` or similar would be required for each candidate model, or manual inspection of the model card. For this report, since no new quants were found, this detailed step was not necessary.
2.  **Quality Regression Data:** Information regarding reported quality regression versus base BF16 models is typically found within model cards (`README.md`) or discussion forums. Due to "FETCH ERROR" responses for direct links to discussions and the absence of new models, this information could not be retrieved or assessed.
3.  **Comprehensive Publisher Search:** While the `search=Mellum2` parameter on the main `/api/models` endpoint is effective, directly querying each trusted publisher's profile (`/api/models?author={publisher_name}&search=Mellum2`) could provide a more robust check, especially if the main search misses models due to naming conventions or tag discrepancies. However, given the "FETCH ERROR" for direct profile links in the provided sources, this was not feasible.

**Relevant Code/API Snippets**

The primary API endpoint used for this research was:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```
