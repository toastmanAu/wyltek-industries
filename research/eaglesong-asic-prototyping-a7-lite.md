# Research: eaglesong-asic-prototyping-a7-lite

**Date:** 2026-03-25  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://www.xilinx.com/support/documentation/user_guides/ug475_7Series_Config.pdf, https://www.xilinx.com/content/dam/xilinx/support/documents/data_sheets/ds180_7Series_Overview.pdf, https://raw.githubusercontent.com/nervosnetwork/ckb-system-scripts/master/c/ckb-contracts-tools/docs/eaglesong_spec.md, https://raw.githubusercontent.com/nervosnetwork/rfcs/master/rfcs/0028-eaglesong/0028-eaglesong.md, https://raw.githubusercontent.com/mimoo/eaglesong/master/README.md

---

Date: 2026-03-25

## Research Note: eaglesong-asic-prototyping-a7-lite

### Summary
This research aims to map a practical path for Eaglesong hash algorithm implementation on the MicroPhase A7-Lite Artix-7 FPGA, leading to early-stage ASIC design concepts. However, the provided source content, including Xilinx documentation for Artix-7 and all Eaglesong-related specifications or prior implementations, was inaccessible or returned 404 errors. Consequently, it is impossible to answer the specific research questions regarding hardware capabilities, existing implementations, RTL structure, prototyping roadmap, or ASIC inferences based solely on the provided information.

### 1. What are the key hardware capabilities and limits of the MicroPhase A7-Lite (or closest documented equivalent Artix-7 dev boards) for hash-engine style workloads (LUTs, FFs, BRAM, DSPs, max clock, IO, power and cooling)?
The provided source content, specifically `ug475_7Series_Config.pdf` and `ds180_7Series_Overview.pdf`, could not be accessed due to a "JavaScript enabled" requirement or an application loading issue. Therefore, I cannot provide specific details on the hardware capabilities and limits of the MicroPhase A7-Lite or equivalent Artix-7 dev boards for hash-engine style workloads.

### 2. What prior Eaglesong FPGA implementations exist (miners, academic work, or open-source cores), and what are their reported resource usage, clock frequencies, and hash/s on Artix-7 or similar FPGAs?
All provided links related to Eaglesong specifications and implementations (`eaglesong_spec.md`, `0028-eaglesong.md`, `mimoo/eaglesong/README.md`) returned "HTTP Error 404: Not Found". As such, I cannot identify any prior Eaglesong FPGA implementations or report their resource usage, clock frequencies, or hash/s on Artix-7 or similar FPGAs based on the provided content.

### 3. How should an Eaglesong RTL core be structured to be both efficient on Artix-7 and “ASIC-friendly” (clocking, resets, pipelining, avoiding FPGA-only primitives)?
Without access to the Eaglesong algorithm specification or detailed Artix-7 architecture documentation, it is not possible to provide specific guidance on how an Eaglesong RTL core should be structured for efficiency on Artix-7 and ASIC-friendliness. General ASIC-friendly design principles (e.g., synchronous design, clear clock domains, explicit reset strategies, careful pipelining, avoiding vendor-specific IP blocks) apply, but specific recommendations for Eaglesong cannot be made from the provided content.

### 4. What step-by-step prototyping roadmap makes sense on this board, from basic bring-up through a single Eaglesong round, to a full pipeline and finally multiple cores, with clear measurement points (hash/s and estimated power)?
Due to the inability to access documentation for the MicroPhase A7-Lite board, the Artix-7 FPGA, or the Eaglesong algorithm, a specific step-by-step prototyping roadmap with clear measurement points cannot be outlined. Such a roadmap would require detailed knowledge of the target hardware's capabilities and the algorithm's computational structure.

### 5. Based on realistic measurements from an Artix-7 implementation, what initial ASIC design parameters (lane count, target hash rate, rough power budget, and main trade-offs) can we infer, and what are the main differences we should expect when moving from FPGA to an Eaglesong ASIC?
As no information on Artix-7 capabilities or Eaglesong FPGA implementations was accessible, no "realistic measurements" can be obtained from the provided content. Therefore, it is impossible to infer initial ASIC design parameters (lane count, target hash rate, rough power budget, and main trade-offs) for an Eaglesong ASIC based on the given sources. General differences between FPGA and ASIC include ASICs offering significantly higher performance, lower power consumption per operation, and reduced cost at scale, but with much higher upfront NRE (Non-Recurring Engineering) costs and no post-fabrication flexibility. However, these are generalities and not specific inferences for Eaglesong from an Artix-7 implementation.

### Gaps / Follow-Up
The primary gap is the complete lack of accessible source content. To answer the research questions, the following information is critically needed:
1.  **Artix-7 FPGA Documentation:** Access to Xilinx 7-Series documentation (e.g., `ug475_7Series_Config.pdf`, `ds180_7Series_Overview.pdf`) to understand the hardware capabilities (LUTs, FFs, BRAM, DSPs, clocking, I/O, power) of Artix-7 FPGAs, specifically the XC7A35T/100T/200T variants relevant to the MicroPhase A7-Lite.
2.  **Eaglesong Algorithm Specification:** Access to the Eaglesong algorithm specification (e.g., `eaglesong_spec.md`, `0028-eaglesong.md`) to understand its internal structure, rounds, and operations, which is essential for RTL design.
3.  **Prior Eaglesong FPGA Implementations:** Access to documentation or repositories of existing Eaglesong FPGA implementations (e.g., `mimoo/eaglesong/README.md`) to analyze their resource usage, performance metrics, and design choices on FPGAs.
4.  **MicroPhase A7-Lite Board Details:** Specific documentation for the MicroPhase A7-Lite board itself, if it differs significantly from generic Artix-7 development boards, to understand its specific I/O, clocking, and power delivery capabilities.

### Relevant Code/API Snippets
No relevant code or API snippets could be extracted from the provided content, as all linked sources were inaccessible.