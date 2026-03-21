# Research: fiberquest-micropayment-integration-path

**Date:** 2026-03-22  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://raw.githubusercontent.com/nervosnetwork/fiber/main/README.md, https://raw.githubusercontent.com/toastmanAu/ckb-light-esp/main/README.md, https://github.com/lightning-rfc/lightning-rfc/blob/master/00-introduction.md, https://docs.starknet.io/architecture-and-concepts/L2-state/transaction-lifecycle

---

Date: 2026-03-22

## Summary

The FiberQuest project aims to integrate Fiber micropayments into a gaming architecture, leveraging the ESP32-P4 as a client. This integration involves triggering payments based on in-game events, managing Fiber channel lifecycles, and ensuring robust connectivity and user experience. Given the nature of micropayments and the embedded hardware target, a per-game-session channel model is recommended for simplicity and resilience to node upgrades. While Fiber offers extremely low off-chain fees and low latency, on-chain channel operations will incur standard CKB L1 fees. The system must gracefully handle WiFi disconnections through mechanisms like retry queues to maintain payment reliability and a smooth user experience. Comprehensive telemetry will be crucial for understanding the economic performance and user engagement with the micropayment system.

## Questions to Answer

### 1. Should we open one long-lived Fiber channel per user (persistent) or per-game-session?

Based on the project ground truth and Fiber documentation, opening a Fiber channel **per-game-session** is the recommended approach for FiberQuest.

**Reasoning:**
*   **FiberQuest Specification:** The project description explicitly states, "Channels open at game start, settle at game end." This directly aligns with a per-game-session model.
*   **Fiber Node Stability:** The `nervosnetwork/fiber` README warns about protocol and storage format changes during development: "We strongly recommend you to close the channel before upgrading the node, otherwise, you may lose channel data and funds!" While `fnn-migrate` exists for manual migration, a per-session model minimizes the risk of fund loss and operational overhead for users during node upgrades or development iterations.
*   **Micropayment Nature:** Fiber is designed for "extremely low-cost micropayments" and "low latency" (e.g., 20ms). The overhead of opening and closing a channel per session, while incurring on-chain fees, is a one-time cost per session, which is acceptable for a gaming context where sessions have a defined start and end.
*   **Resource Management:** For an ESP32-P4 client, managing the state of a single, active channel per session is simpler than maintaining multiple long-lived channels or complex state recovery mechanisms across potentially long periods of inactivity.

**Channel Funding:** The FiberQuest description implies that channels are funded at game start. This would typically involve the user (or the game operator on behalf of the user) initiating an on-chain CKB transaction to open the channel and deposit funds. The `nervosnetwork/fiber` documentation confirms this by stating, "FNN has the built-in wallet functionality to sign funding transactions."

### 2. What is the minimum viable payment amount in CKB, and what are testnet fees for channel operations?

The provided content **does not explicitly state** the minimum viable payment amount in CKB for off-chain Fiber payments or the exact CKB fees for channel operations (opening/closing) on testnet.

**Inferences from provided content:**
*   **Off-chain Payment Fees:** The `nervosnetwork/fiber` README highlights "Extremely low-cost micropayments, e.g. 0.0001 cent payment with 0.00000001 cent fee." This refers to the *off-chain* transaction fee, which is negligible. It does not specify the minimum *amount* of CKB that can be sent in such a payment, only the fee for sending it. Given the "micropayment" nature, the minimum viable amount is expected to be very small, likely down to the smallest unit of CKB (shannons).
*   **On-chain Channel Operation Fees:** Channel opening and closing are CKB Layer 1 on-chain transactions. These transactions will incur standard CKB transaction fees and require a minimum CKB capacity to create and store the channel cells on the CKB blockchain. The exact CKB amount for these operations (e.g., for a simple cell, typically around 61 CKB) is not detailed in the provided Fiber documentation. The `N100` infrastructure fact states it runs a "Fiber node (needs funding)," indicating that on-chain CKB is required to operate a Fiber node and its channels.

To determine the precise minimum CKB payment amount and testnet fees for channel operations, further investigation into CKB L1 transaction costs and Fiber's specific cell structures for channels would be required, beyond the scope of the provided text.

### 3. How does WiFi latency/disconnection affect payment reliability on ESP32?

