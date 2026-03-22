# Research: ickb-fiber-channel-compatibility-revisit

**Date:** 2026-03-22  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** 

---

Date: 2026-03-22

## Summary

Fiber is a payment channel network built on CKB Layer 1, designed for fast and cheap off-chain CKB and UDT payments, similar to Bitcoin's Lightning Network. Channel opening and closing are CKB L1 on-chain transactions, while intermediate payments are off-chain. It offers low latency (~20ms) and negligible fees, utilizing PTLCs and aiming for BTC Lightning interop. Fiber cannot store arbitrary data or files. Wyltek Industries operates two Fiber nodes, and the FiberQuest hackathon project is leveraging Fiber for micropayments triggered by game events. A key current limitation is the absence of an official Node.js Fiber client library, necessitating development from Rust RPC sources.

## 1. What are the core technical details of this topic?

Fiber is a payment channel network operating on the Nervos CKB Layer 1 blockchain. Its core function is to facilitate off-chain payments of CKB and User Defined Tokens (UDTs) with high speed and low cost.

*   **Mechanism**: Channels are opened and closed via CKB on-chain transactions. All payment routing within an open channel occurs off-chain.
*   **Purpose**: Routes payments; it is explicitly stated that Fiber **CANNOT store arbitrary data or files**.
*   **Performance**: Offers approximately 20ms latency and fees around 0.00000001 cent per transaction.
*   **Cryptographic Primitives**: Utilizes PTLCs (Point Time-Locked Contracts) instead of HTLCs (Hash Time-Locked Contracts).
*   **Interoperability**: Aims for Bitcoin Lightning Network interop.
*   **Status**: The `nervosnetwork/fiber-archive` repository is old and abandoned (2021) and is not a storage protocol.
*   **Infrastructure**: Wyltek Industries runs two Fiber nodes: `ckbnode` (mainnet, RPC 127.0.0.1:8227) which is funded and running, and `N100` (192.168.68.91) which needs funding.
*   **Application**: The FiberQuest hackathon project plans to use Fiber for micropayments. In this setup, game events (e.g., health damage, score, KO) trigger payments via Fiber channels. Channels are opened at the start of a game and settled at the end.
*   **Development Gap**: There is no official Node.js Fiber client library, requiring development from Rust RPC source.
*   **Embedded Target**: For the ESP32-P4, a stretch goal for FiberQuest involves running an emulator (core 0), the CKB light client (`ckb-light-esp`), WiFi, and `secp256k1` signing (core 1) concurrently, raising a CPU headroom question.

## 2. What specific APIs, protocols, or interfaces are available?

The primary interface mentioned for Fiber is a set of **FNN binary RPC methods**.

*   **FNN Binary RPC Methods**:
    *   `open_channel`
    *   `send_payment`
    *   `list_channels`
    *   `new_invoice`
    *   `get_invoice`
    *   (and others, implied by "etc.")

*   **Protocol**: Fiber operates as a payment channel network protocol on top of CKB L1. The specific off-chain communication protocol details are not provided in the given content, beyond the RPC methods for interaction.
*   **Client Libraries**: A significant gap is noted: "no official Node.js Fiber client library exists — must build from Rust RPC source." This implies that the existing RPC interface is likely exposed by the Rust-based Fiber node implementation.
*   **Embedded Interaction**: For the FiberQuest project, a Node.js sidecar is planned to interact with Fiber for micropayments, which would then communicate with the ESP32-P4. This suggests the direct interaction from an embedded device with Fiber is not directly addressed, but rather through an intermediary.

## 3. What are the known limitations or failure modes?

Based on the provided content, the known limitations and potential failure modes for Fiber and its integration are:

