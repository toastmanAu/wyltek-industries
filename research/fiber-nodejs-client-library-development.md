# Research: fiber-nodejs-client-library-development

**Date:** 2026-03-05  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://raw.githubusercontent.com/nervosnetwork/fiber/main/crates/fiber-lib/src/rpc/channel.rs, https://raw.githubusercontent.com/nervosnetwork/fiber/main/crates/fiber-lib/src/rpc/payment.rs, https://raw.githubusercontent.com/nervosnetwork/fiber/main/crates/fiber-lib/src/rpc/invoice.rs, https://raw.githubusercontent.com/nervosnetwork/fiber/main/crates/fiber-lib/src/rpc/mod.rs, https://raw.githubusercontent.com/nervosnetwork/fiber/main/crates/fiber-lib/src/rpc/types.rs, https://www.npmjs.com/search?q=json-rpc+client

---

## Research Note: Fiber Node.js Client Library Development

**Date:** 2026-03-05

### Summary
This research investigates the development of a Node.js/TypeScript client library for the Fiber Network RPC, which is crucial for the FiberQuest Node.js sidecar. Given the absence of an official client, the analysis focuses on inferring JSON-RPC method signatures from Rust source, recommending suitable HTTP and JSON-RPC libraries, identifying authentication mechanisms, and evaluating generation strategies. The Fiber RPC uses standard JSON-RPC 2.0 over HTTP, secured by Biscuit authentication, and leverages `serde` for data serialization, making TypeScript type generation a viable approach.

### 1. JSON-RPC Method Signatures

The Fiber RPC methods generally follow a pattern where parameters are encapsulated in a `*Params` struct and results in a `*Result` struct. Hex-encoded values (e.g., `U128Hex`, `U64Hex`, `Hash256`, `PeerId`, `EntityHex`) are represented as strings in JSON. CKB-specific types like `Script` and `EpochNumberWithFraction` are represented as structured JSON objects.

#### `open_channel`
*   **Method Name:** `open_channel`
*   **Parameters:** `params: OpenChannelParams` (JSON object)
    *   `peer_id`: `string` (hex-encoded `PeerId`, e.g., "0x...")
    *   `funding_amount`: `string` (hex-encoded `u128`, e.g., "0x...")
    *   `public`: `boolean` (optional, default `true`)
    *   `one_way`: `boolean` (optional, default `false`)
    *   `funding_udt_type_script`: `Script` (optional, JSON object)
        *   `code_hash`: `string` (H256 hex)
        *   `hash_type`: `string` (`"type" | "data" | "data1"`)
        *   `args`: `string` (Bytes hex)
    *   `shutdown_script`: `Script` (optional, JSON object, same structure as `funding_udt_type_script`)
    *   `commitment_delay_epoch`: `string` (hex-encoded `u64`, optional, default `1` epoch)
    *   `commitment_fee_rate`: `string` (hex-encoded `u64`, optional)
    *   `funding_fee_rate`: `string` (hex-encoded `u64`, optional)
    *   `tlc_expiry_delta`: `string` (hex-encoded `u64`, optional, default `4` hours in ms)
    *   `tlc_min_value`: `string` (hex-encoded `u128`, optional, default `0`)
    *   `tlc_fee_proportional_millionths`: `string` (hex-encoded `u64`, optional, default `1000` (0.1%))
    *   `max_tlc_value_in_flight`: `string` (hex-encoded `u128`, optional)
    *   `max_tlc_number_in_flight`: `number` (optional, default `125`)
*   **Return Type:** `OpenChannelResult` (JSON object)
    *   `temporary_channel_id`: `string` (hex-encoded `Hash256`, e.g., "0x...")

#### `send_payment`
*   **Method Name:** Cannot be definitively determined from the provided content. The `#[rpc(server)] trait PaymentRpc` containing the `send_payment` method definition is missing from `payment.rs`.
*   **Inferred Parameters (if method existed):** `params: SendPaymentCommandParams` (JSON object)
    *   `target_pubkey`: `string` (hex-encoded `Pubkey`, optional)
    *   `amount`: `string` (hex-encoded `u128`, optional)
    *   `payment_hash`: `string` (hex-encoded `Hash256`, optional)
    *   `final_tlc_expiry_delta`: `string` (hex-encoded `u64`, optional)
    *   `tlc_expiry_limit`: `string` (hex-encoded `u64`, optional)
    *   `invoice`: `string` (optional, encoded invoice string)
    *   `timeout`: `number` (optional, `u64` in seconds)
    *   `max_fee_amount`: `string` (hex-encoded `u128`, optional)
    *   `max_fee_rate`: `number` (optional, `u32` per thousand)
    *   `max_parts`: `number` (optional, `u32`)
    *   `trampoline_hops`: `Array<HopHint>` (optional, array of JSON objects)
        *   `pubkey`: `string` (hex-encoded `Pubkey`)
        *   `channel_outpoint`: `string` (hex-encoded `OutPoint`)
        *   `fee_rate`: `string` (hex-encoded `u64`)
        *   `tlc_expiry_delta`: `string` (hex-encoded `u64`)
    *   `keysend`: `boolean` (optional)
    *   `udt_type_script`: `Script` (optional, JSON object)
    *   `allow_self_payment`: `boolean` (optional, default `false`)
    *   `custom_records`: `PaymentCustomRecords` (optional, JSON object `HashMap<U32Hex, SliceHex>`)
        *   `"0x..."`: `string` (hex-encoded `Vec<u8>`)
    *   `hop_hints`: `Array<HopHint>` (optional, array of JSON objects, same structure as `trampoline_hops`)
    *   `dry_run`: `boolean` (optional, default `false`)
