# Research: mellum2-quant-watch-2026-08-13

**Date:** 2026-08-13
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

**Wyltek Industries - Technical Research Findings**

**ID:** mellum2-quant-watch-2026-08-13
**Date:** 2026-08-13

---

### **Summary**

This research task aimed to identify any new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) published to Hugging Face by trusted publishers within the last 24 hours. The search prioritized GGUF, AWQ, GPTQ, and ExLlamaV2/EXL2 formats, with MLX as a low-priority option.

Based on the analysis of the provided Hugging Face API search results (`https://huggingface.co/api/models?search=Mellum2&full=true`), no new quantized Mellum2-12B-A2.5B model variants from the specified trusted publishers (bartowski, unsloth, mradermacher, MaziyarPanahi, TheBloke, QuantFactory, lmstudio-community) were found to have been published or significantly updated within the last 24 hours (i.e., on or after 2026-08-12).

Two MLX-quantized models (`mlx-community/Mellum2-12B-A2.5B-Instruct-4bit` and `mlx-community/Mellum2-12B-A2.5B-Instruct-mxfp4`) were identified with `lastModified` and `createdAt` timestamps on 2026-08-11. However, these fall outside the 24-hour window for 2026-08-13 and are from a publisher (`mlx-community`) not listed as trusted for this research task.

### **Key Findings**

No new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants from trusted publishers were published to Hugging Face within the last 24 hours.

### **Questions Answered**

*   **Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant been published to Hugging Face in the last 24h?**
    No. No models matching the criteria (Mellum2 variant, quantized, from a trusted publisher, updated within the last 24 hours) were found in the provided Hugging Face API results. The latest relevant updates were on 2026-08-11, which is outside the 24-hour window for 2026-08-13.

### **Gaps / Follow-up**

1.  **File Size Information in API:** The Hugging Face API output (`/api/models?search=Mellum2&full=true`) does not directly provide file sizes for individual model files (`rfilename` in `siblings` array). To accurately determine if a model variant fits the 8GB VRAM requirement (~6GB weights), a subsequent API call to the specific model repository's files endpoint or parsing of the model card would be necessary. For this task, an estimation based on bit-width (e.g., 4-bit quant for 12B model is ~6GB) was assumed to be sufficient if a candidate model had been found.
2.  **Access to Prior Research Findings:** The instruction to "Do NOT re-report quants seen in previous days — check ~/.claude/shared/research-findings/ for prior mellum2-quant-watch-* files" could not be fulfilled as these files are not accessible. The assessment of "new" was based solely on the `lastModified` / `createdAt` timestamps within the specified 24-hour window.
3.  **Untrusted Publishers:** While two MLX-quantized models were identified, they were excluded due to being from an untrusted publisher (`mlx-community`). If the scope of trusted publishers were to expand, these models might warrant further investigation.

### **Relevant Code/API Snippets**

The primary API used for this research was:
`https://huggingface.co/api/models?search=Mellum2&full=true`

Example of a model entry from the API output, showing `lastModified` and `createdAt` timestamps:

```json
{
    "_id": "6a7b81a7d09c96ab4a70867c",
    "id": "mlx-community/Mellum2-12B-A2.5B-Instruct-4bit",
    "author": "mlx-community",
    "gated": false,
    "lastModified": "2026-08-11T20:11:50.000Z",
    "likes": 1,
    "trendingScore": 1,
    "private": false,
    "sha": "714f4fdf47a46832e41cc80f446eb56541666ee9",
    "downloads": 0,
    "tags": [
        "mlx",
        "safetensors",
        "mellum",
        "moe",
        "instruct",
        "4-bit",
        "text-generation",
        "conversational",
        "en",
        "base_model:JetBrains/Mellum2-12B-A2.5B-Instruct",
        "base_model:quantized:JetBrains/Mellum2-12B-A2.5B-Instruct",
        "license:apache-2.0",
        "region:us"
    ],
    "pipeline_tag": "text-generation",
    "library_name": "mlx",
    "createdAt": "2026-08-11T20:10:15.000Z",
    "modelId": "mlx-community/Mellum2-12B-A2.5B-Instruct-4bit",
    "siblings": [
        { "rfilename": ".gitattributes" },
        { "rfilename": "README.md" },
        { "rfilename": "chat_template.jinja" },
        { "rfilename": "config.json" },
        { "rfilename": "generation_config.json" },
        { "rfilename": "model-00001-of-00002.safetensors" },
        { "rfilename": "model-00002-of-00002.safetensors" },
        { "rfilename": "model.safetensors.index.json" },
        { "rfilename": "tokenizer.json" },
        { "rfilename": "tokenizer_config.json" }
    ]
}
```
