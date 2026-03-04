# Research: esp32p4-fiber-signer-vs-lightclient

**Date:** 2026-03-05  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://raw.githubusercontent.com/toastmanAu/ckb-light-esp/main/README.md, https://raw.githubusercontent.com/nervosnetwork/fiber/main/README.md, https://raw.githubusercontent.com/bitcoin/secp256k1/master/README.md, https://api.github.com/search/repositories?q=esp32+secp256k1&sort=stars&per_page=10, https://raw.githubusercontent.com/espressif/esp-idf/master/components/mbedtls/README.md

---

## Research Note: esp32p4-fiber-signer-vs-lightclient

**Date:** 2026-03-05

### Summary

This research compares two architectures for integrating ESP32-P4 into the FiberQuest project: a "Signer Only" approach and a "Light Client + Signer" approach. The "Signer Only" model leverages the ESP32-P4 for secure private key storage and transaction signing (both CKB L1 and Fiber off-chain payment hashes), delegating all other CKB and Fiber node functionalities to a more powerful host like a Raspberry Pi or server. This minimizes the ESP32's resource footprint. Conversely, the "Light Client + Signer" architecture aims for greater autonomy by having the ESP32-P4 run a CKB light client to independently verify on-chain state, alongside its signing capabilities. While `libsecp256k1` is suitable for embedded systems, specific resource requirements for Rust-based CKB light clients or the Fiber Network Node (FNN) on ESP32-P4's RISC-V architecture are not available in the provided content. The "Signer Only" approach appears more feasible given current information and resource constraints, though it introduces a dependency on a trusted remote node for state verification.

### 1. What software exists? CKB light client is Rust — can it compile for RISC-V ESP32-P4? What are the binary size and RAM requirements?

*   **Software Existence:** CKB does have light clients, and the question specifies Rust implementations.
*   **Compilation for RISC-V ESP32-P4:** The ESP32-P4 utilizes a RISC-V architecture. Rust has robust cross-compilation capabilities, and the ESP-IDF framework supports Rust development for ESP32 chips. Therefore, it is *theoretically possible* to compile a Rust CKB light client for the `riscv32imac-esp-espidf` target (or similar). However, the provided content does not include any specific CKB light client project, documentation, or confirmation that an existing Rust CKB light client has been ported, tested, or optimized for the ESP32-P4's RISC-V architecture.
*   **Binary Size and RAM Requirements:** The provided content does not offer any specific binary size or RAM requirements for a Rust CKB light client running on an ESP32-P4.

### 2. Fiber Network Node (FNN) is also Rust — same question. FNN is heavier than just a light client.

*   **Software Existence:** The Fiber Network Node (FNN) is the reference implementation of the Fiber Network Protocol and is written in Rust, as confirmed by `nervosnetwork/fiber/main/README.md`.
*   **Compilation for RISC-V ESP32-P4:** Similar to the CKB light client, FNN is a Rust project. While Rust can target RISC-V, the provided `nervosnetwork/fiber/main/README.md` shows standard `cargo build --release` instructions and does not mention any specific support, ports, or optimizations for embedded RISC-V targets like the ESP32-P4. The FNN includes "built-in wallet functionality to sign funding transactions" and manages a "storage of the node" (`fiber/store`), indicating a more complex application than a simple light client.
*   **Binary Size and RAM Requirements:** The provided content does not offer any specific binary size or RAM requirements for the FNN running on an ESP32-P4. It explicitly states that FNN is "heavier than just a light client," implying higher resource demands, but no concrete figures are given.

### 3. Signing only: secp256k1 library for ESP32 exists (Bitcoin hardware wallets use this). Memory footprint?

