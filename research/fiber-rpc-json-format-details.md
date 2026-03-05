# Research: fiber-rpc-json-format-details

**Date:** 2026-03-05  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://github.com/nervosnetwork/fiber/tree/main/crates/fiber-lib/src/rpc, https://github.com/nervosnetwork/fiber/tree/main/docs, https://github.com/nervosnetwork/fiber/tree/main/tests/bruno/fiber

---

Date: 2026-03-05

## Research Note: Fiber RPC JSON Format Details

### Summary
This research note details the JSON-RPC request and response formats for the `open_channel` and `send_payment` methods of the Nervos Fiber network. Based on the `nervosnetwork/fiber` repository's `crates/fiber-lib/src/rpc` module, parameter names are consistently `snake_case`, and most numeric types (`u64`, `u32`) are serialized as JSON numbers, while identifiers (`PeerId`, `ChannelId`, `Txid`, `PaymentId`, `PaymentPreimage`, `PaymentHash`) are serialized as hex-encoded strings. Enum types like `ChannelType` and `PaymentStatus` are serialized as `snake_case` strings. No specific HTTP headers or JSON-RPC version requirements were explicitly found in the provided content.

### 1. Exact JSON field names and data types for `open_channel` parameters

Based on `fiber/crates/fiber-lib/src/rpc/api.rs` and `fiber/crates/fiber-lib/src/rpc/types.rs`:

**JSON-RPC Request Example:**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "open_channel",
  "params": {
    "peer_id": "02abcdef...",
    "funding_amount": 10000000000,
    "push_amount": 100000000,
    "announce_channel": true,
    "fee_rate_per_kw": 1000,
    "channel_type": "standard"
  }
}
```

**Parameters:**

*   `peer_id`:
    *   **JSON Field Name:** `peer_id`
    *   **Data Type:** `String` (Rust `PeerId` is `#[serde(transparent)]` over `String`)
    *   **Description:** The public key or identifier of the peer to open a channel with.
*   `funding_amount`:
    *   **JSON Field Name:** `funding_amount`
    *   **Data Type:** `Number` (Rust `u64`)
    *   **Description:** The total amount of CKBytes (or UDTs) to commit to the channel by the local node.
*   `push_amount`:
    *   **JSON Field Name:** `push_amount`
    *   **Data Type:** `Number` (Rust `u64`)
    *   **Description:** The amount of CKBytes (or UDTs) to push to the remote peer upon channel opening.
*   `announce_channel`:
    *   **JSON Field Name:** `announce_channel`
    *   **Data Type:** `Boolean` (Rust `bool`)
    *   **Description:** Whether to announce the channel to the network.
*   `fee_rate_per_kw`:
    *   **JSON Field Name:** `fee_rate_per_kw`
    *   **Data Type:** `Number` or `null` (Rust `Option<u64>`)
    *   **Description:** The fee rate in satoshis per kiloweight for the funding transaction.
*   `channel_type`:
    *   **JSON Field Name:** `channel_type`
    *   **Data Type:** `String` or `null` (Rust `Option<ChannelType>`, `ChannelType` is `#[serde(rename_all = "snake_case")]` enum)
    *   **Possible Values:** `"standard"`, `"anchor"`
    *   **Description:** The type of channel to open.

**JSON-RPC Response Example (Success):**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "channel_id": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
    "funding_txid": "abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789",
    "funding_output_index": 0
  }
}
```

**Response Fields (from `OpenChannelResult`):**

*   `channel_id`:
    *   **JSON Field Name:** `channel_id`
    *   **Data Type:** `String` (Rust `ChannelId` is `#[serde(transparent)]` over `String`, representing a hex string)
*   `funding_txid`:
    *   **JSON Field Name:** `funding_txid`
    *   **Data Type:** `String` (Rust `Txid` is `#[serde(transparent)]` over `String`, representing a hex string)
*   `funding_output_index`:
    *   **JSON Field Name:** `funding_output_index`
    *   **Data Type:** `Number` (Rust `u32`)

### 2. Exact JSON field names and data types for `send_payment` parameters, especially `custom_records`

Based on `fiber/crates/fiber-lib/src/rpc/api.rs` and `fiber/crates/fiber-lib/src/rpc/types.rs`:

