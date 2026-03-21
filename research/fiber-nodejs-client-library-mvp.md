# Research: fiber-nodejs-client-library-mvp

**Date:** 2026-03-21  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://raw.githubusercontent.com/nervosnetwork/fiber/main/README.md, https://raw.githubusercontent.com/nervosnetwork/fiber/main/src/rpc/mod.rs, https://github.com/lightningnetwork/lnd/blob/master/lnrpc/lightning.proto, https://docs.raiden.network/architecture/payments-vs-transfers

---

Date: 2026-03-21

## Summary

This research outlines the design and feasibility for an MVP Node.js/TypeScript client library for the Nervos Fiber payment channel network. The library will abstract the Fiber Network Node (FNN) RPC interface, focusing on core functionalities like channel management and payment operations. Key considerations include handling the asynchronous nature of on-chain channel opening, implementing robust error handling with retry strategies, and integrating invoice generation. The proposed architecture will leverage async/await patterns and a testing strategy prioritizing local and testnet environments to minimize CKB consumption.

## Questions to Answer

### 1. What are the 10 most essential Fiber RPC methods needed for a payment app MVP?

Based on the project goal, the "FNN binary RPC methods" mentioned in the Project Ground Truth, and the `crates/fiber-lib/src/rpc/README.md` link in the Fiber README, the following 10 methods are essential for a payment app MVP:

1.  **`open_channel`**: Initiates the opening of a payment channel with a peer. This is a foundational method as channels are required for off-chain payments.
2.  **`send_payment`**: Sends a payment to a specified invoice or peer through an established channel. This is the core payment functionality.
3.  **`list_channels`**: Retrieves a list of all active and pending payment channels, providing crucial state information for the application.
4.  **`new_invoice`**: Generates a new payment invoice, allowing the application to request payments from other Fiber users.
5.  **`get_invoice`**: Retrieves details about a specific invoice, useful for checking payment status or invoice parameters.
6.  **`close_channel` / `shutdown_channel`**: Closes an existing payment channel, settling the final state on the CKB L1. The Fiber README specifically mentions `channel-shutdown_channel` for closing.
7.  **`connect_peer`**: Establishes a P2P connection with another Fiber node, a prerequisite for opening channels and sending payments.
8.  **`list_peers`**: Lists connected peers, useful for network topology and debugging.
9.  **`get_balance`**: Retrieves the current balance of the node's wallet, indicating available funds for channel funding or on-chain transactions.
10. **`get_info`**: Provides general information about the Fiber node, such as its ID, network status, and version.

*(Note: The `src/rpc/mod.rs` file was not accessible, so specific method signatures and detailed parameters are inferred from the names and general payment channel concepts.)*

### 2. How should a Node.js client handle async channel opening (which may take multiple blocks)?

Fiber channels open/close via CKB on-chain transactions, which inherently take multiple blocks to confirm. A Node.js client should handle this asynchronously using the following pattern:

1.  **Initiate Channel Opening**: The client calls the `open_channel` RPC method on the FNN. This call should return immediately with a transaction ID or a unique channel identifier (e.g., a temporary channel ID or a funding transaction hash).
2.  **Polling Mechanism**: The client library should provide a mechanism to poll the FNN for the channel's status. This can be done by repeatedly calling `list_channels` and checking the state of the channel associated with the initial request.
    *   The `list_channels` RPC method is expected to return a list of channels, each with a status (e.g., `pending`, `active`, `closed`, `failed`).
    *   The polling interval should be configurable but reasonable (e.g., every 5-10 seconds) to avoid excessive RPC calls while providing timely updates.
3.  **Event-driven Approach (Optional but Recommended)**: For a more reactive user experience, the client library could expose an event emitter.
    *   When `open_channel` is called, it returns a Promise that resolves when the channel reaches an `active` state or rejects if it fails.
    *   Internally, the library would poll `list_channels`. Upon status changes (e.g., from `pending` to `active`), it emits events (e.g., `channel_opened`, `channel_failed`).
    *   This allows applications to subscribe to these events without blocking the main thread.
