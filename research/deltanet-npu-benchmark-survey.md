# Research: deltanet-npu-benchmark-survey

**Date:** 2026-05-19
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** HIGH
**Requester:** claude-code
**Seeds:** https://github.com/ggerganov/llama.cpp,https://github.com/intel/intel-npu-acceleration-library,https://github.com/openvinotoolkit/openvino_notebooks

---

**Wyltek Industries - Technical Research Findings**

**Research Task ID:** deltanet-npu-benchmark-survey
**Analyst:** Argus
**Date:** 2024-05-15
**Priority:** HIGH
**Requested by:** claude-code

---

### Summary

This research task aimed to survey real-world benchmarks for hybrid NPU+CPU inference versus pure CPU `llama.cpp` on 7-14B language models, specifically targeting Intel Meteor Lake / AMD Strix Point NPUs for 2025-2026. The goal was to report on key metrics such as tokens/second (tok/s), latency, memory footprint, and complexity cost, ultimately providing a recommendation for DeltaNet-NPU's hybrid path.

Unfortunately, the provided source content from GitHub URLs (`https://github.com/ggerganov/llama.cpp`, `https://github.com/intel/intel-npu-acceleration-library`, `https://github.com/openvinotoolkit/openvino_notebooks`) could not be retrieved due to "FETCH ERROR" for each link. As a result, no data or technical details could be extracted from these sources.

Consequently, it is impossible to provide concrete findings, answer the specific questions posed, or offer a data-driven recommendation regarding the viability of the hybrid NPU+CPU inference path for DeltaNet-NPU at this time.

### Key Findings

1.  **Source Content Unavailability:** All three primary source links provided for this research task (llama.cpp, Intel NPU Acceleration Library, OpenVINO Notebooks) resulted in a "FETCH ERROR". This prevented any analysis of the intended content.
2.  **No Benchmark Data Extracted:** Due to the inability to access the source content, no real-world benchmark data (tok/s, latency, memory usage) for either pure CPU `llama.cpp` or hybrid NPU+CPU inference on Intel Meteor Lake / AMD Strix Point NPUs could be gathered.
3.  **No Tooling Maturity Assessment:** Without access to the `intel-npu-acceleration-library` or `openvino_notebooks`, it is impossible to assess the current maturity of NPU integration tooling for LLMs (e.g., whether it is production-ready or still research-grade).
4.  **No Complexity Cost Analysis:** Information regarding memory transfers, synchronization overhead, or specific quantization requirements for NPU offloading could not be determined from the unavailable sources.

### Questions Answered

Due to the critical issue of inaccessible source content, none of the specific questions outlined in the research goal could be answered:

*   **Actual tok/s numbers:** Not available.
*   **Model sizes benefiting most (3B, 7B, 14B):** Not determinable.
*   **Tooling maturity:** Not determinable.
*   **Complexity cost (memory transfers, sync overhead, quantization):** Not determinable.
*   **Recommendation (pursue, defer, or abandon):** Cannot be made without data.

### Gaps / Follow-up

The primary and most critical gap is the complete lack of accessible source content.

**Immediate Follow-up Actions Required:**

1.  **Re-attempt Source Retrieval:** Investigate the "FETCH ERROR" for the provided GitHub URLs. This could be a temporary network issue, a firewall block, or an invalid URL.
    *   `https://github.com/ggerganov/llama.cpp`
    *   `https://github.com/intel/intel-npu-acceleration-library`
    *   `https://github.com/openvinotoolkit/openvino_notebooks`
2.  **Provide Alternative Sources:** If the original links remain inaccessible, claude-code should provide alternative, working links to the intended repositories or cached versions of their READMEs/documentation.
3.  **Expand Search Scope (if links remain broken):** If the provided links cannot be resolved, a broader search for benchmarks on Intel Meteor Lake / AMD Strix Point NPUs with LLMs (7-14B) will be necessary. This would involve:
    *   Searching recent technical blogs, forums (e.g., Hugging Face, Reddit ML communities), and academic papers.
    *   Looking for official Intel/AMD developer documentation or community contributions that detail NPU performance for transformer models.
    *   Specifically targeting benchmarks that compare `llama.cpp` (CPU) against NPU-accelerated inference.
4.  **Clarify "2025-2026" Focus:** While the hardware targets (Meteor Lake, Strix Point) are clear, the "2025-2026" timeframe implies a forward-looking perspective. If current benchmarks are limited, understanding roadmaps or projected performance improvements for NPU software stacks in that timeframe would be valuable.

Without successful retrieval and analysis of the source content, any recommendation would be purely speculative and lack the necessary technical grounding.

### Relevant Code/API Snippets

No code or API snippets could be extracted as the source content was inaccessible.
