# Research: eaglesong-artix7-rtl-core-design

**Date:** 2026-03-25  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://raw.githubusercontent.com/nervosnetwork/rfcs/master/rfcs/0028-eaglesong/0028-eaglesong.md, https://raw.githubusercontent.com/mimoo/eaglesong/master/README.md, https://raw.githubusercontent.com/nervosnetwork/ckb-vm/master/docs/ISA.md

---

## Research Note: eaglesong-artix7-rtl-core-design

**Date: 2026-03-25**

### Summary
The primary goal is to design an ASIC-friendly Eaglesong RTL core for Artix-7 FPGAs. However, the provided source content for the Eaglesong algorithm specification (RFCs, READMEs) resulted in "FETCH ERROR: HTTP Error 404: Not Found". This critical lack of information prevents a detailed answer to questions regarding pipeline structure and internal state representation. A robust verification strategy can still be outlined, leveraging Wyltek Industries' existing `NerdMiner CKB` software implementation as a golden reference model.

### 1. What is a sensible pipeline structure (round unrolling, stage boundaries) for an Eaglesong core targeting Artix-7 that is still cleanly mappable to ASIC?

Due to the "FETCH ERROR: HTTP Error 404: Not Found" for all provided Eaglesong algorithm specifications (`0028-eaglesong.md`, `README.md`), it is impossible to propose a sensible pipeline structure. Without knowledge of the Eaglesong algorithm's specific operations, number of rounds, data dependencies, and computational complexity, any suggestion for round unrolling or stage boundaries would be pure speculation and potentially incorrect.

To answer this question, the detailed specification of the Eaglesong hash function is required, including:
*   The number of rounds in the compression function.
*   The specific arithmetic and logical operations performed in each round (e.g., additions, XORs, rotations, lookups).
*   The width of the internal state and message blocks.
*   Any inherent parallelism or sequential dependencies within the algorithm.

Once these details are known, a pipeline structure could be designed by:
*   **Analyzing critical paths:** Identifying the longest combinational paths within a single round.
*   **Determining unrolling factor:** Deciding how many rounds to execute concurrently or in a single clock cycle to balance throughput and resource utilization.
*   **Defining stage boundaries:** Inserting registers to break down long combinational paths, ensuring clock frequency targets are met for Artix-7, while keeping ASIC mapping in mind (e.g., avoiding excessive register stages that might be less efficient in ASIC).
*   **Considering resource constraints:** Balancing the use of DSP blocks, LUTs, and registers available on Artix-7.

### 2. How should internal state, message scheduling, and constants be represented (registers vs BRAM/LUTRAM) for a mid-range Artix-7?

Similar to the previous question, the "FETCH ERROR: HTTP Error 404: Not Found" for the Eaglesong algorithm specification prevents a precise answer. The optimal representation depends entirely on the size and access patterns of these components.

