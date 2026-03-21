# Research: ckb-gcs-block-filters-js-revisit

**Date:** 2026-03-09  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://raw.githubusercontent.com/nervosnetwork/ckb/develop/block-filter/src/filter.rs, https://raw.githubusercontent.com/nervosnetwork/ckb/develop/block-filter/src/lib.rs, https://raw.githubusercontent.com/nervosnetwork/ckb/develop/block-filter/Cargo.toml, https://raw.githubusercontent.com/nervosnetwork/ckb/develop/sync/src/filter/get_block_filters_process.rs, https://raw.githubusercontent.com/nervosnetwork/ckb/develop/test/src/specs/sync/block_filter.rs, https://raw.githubusercontent.com/nervosnetwork/rfcs/master/rfcs/0044-ckb-light-client/0044-ckb-light-client.md

---

Date: 2026-03-09

## Summary
CKB implements GCS (Golomb-Rice Coded Set) block filters within the `ckb-block-filter` crate. These filters are built by the CKB node for each block, using data derived from transaction outputs. Clients can request these filters via the `GetBlockFilters` protocol message, receiving a `BlockFilters` response containing block hashes and the raw filter data. The precise GCS encoding parameters (P, M, hash function) and whether the filters commit to lock script hashes or full script hashes are determined by an external utility function (`ckb_types::utilities::build_filter_data`) whose source is not provided in the given content. Consequently, implementing a pure-JS GCS membership check or checking existing JS SDKs for GCS filter code cannot be fully addressed from the provided information.

## Questions to Answer

### Exact GCS encoding (P and M parameters, hash function)
The exact GCS encoding parameters (P and M) and the hash function used are not explicitly defined within the provided source code for the `ckb-block-filter` crate. The `filter.rs` file shows that the filter data is built using `ckb_types::utilities::build_filter_data`. The implementation details of this `build_filter_data` function, which would specify these parameters, are not included in the provided content.

**Citation:** `https://raw.githubusercontent.com/nervosnetwork/ckb/develop/block-filter/src/filter.rs` (line 42, 100)

### What `get_block_filter` RPC returns (response schema)
The CKB node responds to a `GetBlockFilters` request with a `BlockFilters` message. This message contains the following schema:
*   `start_number`: The starting block number for the requested filters (type `Uint64`).
*   `block_hashes`: A vector of `Byte32` representing the hashes of the blocks for which filters are returned.
*   `filters`: A vector of `Bytes` (raw byte arrays), where each `Bytes` entry is the GCS filter data for the corresponding block hash.

The response can contain up to `FILTERS_BATCH_SIZE` (which is 1000 as per `test/src/specs/sync/block_filter.rs`) block hashes and their corresponding filters, or fewer if the total encoded size exceeds 1.8MB.

**Citation:**
*   `https://raw.githubusercontent.com/nervosnetwork/ckb/develop/sync/src/filter/get_block_filters_process.rs` (lines 48-53)
*   `https://raw.githubusercontent.com/nervosnetwork/ckb/develop/test/src/specs/sync/block_filter.rs` (lines 173-181)

### Whether filters commit to lock script hashes or full script hashes
The provided content does not explicitly state whether the GCS filters commit to lock script hashes or full script hashes (lock + type scripts). The `build_filter_data` function (from `ckb_types::utilities`, not provided) takes a `FilterDataProvider` which provides `CellOutput` objects. A `CellOutput` contains both `lock` and `type_` scripts. Without the source code for `ckb_types::utilities::build_filter_data`, it is impossible to determine which specific components of the `CellOutput` are used to generate the filter elements.

**Citation:** `https://raw.githubusercontent.com/nervosnetwork/ckb/develop/block-filter/src/filter.rs` (lines 20-22, 100)

### How to implement a pure-JS GCS membership check
Implementing a pure-JS GCS membership check requires knowing the exact GCS encoding parameters (P and M) and the hash function used. As these details are not available in the provided source content (they reside within `ckb_types::utilities::build_filter_data`), it is not possible to describe how to implement a pure-JS GCS membership check based on the given information.

### Check if `ckb-js-toolkit`, `@ckb-ccc/core`, or `lumos` have any GCS filter code
The provided content does not include the source code or documentation for `ckb-js-toolkit`, `@ckb-ccc/core`, or `lumos`. Therefore, it is not possible to determine if these libraries contain GCS filter code based solely on the provided information.

## Gaps / Follow-up
1.  **GCS Encoding Parameters:** The most significant gap is the lack of information regarding the exact GCS encoding parameters (P and M) and the specific hash function used within `ckb_types::utilities::build_filter_data`. To implement client-side GCS filter checks, this information is critical. A follow-up would be to examine the `ckb-types` crate source code, specifically the `utilities` module, to find the implementation of `build_filter_data`.
2.  **Filter Commitment Details:** Clarification is needed on whether the filters commit to lock script hashes, full script hashes, or other cell output data. This also depends on the internal logic of `ckb_types::utilities::build_filter_data`.
3.  **RPC Method for Single Block Filter:** While `GetBlockFilters` returns a batch, the prompt asks about `get_block_filter` (singular). It's unclear if there's a separate RPC for a single block filter or if `GetBlockFilters` is the intended method, potentially requesting a batch of one. The provided content only shows `GetBlockFilters` in the `sync` protocol.
4.  **Existing JS SDKs:** To determine if `ckb-js-toolkit`, `@ckb-ccc/core`, or `lumos` have GCS filter code, their respective repositories or documentation would need to be consulted.

## Relevant Code/API Snippets

**`BlockFilters` Response Structure (from `sync/src/filter/get_block_filters_process.rs`):**
```rust
let content = packed::BlockFilters::new_builder()
    .start_number(start_number)
    .block_hashes(block_hashes)
    .filters(filters)
    .build();
```

**Filter Data Building (from `block-filter/src/filter.rs`):**
```rust
use ckb_types::{
    // ...
    utilities::{FilterDataProvider, build_filter_data},
};

// ...

impl FilterDataProvider for WrappedChainDB {
    fn cell(&self, out_point: &OutPoint) -> Option<CellOutput> {
        self.inner
            .get_transaction(&out_point.tx_hash())
            .and_then(|(tx, _)| tx.outputs().get(out_point.index().into()))
    }
}

// ...

let (filter_data, missing_out_points) = build_filter_data(provider, &transactions);
// ...
db_transaction
    .insert_block_filter(
        &header.hash(),
        &(filter_data.clone().into()),
        &parent_block_filter_hash,
    )
```