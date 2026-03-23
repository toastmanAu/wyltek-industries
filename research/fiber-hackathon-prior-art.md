# Research: fiber-hackathon-prior-art

**Date:** 2026-03-05  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://raw.githubusercontent.com/nervosnetwork/fiber/main/README.md, https://api.github.com/search/repositories?q=fiber+nervos+CKB&sort=updated&per_page=10, https://api.github.com/search/repositories?q=ckb+agent&sort=updated&per_page=10

---

## Research Note: fiber-hackathon-prior-art

**Date:** 2026-03-05

**Summary:**
Fiber Network Node (FNN) is a peer-to-peer payment and swap network built on Nervos CKB, aiming to provide low-cost, instant, and private transactions for various assets, including RGB++ and UDTs. Core functionalities like node connections, channel management, and cross-network transfers are implemented, with ongoing development. Key areas still under development include a web-browser friendly runtime, programmable conditional payments, and advanced liquidity management. While an older `fiber-archive` repository exists, the main `nervosnetwork/fiber` is the active project. For "agentic" CKB projects, `pipixia-ckb/ckb-agent-skills` is identified as a relevant project focused on AI agent capabilities for the Nervos Network.

### What's already been built on Fiber Network?

The primary active project is the **Fiber Network Node (FNN)**, a reference implementation of the Fiber Network Protocol (FNP), found at `https://github.com/nervosnetwork/fiber`.

Based on the `README.md`, the following core functionalities are explicitly marked as completed in the TODO list:
*   **Establishing connections** with other Fiber nodes.
*   **Creating and closing Fiber channels**.
*   **Payments over Fiber channels**, which are facilitated via `fiber-scripts` (linked to `https://github.com/nervosnetwork/fiber-scripts`).
*   **Cross-network asset transfer**, enabling interoperability, e.g., from Lightning Network to Fiber Network and vice versa.

Beyond the TODO list, the `README.md` highlights several features as part of the FNN implementation:
*   **Multiple assets support**: Including stable coins, RGB++ assets issued on Bitcoin ledger, and UDT assets issued on CKB ledger.
*   **Extremely low-cost micropayments** and **instant swap** between any asset pairs.
*   **Watchtower support** for node operators.
*   **Multi-hop payment** capabilities.
*   **High privacy** (transactions only seen by involved peers) and **security** (uses PTLC, not HTLC).
*   **Composability** with other contracts/scripts on CKB.

An older repository, `nervosnetwork/fiber-archive` (`https://github.com/nervosnetwork/fiber-archive`), is listed in the GitHub search results. It is described as a "Channel network built on Nervos CKB" but is explicitly marked as `archived: true` and has not been pushed to since `2021-07-08T14:45:27Z`, indicating it is not actively maintained and likely represents a past iteration.

### What ground is already covered?

*   **Core Network Infrastructure:** The fundamental peer-to-peer network, including node connectivity, channel establishment, and channel closure, is implemented.
*   **Basic Payment Functionality:** Direct and multi-hop payments over established channels are supported.
*   **Asset Agnosticism:** The network is designed to handle various asset types (RGB++, UDT, stable coins).
*   **Interoperability:** Cross-network transfers, particularly with Lightning Network, are a key feature.
*   **Developer Documentation:** Comprehensive documentation is available, including a Light Paper, Glossary, RPC Documentation (`crates/fiber-lib/src/rpc/README.md`), P2P Message Protocol (`docs/specs/p2p-message.md`), and Invoice Protocol (`docs/specs/payment-invoice.md`).
*   **Testnet Environment:** Instructions and tools for building, running, and migrating a testnet node are provided.

### What gaps exist (for Fiber Network)?

Based on the `README.md`'s TODO list, the following features are explicitly identified as not yet implemented:
*   **Web-browser friendly runtime:** This indicates a lack of direct support or SDKs for running Fiber nodes or interacting with the network directly from a web browser.
*   **Programmable conditional payment:** Advanced payment logic beyond simple transfers, such as escrow, time-locked payments, or payments contingent on specific conditions.
*   **Advanced channel liquidity management:** Features or tools to help node operators optimize and manage their channel liquidity more effectively.
*   **Atomic multi-path payment:** The ability to split a single payment across multiple channels/paths atomically.

Additionally, the provided content does not explicitly mention:
*   Specific user-facing applications, wallets, or dApps built by the community or Nervos team *on top* of the FNN.
*   Any public hackathon entries or community projects that have leveraged Fiber Network.

### What "agentic" CKB projects exist generally?

From the provided GitHub search results for `q=ckb+agent`:

*   **`pipixia-ckb/ckb-agent-skills`** (`https://github.com/pipixia-ckb/ckb-agent-skills`): This repository is directly relevant, described as "AI Agent Skills for CKB (Nervos Network) - Safety, Best Practices & Community Tools." This project aims to provide capabilities for AI agents to interact with the CKB blockchain. Its `updated_at` timestamp (`2026-02-23T21:09:54Z`) suggests it is a very recent or ongoing project.

The other search result, `luochang212/CKBI`, is described as a "ChatBI application based on ClickHouse" and does not appear to be related to "agentic" behavior on the CKB blockchain.

Therefore, `pipixia-ckb/ckb-agent-skills` is the primary "agentic" CKB project identified in the provided content.

### Gaps / Follow-up:

*   **Fiber Network Application Ecosystem:** There is a clear gap in publicly documented user-facing applications, wallets, or specific dApps built *on* Fiber Network. This suggests a significant whitespace for hackathon entries focused on practical end-user experiences.
*   **Hackathon Entries/Community Projects:** The content does not list any existing hackathon entries or community projects utilizing Fiber. This indicates a greenfield opportunity for novel entries.
*   **Detailed "Agentic" CKB Functionality:** While `pipixia-ckb/ckb-agent-skills` is identified, the content lacks specifics on *what* "skills" are provided, *how* agents interact with CKB, or concrete use cases. Further investigation into this repository would be necessary to understand its scope and potential for integration or extension.
*   **Browser-Based Interaction:** The "Web-browser friendly runtime" is a critical missing piece for broad adoption and seamless user experience. Developing a light client, SDK, or wallet integration for web browsers would be a high-impact project.
*   **Advanced Payment Logic:** "Programmable conditional payment" offers significant potential for complex financial primitives and decentralized applications on Fiber. Exploring specific smart contract patterns for this would be valuable.
*   **Liquidity Provisioning Tools:** Tools or interfaces that help users become liquidity providers, manage their channels, and optimize earnings on the Fiber Network are not mentioned and represent a potential area for development.

### Relevant Code/API Snippets:

*   **Building and Running a Testnet FNN Node:**
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
*   **RPC Calls for Channel Management (from `crates/fiber-lib/src/rpc/README.md`):**
    *   `channel-list_channels`: To retrieve a list of all active channels.
    *   `channel-shutdown_channel`: To initiate the closure of a specific channel.
*   **Storage Migration Tool:**
    ```bash
    fnn-migrate -p /folder-to/my-fnn/fiber/store
    ```
*   **Associated Scripts Repository:**
    *   `fiber-scripts`: `https://github.com/nervosnetwork/fiber-scripts`