WiFi latency and disconnection significantly affect payment reliability on the ESP32 for Fiber micropayments.

**Impact of Latency:**
*   Fiber payments are designed for "low latency, e.g. 0.0001 cent payment in your p2p connection latency, e.g. 20ms." This 20ms latency is for the off-chain payment itself, assuming a stable p2p connection between the ESP32 (via its Node.js sidecar) and the Fiber node.
*   Higher WiFi latency would directly increase the time it takes for an off-chain payment to be confirmed between the ESP32 and the Fiber node. While Fiber's internal processing is fast, the network round-trip time is a limiting factor.

**Impact of Disconnection:**
*   **Payment Interruption:** Fiber payments are "only processed by involved peers, no network consensus required." If the ESP32 loses its WiFi connection to the Fiber node, it loses its direct peer-to-peer communication path. This means no new off-chain payments can be initiated or confirmed until the connection is re-established.
*   **Channel State:** While the immediate payment flow is interrupted, the underlying Fiber channel state is maintained by the Fiber node. The `nervosnetwork/fiber` README mentions "Watchtower support," which helps ensure the security of channel funds even if one party goes offline. However, watchtowers primarily protect against malicious behavior during extended offline periods, not facilitate payments during active disconnection.
*   **User Experience:** From the user's perspective, a disconnection would lead to payment failures or delays, potentially disrupting the game experience if payments are tied to critical in-game actions.

In summary, while Fiber is robust against certain forms of peer unreliability (via watchtowers), an active and stable WiFi connection is essential for the ESP32 to reliably send and receive off-chain payments.

### 4. Should the game gracefully handle payment failures (offline play, retry queue)?

**Yes, the game should absolutely gracefully handle payment failures, including implementing mechanisms for offline play and a retry queue.**

**Reasoning:**
*   **Network Instability:** As discussed in Q3, WiFi connections, especially in embedded environments like the ESP32-P4, can be prone to temporary latency spikes or disconnections. Expecting a perfectly stable connection for every micropayment is unrealistic.
*   **User Experience:** Payment failures, if not handled gracefully, can lead to frustration, perceived loss of funds, or interruption of gameplay. A smooth user experience is paramount for adoption.
*   **FiberQuest Context:** The ESP32-P4 is a "stretch goal" for running the emulator, light client, signer, and WiFi concurrently. This implies potential resource contention or performance fluctuations that could indirectly affect network stability or payment processing.
*   **Design for Resilience:**
    *   **Offline Play:** For game events that trigger payments (e.g., achievement unlock, score updates), the game should allow the event to occur and record the payment intent locally on the ESP32. The actual payment can then be deferred. For critical actions like "item purchase" or "tournament entry" that require immediate payment confirmation, offline play might be restricted or require a different in-game currency model.
    *   **Retry Queue:** Implementing a retry queue for failed payments is a standard and effective pattern. When a payment fails due to network issues, it should be added to a queue with relevant metadata (payment amount, recipient, associated game event). The system can then periodically attempt to process payments from this queue when network connectivity is restored. This ensures that payments eventually go through without requiring immediate user intervention.
    *   **User Feedback:** Clear in-game notifications should inform the user about payment status (pending, successful, failed, retrying) to manage expectations.

### 5. What telemetry/analytics will help us understand micropayment economics post-launch?

To understand micropayment economics post-launch, a comprehensive telemetry and analytics strategy should focus on both the on-chain channel lifecycle and the off-chain payment activity, linked to in-game events.

**Key Telemetry/Analytics Points:**

1.  **Channel Lifecycle Metrics:**
    *   **Number of Channels Opened/Closed:** Per user, per game session, per day/week.
    *   **Channel Opening/Closing Success/Failure Rate:** Identify issues with on-chain transactions.
    *   **Average Channel Lifetime:** Duration from open to close.
    *   **Total CKB Capacity Locked:** Sum of CKB deposited into active channels.
    *   **Channel Settlement Reasons:** Track if channels are closed gracefully at game end, due to errors, or manually.
    *   **On-chain Fees Paid:** Total CKB spent on opening and closing channels.

