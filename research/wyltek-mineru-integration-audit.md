# Research: wyltek-mineru-integration-audit

**Date:** 2026-05-19
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://github.com/opendatalab/MinerU,https://mineru.readthedocs.io/en/latest/

---

## Structured Findings Document: MinerU Integration Audit

**ID:** wyltek-mineru-integration-audit
**Goal:** Audit MinerU's documented integration patterns (VRAM lifecycle, idle eviction, cleanup hooks) so we can verify our existing `backends/mineru.py` + `studio/mineru_worker.py` + `worker_lifecycle.mineru_*` follow them. Identify missing pieces and recommend specific integration changes.
**Priority:** MEDIUM
**Requested by:** claude-code

---

### Summary

The audit of MinerU's integration patterns was severely hindered by the complete inaccessibility of its documented technical specifications. Attempts to retrieve information from the primary GitHub repository (`opendatalab/MinerU`) resulted in a fetch error, and the official ReadTheDocs documentation portal returned a "404 - Project not found" error.

Consequently, no technical details regarding MinerU's VRAM lifecycle management, model loading/unloading API surface, recommended worker patterns, resource cleanup mechanisms, or potential GPU conflicts could be extracted from the provided sources. This prevents any verification of Wyltek's existing MinerU integration components against the intended design patterns.

### Key Findings

1.  **GitHub Repository Inaccessibility:** The provided URL for the MinerU GitHub repository (`https://github.com/opendatalab/MinerU`) resulted in a "FETCH ERROR" during analysis. This prevented access to the repository's README, source code, or any other files that would typically contain crucial integration details.
2.  **Official Documentation Unavailable:** The designated ReadTheDocs URL (`https://mineru.readthedocs.io/en/latest/`) returned a "404 - Project not found" status. This indicates that the official documentation for MinerU is either non-existent, has been moved, or is currently private/unavailable.
3.  **Zero Technical Detail Extracted:** Due to the aforementioned access issues, no information could be gathered regarding MinerU's internal workings, API surface, resource management, or operational recommendations. The only available information is the project's high-level description: "Transforms complex documents like PDFs and Office docs into LLM-ready markdown/JSON for your Agentic workflows."

### Questions Answered

Based on the provided source content, **none** of the specific research questions could be answered.

*   **MinerU's model-loading/unloading API surface:** Unable to determine.
*   **How long does MinerU keep models in VRAM by default (if at all):** Unable to determine.
*   **Recommended pattern for serving MinerU as a worker (process-per-request, persistent worker, etc.):** Unable to determine.
*   **Cleanup behavior — orphaned tmp files, CUDA cache, etc.:** Unable to determine.
*   **Conflicts with other GPU users (does it need exclusive access?):** Unable to determine.
*   **Specific recommendations for our open-palette integration:** Cannot provide any specific recommendations without foundational technical details.

### Gaps / Follow-up

The current state of information is insufficient to perform the requested audit. Critical gaps exist in all areas of MinerU's technical integration patterns. The following follow-up actions are required:

1.  **Investigate GitHub Access Issue:**
    *   **Action:** Verify the provided GitHub URL is correct and publicly accessible. If the "FETCH ERROR" was transient, re-attempt access.
    *   **Action:** If the repository is private, initiate a request for access from `opendatalab` or relevant internal stakeholders.
    *   **Action:** If the repository has been moved or deleted, search for an updated location or alternative project.
2.  **Locate Alternative Documentation:**
    *   **Action:** Conduct an exhaustive search for any alternative official or community-contributed documentation for MinerU. This might include project websites, academic papers, or forum discussions.
3.  **Source Code Analysis (Contingency):**
    *   **Action:** If the GitHub repository becomes accessible but explicit documentation remains elusive, a direct analysis of the MinerU source code will be necessary. This would involve identifying core classes, functions related to model instantiation (`load_model`, `init`), inference (`predict`, `process`), and resource deallocation (`unload_model`, `cleanup`, `__del__`).
    *   **Focus Areas for Code Analysis:**
        *   Presence of `torch.cuda.empty_cache()` or similar CUDA memory management calls.
        *   Explicit `del model` statements or context managers for VRAM release.
        *   Initialization and teardown methods for worker processes.
        *   Any use of temporary file directories and their cleanup.
4.  **Direct Developer Contact:**
    *   **Action:** If all attempts to find documentation or infer patterns from code fail, direct communication with the `opendatalab` team or MinerU developers will be essential to obtain the necessary integration specifications.
5.  **Impact on Wyltek Integration:**
    *   **Recommendation:** Until MinerU's VRAM lifecycle, cleanup hooks, and worker patterns are clearly understood, the existing `backends/mineru.py`, `studio/mineru_worker.py`, and `worker_lifecycle.mineru_*` implementations cannot be reliably validated.
    *   **Warning:** Operating the current integration without this critical information carries a high risk of:
        *   **VRAM Leaks:** Models remaining in VRAM indefinitely, leading to GPU exhaustion.
        *   **Resource Contention:** Unmanaged GPU usage conflicting with other backends.
        *   **Process Instability:** Suboptimal worker lifecycle management (e.g., unnecessary process restarts, orphaned processes).
        *   **Disk Bloat:** Accumulation of temporary files or caches.
    *   **Immediate Action:** Pending further research, consider implementing aggressive process termination and VRAM clearing strategies for MinerU workers if they are currently active, to mitigate potential resource issues. However, this is a stop-gap and not a recommended long-term solution.

### Relevant Code/API Snippets

N/A. No code or API snippets could be extracted from the provided, inaccessible sources.
