# Research: sphincs-plus-quantum-purse-esp32-wallet-community-followup-1774072972

**Date:** 2026-03-22  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://github.com/quantumpurse/quantum-purse, https://raw.githubusercontent.com/quantumpurse/quantum-purse/main/README.md

---

Date: 2026-03-22

## Summary

The community comment successfully corrected a "FETCH ERROR" by providing the accurate GitHub repository for "Quantum Purse" (`quantumpurse/quantum-purse`). This repository reveals Quantum Purse as a lightweight, quantum-safe desktop and web wallet for CKB, utilizing FIPS205 (SPHINCS+) signatures and Cryptape's quantum-resistant lock script. It operates as a true light client, running a JavaScript-based CKB light client node and integrating a forked version of the CKB CCC SDK. While the provided content details a desktop/web application, it does not directly describe an "ESP32 wallet," leaving a gap in how its quantum-safe features would translate to our embedded hardware.

## 1. What does the community comment add to the existing findings?

The community comment is crucial as it rectifies a previous "FETCH ERROR" and provides the correct, official GitHub repository for the "Quantum Purse" project: `https://github.com/quantumpurse/quantum-purse`. This new link grants full access to the project's `README.md`, which was previously inaccessible.

The `README.md` adds the following key findings:
*   **Project Identity:** Quantum Purse is a lightweight, quantum-safe desktop wallet designed for the CKB blockchain. It also has a demo website (`https://quantum-purse.vercel.app/`) that can run on mobiles.
*   **Quantum Safety:** It explicitly uses FIPS205 (SPHINCS+) as its signature type and supports all 12 NIST-approved SPHINCS+ parameter sets (Sha2/Shake, 128/192/256 bit security, s/f optimization).
*   **Lock Script:** It leverages the `quantum-resistant-lock-script` developed by Cryptape.
*   **Minimum CKB:** Due to the larger size of the quantum-resistant lock script, a minimum of 73 CKB is required per quantum-safe cell.
*   **Client Type:** Quantum Purse functions as a "Fly Client (CKB light client js)," running its own CKB light client node (`https://github.com/nervosnetwork/ckb-light-client`) and connecting directly to the CKB network without intermediate RPC endpoints.
*   **SDK Integration:** It integrates the CKB CCC SDK (`https://github.com/ckb-devrel/ccc`) for blockchain client connection and transaction building, though it currently uses a temporary fork named `ckb-ccc-core-light-client-js-patch` for light-client-js compatibility.
*   **Availability:** Pre-built binaries are available for Windows, macOS, and Linux, and it can be built from source requiring Node >=22.12.

## 2. Are the suggested resources accurate and relevant?

Yes, the suggested resource `https://github.com/quantumpurse/quantum-purse` is **accurate and highly relevant**.

*   **Accuracy:** The repository is clearly labeled as "A CKB quantum-safe & lightweight wallet" and its `README.md` provides comprehensive details consistent with the project's stated purpose. It is the official source for the Quantum Purse project.
*   **Relevance:** It directly addresses the "Quantum Purse" aspect of the research topic, providing the previously missing foundational information about its implementation, security features (SPHINCS+), CKB integration, and operational model (light client). This content is essential for understanding the project's technical specifications and how it achieves quantum resistance on CKB.

## Gaps / Follow-up

1.  **ESP32 Integration:** The provided content describes Quantum Purse as a desktop/web application. It does not detail how its quantum-safe wallet functionality (SPHINCS+ signing, quantum-resistant lock script) would be implemented directly on an ESP32. While we have `ckb-light-esp` running a CKB light client in C/ESP-IDF on ESP32-P4 and `wyltek-embedded-builder` for CKB apps, the specific steps for integrating SPHINCS+ signing and the `quantum-resistant-lock-script` on ESP32 hardware are not covered.
2.  **SPHINCS+ on ESP32:** While `secp256k1` signing is confirmed working on ESP32-P4, the performance and memory implications of implementing FIPS205 (SPHINCS+) on ESP32, especially for key generation and signing (which the README notes "takes longer to execute" even on PC), would require further investigation.
3.  **Quantum Purse Key Vault:** The `README.md` references `https://github.com/tea2x/quantum-purse-key-vault` for details on Key Derivation & Mnemonic Backup Format. This related project could offer deeper insights into the cryptographic primitives used, which might be relevant for an embedded implementation.
4.  **Quantum-Resistant Lock Script Analysis:** A detailed analysis of the `https://github.com/cryptape/quantum-resistant-lock-script` would be necessary to understand its exact CKB cell structure, script logic, and how it interacts with SPHINCS+ signatures, to enable its use in an ESP32 context.
5.  **CCC Fork Compatibility:** Quantum Purse uses a forked `ckb-ccc-core-light-client-js-patch`. If Wyltek Industries were to interact with Quantum Purse's specific transaction formats or light client, understanding the differences in this fork compared to the official `@ckb-ccc/core` would be important.

## Relevant Code/API Snippets

*   **Signature Type:** `FIPS205 (SPHINCS+)`
*   **Quantum-Resistant Lock Script:** Reference to `https://github.com/cryptape/quantum-resistant-lock-script`
*   **CKB Light Client (JS):** `https://github.com/nervosnetwork/ckb-light-client`
*   **CCC SDK Fork:** `ckb-ccc-core-light-client-js-patch` (npm package mentioned)