*   **Return Type:** Cannot be definitively determined from the provided content.

#### `new_invoice`
*   **Method Name:** `new_invoice`
*   **Parameters:** `params: NewInvoiceParams` (JSON object)
    *   `amount`: `string` (hex-encoded `u128`)
    *   `description`: `string` (optional)
    *   `currency`: `string` (`"CKB" | "UDT"`)
    *   `payment_preimage`: `string` (hex-encoded `Hash256`, optional)
    *   `payment_hash`: `string` (hex-encoded `Hash256`, optional)
    *   `expiry`: `string` (hex-encoded `u64` in seconds, optional)
    *   `fallback_address`: `string` (optional)
    *   `final_expiry_delta`: `string` (hex-encoded `u64` in milliseconds, optional)
    *   `udt_type_script`: `CkbScript` (optional, JSON object, same structure as `Script`)
    *   `hash_algorithm`: `string` (optional, e.g., `"SHA256"`)
    *   `allow_mpp`: `boolean` (optional)
    *   `allow_trampoline_routing`: `boolean` (optional)
*   **Return Type:** `InvoiceResult` (JSON object)
    *   `invoice_address`: `string` (encoded invoice string)
    *   `invoice`: `CkbInvoice` (JSON object, complex structure including `currency`, `amount`, `signature`, `data`)

#### `list_channels`
*   **Method Name:** `list_channels`
*   **Parameters:** `params: ListChannelsParams` (JSON object)
    *   `peer_id`: `string` (hex-encoded `PeerId`, optional)
    *   `include_closed`: `boolean` (optional, default `false`)
*   **Return Type:** `ListChannelsResult` (JSON object)
    *   `channels`: `Array<ChannelState>` (array of JSON objects, `ChannelState` is an enum with `state_name` tag and `state_flags` content)

#### `get_invoice`
*   **Method Name:** `get_invoice`
*   **Parameters:** `payment_hash: InvoiceParams` (JSON object)
    *   `payment_hash`: `string` (hex-encoded `Hash256`)
*   **Return Type:** `GetInvoiceResult` (JSON object)
    *   `invoice_address`: `string`
    *   `invoice`: `CkbInvoice` (JSON object)
    *   `status`: `string` (`"OPEN" | "SETTLED" | "CANCELED"`)

### 2. HTTP Client and JSON-RPC Library

The Fiber RPC uses `jsonrpsee` on the server side, which implements standard JSON-RPC 2.0 over HTTP/WebSocket.

*   **HTTP Client:** For a Node.js/TypeScript environment, `axios` or `node-fetch` are both excellent choices.
    *   `axios`: Widely used, robust, good error handling, supports interceptors.
    *   `node-fetch`: A lightweight, browser-compatible `fetch` API implementation for Node.js.
    Given the need for a robust client, `axios` might offer slightly more out-of-the-box features for request/response manipulation and error handling, but `node-fetch` is perfectly capable. The choice largely depends on team preference.

*   **JSON-RPC Library:** A dedicated JSON-RPC client library for Node.js would simplify interaction. Since the `npmjs.com` search failed, specific recommendations cannot be made from the provided content. However, a generic JSON-RPC 2.0 client library that handles request ID management, error parsing, and method invocation over HTTP would be suitable. If a specific library is not found or preferred, a custom wrapper around `axios` or `node-fetch` can be easily built to conform to JSON-RPC 2.0 specifications.

### 3. Authentication Mechanisms

The Fiber RPC requires **Biscuit authentication** when listening on a public address.

*   The `mod.rs` file explicitly shows the use of `BiscuitAuthMiddleware` and `BiscuitAuth`.
*   The `start_rpc` function checks `config.biscuit_public_key`. If it's `None` and the `listening_addr` is public, it will `bail!` with an error: "Cannot listen on a public address without a biscuit public key set in the config."
*   If `config.biscuit_public_key` is provided, `BiscuitAuth::from_pubkey` is used, and `tracing::info!("Enable RPC auth")` is logged.
*   The `BiscuitAuthMiddleware` then uses this `auth` mechanism to process requests.

Therefore, the Node.js client library will need to implement or integrate with a Biscuit authentication client to generate and attach the necessary authorization tokens (likely in the `Authorization` header) to RPC requests.

### 4. Generated vs. Manually Written Client Library

A **hybrid approach** is best suited for building this client library:

