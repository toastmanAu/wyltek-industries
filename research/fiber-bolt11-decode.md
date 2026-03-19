# Research: fiber-bolt11-decode

**Date:** 2026-03-20  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://raw.githubusercontent.com/nervosnetwork/fiber/main/crates/fiber-lib/src/invoice/invoice_impl.rs, https://raw.githubusercontent.com/nervosnetwork/fiber/main/crates/fiber-lib/src/invoice/utils.rs, https://raw.githubusercontent.com/nervosnetwork/fiber/main/crates/fiber-lib/src/invoice/mod.rs, https://raw.githubusercontent.com/lightning/bolts/master/11-payment-encoding.md

---

Date: 2026-03-20

## Summary

Fiber invoices, as implemented in `nervosnetwork/fiber-lib`, closely follow the BOLT #11 payment encoding standard, leveraging `bech32` for the overall structure. They consist of a Human-Readable Part (HRP) specifying the currency (Fibb, Fibt, Fibd for CKB mainnet, testnet, devnet respectively) and an optional amount, followed by a Data Part containing a timestamp, various tagged fields, and an ECDSA/secp256k1 signature. A key distinction is the use of arithmetic compression (`ar_encompress`) for the invoice data part to achieve shorter encoded addresses. The `CkbInvoice` struct in Rust provides methods for constructing, hashing, and validating these invoices, including signature recovery. This design is crucial for the FiberQuest project, which requires decoding invoices to trigger micropayments.

## Questions to Answer

Since no specific questions were provided, I will answer common research questions related to the topic "fiber-bolt11-decode" based on the provided content and the project context (FiberQuest, Node.js client gap).

### 1. How do Fiber invoices relate to the BOLT #11 specification?

Fiber invoices are designed to be a variant of the BOLT #11 payment encoding, adapting it for the Nervos CKB blockchain. The `nervosnetwork/fiber` implementation explicitly references BOLT #11 in its `CkbInvoice` struct documentation: "Represents a syntactically and semantically correct lightning BOLT11 invoice".

Key similarities with BOLT #11:
*   **Bech32 Encoding**: Both use `bech32` for encoding, as stated in BOLT #11's "Encoding Overview" and evident in Fiber's `bech32` crate usage in `invoice_impl.rs` and `utils.rs`.
*   **Human-Readable Part (HRP)**: Fiber invoices have an HRP composed of a currency prefix and an optional amount, similar to BOLT #11's `prefix` (`lnbc`, `lntb`) and `amount` + `multiplier`. Fiber defines its own `Currency` enum (`Fibb`, `Fibt`, `Fibd`) for CKB networks.
*   **Data Part Structure**: Both include a timestamp, tagged fields, and an ECDSA/secp256k1 signature. The `CkbInvoice` struct contains `timestamp`, `payment_hash`, `attrs` (attributes mapping to tagged fields), and `signature`.
*   **Signature**: Both use `secp256k1` ECDSA signatures over a SHA-256 hash of the HRP and data part. Fiber's `CkbInvoice::hash` and `CkbInvoice::validate_signature` methods confirm this.

Key differences/adaptations for Fiber:
*   **Currency Prefixes**: Fiber defines `fibb`, `fibt`, `fibd` for CKB mainnet, testnet, and devnet respectively, instead of Bitcoin-specific prefixes like `lnbc`. This is handled by `Currency::from_str` and `nom_scan_hrp` in `utils.rs`.
*   **Data Compression**: Fiber uses arithmetic compression (`ar_encompress` in `utils.rs`) for the invoice data part before `bech32` encoding to make the final address shorter. BOLT #11 does not specify this compression.
*   **Tagged Fields**: While the concept of tagged fields is the same, the specific `Attribute` enum in `invoice_impl.rs` (`FinalHtlcTimeout`, `Description`, `PaymentSecret`, `UdtScript`, `PayeePublicKey`, `HashAlgorithm`, `Feature`) might have different internal representations or a subset/superset of BOLT #11's defined tags (`p`, `s`, `d`, `m`, `n`, `h`, `x`, `c`, `f`, `r`, `9`). For example, `PaymentSecret` and `PayeePublicKey` directly map to BOLT #11's `s` and `n` fields. `UdtScript` is specific to CKB's UDTs.