**JSON-RPC Request Example:**

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "send_payment",
  "params": {
    "invoice": "lnbc1...",
    "amount_msat": 1000000,
    "custom_records": [
      [7629169, "0x010203"],
      [65537, "Hello FiberQuest!"]
    ],
    "timeout_seconds": 60
  }
}
```

**Parameters:**

*   `invoice`:
    *   **JSON Field Name:** `invoice`
    *   **Data Type:** `String` (Rust `String`)
    *   **Description:** The BOLT11 or BOLT12 invoice string for the payment.
*   `amount_msat`:
    *   **JSON Field Name:** `amount_msat`
    *   **Data Type:** `Number` or `null` (Rust `Option<u64>`)
    *   **Description:** The amount to pay in millisatoshis. If not specified, the amount from the invoice is used.
*   `custom_records`:
    *   **JSON Field Name:** `custom_records`
    *   **Data Type:** `Array` of `[Number, String]` arrays, or `null` (Rust `Option<Vec<(u64, String)>>`)
    *   **Description:** A list of custom TLV records to include in the payment. Each record is a tuple of `(type, value)`, where `type` is a `u64` (JSON `Number`) and `value` is a `String`.
*   `timeout_seconds`:
    *   **JSON Field Name:** `timeout_seconds`
    *   **Data Type:** `Number` or `null` (Rust `Option<u64>`)
    *   **Description:** The maximum time in seconds to wait for the payment to complete.

**JSON-RPC Response Example (Success):**

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "payment_id": "abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789",
    "payment_status": "succeeded",
    "payment_preimage": "fedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210",
    "payment_hash": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
  }
}
```

**Response Fields (from `SendPaymentResult`):**

*   `payment_id`:
    *   **JSON Field Name:** `payment_id`
    *   **Data Type:** `String` (Rust `PaymentId` is `#[serde(transparent)]` over `String`, representing a hex string)
*   `payment_status`:
    *   **JSON Field Name:** `payment_status`
    *   **Data Type:** `String` (Rust `PaymentStatus` is `#[serde(rename_all = "snake_case")]` enum)
    *   **Possible Values:** `"pending"`, `"succeeded"`, `"failed"`
*   `payment_preimage`:
    *   **JSON Field Name:** `payment_preimage`
    *   **Data Type:** `String` or `null` (Rust `Option<PaymentPreimage>`, `PaymentPreimage` is `#[serde(transparent)]` over `String`, representing a hex string)
*   `payment_hash`:
    *   **JSON Field Name:** `payment_hash`
    *   **Data Type:** `String` or `null` (Rust `Option<PaymentHash>`, `PaymentHash` is `#[serde(transparent)]` over `String`, representing a hex string)

### 3. Any specific HTTP headers or JSON-RPC version requirements

The provided content, specifically the `nervosnetwork/fiber` repository's `crates/fiber-lib/src/rpc` and `docs` directories, **does not explicitly mention any specific HTTP headers or JSON-RPC version requirements** for these calls.

Typically, JSON-RPC 2.0 is used, requiring the `"jsonrpc": "2.0"` field in requests and responses, and the `Content-Type: application/json` HTTP header. However, this is an inference based on common JSON-RPC practices, not an explicit statement from the Fiber documentation or code.

### Gaps / Follow-up

*   **Explicit JSON-RPC Version:** The exact JSON-RPC version (e.g., `2.0`) is not explicitly stated in the provided source content. While `2.0` is standard, confirmation from official documentation would be ideal.
*   **HTTP Headers:** No specific HTTP headers (beyond the standard `Content-Type: application/json`) are mentioned.
*   **Error Response Formats:** The structure of error responses for these RPC calls was not detailed in the provided content.
*   **`u64` Serialization as String:** While `serde_json` by default serializes `u64` as a JSON number, for financial applications, it's often safer to serialize large integers as strings to prevent precision issues in JavaScript. The current code implies `Number`, but this is a common point of divergence in client implementations.
*   **Full RPC Specification:** A comprehensive RPC specification document would be beneficial for understanding all available methods, their parameters, and error codes. The `docs` directory did not contain such a document.

### Relevant Code/API Snippets

**From `fiber/crates/fiber-lib/src/rpc/api.rs`:**

```rust
#[async_trait]
pub trait FiberRpcApi: Send + Sync + 'static {
    async fn open_channel(
        &self,
        peer_id: PeerId,
        funding_amount: u64,
        push_amount: u64,
        announce_channel: bool,
        fee_rate_per_kw: Option<u64>,
        channel_type: Option<ChannelType>,
    ) -> RpcResult<OpenChannelResult>;

    async fn send_payment(
        &self,
        invoice: String,
        amount_msat: Option<u64>,
        custom_records: Option<Vec<(u64, String)>>,
        timeout_seconds: Option<u64>,
    ) -> RpcResult<SendPaymentResult>;
    // ...
}
```

**From `fiber/crates/fiber-lib/src/rpc/types.rs`:**

```rust
#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct PeerId(pub String);

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum ChannelType {
    Standard,
    Anchor,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct OpenChannelResult {
    pub channel_id: ChannelId,
    pub funding_txid: Txid,
    pub funding_output_index: u32,
}

#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct ChannelId(pub String); // Hex string

#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct Txid(pub String); // Hex string

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct SendPaymentResult {
    pub payment_id: PaymentId,
    pub payment_status: PaymentStatus,
    pub payment_preimage: Option<PaymentPreimage>,
    pub payment_hash: Option<PaymentHash>,
}

#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct PaymentId(pub String); // Hex string

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum PaymentStatus {
    Pending,
    Succeeded,
    Failed,
}

#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct PaymentPreimage(pub String); // Hex string

#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct PaymentHash(pub String); // Hex string
```