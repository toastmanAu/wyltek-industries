# Research: mellum2-quant-watch-2026-06-03

**Date:** 2026-06-03
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Wyltek Industries Technical Research Findings

**Research Task ID:** mellum2-quant-watch-2026-06-03
**Date:** 2026-06-03

### Summary

This report details the findings from a 24-hour scan of Hugging Face for community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base). The search focused on specific quantization formats (GGUF, AWQ, GPTQ, ExLlamaV2/EXL2, MLX) and a predefined list of trusted publishers.

Despite identifying several newly published Mellum2-12B-A2.5B quantized models within the last 24 hours, none of these were uploaded by the specified list of trusted publishers (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community). Therefore, no new community-quantized Mellum2 models from trusted sources were found that meet the criteria for reporting.

### Key Findings

No new community-quantized versions of any JetBrains Mellum2-12B-A2.5B model variant from trusted publishers were found on Hugging Face in the last 24 hours.

### Questions Answered

**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h by a trusted publisher.

**Answer:** No, a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant from a trusted publisher has not been published to Hugging Face in the last 24 hours.

### Gaps / Follow-up

1.  **Publisher Trust Verification:** The current process strictly adheres to a predefined list of trusted publishers. Several quantized Mellum2 models were identified as `lastModified` within the last 24 hours by *unlisted* authors (e.g., RJ000, JSchneemann, jedisct1, junwatu, CodeFault, developerjeremylive, josephmayo, shailesh83, mdamir97, skilledu). A follow-up task could involve evaluating the trustworthiness of these new publishers or expanding the trusted list.
2.  **Automated File Size Extraction:** The Hugging Face API (`/api/models?search=Mellum2&full=true`) provides a list of `rfilename`s but not their sizes. Manual inspection or additional API calls (e.g., `https://huggingface.co/api/models/{repo_id}/tree/main`) would be required to accurately determine file sizes for specific quantized variants. This was not critical for this report as no trusted quants were found, but would be necessary for future positive findings.
3.  **Quality Regression Data:** The task requested "any reported quality regression vs base BF16." This information is typically found within model cards or discussion sections, which are not directly queryable via the primary API endpoint used. If a trusted model were found, a deeper dive into its model card would be required.
4.  **Prior Findings Check:** The instruction to check `~/.claude/shared/research-findings/` for prior `mellum2-quant-watch-*` files could not be executed due to environmental limitations. This means there's a theoretical possibility of re-reporting if a trusted publisher were to re-upload an identical quant.

### Relevant Code/API Snippets

The primary API endpoint used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

This API returns a JSON array of model objects, each containing metadata such as `id` (repo path), `author`, `lastModified`, and `tags`.

**Example of relevant model object structure (truncated for brevity):**
```json
{
    "_id": "6a1e6e610a42a88aea01187c",
    "id": "RJ000/Mellum2-12B-A2.5B-Thinking-GGUF",
    "author": "RJ000",
    "gated": false,
    "lastModified": "2026-06-02T06:20:32.000Z",
    "likes": 5,
    "trendingScore": 5,
    "private": false,
    "sha": "03172677cb10f688c816d07a162da1acf665291c",
    "downloads": 0,
    "tags": [
        "gguf",
        "llama.cpp",
        "mellum",
        "moe",
        "code",
        "quantized",
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
    "createdAt": "2026-06-02T05:47:13.000Z",
    "modelId": "RJ000/Mellum2-12B-A2.5B-Thinking-GGUF",
    "siblings": [
        { "rfilename": ".gitattributes" },
        { "rfilename": "Mellum2-12B-A2.5B-Thinking-Q4_K_M.gguf" },
        { "rfilename": "README.md" }
    ]
}
```
This snippet shows a GGUF quant of the "Thinking" variant, modified within the last 24 hours, and includes a `Q4_K_M.gguf` file which is a target quant format and likely fits the 8GB VRAM requirement (~6.75GB). However, its `author` ("RJ000") is not on the trusted publishers list, leading to its exclusion from the final findings.
