# Research: fiber-retroarch-architecture

**Date:** 2026-03-05  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://raw.githubusercontent.com/nervosnetwork/fiber/main/crates/fiber-lib/src/rpc/README.md, https://raw.githubusercontent.com/libretro/RetroArch/master/command.h

---

## Research Note: Fiber-RetroArch Architecture

**Date:** 2026-03-05

### Summary
This research outlines a technical architecture for integrating Fiber payments with RetroArch, focusing on a payment sidecar model. The architecture leverages Fiber's RPC for channel and payment management, allowing for peer-to-peer payment channels between players. An agent process would monitor RetroArch events, potentially through its command interface, to trigger payments. While Fiber provides robust channel and payment APIs, specific details regarding low-latency integration with game frames, direct game RAM access for external agents, and minimum CKB stake are not explicitly detailed in the provided documentation. The system is designed to support both local and Netplay RetroArch sessions.

### Questions to Answer

#### (1) What does the agent process look like — polling loop, event detection, debouncing?
The agent process would likely be a separate application running alongside RetroArch, interacting with it and a Fiber Network Node (FNN).

*   **Event Detection:** The agent could detect game events by:
    *   **Monitoring RetroArch's command interface:** RetroArch exposes an `enum event_command` (e.g., `CMD_EVENT_SAVE_STATE`, `CMD_EVENT_PAUSE`, `CMD_EVENT_UNPAUSE`, `CMD_EVENT_NETPLAY_INIT`). An external agent would need a mechanism to receive these events or query RetroArch's state. The `command.h` file defines these internal commands, but doesn't specify an external API for an agent to subscribe to or poll for them. Assuming RetroArch provides an external interface (e.g., a network command port `DEFAULT_NETWORK_CMD_PORT 55355` as mentioned in `command.h`, or a local IPC mechanism), the agent could listen for relevant game state changes.
    *   **Polling:** If direct event subscription is not available, the agent might need to poll RetroArch for certain states or use memory scanning techniques (not covered by the provided docs).
*   **Polling Loop:** An agent would maintain a polling loop to:
    *   Check RetroArch's status for game start/end, player actions, or score updates.
    *   Monitor the Fiber Network Node for incoming payments or channel status updates using methods like `payment.get_payment` or `channel.list_channels`.
*   **Debouncing:** The provided content does not offer specific mechanisms or recommendations for debouncing events from RetroArch or Fiber. This would need to be implemented within the agent's logic based on the specific game and payment rules. For instance, if a payment is triggered by a "hit," the agent would need to debounce multiple hits within a short timeframe to avoid excessive micro-transactions.

#### (2) How does player A's agent communicate with player B's agent — direct Fiber channel, hub-and-spoke, or P2P?
Player A's agent communicates with Player B's agent primarily through the **Fiber Network Node (FNN)**, which facilitates **direct Fiber channels** between peers.

*   The Fiber RPC documentation includes `peer.connect_peer` and `peer.disconnect_peer` methods, indicating that FNNs can establish direct peer connections.
*   The `channel.open_channel` and `channel.accept_channel` methods are used to establish a payment channel between two FNNs (representing Player A and Player B).
*   Once a channel is open, payments can be sent directly between the two FNNs using methods like `payment.send_payment`.
*   Therefore, the communication model is effectively **P2P** at the Fiber channel layer, where each player's agent interacts with their local FNN, and the FNNs manage the direct channel communication.

#### (3) Channel lifecycle — when does it open (game start), when does it settle (game over), what happens if a player disconnects mid-game?

*   **Channel Open (Game Start):**
    *   When a game session is initiated (e.g., RetroArch `CMD_EVENT_LOAD_CORE` or `CMD_EVENT_NETPLAY_INIT` is detected), Player A's agent would call `channel.open_channel` with Player B's FNN ID and initial funding.
    *   Player B's agent would then call `channel.accept_channel` to finalize the channel establishment.
    *   The `channel.list_channels` method can be used to monitor the channel's state.
*   **Channel Settle (Game Over):**
    *   Upon game completion (e.g., RetroArch `CMD_EVENT_CLOSE_CONTENT` or a specific game-over event), the agents would initiate settlement.
    *   The `channel.shutdown_channel` method would be used to gracefully close the channel and settle the final balances on the CKB blockchain.
*   **Player Disconnects Mid-Game:**
    *   If a player disconnects (e.g., RetroArch `CMD_EVENT_QUIT` or `CMD_EVENT_NETPLAY_DISCONNECT` is detected, or the peer connection is lost), the remaining player's agent could attempt to close the channel.
    *   The `channel.abandon_channel` method is available, which suggests a mechanism for unilaterally closing a channel, potentially in cases of uncooperative peers or disconnections. This would likely involve on-chain dispute resolution if the state is not mutually agreed upon.
    *   The `peer.disconnect_peer` method can also be used to explicitly terminate the network connection to the disconnected player's FNN.

#### (4) What's the minimum CKB stake per game session?
The provided documentation does **not** specify a minimum CKB stake per game session.

