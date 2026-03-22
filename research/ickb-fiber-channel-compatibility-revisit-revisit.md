# Research: ickb-fiber-channel-compatibility-revisit-revisit

**Date:** 2026-03-22  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** 

---

Date: 2026-03-22

## Summary

This research focuses on the technical details and compatibility aspects of the Nervos Fiber payment channel network, specifically within the context of Wyltek Industries' projects. Fiber is a CKB Layer 1 payment channel solution designed for fast, low-fee transactions of CKB and UDTs, similar to Bitcoin's Lightning Network. It operates off-chain for payments, with channels opened and closed via on-chain CKB transactions. A key limitation is its inability to store arbitrary data or files. Wyltek Industries currently operates two Fiber nodes and plans to integrate Fiber into the FiberQuest hackathon project for micropayments.

## 1. What are the core technical details of this topic?

Fiber is a payment channel network built on Nervos CKB Layer 1. Its core technical details include:
*   **Purpose**: Routes payments (CKB, UDTs) off-chain, similar to Bitcoin's Lightning Network.
*   **Channel Lifecycle**: Channels are opened and closed via CKB on-chain transactions. All intermediate payments occur off-chain.
*   **Transaction Characteristics**: Offers low latency (~20ms) and minimal fees (~0.00000001 cent).
*   **Payment Mechanism**: Utilizes PTLCs (Point Time-Locked Contracts), distinct from HTLCs (Hash Time-Locked Contracts) used in some other payment networks.
*   **Interoperability**: Supports BTC Lightning interop.
*   **Data Storage**: Fiber **CANNOT store arbitrary data or files**. It is strictly for payment routing.
*   **Historical Note**: `nervosnetwork/fiber-archive` is an old, abandoned (2021) project and is not a storage protocol.
*   **Wyltek Infrastructure**: Wyltek Industries runs two Fiber nodes: `ckbnode` (mainnet, RPC 127.0.0.1:8227) and `N100` (which requires funding).
*   **FiberQuest Integration**: Fiber is planned for use in the FiberQuest project to facilitate micropayments triggered by in-game events. Channels will open at game start and settle at game end.

## 2. What specific APIs, protocols, or interfaces are available?

Based on the provided content, the following APIs and protocols are available or implied:
*   **FNN Binary RPC Methods**: Fiber exposes a set of binary RPC methods for channel management and payments. Specific methods mentioned include:
    *   `open_channel`
    *   `send_payment`
    *   `list_channels`
    *   `new_invoice`
    *   `get_invoice`
    *   (and others, implied by "etc.")
*   **Rust RPC Source**: The core Fiber implementation is in Rust, and its RPC interface is the primary means of interaction.
*   **BTC Lightning Interop**: Fiber supports interoperability with Bitcoin's Lightning Network, implying a defined protocol or bridging mechanism for cross-network compatibility, though specific details are not provided.

## 3. What are the known limitations or failure modes?

The provided content highlights several limitations and potential failure modes:
*   **No Arbitrary Data Storage**: Fiber's primary limitation is that it **CANNOT store arbitrary data or files**. This means it is unsuitable for use cases requiring on-chain file storage (e.g., CKBFS).
*   **Abandoned Archive**: The `nervosnetwork/fiber-archive` project is explicitly stated as "OLD ABANDONED (2021)" and "NOT a storage protocol," indicating a past effort that is no longer maintained or relevant.
*   **Node Funding Requirement**: One of Wyltek's Fiber nodes, `N100` (192.168.68.91), "needs funding" to be fully operational.
*   **Lack of Official Node.js Client Library**: For projects like FiberQuest, a significant "key gap" is that "no official Node.js Fiber client library exists." This necessitates building a custom client from the Rust RPC source, which could introduce development overhead and potential compatibility challenges.

## 4. Are there working examples or reference implementations?

Yes, working examples and reference implementations are mentioned:
*   **Fiber Nodes**: Wyltek Industries operates two working Fiber nodes:
    *   `ckbnode` (192.168.68.87): A mainnet CKB full node that also runs a funded Fiber node (RPC 127.0.0.1:8227).
    *   `N100` (192.168.68.91): Runs a Fiber node, though it "needs funding" to be fully active.
*   **`nervosnetwork/fiber`**: This GitHub repository is the source for the Fiber network, implying it contains the primary reference implementation of the protocol in Rust.
*   **FiberQuest (Planned Integration)**: While not yet fully implemented, the FiberQuest hackathon project outlines a concrete application of Fiber for micropayments in an emulator context. This project will involve a Node.js sidecar interacting with Fiber, demonstrating a planned use case.

## Gaps / Follow-up

*   **Specifics of BTC Lightning Interop**: The content states "BTC Lightning interop" but provides no technical details on how this is achieved, what protocols are used, or any compatibility considerations for this feature.
*   **Detailed Rust RPC Documentation**: While "Rust RPC source" is mentioned, no specific documentation, API schemas, or examples for interacting with the Fiber RPC are provided. This would be crucial for building the Node.js client for FiberQuest.
*   **UDT Compatibility Details**: Fiber supports UDTs, but the specifics of how UDTs are handled within channels, any particular compatibility requirements for different UDTs, or how they are represented in the RPC are not detailed.
*   **Channel State Management**: Beyond opening and closing, deeper technical details on how Fiber manages channel state, handles disputes, or ensures security (e.g., through PTLCs) are not elaborated upon.
*   **"ickb-fiber-channel-compatibility" Specifics**: The prompt's research topic implies a focus on "channel compatibility." While general Fiber characteristics are covered, specific compatibility challenges *between different Fiber implementations, versions, or client libraries* (beyond the lack of a Node.js client) are not addressed in the provided text.

## Relevant Code/API Snippets

The following are specific API method names mentioned in the content:

```
// FNN binary RPC methods
open_channel
send_payment
list_channels
new_invoice
get_invoice
```