General considerations for Artix-7 and ASIC-friendly design:
*   **Internal State:** If the internal state is small (e.g., a few hundred bits), it is typically best represented using **registers** for maximum speed and single-cycle access. For larger states that are updated sequentially or require multiple read/write ports, **LUTRAM** (distributed RAM) or even small **BRAM** blocks might be considered, though registers are generally preferred for active state variables in high-performance hash functions.
*   **Message Scheduling:** If message scheduling involves a small, fixed window of data or simple shifts/rotations, **registers** are appropriate. If it requires a larger buffer or complex indexing (e.g., a message schedule similar to SHA-256's 64-word expansion), **LUTRAM** could be used for efficiency, especially if only a few words are accessed per cycle.
*   **Constants:** Small, fixed constants are best hardcoded or stored in **registers** for immediate access. If there are many constants or they are large (e.g., a lookup table), **LUTRAM** or **BRAM** would be more efficient in terms of resource usage, though BRAM introduces an additional clock cycle latency. For ASIC, constants are typically synthesized into combinational logic or small register files.

Without knowing the specific requirements of Eaglesong, it's impossible to make an informed decision on the trade-offs between speed (registers) and resource efficiency (LUTRAM/BRAM).

### 3. What verification strategy (test vectors, golden software model, simulation) should be used to prove correctness of the RTL core?

A comprehensive verification strategy for the Eaglesong RTL core should combine multiple approaches to ensure correctness and robustness:

1.  **Golden Software Model:**
    *   **Strategy:** Develop or leverage an existing software implementation of the Eaglesong algorithm to serve as the "golden reference."
    *   **Relevance:** Wyltek Industries has already shipped `NerdMiner CKB` (github.com/toastmanAu/NerdMiner_CKB), which is an "ESP32 Eaglesong solo miner." This existing C/C++ implementation of Eaglesong is the ideal candidate for the golden software model.
    *   **Implementation:** The `NerdMiner CKB` code can be compiled and run to generate expected hash outputs for a wide range of input messages. This model should be thoroughly tested against known Eaglesong test vectors (if available from an official specification, which is currently missing).

2.  **Test Vector Generation:**
    *   **Strategy:** Use the golden software model to generate a comprehensive suite of input-output test vectors.
    *   **Implementation:**
        *   **Random Inputs:** Generate a large number of random input messages of varying lengths (e.g., 0 to 2000 bytes) and feed them into the `NerdMiner CKB` implementation to produce corresponding hash outputs.
        *   **Edge Cases:** Include test vectors for edge cases such as empty messages, messages that are exact multiples of the block size, messages that are one byte short/long of a block, and messages with all zeros or all ones.
        *   **Known Vectors:** If any official Eaglesong test vectors become available (e.g., from the RFC or other implementations), these should be prioritized.

3.  **RTL Simulation:**
    *   **Strategy:** Simulate the Verilog/VHDL RTL core using a standard HDL simulator (e.g., QuestaSim, VCS, Icarus Verilog).
    *   **Implementation:**
        *   **Testbench:** Develop a robust testbench that instantiates the Eaglesong RTL core.
        *   **Input Injection:** The testbench should read the generated test vectors (input messages) and feed them into the RTL core.
        *   **Output Comparison:** The testbench should capture the hash output from the RTL core and compare it bit-for-bit with the expected output from the golden software model. Any mismatch should trigger an error.
        *   **Coverage:** Aim for high code coverage (line, branch, FSM, toggle coverage) to ensure all parts of the RTL are exercised.

4.  **Formal Verification (Optional but Recommended for ASIC-friendliness):**
    *   **Strategy:** Use formal verification tools to mathematically prove the equivalence between the RTL and a high-level model or to verify specific properties.
    *   **Implementation:**
        *   **Property Checking:** Assert properties like "no deadlocks," "output is always valid after N cycles," or "specific internal state transitions occur correctly."
        *   **Equivalence Checking:** If a high-level C/C++ model (or a simplified formal specification) of a single round or critical path can be created, formal equivalence checking can prove that the RTL implements it identically.

### Gaps / Follow-up
The most critical gap is the **missing Eaglesong algorithm specification**. Without access to `nervosnetwork/rfcs/master/rfcs/0028-eaglesong/0028-eaglesong.md` or `mimoo/eaglesong/master/README.md`, it is impossible to answer questions 1 and 2 regarding pipeline structure and internal state representation.

**Follow-up actions:**
1.  **Obtain Eaglesong Specification:** Locate and provide the official or de-facto specification for the Eaglesong hash function. This is paramount for any RTL design work.
2.  **Consult `NerdMiner CKB` source:** Once the specification is available, cross-reference it with the Eaglesong implementation within `NerdMiner CKB` to understand its specific details and potential optimizations that might be relevant for hardware.

### Relevant Code/API Snippets
While no new code snippets could be extracted from the provided (missing) source content, the following existing Wyltek Industries project is highly relevant for the verification strategy:

*   **`NerdMiner CKB`** (github.com/toastmanAu/NerdMiner_CKB)
    *   This project contains a working software implementation of the Eaglesong algorithm for ESP32. It should be used as the **golden software model** for generating test vectors and verifying the correctness of the designed RTL core. The specific C/C++ files implementing the Eaglesong hash function within this repository would be the direct reference.