The Fiber RPC methods mention `amount_sats` for BTC payments and `CkbInvoice` and `CkbInvoiceStatus` types exist, indicating CKB payments are supported, but no minimum channel funding or transaction amount is defined. This would likely be a configuration parameter for the specific application built on Fiber.

#### (5) How do we handle the 20ms Fiber latency vs game frame timing?
The provided content does **not** offer specific mechanisms or recommendations for handling 20ms Fiber latency in the context of game frame timing.

*   The Fiber RPC README states, "APIs are not stable yet and may change in the future. We are in a actively developing stage," which implies performance characteristics like latency might still be evolving.
*   RetroArch's `command.h` focuses on event commands and does not discuss network latency or synchronization with external systems.

Given a 20ms latency, direct real-time, per-frame payments for fast-paced games would be challenging. Potential strategies (not found in docs, but general architectural considerations) might include:
*   **Batching payments:** Payments could be batched per round, per significant event, or at fixed intervals (e.g., every second), rather than every frame.
*   **Pre-funding/post-settlement:** Channels are pre-funded, and micro-transactions update the channel state off-chain. Only the final settlement or dispute resolution hits the main chain.
*   **Asynchronous updates:** The game state might update visually before the payment transaction is confirmed on Fiber, with reconciliation happening in the background.

#### (6) What's the UI — overlay on RetroArch, separate terminal, web dashboard?
The UI for the Fiber-powered RetroArch payment sidecar could take several forms, leveraging capabilities from both RetroArch and Fiber:

*   **Overlay on RetroArch:** RetroArch's `command.h` includes `CMD_EVENT_OVERLAY_INIT`, `CMD_EVENT_OVERLAY_UNLOAD`, `CMD_EVENT_OVERLAY_SET_SCALE_FACTOR`, etc. This indicates RetroArch supports in-game overlays. The payment sidecar agent could potentially render payment status, channel balance, or transaction notifications directly within RetroArch using this overlay system.
*   **Separate Terminal/CLI:** Since Fiber exposes a JSON-RPC interface, a simple command-line interface (CLI) or a separate terminal application could be built to interact with the FNN for channel management (`channel.open_channel`, `channel.list_channels`, `channel.shutdown_channel`) and payment monitoring (`payment.get_payment`).
*   **Web Dashboard:** A more sophisticated UI could be a web-based dashboard that connects to the local FNN's RPC endpoint (with appropriate security measures, as the RPC README warns against arbitrary access). This would allow for a richer user experience for managing funds, channels, and viewing payment history.

The choice of UI depends on the desired user experience and complexity. An overlay would be ideal for in-game notifications, while a separate terminal or web dashboard would be better for detailed management.

#### (7) Can this work over RetroArch Netplay (2 players on different machines) or only local? Map out the full data flow from game event → RAM read → payment trigger → Fiber send_payment → opponent receives.

Yes, this system **can work over RetroArch Netplay** (2 players on different machines). RetroArch's `command.h` explicitly defines Netplay-related commands: `CMD_EVENT_NETPLAY_INIT`, `CMD_EVENT_NETPLAY_INIT_DIRECT`, `CMD_EVENT_NETPLAY_ENABLE_HOST`, `CMD_EVENT_NETPLAY_DISCONNECT`, `CMD_EVENT_NETPLAY_HOST_TOGGLE`. These commands indicate that RetroArch is designed to operate in a networked multiplayer environment, synchronizing game state between different machines. The Fiber payment sidecar would operate in parallel to this Netplay connection.

**Full Data Flow:**