4.  **Timeouts and Error Handling**: Implement a configurable timeout for channel opening. If the channel doesn't become active within a specified duration, the operation should be considered failed, and an appropriate error should be returned. The client should also handle RPC errors during polling (e.g., FNN not reachable).

**Example Usage Sketch:**

```typescript
import { FiberClient } from 'fiber-nodejs-client';

const client = new FiberClient({ rpcUrl: 'http://127.0.0.1:8227' });

async function openAndMonitorChannel(peerId: string, capacity: number) {
  try {
    console.log(`Attempting to open channel with ${peerId}...`);
    const channelInfo = await client.openChannel(peerId, capacity); // Returns a pending channel object/tx ID
    console.log(`Channel opening initiated. Channel ID: ${channelInfo.id}. Waiting for confirmation...`);

    // Option 1: Await a promise that polls internally
    const activeChannel = await client.waitForChannelActive(channelInfo.id, { timeoutMs: 300_000 }); // 5 minutes timeout
    console.log(`Channel ${activeChannel.id} is now active!`);
    return activeChannel;

  } catch (error) {
    console.error(`Failed to open channel: ${error.message}`);
    throw error;
  }
}

// Or with an event listener for more granular updates:
client.on('channel_status_update', (channelId, newStatus) => {
  console.log(`Channel ${channelId} status changed to: ${newStatus}`);
  if (newStatus === 'active') {
    console.log(`Channel ${channelId} is ready for payments.`);
  } else if (newStatus === 'failed') {
    console.error(`Channel ${channelId} failed to open.`);
  }
});

// Call the function
// openAndMonitorChannel('peer_public_key_or_id', 1000000); // 1 CKB capacity
```

### 3. What error cases need explicit retry logic (network timeout vs RPC error vs insufficient capacity)?

Retry logic should be applied to transient errors, while permanent errors should fail immediately.

**Explicit Retry Logic (Transient Errors):**

*   **Network Timeout / Connection Refused**:
    *   **Cause**: FNN node temporarily down, network congestion, firewall issues, or RPC server restart.
    *   **Action**: Implement exponential backoff with a maximum number of retries. These are typically transient and resolve themselves.
    *   **Example**: `ECONNREFUSED`, `ETIMEDOUT`, `ENOTFOUND` (if DNS is flaky).
*   **RPC Internal Server Error (Transient)**:
    *   **Cause**: FNN node experiencing temporary internal issues, database lock, or resource contention.
    *   **Action**: Retry with exponential backoff. Some RPC errors might indicate a temporary state.
    *   **Example**: A generic "internal server error" that doesn't specify a permanent failure.
*   **Rate Limiting Errors**:
    *   **Cause**: If the FNN or an upstream service implements rate limiting.
    *   **Action**: Retry after a `Retry-After` header duration, or with exponential backoff if no header is provided.

**No Retry Logic (Permanent Errors):**

*   **Insufficient Capacity / Funds**:
    *   **Cause**: Attempting to open a channel or send a payment with more CKB/UDT than available in the FNN's wallet or channel.
    *   **Action**: Fail immediately and return a clear error message. Retrying will not resolve this; the user needs to add funds or reduce the amount.
    *   **Example**: `INSUFFICIENT_FUNDS`, `CHANNEL_CAPACITY_EXCEEDED`.
*   **Invalid Parameters / Malformed Request**:
    *   **Cause**: Incorrect peer ID, invalid invoice format, negative amount, etc.
    *   **Action**: Fail immediately. Retrying with the same invalid parameters will always fail. The application needs to correct the input.
    *   **Example**: `INVALID_ARGUMENT`, `MALFORMED_INVOICE`.
*   **Channel Not Found / Peer Not Connected**:
    *   **Cause**: Attempting an operation on a non-existent channel or with an unknown peer.
    *   **Action**: Fail immediately. This indicates a logical error in the application or a state mismatch.
    *   **Example**: `CHANNEL_NOT_FOUND`, `PEER_NOT_CONNECTED`.