2.  **Off-chain Payment Metrics:**
    *   **Number of Payments Sent/Received:** Per user, per game session, per day/week.
    *   **Payment Success/Failure Rate:** Identify issues with off-chain transactions.
    *   **Average/Median Payment Amount:** In CKB and its USD equivalent.
    *   **Total Payment Volume:** Aggregate CKB transferred via micropayments.
    *   **Off-chain Fees Earned/Paid:** Track fees for facilitating payments (if applicable) or fees paid by the user.
    *   **Payment Latency:** Measure the time from payment initiation on ESP32 to confirmation by the Fiber node.

3.  **Game Event Integration Metrics:**
    *   **Payments per Game Event Type:** E.g., how many payments triggered by "health damage," "score," "KO," "item purchase," "tournament entry."
    *   **Conversion Rates:** E.g., percentage of users who trigger a specific payment event.
    *   **Correlation:** Analyze the relationship between in-game performance/engagement and payment activity.

4.  **User Behavior & Retention:**
    *   **Active Users with Channels:** Number of unique users with active Fiber channels.
    *   **Payment Frequency:** How often users make payments.
    *   **Retention by Payment Activity:** Do users who engage with micropayments show higher retention?

5.  **Error & Performance Monitoring:**
    *   **Network Disconnection Events:** Track frequency and duration of WiFi disconnections on ESP32.
    *   **Payment Retry Queue Performance:** Size of the queue, average time to clear, success rate of retried payments.
    *   **ESP32 Resource Usage:** Monitor CPU, memory, and network usage during payment processing to identify bottlenecks (relevant for the "stretch goal" of running multiple components).

This data can be collected by the Node.js sidecar (which acts as the Fiber client) and potentially the ESP32 itself, then forwarded to a centralized analytics platform.

## Gaps / Follow-Up

1.  **Minimum CKB Payment Amount:** The exact minimum CKB amount that can be sent in an off-chain Fiber micropayment is not specified. This is crucial for precise economic modeling.
2.  **Exact CKB Fees for Channel Operations:** While it's known that on-chain operations incur CKB L1 fees, the precise CKB cost for opening and closing a Fiber channel on testnet (and mainnet) is not detailed. This includes both transaction fees and the minimum capacity required for the channel cells.
3.  **Node.js Fiber Client Library Details:** The project ground truth explicitly states, "Key gap: no official Node.js Fiber client library exists — must build from Rust RPC source." The specifics of this custom client (e.g., how it wraps the Rust RPC, its API design, error handling) are not provided. This will be a critical component for the Node.js sidecar.
4.  **Watchtower Integration for ESP32:** While Fiber supports watchtowers, the documentation doesn't detail how the ESP32 client (or its Node.js sidecar) would interact with or leverage watchtowers to enhance security and resilience during periods of disconnection.
5.  **CKB L1 Transaction Structure for Channels:** Understanding the specific cell structure and script requirements for Fiber channels on CKB L1 would provide deeper insight into the on-chain costs and security model.

## Relevant Code/API Snippets

The `nervosnetwork/fiber` README provides several RPC methods and commands relevant to Fiber node operation and channel management:

**Fiber Network Node (FNN) RPC Methods (from `crates/fiber-lib/src/rpc/README.md`):**
*   `open_channel`: Used to initiate the opening of a payment channel.
*   `send_payment`: Used to send an off-chain payment through an open channel.
*   `list_channels`: Used to retrieve information about active channels.
*   `new_invoice`: Used to generate a payment invoice.
*   `get_invoice`: Used to retrieve details of an existing invoice.
*   `shutdown_channel`: Used to gracefully close a payment channel.

**FNN Binary Commands:**
*   **Building:** `cargo build --release`
*   **Starting Node:** `FIBER_SECRET_KEY_PASSWORD='YOUR_PASSWORD' RUST_LOG='info' ./fnn -c config.yml -d .`
*   **Key Export (for wallet setup):**
    ```bash
    mkdir ckb
    ckb-cli account export --lock-arg --extended-privkey-path ./ckb/exported-key
    head -n 1 ./ckb/exported-key > ./ckb/key
    rm ./ckb/exported-key
    ```
*   **Storage Migration (for upgrades):**
    ```bash
    fnn-migrate -p /folder-to/my-fnn/fiber/store
    ```

These RPC methods would be the primary interface for the custom Node.js Fiber client library that the FiberQuest sidecar will implement to interact with the Fiber node.