*   **Software Existence:** The `libsecp256k1` library (`bitcoin/secp256k1/master/README.md`) is a "High-performance high-assurance C library for digital signatures and other cryptographic primitives on the secp256k1 elliptic curve." Its README explicitly states it is "Suitable for embedded systems" and has "No runtime heap allocation."
    *   While the prompt asserts that a "secp256k1 library for ESP32 exists," a search query (`api.github.com/search/repositories?q=esp32+secp256k1&sort=stars&per_page=10`) for `esp32+secp256k1` repositories returned `total_count:0`. This suggests that a dedicated, widely-starred `esp32-secp256k1` wrapper or port might not be directly discoverable via that specific search, but the underlying `libsecp256k1` (being a C library) can be integrated into ESP-IDF projects.
*   **Memory Footprint:** The `libsecp256k1` README mentions "No runtime heap allocation," which is beneficial for embedded systems with limited RAM. However, specific binary size (flash usage) or peak RAM usage figures for `libsecp256k1` when compiled for an ESP32-P4 are not provided in the source content.

### 4. Our existing ckb-light-esp project — what CKB operations does it already do on ESP32? Can it sign secp256k1 transactions?

*   The source content for `https://raw.githubusercontent.com/toastmanAu/ckb-light-esp/main/README.md` resulted in a `FETCH ERROR: HTTP Error 404: Not Found`.
*   Therefore, based on the provided content, it is not possible to answer what CKB operations `ckb-light-esp` already performs on ESP32 or if it can sign secp256k1 transactions.

### 5. For Fiber specifically: channel open/close = CKB L1 tx (needs signing). send_payment = off-chain message (needs signing of payment hash only, much lighter). Which operations actually need to run on-device vs can be delegated?

*   **Operations requiring on-device execution (private key on ESP32-P4):**
    *   **Signing CKB L1 transactions:** For Fiber channel open and close operations, which are CKB L1 transactions, the private key must be securely stored on the ESP32-P4 to sign these transactions.
    *   **Signing off-chain payment hashes:** For `send_payment` operations, which are off-chain messages, the private key associated with the Fiber channel must be on the ESP32-P4 to sign the payment hash. This is described as "much lighter" than L1 transaction signing.
*   **Operations that can be delegated to a host (e.g., Pi, server running FNN/CKB full node):**
    *   **CKB L1 transaction construction and broadcasting:** The complex process of constructing CKB L1 transactions (e.g., for channel open/close) can be handled by a host machine running a CKB full node or using a CKB SDK (like `@ckb-ccc/core`). The host would then send the unsigned transaction to the ESP32 for signing.
    *   **Fiber Network Node (FNN) RPC calls:** All FNN RPC methods such as `open_channel`, `send_payment`, `list_channels`, `new_invoice`, etc., can be executed on a remote FNN instance (e.g., on `ckbnode` at 192.168.68.87). The ESP32 would only be responsible for providing the necessary signatures when prompted by the remote FNN.
    *   **Off-chain message construction and relaying:** The construction of Fiber off-chain payment messages and their relaying through the Fiber network can be managed by the remote FNN.
    *   **CKB L1 state verification:** Querying the CKB blockchain for transaction confirmations, cell states, or UTXO balances can be delegated to a CKB full node or light client running on the host.

### 6. Verdict: is "signer only" sufficient for a self-contained FiberQuest device, or do you need a light client to verify channel state independently?

The verdict depends on the definition of "self-contained" and the acceptable level of trust.

*   **"Signer Only" Architecture:**
    *   **Sufficiency:** This architecture is *sufficient* for a device that can initiate and participate in Fiber payments, provided it *trusts* a remote Fiber Network Node (FNN) and CKB node (e.g., our `ckbnode` at 192.168.68.87) to accurately report channel state, transaction confirmations, and manage the off-chain payment process. The ESP32-P4 acts as a secure hardware wallet for Fiber, signing critical operations.
    *   **Pros:** Minimal resource requirements on the ESP32-P4, making it highly feasible. Only requires a `secp256k1` implementation and communication capabilities.
    *   **Cons:** The device is not truly "self-contained" in terms of independent verification. It cannot independently confirm if a channel open/close transaction has been successfully mined on CKB L1, or if the reported off-chain channel state and balances are accurate. It relies entirely on the trusted remote node for this information.

