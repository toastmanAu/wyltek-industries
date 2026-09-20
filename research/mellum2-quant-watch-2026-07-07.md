# Research: mellum2-quant-watch-2026-07-07

**Date:** 2026-07-07
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Mellum2 Quantization Watch - 2026-07-07

**Research Task ID:** mellum2-quant-watch-2026-07-07
**Date:** 2026-07-07

### Summary

This research aimed to identify any newly published community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) on Hugging Face within the last 24 hours. The search prioritized GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, and MLX formats from a list of trusted publishers.

Based on the direct Hugging Face API query, no new community-quantized Mellum2 models from the specified trusted publishers were found to have been updated or published within the last 24 hours. All identified Mellum2-related repositories in the API response had `lastModified` timestamps prior to 2026-07-06.

### Key Findings

1.  **No Recent Quantizations from Trusted Publishers:** A direct API query to `https://huggingface.co/api/models?search=Mellum2&full=true` revealed no Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) that were updated or published by any of the trusted publishers (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community) within the last 24 hours (i.e., since 2026-07-06).
2.  **Outdated Model Timestamps:** All models returned by the Hugging Face API search for "Mellum2" displayed `lastModified` dates in June 2026, with the most recent being 2026-06-12T15:13:19.000Z. This falls outside the requested 24-hour window.
3.  **Untrusted Publishers Identified (Historical Context):** While not meeting the 24-hour criteria, several existing quantized or fine-tuned Mellum2 models were found from publishers *not* on the trusted list, including `yuxinlu1`, `jedisct1`, `sahilchachra`, `mdamir97`, `skilledu`, `RJ000`, `JSchneemann`, `shailesh83`, `junwatu`, `RedHatAI`, `developerjeremylive`, and `josephmayo`. These were disregarded as per the research task's publisher constraints.
4.  **Target Quant Formats and VRAM Considerations:** The target quantization formats (GGUF Q4_K_M, Q5_K_M, Q3_K_M, Q6_K, Q8_0; AWQ 4-bit; GPTQ 4-bit; ExLlamaV2/EXL2; MLX) were considered for a 12B model.
    *   For an RTX 3060 Ti 8GB (allowing ~6GB for weights):
        *   GGUF Q3_K_M (~5.25 GB) would fit.
        *   GGUF Q4_K_M (~6.75 GB) would fit.
        *   AWQ 4-bit (~6 GB) would fit.
        *   GPTQ 4-bit (~6 GB) would fit.
        *   ExLlamaV2/EXL2 (2-4 bit, ~3-6 GB) would fit.
        *   MLX 4-bit (~6 GB) would fit.
        *   GGUF Q5_K_M (~8.25 GB), Q6_K (~9.75 GB), and Q8_0 (~12 GB) would likely exceed the 6GB weight allowance for 8GB VRAM.

### Questions Answered

**Q: Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**

**A:** No new community-quantized versions of any JetBrains Mellum2-12B-A2.5B model variant from the specified trusted publishers have been published or updated on Hugging Face in the last 24 hours (as of 2026-07-07).

**Digest:** no drops today

### Gaps / Follow-up

1.  **Access to Prior Research Files:** The instruction to check `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files could not be fulfilled due to environmental limitations. This means there's a theoretical possibility that a model *not* found in the API search (e.g., due to a different naming convention or being a sub-repo) might have been reported previously and should be excluded, but this is moot given no new quants were found today.
2.  **Source Content Fetch Errors:** Several provided source URLs (e.g., `https://huggingface.co/models?search=mellum2&sort=createdAt`, publisher profiles, Reddit search) resulted in "FETCH ERROR" or returned full HTML content instead of parseable data. This prevented a broader or more granular search beyond the initial API endpoint. Future research would benefit from robust access to these sources.
3.  **Quality Regression Data:** If new quants were found, the task requested "any reported quality regression vs base BF16". This information is typically found within a model's README or discussions. Without new quants, this specific data point could not be evaluated.
