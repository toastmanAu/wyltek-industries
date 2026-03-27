# Research: wydid-esp32-component-secp256k1-signing

**Date:** 2026-03-22  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://raw.githubusercontent.com/nervosnetwork/rfcs/master/rfcs/0036-did-ckb/0036-did-ckb.md, https://raw.githubusercontent.com/toastmanAu/wyltek-embedded-builder/main/src/auth/WyAuth.h, https://raw.githubusercontent.com/toastmanAu/ckb-light-esp/main/components/ckb_transport/include/ckb_molecule.h, https://raw.githubusercontent.com/toastmanAu/kernel-extensions/main/MEMORY.md, https://raw.githubusercontent.com/nervosnetwork/fiber/main/docs/channel.md

---

Date: 2026-03-22

## Summary

This research focuses on designing an ESP32-native `WyDID.h` component for on-device signing and DID identity on the CKB blockchain. While the ESP32-P4 is confirmed to support secp256k1 signing and a CKB light client, the specific details regarding the `did:ckb` cell structure, derivation from public keys, and the exact signing flow for DID proofs are not available in the provided content. The existing `wyltek-embedded-builder` provides a foundation, and the `@ckb-ccc/core` SDK is the established method for CKB transaction building. Key use cases include autonomous Fiber channel opening and smart contract authentication for IoT devices.

## Questions to Answer

### 1. What is the DID cell structure and what data must be in the args?
The provided content, including the link to `nervosnetwork/rfcs/master/rfcs/0036-did-ckb/0036-did-ckb.md`, was not accessible (`FETCH ERROR: HTTP Error 404: Not Found`). Therefore, the specific DID cell structure and the required data within its arguments cannot be determined from the provided content.

### 2. How do you derive a did:ckb identifier from a secp256k1 pubkey?
The provided content does not detail the specific derivation process for a `did:ckb` identifier from a secp256k1 public key. The RFC link that would likely contain this information was not accessible.

### 3. What is the signing flow (message format, hashing, signature encoding) for DID proofs?
While `secp256k1 signing confirmed working` on ESP32-P4 is stated in the Project Ground Truth, the specific message format, hashing algorithm, and signature encoding required for *DID proofs* are not described in the provided content. The `wyltek-embedded-builder` has an `src/auth/` directory, suggesting general authentication capabilities, but the specifics for DID proofs are missing.

### 4. How does a smart contract verify a DID signature in a witness?
The provided content mentions CKB Layer 1's cell model (capacity, lock script, optional type, data) and lists "smart contract auth from IoT" as a use case for DID authentication. However, it does not provide details on the specific mechanisms or CKB script logic a smart contract would use to verify a DID signature embedded within a transaction witness.

### 5. Can an ESP32 sign a transaction witness that includes a DID proof?
Yes, an ESP32 can perform secp256k1 signing for transaction witnesses. The Project Ground Truth explicitly states: "secp256k1 signing confirmed working (used in DOB minting flow)" on the ESP32-P4. Since the DOB minting flow involves CKB transactions, this confirms the ESP32's capability to sign transaction witnesses. The ability to include a *DID proof* specifically depends on the defined structure of such a proof within a witness, which is not detailed in the provided content, but the underlying signing capability on the ESP32 exists.

### 6. What is the integration point with @ckb-ccc/core for transaction signing?
`@ckb-ccc/core` is identified as the "primary JS SDK for CKB transaction building." For transaction signing, the integration point would involve the ESP32 generating the secp256k1 signature for a transaction witness (or a specific part of it, like a DID proof). This signature would then be provided to the `@ckb-ccc/core` SDK (or a higher-level component built upon it, such as `@ckb-ccc/connector-react` used in the `ckb-dob-minter`) to be embedded into the transaction's witness before the transaction is finalized and broadcast. The ESP32 would act as the "signer" component, providing the raw signature data.

### 7. What are 2-3 real use cases where an ESP32 with DID auth would help (e.g., Fiber channel open without external signer)?
Based on the research goal and Project Ground Truth, the following use cases are highly relevant:

1.  **Autonomous signer for Fiber channel open:** An ESP32 device could independently sign the necessary CKB Layer 1 transactions to open and close Fiber payment channels, eliminating the need for an external signer or manual intervention. This is explicitly mentioned in the FiberQuest project description.
2.  **Smart contract authentication from IoT devices:** An ESP32 could use its on-device DID to securely authenticate itself to CKB smart contracts. This would enable secure, verifiable interactions and control of on-chain assets or logic directly from IoT devices without relying on centralized authorities. This is also explicitly mentioned in the research goal.
3.  **Secure device identity and attestation:** The DID could serve as a unique, verifiable on-chain identity for the ESP32 device itself. This could be used for secure attestation of device state, sensor data, or proof of origin for data submitted to the blockchain, enhancing trust in IoT data streams.

### 8. What gaps exist between current WyAuth.h and a full DID signing component?
The contents of `WyAuth.h` were not accessible (`FETCH ERROR: HTTP Error 404: Not Found`). Therefore, a direct comparison to identify specific gaps is not possible.

However, based on the requirements for a full DID signing component as outlined in the research goal, and assuming `WyAuth.h` primarily handles general secp256k1 signing and possibly key management, the following gaps would likely exist:

*   **DID Cell Structure Implementation:** The component would need to implement the specific CKB cell structure for `did:ckb` identities, including how to construct and parse these cells.
*   **DID Derivation Logic:** Code to derive a `did:ckb` identifier from an ESP32's secp256k1 public key would be required.
*   **DID Proof Message Formatting:** Specific logic for formatting messages that are to be signed as DID proofs, adhering to the `did:ckb` standard's requirements for hashing and data serialization.
*   **Integration with CKB Light Client for DID Resolution:** While `ckb-light-esp` exists, the DID component would need specific functions to interact with it for resolving DIDs on-chain or fetching relevant DID-related cell data.
*   **Secure DID Key Management:** While `WyAuth.h` might handle general key management, specific considerations for DID private key storage, rotation, and recovery on an ESP32 (e.g., using secure element, NVS, or other hardware-backed storage) would be critical.

## Gaps / Follow-up

The primary gap is the lack of specific information regarding the `did:ckb` standard. All links to the RFC and internal `WyAuth.h` failed to fetch, preventing detailed answers for questions 1, 2, 3, 4, and 8.

**Follow-up actions:**
1.  Obtain the content of `nervosnetwork/rfcs/master/rfcs/0036-did-ckb/0036-did-ckb.md` to understand the `did:ckb` cell structure, derivation, and proof formats.
2.  Obtain the content of `toastmanAu/wyltek-embedded-builder/main/src/auth/WyAuth.h` to assess its current capabilities and identify precise gaps for DID integration.
3.  Investigate existing CKB smart contract patterns for signature verification to understand how a DID signature in a witness would be validated on-chain.

## Relevant Code/API Snippets

Due to the `FETCH ERROR: HTTP Error 404: Not Found` for all provided source content, no specific code or API snippets can be cited. The analysis relies solely on the high-level descriptions in the "Project Ground Truth."