### 2. What is the structure of a Fiber invoice, including its Human-Readable Part (HRP) and Data Part?

A Fiber invoice, represented by the `CkbInvoice` struct in `invoice_impl.rs`, has two main parts:

**Human-Readable Part (HRP)**:
*   **Prefix**: Consists of the `Currency` (e.g., "fibb", "fibt", "fibd") followed by an optional amount.
    *   `Currency`: An enum `Currency` (`Fibb`, `Fibt`, `Fibd`) representing CKB mainnet, testnet, and devnet.
    *   `Amount`: An optional `u128` value representing the payment amount. Unlike BOLT #11 which uses multipliers (m, u, n, p), the Fiber code shows `amount` as a direct `U128Hex` without explicit multipliers in the HRP parsing (`parse_hrp` in `utils.rs` directly parses numeric strings).
*   **Example HRP construction**: `CkbInvoice::hrp_part` generates this as `format!("{}}{}", self.currency, self.amount.map_or_else(|| "".to_string(), |x| x.to_string()))`.
*   **Parsing**: The `parse_hrp` function in `utils.rs` uses `nom` parsers (`nom_scan_hrp`) to extract the currency string and the optional numeric amount.

**Data Part**:
*   **Timestamp**: A `u128` value (`timestamp: u128`) representing the invoice creation time, similar to BOLT #11's "seconds-since-1970 (35 bits, big-endian)".
*   **Payment Hash**: A `Hash256` (`payment_hash: Hash256`), which is the SHA256 hash of the payment preimage, corresponding to BOLT #11's `p` field.
*   **Attributes (Tagged Fields)**: A vector of `Attribute` enum variants (`attrs: Vec<Attribute>`). These are key-value pairs providing additional information about the invoice. Defined `Attribute` types include:
    *   `FinalHtlcTimeout(u64)`
    *   `FinalHtlcMinimumExpiryDelta(u64)`
    *   `ExpiryTime(Duration)`
    *   `Description(String)` (corresponds to BOLT #11 `d` field)
    *   `FallbackAddr(String)` (corresponds to BOLT #11 `f` field)
    *   `UdtScript(CkbScript)` (CKB-specific for UDTs)
    *   `PayeePublicKey(PublicKey)` (corresponds to BOLT #11 `n` field)
    *   `HashAlgorithm(HashAlgorithm)`
    *   `Feature(FeatureVector)` (corresponds to BOLT #11 `9` field)
    *   `PaymentSecret(Hash256)` (corresponds to BOLT #11 `s` field)
*   **Signature**: An optional `InvoiceSignature` (`signature: Option<InvoiceSignature>`) which is an ECDSA `RecoverableSignature` over the SHA-256 hash of the HRP and the compressed data part. This corresponds to BOLT #11's `signature` field.
*   **Compression**: The `CkbInvoice::data_part` method first converts `InvoiceData` into `RawInvoiceData`, then compresses it using `ar_encompress` (arithmetic compression) before encoding it into `u5` (base32) format for `bech32`.

### 3. What is the process for encoding and decoding a Fiber invoice?

**Encoding Process (High-Level, based on `CkbInvoice` methods):**
1.  **Construct HRP**: The `CkbInvoice::hrp_part()` method generates the HRP string by concatenating the `currency` and the `amount` (if present).
2.  **Prepare Data Part**: The `InvoiceData` (containing timestamp, payment hash, and attributes) is serialized into `RawInvoiceData`.
3.  **Compress Data Part**: The serialized `RawInvoiceData` is compressed using the `ar_encompress` function (`utils.rs`), which employs an arithmetic encoder (`arcode` crate).
4.  **Base32 Encode Compressed Data**: The compressed byte array is then encoded into a `Vec<u5>` (base32 format) using `write_base32`.
5.  **Compute Preimage Hash**: The HRP bytes and the base32-encoded (but not yet bech32-encoded) data part are combined using `construct_invoice_preimage` (`utils.rs`). This preimage is then SHA-256 hashed (`Sha256::hash`) to get the message digest for signing.
6.  **Sign Invoice**: If the invoice is to be signed, a `secp256k1` ECDSA `RecoverableSignature` is generated over the SHA-256 hash. The `CkbInvoice::update_signature` method handles this.
7.  **Bech32 Encode**: Finally, the HRP and the base32-encoded data (including the signature, which is part of the `data_part` in `u5` format) are combined and encoded using `bech32::encode` to produce the final invoice string. (This final step is implied by the `bech32` crate usage and BOLT #11 spec, though not explicitly shown in a single `encode` function in the provided Rust snippets).

**Decoding Process (High-Level, inferred from `utils.rs` and `invoice_impl.rs`):**
1.  **Bech32 Decode**: The input invoice string is first decoded from `bech32` format into its HRP and data parts. (This is handled by `bech32` crate, not explicitly shown in provided code).
2.  **Parse HRP**: The HRP string is parsed using `parse_hrp` (`utils.rs`) to extract the `Currency` and optional `amount`.
3.  **Decompress Data Part**: The base32-encoded data part (excluding the signature, which is recovered separately) is converted back to bytes and then decompressed using `ar_decompress` (`utils.rs`), which employs an arithmetic decoder.
4.  **Deserialize Invoice Data**: The decompressed bytes are deserialized back into the `InvoiceData` struct (timestamp, payment hash, attributes).
5.  **Recover Signature**: The `CkbInvoice::recover_payee_pub_key` method uses the SHA-256 hash of the HRP and the *uncompressed* data part (excluding the signature itself) along with the provided `RecoverableSignature` to derive the payee's public key.
6.  **Validate Signature**: The `CkbInvoice::validate_signature` method checks if the recovered public key matches an included payee public key (if any) and verifies the ECDSA signature against the invoice's hash.

### 4. What are the specific currency identifiers used in Fiber invoices?

The Fiber invoice implementation defines the following currency identifiers within its `Currency` enum in `invoice_impl.rs`:
*   **`Fibb`**: Represents the mainnet currency of CKB.
*   **`Fibt`**: Represents the testnet currency of the CKB network.
*   **`Fibd`**: Represents the devnet currency of the CKB network (default).

These are used in the HRP of the invoice, for example, "fibb1280" or "fibt".

### 5. What are the implications for building a Node.js Fiber client library for FiberQuest?

The provided Rust code (`fiber-lib`) serves as the authoritative implementation for Fiber invoice encoding and decoding. For FiberQuest, which has a "key gap: no official Node.js Fiber client library exists — must build from Rust RPC source," understanding this Rust implementation is critical.

Implications for a Node.js implementation:
*   **Bech32 Library**: A robust `bech32` library for JavaScript will be required to handle the primary encoding/decoding of the invoice string.
*   **Arithmetic Compression**: The `ar_encompress` and `ar_decompress` functions are custom to Fiber. A JavaScript equivalent of the `arcode` library's arithmetic encoding/decoding logic (specifically `Model::builder().num_bits(8).eof(EOFKind::EndAddOne).build()`) will need to be implemented or ported. This is a complex component and a potential point of divergence if not precisely replicated.
*   **Secp256k1 Signatures**: A JavaScript library for `secp256k1` (e.g., `noble-secp256k1` or similar) will be needed for generating and verifying ECDSA signatures, including public key recovery.
*   **SHA256 Hashing**: A standard SHA256 hashing library for JavaScript will be necessary for computing the invoice hash.
*   **Data Structure Mapping**: The `CkbInvoice`, `InvoiceData`, `Attribute`, `Currency`, `Hash256`, `CkbScript` structures will need to be accurately mapped to JavaScript objects/classes. This includes handling `U128Hex`, `U64Hex`, `EntityHex`, and `duration_hex` serialization/deserialization as defined by `serde_as`.
*   **HRP Parsing**: The logic in `parse_hrp` and `nom_scan_hrp` (using `nom` for parsing) will need to be reimplemented in JavaScript, likely using regular expressions or a custom parser.
*   **CKB-Specific Types**: Handling `CkbScript` (which wraps `ckb_types::packed::Script`) will require understanding how CKB scripts are represented and serialized in JavaScript, likely leveraging `@ckb-ccc/core` or similar CKB SDKs.
*   **RPC Interaction**: The Node.js client will need to interact with the Fiber node's FNN binary RPC methods (`open_channel`, `send_payment`, `new_invoice`, `get_invoice`, etc.). The invoice decoding logic will be used to parse invoices received from or generated for the Fiber node.

The `fiber-lib` Rust code provides the definitive specification for how these components interact, which is invaluable for ensuring compatibility and correctness in a new Node.js implementation.

## Gaps / Follow-up

1.  **Detailed Tagged Field Mapping**: While the `Attribute` enum lists Fiber's tagged fields, a precise mapping to BOLT #11's 5-bit `type` identifiers and `data_length` encoding (e.g., how `Description(String)` maps to `d` (13) with variable `data_length`) is not fully detailed in the provided Rust code. This would be crucial for a complete BOLT #11-compliant parser.
2.  **Full Bech32 Encoding/Decoding Flow**: The provided Rust code shows parts of the HRP and data part construction and hashing, but a single, comprehensive function demonstrating the final `bech32::encode` and initial `bech32::decode` of a full `CkbInvoice` string is not present. This would clarify how the compressed data and signature are ultimately integrated into the `bech32` payload.
3.  **Arithmetic Compression Details**: While `ar_encompress` and `ar_decompress` are provided, the specific `arcode` library version and its exact configuration (`Model::builder().num_bits(8).eof(EOFKind::EndAddOne).build()`) are critical. Porting this to JavaScript requires deep understanding of the arithmetic coding algorithm used.
4.  **Node.js Library Choice for Arithmetic Coding**: Identifying or developing a suitable JavaScript library for arithmetic coding that matches the Rust `arcode` implementation would be a significant follow-up task for the FiberQuest Node.js sidecar.

## Relevant Code/API Snippets

### `CkbInvoice` Structure (Rust)
```rust
// From invoice_impl.rs
#[serde_as]
#[derive(Debug, Clone, Eq, PartialEq, Serialize, Deserialize)]
pub struct CkbInvoice {
    pub currency: Currency,
    #[serde_as(as = "Option<U128Hex>")]
    pub amount: Option<u128>,
    pub signature: Option<InvoiceSignature>,
    pub data: InvoiceData,
}

#[serde_as]
#[derive(Debug, Clone, Eq, PartialEq, Serialize, Deserialize)]
pub struct InvoiceData {
    #[serde_as(as = "U128Hex")]
    pub timestamp: u128,
    pub payment_hash: Hash256,
    pub attrs: Vec<Attribute>,
}
```

### Currency Definition (Rust)
```rust
// From invoice_impl.rs
#[derive(Debug, Clone, Copy, Eq, PartialEq, Serialize, Deserialize, Default)]
pub enum Currency {
    Fibb, // Mainnet
    Fibt, // Testnet
    #[default]
    Fibd, // Devnet
}

impl FromStr for Currency {
    type Err = InvoiceError;
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "fibb" => Ok(Self::Fibb),
            "fibt" => Ok(Self::Fibt),
            "fibd" => Ok(Self::Fibd),
            _ => Err(InvoiceError::UnknownCurrency(s.to_string())),
        }
    }
}
```

### HRP Construction (Rust)
```rust
// From invoice_impl.rs
impl CkbInvoice {
    fn hrp_part(&self) -> String {
        format!(
            "{}{}",
            self.currency,
            self.amount
                .map_or_else(|| "".to_string(), |x| x.to_string()),
        )
    }
    // ...
}
```

### Data Part Compression (Rust)
```rust
// From invoice_impl.rs
impl CkbInvoice {
    // ...
    // Use the lostless compression algorithm to compress the invoice data.
    // To make sure the final encoded invoice address is shorter
    fn data_part(&self) -> Vec<u5> {
        let invoice_data = RawInvoiceData::from(self.data.clone());
        let compressed = ar_encompress(invoice_data.as_slice()).expect("compress invoice data");
        let mut base32 = Vec::with_capacity(compressed.len());
        compressed
            .write_base32(&mut base32)
            .expect("encode in base32");
        base32
    }
    // ...
}
```

### Arithmetic Compression/Decompression (Rust)
```rust
// From utils.rs
pub(crate) fn ar_encompress(data: &[u8]) -> IoResult<Vec<u8>> {
    let mut model = Model::builder().num_bits(8).eof(EOFKind::EndAddOne).build();
    let mut compressed_writer = BitWriter::new(Cursor::new(vec![]));
    let mut encoder = ArithmeticEncoder::new(48);
    for &sym in data {
        encoder.encode(sym as u32, &model, &mut compressed_writer)?;
        model.update_symbol(sym as u32);
    }
    encoder.encode(model.eof(), &model, &mut compressed_writer)?;
    encoder.finish_encode(&mut compressed_writer)?;
    compressed_writer.pad_to_byte()?;
    Ok(compressed_writer.get_ref().get_ref().clone())
}

pub(crate) fn ar_decompress(data: &[u8]) -> IoResult<Vec<u8>> {
    let mut model = Model::builder().num_bits(8).eof(EOFKind::EndAddOne).build();
    let mut input_reader = BitReader::<MSB>::new(data);
    let mut decoder = ArithmeticDecoder::new(48);
    let mut decompressed_data = vec![];
    while !decoder.finished() {
        let sym = decoder.decode(&model, &mut input_reader)?;
        model.update_symbol(sym);
        decompressed_data.push(sym as u8);
    }
    decompressed_data.pop(); // remove the EOF
    Ok(decompressed_data)
}
```

### Invoice Preimage Construction for Hashing (Rust)
```rust
// From utils.rs
pub(crate) fn construct_invoice_preimage(
    hrp_bytes: &[u8],
    data_without_signature: &[u5],
) -> Vec<u8> {
    let mut preimage = Vec::<u8>::from(hrp_bytes);
    let mut data_part = Vec::from(data_without_signature);
    let overhang = (data_part.len() * 5) % 8;
    if overhang > 0 {
        // add padding if data does not end at a byte boundary
        data_part.push(u5::try_from_u8(0).expect("u5 from u8"));
        // if overhang is in (1..3) we need to add u5(0) padding two times
        if overhang < 3 {
            data_part.push(u5::try_from_u8(0).expect("u5 from u8"));
        }
    }
    preimage.extend_from_slice(
        &Vec::<u8>::from_base32(&data_part)
            .expect("No padding error may occur due to appended zero above."),
    );
    preimage
}
```

### Signature Validation and Recovery (Rust)
```rust
// From invoice_impl.rs
impl CkbInvoice {
    // ...
    fn hash(&self) -> [u8; 32] {
        let hrp = self.hrp_part();
        let data = self.data_part(); // This data_part includes the signature in u5 format
        let preimage = construct_invoice_preimage(hrp.as_bytes(), &data);
        let mut hash: [u8; 32] = Default::default();
        hash.copy_from_slice(&Sha256::hash(&preimage).to_byte_array());
        hash
    }

    fn validate_signature(&self) -> bool {
        // ... uses SECP256K1.verify_ecdsa ...
    }

    pub fn recover_payee_pub_key(&self) -> Result<PublicKey, secp256k1::Error> {
        let hash = Message::from_digest_slice(&self.hash()[..])
            .expect("Hash is 32 bytes long, same as MESSAGE_SIZE");
        SECP256K1.recover_ecdsa(
            &hash,
            &self
                .signature
                .as_ref()
                .expect("signature must be present")
                .0,
        )
    }
    // ...
}
```