1.  **Game Event (Player A's Machine):**
    *   Player A performs an action in RetroArch (e.g., scores a point, takes damage, completes a round).
    *   RetroArch's internal logic processes this event.
    *   **RetroArch Event Detection:** Player A's payment agent, running alongside RetroArch, detects this event. This could be via:
        *   Monitoring RetroArch's network command port (`DEFAULT_NETWORK_CMD_PORT 55355`) for specific event commands (e.g., a custom `CMD_EVENT_GAME_SCORE_UPDATE` if RetroArch were extended, or by inferring from existing commands like `CMD_EVENT_SAVE_STATE` if states are saved after significant events).
        *   (Hypothetically, if an API existed) Direct subscription to RetroArch's internal event bus.
        *   (Hypothetically) Memory scanning a known game state variable in RetroArch's process memory.
    *   **Note on RAM Read:** The provided `command.h` lists `CMD_EVENT_SAVE_STATE_TO_RAM`, `CMD_EVENT_LOAD_STATE_FROM_RAM`, `CMD_EVENT_RAM_STATE_TO_FILE`. These refer to RetroArch's internal state management. The documentation does **not** provide an external API for an agent to directly "RAM read" specific game data (e.g., player score, health) from the running RetroArch process. An agent would need to rely on RetroArch exposing such data, or use platform-specific memory inspection techniques. For this flow, we assume the agent can infer the game event from RetroArch's exposed commands or a hypothetical game-specific API.

2.  **Payment Trigger (Player A's Agent):**
    *   Based on the detected game event and predefined game rules (e.g., "Player A scored, Player B owes 1 CKB"), Player A's agent determines a payment is due.

3.  **Fiber `send_payment` (Player A's Agent to Player A's FNN):**
    *   Player A's agent makes an RPC call to its local Fiber Network Node (FNN) to initiate a payment to Player B.
    *   **API Call:** `payment.send_payment(invoice_for_player_B, amount_ckb)` (assuming CKB is used, or `payment.send_payment(invoice_for_player_B, amount_sats)` for BTC via CCH). The `CkbInvoice` type suggests direct CKB payments are possible.

4.  **Payment Processing (Fiber Network):**
    *   Player A's FNN processes the `send_payment` request.
    *   It updates the state of the established Fiber channel between Player A and Player B, deducting the amount from Player A's balance and adding it to Player B's balance within the channel. This is an off-chain transaction.

5.  **Opponent Receives (Player B's FNN to Player B's Agent):**
    *   Player B's FNN receives the payment update from Player A's FNN via the established Fiber channel.
    *   Player B's agent, which is continuously monitoring its local FNN (e.g., polling `payment.get_payment` for a specific payment hash, or listening for channel updates via a hypothetical subscription API), detects the incoming payment.
    *   Player B's agent can then update its local UI (e.g., RetroArch overlay) to reflect the received payment or acknowledge the game event.

This flow assumes that both players have their Fiber Network Nodes running and connected, and a payment channel is open between them.

### Gaps / Follow-up

1.  **RetroArch External Event API:** The `command.h` file lists internal commands but doesn't explicitly define an external API (e.g., a websocket, IPC, or network protocol beyond `DEFAULT_NETWORK_CMD_PORT`) for an agent to *receive* these events or *read* game-specific RAM data. Further investigation into RetroArch's extensibility for external agents is needed.
2.  **Fiber Latency Guarantees:** The provided Fiber documentation does not specify expected latency or throughput for channel operations and payments. This is crucial for real-time game integration.
3.  **Minimum CKB Stake/Channel Funding:** No information is provided on minimum amounts required for opening channels or making payments in CKB.
4.  **Error Handling & Dispute Resolution:** While `channel.abandon_channel` is mentioned, detailed mechanisms for handling payment failures, channel disputes, or uncooperative peers are not elaborated.
5.  **Security of RPC:** The warning "Allowing arbitrary machines to access the JSON-RPC port... is **dangerous and strongly discouraged**" highlights the need for robust security measures for the agent-FNN communication, especially in a Netplay scenario.
6.  **Invoice Generation:** The flow mentions `invoice_for_player_B` but doesn't detail how this invoice is generated and exchanged between players' agents in a dynamic game session. The `invoice.new_invoice` method exists, but the process of one agent requesting an invoice from another needs definition.

### Relevant Code/API Snippets

*   **RetroArch Event Commands:**
    ```c
    // From https://raw.githubusercontent.com/libretro/RetroArch/master/command.h
    enum event_command {
        CMD_EVENT_NONE = 0,
        CMD_EVENT_RESET,
        // ... many other game-related events ...
        CMD_EVENT_SAVE_STATE,
        CMD_EVENT_LOAD_STATE,
        CMD_EVENT_SAVE_STATE_TO_RAM,
        CMD_EVENT_LOAD_STATE_FROM_RAM,
        CMD_EVENT_NETPLAY_INIT,
        CMD_EVENT_NETPLAY_INIT_DIRECT,
        CMD_EVENT_NETPLAY_ENABLE_HOST,
        CMD_EVENT_NETPLAY_DISCONNECT,
        CMD_EVENT_OVERLAY_INIT,
        // ...
    };
    #define DEFAULT_NETWORK_CMD_PORT 55355
    ```

*   **Fiber Channel Management:**
    ```
    // From https://raw.githubusercontent.com/nervosnetwork/fiber/main/crates/fiber-lib/src/rpc/README.md
    Module Channel
    Method `open_channel`
    Method `accept_channel`
    Method `abandon_channel`
    Method `list_channels`
    Method `shutdown_channel`
    Method `update_channel`
    ```

*   **Fiber Peer Management:**
    ```
    // From https://raw.githubusercontent.com/nervosnetwork/fiber/main/crates/fiber-lib/src/rpc/README.md
    Module Peer
    Method `connect_peer`
    Method `disconnect_peer`
    Method `list_peers`
    ```

*   **Fiber Payment Sending:**
    ```
    // From https://raw.githubusercontent.com/nervosnetwork/fiber/main/crates/fiber-lib/src/rpc/README.md
    Module Payment
    Method `send_payment`
    Method `get_payment`
    ```

*   **Fiber Invoice Management:**
    ```
    // From https://raw.githubusercontent.com/nervosnetwork/fiber/main/crates/fiber-lib/src/rpc/README.md
    Module Invoice
    Method `new_invoice`
    Method `parse_invoice`
    Method `get_invoice`
    Method `cancel_invoice`
    Method `settle_invoice`
    ```

*   **Fiber CKB Types:**
    ```
    // From https://raw.githubusercontent.com/nervosnetwork/fiber/main/crates/fiber-lib/src/rpc/README.md
    Type `CkbInvoice`
    Type `CkbInvoiceStatus`
    ```