1.  **Generated Types:** The Rust source code heavily uses `serde` with various attributes (`U128Hex`, `DisplayFromStr`, `EntityHex`, `Option<U64Hex>`, `rename_all`, `tag`, `content`). Manually translating these complex Rust structs and enums into accurate TypeScript interfaces and types is prone to errors and difficult to maintain. Tools like `ts-rs` (as suggested) or similar Rust-to-TypeScript type generators would be highly beneficial for automatically generating the TypeScript definitions for all `*Params` and `*Result` structs, ensuring type safety and correctness. This would cover `OpenChannelParams`, `OpenChannelResult`, `SendPaymentCommandParams`, `NewInvoiceParams`, `InvoiceResult`, `ListChannelsParams`, `ListChannelsResult`, `InvoiceParams`, `GetInvoiceResult`, `Script`, `CkbInvoice`, `ChannelState`, etc.

2.  **Manually Written Client Logic:** The actual RPC client logic (making HTTP requests, handling JSON-RPC envelopes, managing authentication, and calling the generated types) should be manually written. This allows for:
    *   Integration with chosen HTTP client (`axios` or `node-fetch`).
    *   Implementation of Biscuit authentication token generation and attachment.
    *   Custom error handling and retry logic.
    *   A user-friendly API surface for Node.js developers.

This combination leverages the strengths of both approaches: automated type generation for correctness and maintainability of data structures, and manual implementation for flexible and idiomatic client behavior.

### Gaps / Follow-up

1.  **`send_payment` Method Signature:** The exact RPC method name and return type for `send_payment` could not be found in the provided `payment.rs` content. This is a critical gap that needs to be filled by consulting the full `PaymentRpc` trait definition in the Fiber source code or the Fiber node's RPC documentation.
2.  **Full `ChannelRpc` Trait:** While `open_channel` and `list_channels` were inferred, the full `ChannelRpc` trait was not provided. Confirming all methods exposed by `ChannelRpcServerImpl` would be beneficial.
3.  **`types.rs` Content:** The `https://raw.githubusercontent.com/nervosnetwork/fiber/main/crates/fiber-lib/src/rpc/types.rs` file could not be fetched. While common CKB types were inferred, having the explicit definitions would ensure complete accuracy for types like `Hash256`, `Pubkey`, `PeerId`, `OutPoint`, `Currency`, `HashAlgorithm`, `CkbScript`, `CkbInvoiceStatus`, `PaymentStatus`, `TLCId`, `TlcStatus`, `FeatureVector`, `SecioKeyPair`, `PublicKey`, `SecretKey`, `SECP256K1`.
4.  **Node.js JSON-RPC Client Library Search:** A specific JSON-RPC client library for Node.js/TypeScript could not be recommended due to the `npmjs.com` search failure. Further investigation into available and well-maintained libraries (e.g., `jsonrpc-lite`, `@peculiar/json-rpc`) is needed.
5.  **Biscuit Authentication Client:** Research into existing Node.js/TypeScript libraries for generating Biscuit tokens would be necessary for implementing the authentication mechanism.

### Relevant Code/API Snippets

#### `open_channel` Parameters (from `channel.rs`)
```rust
#[serde_as]
#[derive(Serialize, Deserialize, Debug)]
pub struct OpenChannelParams {
    #[serde_as(as = "DisplayFromStr")]
    pub peer_id: PeerId,
    #[serde_as(as = "U128Hex")]
    pub funding_amount: u128,
    pub public: Option<bool>,
    // ... other fields ...
}

#[derive(Clone, Serialize, Deserialize)]
pub struct OpenChannelResult {
    pub temporary_channel_id: Hash256,
}
```

#### `new_invoice` Method and Parameters (from `invoice.rs`)
```rust
#[serde_as]
#[derive(Serialize, Deserialize, Default, Clone)]
pub struct NewInvoiceParams {
    #[serde_as(as = "U128Hex")]
    pub amount: u128,
    pub description: Option<String>,
    pub currency: Currency,
    // ... other fields ...
}

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct InvoiceResult {
    pub invoice_address: String,
    pub invoice: CkbInvoice,
}

#[cfg(not(target_arch = "wasm32"))]
#[rpc(server)]
trait InvoiceRpc {
    #[method(name = "new_invoice")]
    async fn new_invoice(
        &self,
        params: NewInvoiceParams,
    ) -> Result<InvoiceResult>;
    // ... other methods ...
}
```

#### Biscuit Authentication (from `mod.rs`)
```rust
use super::biscuit::BiscuitAuth;
// ...
pub async fn start_rpc (
    config: RpcConfig,
    // ...
) -> Result<()> {
    // ...
    if config.biscuit_public_key.is_none() && is_public_addr(listening_addr)? {
        bail!("Cannot listen on a public address without a biscuit public key set in the config. Please set rpc.biscuit_public_key or listen on a private interface.");
    }
    let auth = match config.biscuit_public_key.as_ref() {
        Some(key) => {
            let auth = BiscuitAuth::from_pubkey(key.to_string())?;
            tracing::info!("Enable RPC auth");
            Some(auth)
        }
        None => None,
    };
    // ...
    let rpc_middleware = RpcServiceBuilder::new().layer_fn(move |service| BiscuitAuthMiddleware {
        headers: headers.clone(),
        inner: service,
        auth: auth.clone(),
        enable_auth,
    });
    // ...
}
```