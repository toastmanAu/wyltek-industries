# Research: fiber-network-deep-dive

**Date:** 2026-03-05  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://raw.githubusercontent.com/nervosnetwork/fiber/main/README.md, https://raw.githubusercontent.com/nervosnetwork/fiber/main/docs/en/get-started.md, https://raw.githubusercontent.com/nervosnetwork/fiber/main/docs/en/architecture.md

---

## Research Note: Fiber Network Deep Dive

**Date:** 2026-03-05

### Summary
Fiber Network is a peer-to-peer payment and swap network, akin to Lightning Network, designed for low-cost, instant transactions across multiple assets including CKB UDTs and RGB++ assets. It supports multi-hop payments, cross-network interoperability with Bitcoin's Lightning Network, and watchtower functionality. The network leverages advanced cryptographic techniques, specifically PTLCs instead of HTLCs, for enhanced security and privacy. While still under active development, core functionalities like channel management, payments, and peer connections are implemented, enabling an AI agent to perform automated micropayments, asset swaps, and act as a routing node.

### Channel Open/Close/Update RPC API
Fiber Network Node (FNN) provides RPC capabilities for channel management.
*   **Opening Channels:** The `README.md` lists "Creating ... fiber channel" as a completed feature (`[x]` in the TODO list). While a specific RPC call for opening is not directly linked in the provided text, its completion status implies such an API exists.
*   **Closing Channels:** An RPC for closing channels is explicitly mentioned and linked: `channel-shutdown_channel` via `crates/fiber-lib/src/rpc/README.md`.
*   **Listing Channels:** An RPC for listing existing channels is also explicitly mentioned and linked: `channel-list_channels` via `crates/fiber-lib/src/rpc/README.md`.
*   **Updating Channels:** The provided content does not mention an RPC API for updating existing channels.

### Invoice Creation + Payment Flow
*   **Payments:** Payments over a fiber channel are a completed feature (`[x]` in the TODO list), facilitated via `fiber-scripts`.
*   **Invoice Protocol:** Fiber Network has a defined `Invoice Protocol` as indicated by the link to `./docs/specs/payment-invoice.md`. This suggests that agents can create and process invoices to initiate and receive payments. The specific RPCs for invoice creation and payment initiation are not detailed in the provided `README.md`, but the existence of the protocol and completed payment feature implies their availability.

### HTLC Mechanics
Fiber Network explicitly states it does **not** use HTLCs (Hashed Timelock Contracts). Instead, it is "Based on more advanced cryptographic techniques to ensure security and privacy, e.g. uses PTLC not HTLC;". PTLCs (Point Timelock Contracts) offer improved privacy and potentially more efficient multi-hop routing compared to HTLCs.

### Multi-hop Routing
Multi-hop payment is a core feature of Fiber Network. The `README.md` states: "Multi-hop payment, anyone can facilitate payments and earn payment fees by running a fiber node and becoming a hop on payment paths;". This confirms that payments can traverse multiple nodes to reach their destination, with intermediate nodes acting as relays.

### Asset Support (CKB + UDT)
Fiber Network supports multiple assets. Specifically, it supports "UDT assets issued on CKB ledger" and "RGB++ assets issued on Bitcoin ledger," in addition to stablecoins. This confirms native support for CKB's User Defined Tokens (UDTs).

### Cross-chain (BTC Lightning Interop)
Cross-network asset payment/swap is a completed feature (`[x]` in the TODO list). The `README.md` explicitly states: "Cross-network asset payment/swap, e.g. from Lightning network to Fiber network, and vice versa;". This confirms direct interoperability with the Bitcoin Lightning Network.

### Peer Discovery
"Establishing connections with other fiber nodes" is a completed feature (`[x]` in the TODO list). The `README.md` demonstrates how to build and run a testnet node, implying that nodes can connect. However, the specific mechanism for peer discovery (e.g., DNS seeds, gossip protocol, hardcoded peers) is not detailed in the provided content.

### Fee Structures
Fiber Network is designed for "Extremely low-cost micropayments, e.g. 0.0001 cent payment with 0.00000001 cent fee;". Fees can be earned by nodes that facilitate multi-hop payments: "anyone can facilitate payments and earn payment fees by running a fiber node and becoming a hop on payment paths;". The precise structure of these fees (e.g., base fee, proportional fee, dynamic adjustments) is not specified in the provided content.