*   **Data Storage Limitation**: Fiber **CANNOT store arbitrary data or files**. It is strictly for routing payments.
*   **Abandoned Project**: The `nervosnetwork/fiber-archive` is explicitly stated as "OLD ABANDONED (2021) — NOT a storage protocol." This indicates a past attempt or related project that is no longer viable.
*   **Operational Funding**: The `N100` Fiber node "needs funding," which is an operational limitation preventing its full utilization.
*   **Lack of Client Library**: A critical development limitation is the "key gap: no official Node.js Fiber client library exists — must build from Rust RPC source." This increases development effort and complexity for Node.js-based applications.
*   **On-chain Channel Management**: While off-chain payments are fast and cheap, Fiber channels open/close via CKB on-chain transactions. This means channel setup and teardown incur CKB L1 transaction fees and latency.
*   **ESP32-P4 CPU Headroom**: For the FiberQuest stretch goal, there's an "open FiberQuest question: CPU headroom for emulator (core 0) + light client + WiFi + signing (core 1)" on the ESP32-P4. This indicates a potential performance limitation or failure mode if the combined workload exceeds the hardware's capabilities.

## 4. Are there working examples or reference implementations?

Yes, there are working examples and reference implementations at the node level and planned application level:

*   **Fiber Nodes**: Wyltek Industries operates two Fiber nodes:
    *   `ckbnode` (192.168.68.87): A CKB mainnet full node that also runs a Fiber node (funded, running, RPC 127.0.0.1:8227).
    *   `N100` (192.168.68.91): Runs a CKB + testnet light clients and a Fiber node (needs funding).
*   **Application (Planned)**: The FiberQuest hackathon project is a planned application that will utilize Fiber for micropayments. While the project is "private until comp starts March 11," its description outlines a concrete use case: RetroArch emulator → UDP RAM polling → Node.js sidecar → Fiber micropayments. This will serve as a working example of Fiber integration once developed.
*   **RPC Interface**: The existence of "FNN binary RPC methods" implies a working server-side implementation of the Fiber protocol that exposes these methods.

No specific client-side code examples or SDKs (beyond the mention of needing to build one for Node.js from Rust RPC source) are provided in the content.

## Gaps / Follow-up

1.  **"ickb" Definition**: The term "ickb" in "ickb-fiber-channel-compatibility" is not explicitly defined or detailed in the provided content. While `ckb-light-esp` is an embedded CKB client, the specific "ickb" component and its direct compatibility considerations with Fiber channels are not elaborated. Further clarification on what "ickb" specifically refers to in this context would be beneficial.
2.  **Detailed Fiber Protocol Specification**: While RPC methods are listed, a detailed specification or documentation for the Fiber protocol, including message formats, state transitions, and error handling for off-chain interactions, is not provided.
3.  **Embedded C/ESP-IDF Fiber Client**: The content mentions a Node.js sidecar for FiberQuest to interact with Fiber. There is no information on the feasibility or implementation details of a direct Fiber client library or integration within the `wyltek-embedded-builder` C framework for ESP32.
4.  **Rust RPC Source Details**: The instruction to "build from Rust RPC source" for a Node.js client implies the existence of this source, but its location or specific modules/crates to interact with are not provided.
5.  **FiberQuest Implementation Details**: While FiberQuest is described, specific code examples or architectural diagrams for its Fiber integration are not available as it's a private, in-progress project.

## Relevant Code/API Snippets

*   **FNN Binary RPC Methods**:
    *   `open_channel`
    *   `send_payment`
    *   `list_channels`
    *   `new_invoice`
    *   `get_invoice`
    *   (and others)

*   **Existing Embedded CKB Client**:
    *   `ckb-light-esp` (github.com/toastmanAu/ckb-light-esp): Full CKB light client protocol stack running on ESP32 (C/ESP-IDF).

*   **Embedded CKB Framework**:
    *   `wyltek-embedded-builder` (private, github.com/toastmanAu/wyltek-embedded-builder): C framework for ESP32 embedded CKB/blockchain apps.

*   **Signing on ESP32-P4**:
    *   `secp256k1` signing confirmed working on ESP32-P4 (used in DOB minting flow).

---

## ⚠️ Quality Note

Findings are thin — seeds did not return sufficient content to answer the research questions. This task has been automatically re-queued with a request for better seeds.

**Thin phrase count:** 7  
**Content length:** 8234 chars