*   **RPC Error (Permanent)**:
    *   **Cause**: Specific RPC errors indicating a permanent failure condition that won't resolve with retries.
    *   **Action**: Fail immediately.
    *   **Example**: `CHANNEL_ALREADY_EXISTS`, `UNSUPPORTED_FEATURE`.

The client library should encapsulate this logic, allowing developers to configure retry attempts and backoff strategies.

### 4. Should the library include automatic invoice generation/encoding or rely on separate utilities?

The library **should include automatic invoice generation and encoding**.

The Project Ground Truth explicitly lists `new_invoice` and `get_invoice` as FNN binary RPC methods. This indicates that the FNN itself handles the core logic for creating and managing invoices.

Therefore, the Node.js client library's role would be to:

1.  **Expose `new_invoice`**: Provide a high-level function (e.g., `client.createInvoice(amount, description, options)`) that calls the FNN's `new_invoice` RPC. The FNN will generate the invoice string (likely a BOLT-11 or similar format adapted for Fiber, as suggested by "Invoice Protocol" documentation).
2.  **Expose `get_invoice`**: Allow fetching invoice details by its ID or payment hash.
3.  **Handle Encoding/Decoding (if necessary)**: If the FNN returns raw invoice data that needs to be encoded into a user-friendly string (e.g., a QR code compatible string) or if the client needs to parse an incoming invoice string, the library should provide utilities for this. However, given the `new_invoice` RPC, it's more likely the FNN returns the fully encoded string.

**Rationale:**

*   **Simplicity for Developers**: Integrating invoice generation directly into the client library makes it a self-contained solution for payment apps. Developers don't need to find, install, and learn separate invoice encoding libraries.
*   **Consistency**: Ensures that invoices are generated and handled according to the Fiber protocol specification, as the FNN is the reference implementation.
*   **Completeness**: A payment channel client library is expected to provide end-to-end payment functionality, and invoice management is a critical part of that.
*   **"Invoice Protocol" Documentation**: The existence of `Invoice Protocol` documentation (`./docs/specs/payment-invoice.md`) further supports the idea that invoice handling is a first-class citizen within Fiber, and thus its client library.

### 5. What testing strategy minimizes testnet CKB consumption while ensuring correctness?

To minimize testnet CKB consumption while ensuring correctness, a multi-layered testing strategy should be employed:

1.  **Unit Tests (Zero CKB Consumption)**:
    *   **Scope**: Test individual functions, data structures, and utility helpers within the client library. This includes RPC request/response serialization/deserialization, error parsing, retry logic, and invoice encoding/decoding (if handled client-side).
    *   **Method**: Use mocking frameworks (e.g., Jest mocks) to simulate RPC calls and network responses.
    *   **Benefit**: Fast, isolated, and consumes no CKB. Covers the majority of the codebase's logic.

2.  **Mock RPC Integration Tests (Zero CKB Consumption)**:
    *   **Scope**: Test the interaction between the client library and a simulated Fiber Network Node RPC server.
    *   **Method**: Create a lightweight mock RPC server (e.g., using `nock` or a simple Express server) that mimics the FNN's RPC interface. This mock server can return predefined successful responses, various error conditions (network timeouts, insufficient funds, invalid parameters), and simulate asynchronous operations like channel opening status changes.
    *   **Benefit**: Verifies the client's RPC call construction, response parsing, and error handling without needing a real FNN or CKB.

3.  **Local Fiber Network Node Integration Tests (Minimal CKB Consumption)**:
    *   **Scope**: Test the client library against a locally running FNN instance.
    *   **Method**:
        *   **Setup**: Spin up a local FNN instance (e.g., via Docker or directly from `cargo build --release`).
        *   **Wallet Management**: Use the FNN's built-in wallet functionality (as described in the Fiber README: `ckb-cli account export`, `FIBER_SECRET_KEY_PASSWORD`) and fund it with a small amount of CKB from a local CKB devnet or a faucet.
        *   **Test Cases**: Perform end-to-end tests for channel opening/closing, sending payments, generating invoices, and listing channels/peers.
    *   **Benefit**: Provides high confidence that the client interacts correctly with a real FNN. CKB consumption is minimal as it's on a local devnet or testnet with controlled funds.