*   **"Light Client + Signer" Architecture:**
    *   **Necessity for Independent Verification:** To be truly "self-contained" and verify channel state *independently*, the ESP32-P4 would *need* to run a CKB light client. This light client would allow the device to:
        *   Verify the confirmation of CKB L1 transactions that open or close Fiber channels.
        *   Independently check the validity of its own UTXOs on CKB L1, which are used to fund channels.
        *   Potentially verify the L1 anchors of the Fiber channel, providing a trustless foundation for the off-chain state managed by the FNN.
    *   **Pros:** Enhanced security and autonomy. Reduces reliance on a trusted third party for critical state verification, aligning better with the spirit of decentralization.
    *   **Cons:** Significantly higher resource requirements (binary size, RAM, CPU) for the ESP32-P4, as it would need to run both a CKB light client and the signing logic. Based on the lack of specific resource data in the provided content, the feasibility of running a Rust-based CKB light client on an ESP32-P4 is uncertain and likely challenging.

**Verdict:** For a "self-contained FiberQuest device" that prioritizes *independent verification* of its on-chain state, a **"Light Client + Signer"** architecture is necessary. However, given the current lack of information regarding the resource footprint of Rust CKB light clients and FNN on ESP32-P4, and the inherent resource constraints of embedded systems, the **"Signer Only"** approach is likely more practical and feasible for the initial FiberQuest stretch goal, accepting the trade-off of relying on a trusted remote node for state verification. If the goal is simply to trigger payments from the ESP32 without human intervention, and the remote `ckbnode` is considered trusted infrastructure, then "Signer Only" is sufficient.

### Gaps / Follow-up

1.  **`ckb-light-esp` Project Details:** The `ckb-light-esp` README was inaccessible. Retrieving this documentation is crucial to understand its existing capabilities, CKB operations supported, and secp256k1 signing functionality on ESP32.
2.  **Resource Benchmarks for Rust CKB Light Client/FNN on ESP32-P4:** Obtain specific binary size, RAM usage (static and dynamic), and CPU performance benchmarks for a Rust CKB light client and the FNN when cross-compiled for the ESP32-P4's RISC-V architecture. This is critical for assessing the feasibility of the "Light Client + Signer" architecture.
3.  **`secp256k1` Library for ESP32:** Investigate existing `secp256k1` implementations or wrappers specifically optimized for ESP32 (e.g., within ESP-IDF's mbedTLS component, if available, or other community projects) and gather their memory footprint details. The `mbedtls` README was also inaccessible.
4.  **Rust Embedded Ecosystem for CKB:** Research the current state of Rust support for CKB-related libraries (e.g., CKB transaction building, RPC clients) within the embedded Rust ecosystem, specifically targeting RISC-V microcontrollers like the ESP32-P4.

### Relevant Code/API Snippets

*   **Fiber Network Node (FNN) Build Command:**
    ```
    cargo build --release
    ```
    (From `nervosnetwork/fiber/main/README.md`, indicating standard Rust compilation)

*   **FNN Private Key Management:**
    ```
    mkdir ckb
    ckb-cli account export --lock-arg --extended-privkey-path ./ckb/exported-key
    head -n 1 ./ckb/exported-key > ./ckb/key
    rm ./ckb/exported-key
    ```
    (From `nervosnetwork/fiber/main/README.md`, showing FNN uses a `ckb/key` file for its built-in wallet)

*   **FNN Storage Removal for Upgrades:**
    ```
    rm -rf /folder-to/my-fnn/fiber/store
    ```
    (From `nervosnetwork/fiber/main/README.md`, indicating FNN persists channel data in a `fiber/store` folder)

*   **`libsecp256k1` Features:**
    *   "Suitable for embedded systems."
    *   "No runtime heap allocation."
    (From `bitcoin/secp256k1/master/README.md`, highlighting its suitability for resource-constrained environments)