### Watchtower Support
Fiber Network includes "Watchtower support, make it easier for node operators;". This feature helps node operators secure their funds by allowing a third-party watchtower to monitor the blockchain for channel state breaches, even when the operator's node is offline.

### Practicality Today vs. Roadmap
The `README.md` explicitly uses a "TODO" list to distinguish completed features (`[x]`) from those in the roadmap (`[ ]`).
**Practical TODAY (marked `[x]`):**
*   Establishing connections with other fiber nodes
*   Creating and closing fiber channel
*   Payments over fiber channel (via `fiber-scripts`)
*   Cross-network asset transfer
**Roadmap (marked `[ ]`):**
*   Web-browser friendly runtime
*   Programmable conditional payment
*   Advanced channel liquidity management
*   Atomic multi-path payment
The implementation is noted as "still a work-in-progress and will have iterations even after mainnet," advising caution.

### Latency/Throughput Characteristics
*   **Latency:** Fiber Network boasts "Low latency, e.g. 0.0001 cent payment in your p2p connection latency, e.g. 20ms;". This indicates near real-time transaction finality, limited primarily by network propagation delays between peers.
*   **Throughput:** The network offers "High throughput, because transactions are only processed by involved peers, no network consensus required;". While a specific transactions-per-second (TPS) number is not provided, the architectural design (off-chain processing) inherently supports high throughput.

### Minimum Viable Agent Use Case
Given the current capabilities, a minimum viable AI agent use case for Fiber Network would involve:
1.  **Automated Micropayments:** An agent could open channels, send and receive extremely low-cost payments for services, data streams, or content, leveraging the low latency and fees.
2.  **Instant Asset Swaps:** The agent could facilitate or execute instant swaps between supported assets (CKB UDTs, RGB++ assets, stablecoins) and even cross-network with Bitcoin Lightning assets, as long as channel paths are available.
3.  **Routing Node Operation:** An agent could run a Fiber Network Node, establish channels, and automatically route multi-hop payments to earn fees, optimizing for path availability and profitability.

### Gaps / Follow-up
*   **Detailed RPC API for Channel Management:** While channel open/close/list are confirmed, the specific RPC call for opening a channel and any RPCs for updating channel parameters are not detailed.
*   **Detailed Invoice Creation and Payment RPCs:** The `Invoice Protocol` exists, but the specific RPCs an agent would use to create an invoice or initiate a payment based on an invoice are not provided.
*   **Peer Discovery Mechanism:** The method by which Fiber nodes discover and connect to other peers (e.g., DNS seeds, gossip, hardcoded bootstrap nodes) is not specified.
*   **Detailed Fee Structure:** While low fees and earning fees for routing are mentioned, the exact fee structure (e.g., base fee, proportional fee, dynamic fee adjustments) is not elaborated.
*   **Specific Throughput Metrics:** While "High throughput" is stated, concrete metrics (e.g., TPS) are not provided.
*   **Programmable Conditional Payments:** This is listed as a roadmap item (`[ ]`), which would significantly expand agent capabilities for complex financial logic.
*   **Advanced Channel Liquidity Management:** This is also a roadmap item (`[ ]`), crucial for agents managing routing nodes efficiently.

### Relevant Code/API Snippets
*   **Build and Run Node:**
    ```bash
    cargo build --release
    mkdir /folder-to/my-fnn
    cp target/release/fnn /folder-to/my-fnn
    cp config/testnet/config.yml /folder-to/my-fnn
    cd /folder-to/my-fnn
    mkdir ckb
    ckb-cli account export --lock-arg --extended-privkey-path ./ckb/exported-key
    head -n 1 ./ckb/exported-key > ./ckb/key
    rm ./ckb/exported-key
    FIBER_SECRET_KEY_PASSWORD='YOUR_PASSWORD' RUST_LOG='info' ./fnn -c config.yml -d .
    ```
*   **RPC Documentation Links (from `README.md`):**
    *   [list all channels](./crates/fiber-lib/src/rpc/README.md#channel-list_channels)
    *   [close channel](./crates/fiber-lib/src/rpc/README.md#channel-shutdown_channel)
*   **Invoice Protocol Specification Link (from `README.md`):**
    *   [Invoice Protocol](./docs/specs/payment-invoice.md)