4.  **Dedicated Testnet Integration Tests (Controlled CKB Consumption)**:
    *   **Scope**: Test the client library against a dedicated, persistent Fiber testnet environment.
    *   **Method**:
        *   **Setup**: Utilize the `N100` machine (192.168.68.91) running a Fiber node connected to the CKB testnet. Ensure it has sufficient (but minimal) testnet CKB funding.
        *   **Test Cases**: Run a subset of critical end-to-end tests, especially those involving multi-hop payments or interactions with other public testnet nodes, to verify real-world network behavior.
        *   **Automation**: Automate these tests to run periodically (e.g., nightly CI/CD builds).
    *   **Benefit**: Verifies compatibility with the broader Fiber testnet, including potential protocol changes or network quirks. CKB consumption is limited to the testnet and can be managed.

**Minimizing CKB Consumption:**

*   **Prioritize Unit & Mock Tests**: The vast majority of tests should be at these levels, as they consume no CKB.
*   **Smallest Possible Amounts**: When interacting with real FNNs (local or testnet), use the absolute minimum CKB capacity for channels and payment amounts.
*   **Channel Reuse**: For integration tests, open channels once and reuse them across multiple payment tests, closing them only at the end of the test suite.
*   **Faucet Automation**: If available, automate fetching testnet CKB from a faucet for the `N100` node to keep it funded without manual intervention.
*   **Cleanup**: Ensure test channels are always closed and funds are swept back to minimize lingering state and potential CKB loss.

## Gaps / Follow-up

1.  **Detailed RPC Method Signatures**: The `src/rpc/mod.rs` file was not accessible. A crucial next step is to obtain the precise RPC method names, their expected parameters (types and names), and the exact structure of their return values. This is essential for accurate TypeScript interface definitions.
2.  **Invoice Protocol Specification**: While `new_invoice` and `get_invoice` are known, the exact format of the generated invoice string (e.g., BOLT-11 equivalent for Fiber) and any client-side parsing requirements are unknown. The `docs/specs/payment-invoice.md` would be critical here.
3.  **Channel State Machine**: A clear understanding of the full lifecycle and states of a Fiber channel (e.g., `funding`, `pending`, `active`, `closing`, `closed`, `failed`) is needed to implement robust asynchronous channel opening and status monitoring.
4.  **Error Code Standardization**: A comprehensive list of Fiber-specific RPC error codes and their meanings would greatly aid in implementing precise retry logic and user-friendly error messages.
5.  **UDT Support Details**: The Fiber README mentions "Multiple assets support, e.g. stable coins, RGB++ assets issued on Bitcoin ledger, and UDT assets issued on CKB ledger." The RPC methods for specifying UDTs in `open_channel` and `send_payment` (e.g., `type_id` or `code_hash` for the UDT) need to be identified.
6.  **Watchtower Integration**: The Fiber README mentions "Watchtower support." If the client library is to interact with watchtowers, the relevant RPC methods or client-side protocols need to be researched.

## Relevant Code/API Snippets

**From Project Ground Truth (FNN binary RPC methods):**
*   `open_channel`
*   `send_payment`
*   `list_channels`
*   `new_invoice`
*   `get_invoice`

**From Fiber README (Channel closing):**
*   `channel-shutdown_channel` (linked in `crates/fiber-lib/src/rpc/README.md`)

**From Fiber README (Node startup):**
*   `FIBER_SECRET_KEY_PASSWORD='YOUR_PASSWORD' RUST_LOG='info' ./fnn -c config.yml -d .`
    *   This confirms the FNN is a standalone binary that can be run locally and configured.

**From Fiber README (Wallet management):**
*   `ckb-cli account export --lock-arg --extended-privkey-path ./ckb/exported-key`
*   `head -n 1 ./ckb/exported-key > ./ckb/key`
    *   These commands indicate the FNN uses a CKB private key for funding transactions, which the client library might need to manage or instruct users on.