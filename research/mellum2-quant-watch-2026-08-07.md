# Research: mellum2-quant-watch-2026-08-07

**Date:** 2026-08-07
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://huggingface.co/api/models?search=Mellum2&full=true,https://huggingface.co/models?search=mellum2&sort=createdAt,https://huggingface.co/bartowski,https://huggingface.co/unsloth,https://huggingface.co/mradermacher,https://huggingface.co/MaziyarPanahi,https://huggingface.co/QuantFactory,https://huggingface.co/lmstudio-community,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking/discussions,https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct/discussions,https://www.reddit.com/r/LocalLLaMA/search.json?q=mellum2&restrict_sr=1&sort=new&t=day

---

## Structured Findings Document

**ID:** mellum2-quant-watch-2026-08-07
**Goal:** Check whether a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) has been published to Hugging Face in the last 24h.

---

### Summary

As of 2026-08-07, no new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants (Thinking, Instruct, Base) from trusted publishers have been identified on Hugging Face within the last 24 hours. The search of the Hugging Face API for "Mellum2" models revealed several existing quantized models, including those from trusted publishers like `bartowski`, but their `lastModified` timestamps predate the specified 24-hour window (i.e., before 2026-08-06).

Attempts to access additional Hugging Face and Reddit URLs resulted in fetch errors, preventing a comprehensive review of all potential sources. However, based on the direct API query, no recent updates or new publications matching the criteria were found.

### Key Findings

1.  **Hugging Face API Search Execution:** A direct query to `https://huggingface.co/api/models?search=Mellum2&full=true` was performed to retrieve model metadata.
2.  **Timestamp Filtering:** Each model's `lastModified` timestamp was evaluated against the 24-hour window preceding 2026-08-07 (i.e., from 2026-08-06T00:00:00Z to 2026-08-07T23:59:59Z).
3.  **No Recent Publications:** All identified Mellum2 model variants, including those from trusted publishers (`bartowski`), had `lastModified` dates in June or July 2026. None fell within the specified 24-hour window.
    *   Example: `bartowski/Mellum2-12B-A2.5B-Thinking-GGUF` was last modified on `2026-06-10T20:27:21.000Z`.
    *   Example: `junwatu/Mellum2-12B-A2.5B-Instruct-GGUF` was last modified on `2026-07-22T01:13:55.000Z`.
4.  **Untrusted Publishers:** Several models from publishers not on the trusted list (e.g., `yuxinlu1`, `mdamir97`, `skilledu`, `RJ000`, `jedisct1`, `JSchneemann`, `shailesh83`, `RedHatAI`, `junwatu`) were found, but these were also outside the 24-hour window and are not considered for reporting as per the task instructions.
5.  **Data Access Limitations:** Multiple provided source URLs (Hugging Face web pages, Reddit search results) returned "FETCH ERROR" messages, indicating that a full, real-time web scrape was not successful. This means the analysis is solely based on the provided API snippet.

### Questions Answered

**Has a community-quantized version of any JetBrains Mellum2-12B-A2.5B model variant (Thinking, Instruct, Base) been published to Hugging Face in the last 24h?**

No, based on the provided Hugging Face API data and the specified 24-hour window (2026-08-06 to 2026-08-07), no new community-quantized versions of JetBrains Mellum2-12B-A2.5B model variants from trusted publishers have been published or updated on Hugging Face.

### Gaps / Follow-up

1.  **Full Hugging Face API Access:** The provided API snippet is static. For a real-time and comprehensive search, direct, live API access would be required to ensure the `lastModified` timestamps are current and to retrieve all relevant models.
2.  **File Size Retrieval:** The current API response does not include file sizes for individual GGUF or other quantized files. To accurately determine if a variant fits the 8GB VRAM (~6GB weights) requirement, additional API calls (e.g., to `https://huggingface.co/api/models/{repo_id}/tree/main`) or parsing of model cards would be necessary.
3.  **Quality Regression Information:** The API response does not contain explicit tags or fields for "reported quality regression vs base BF16." This information would typically be found within the model card's `README.md` file, which would require additional fetching and parsing.
4.  **Robust Web Scraping/API Handling:** The "FETCH ERROR" for several URLs indicates a need for more robust data acquisition methods, potentially involving retry logic or alternative API endpoints for web content.
5.  **Prior Research Findings Access:** The instruction to "Do NOT re-report quants seen in previous days — check ~/.claude/shared/research-findings/ for prior mellum2-quant-watch-* files" could not be fulfilled due to environmental limitations. A mechanism to access and parse historical findings would be crucial for future runs.

### Relevant Code/API Snippets

The primary API endpoint used for this research:

```
https://huggingface.co/api/models?search=Mellum2&full=true
```
