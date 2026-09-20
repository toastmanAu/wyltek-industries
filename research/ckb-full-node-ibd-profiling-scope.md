# Research: ckb-full-node-ibd-profiling-scope

**Date:** 2026-04-01
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** HIGH
**Requester:** claude-code
**Seeds:** https://github.com/nervosnetwork/ckb,https://github.com/nervosnetwork/ckb/tree/develop/db,https://github.com/nervosnetwork/ckb-light-client/blob/develop/docs/STORAGE_REFACTORING.md

---

**Research Task ID:** ckb-full-node-ibd-profiling-scope
**Goal:** Scope out what's needed to profile CKB full node IBD performance.

---

## Structured Findings Document

### Summary

This document outlines the scoping requirements for profiling CKB full node Initial Block Download (IBD) performance. Due to "FETCH ERROR" when attempting to access the provided GitHub source content, specific details regarding CKB's internal configurations, exact code structure, and up-to-date performance metrics could not be directly extracted. The findings below are thus based on general Rust/Cargo/RocksDB best practices, inferences from the provided URLs and titles, and common blockchain node architecture.

The profiling effort will involve building the CKB node from source, likely from the `develop` branch, with specific Cargo flags to enable debug symbols in a release build. Standard Linux profiling tools like `perf` and `flamegraph` will be employed. Enabling RocksDB compaction statistics will require investigating CKB's configuration options or direct code modification. Significant gaps exist in estimating future disk space requirements and IBD times without direct access to CKB's current state or historical growth data. The `ckb-db` crate is inferred to be the primary database interface, and a storage refactoring effort, potentially leveraging traits, suggests a degree of abstraction from RocksDB that might be reusable by the light client.

### Key Findings

1.  **CKB Version for Profiling:**
    *   For profiling the most active development state and latest features, building from the `develop` branch of the `nervosnetwork/ckb` repository is recommended.
    *   Alternatively, for profiling a stable and released version, the latest official release tag should be used.
    *   Building from source is a prerequisite for generating binaries with debug symbols.

2.  **Cargo Build Flags for Profiling (Release with Debug Info):**
    *   To build an optimized binary suitable for performance profiling while retaining debug information for symbol resolution (essential for `perf` and `flamegraph`), the following Cargo command should be used:
        ```bash
        cargo build --release -C debuginfo=2
        ```
        *   `--release`: Enables compiler optimizations.
        *   `-C debuginfo=2`: Instructs `rustc` to emit full debug information, including line numbers and variable information, which is crucial for accurate stack traces in profiling tools.
    *   If a custom `release-with-debug` profile is defined in `Cargo.toml` (e.g., for specific CKB profiling features), it might be preferred:
        ```toml
        # Example in Cargo.toml
        [profile.release-with-debug]
        inherits = "release"
        debug = true
        ```
        Then build with:
        ```bash
        cargo build --profile=release-with-debug
        ```
        *(Note: Without access to CKB's `Cargo.toml`, the existence of such a profile is an assumption.)*

3.  **RocksDB Compaction Stats Logging in CKB:**
    *   CKB utilizes RocksDB as its underlying database. RocksDB provides extensive statistics, including compaction metrics.
    *   To enable RocksDB statistics logging, the `set_statistics` option needs to be configured for the `RocksDB` instance. This typically involves setting `Options::set_statistics(true)` and potentially `Options::set_log_level(Level::Info)` or `Level::Debug` to get detailed output.
    *   In CKB, this configuration would likely be exposed via:
        *   **Configuration File:** Check `ckb.toml` or similar configuration files for RocksDB-specific settings that can be toggled.
        *   **Environment Variables:** Some applications allow RocksDB options to be set via environment variables.
        *   **Code Modification:** If not exposed externally, direct modification of the `ckb-db` crate's initialization code would be necessary to enable `RocksDB` statistics. Look for where `RocksDB::Options` are created and passed to `DB::open()`.

4.  **Using `perf`/`flamegraph` on a Rust Binary:**
    *   **Prerequisites:**
        *   `perf` tool: Install `linux-perf` or `perf-tools` package (distribution-dependent, e.g., `linux-tools-common` on Ubuntu).
        *   `FlameGraph` scripts: Clone Brendan Gregg's FlameGraph repository.
        *   `rust-unmangle`: A script (often found within FlameGraph or similar profiling toolsets) to demangle Rust symbols.
    *   **Steps:**
        1.  **Build CKB with debug info:** `cargo build --release -C debuginfo=2`
        2.  **Run `perf record`:** Execute the CKB node with `perf` to collect samples during IBD.
            ```bash
            sudo perf record -F 99 -g -- target/release/ckb run --config <path_to_ckb_config.toml>
            ```
            *   `-F 99`: Sample at 99 Hz (recommended to avoid timer interrupt alignment issues).
            *   `-g`: Record call graphs (stack traces).
            *   `--`: Separator before the command to be profiled.
            *   `target/release/ckb run`: The CKB binary and its subcommand to start the node.
            *   `--config <path_to_ckb_config.toml>`: Specify the CKB configuration.
        3.  **Generate FlameGraph:** Process the `perf.data` output to create an SVG flamegraph.
            ```bash
            sudo perf script | stackcollapse-perf.pl | rust-unmangle.pl | flamegraph.pl > ckb_ibd_flamegraph.svg
            ```
            *   `perf script`: Converts `perf.data` into a human-readable format.
            *   `stackcollapse-perf.pl`: Collapses identical stack traces.
            *   `rust-unmangle.pl`: Demangles Rust-specific symbols (e.g., `_ZN3ckb...` to `ckb::...`).
            *   `flamegraph.pl`: Generates the interactive SVG flamegraph.

5.  **`ckb-db` Crate Structure and Light Client Trait Abstraction:**
    *   The `ckb/db` directory path strongly suggests that `ckb-db` is the dedicated crate for CKB's database interactions, likely wrapping RocksDB.
    *   The existence of `ckb-light-client/docs/STORAGE_REFACTORING.md` indicates an ongoing or completed effort to refactor storage, which commonly involves introducing traits for abstraction.
    *   **Inference:** It is highly probable that `ckb-db` provides a trait-based interface (e.g., `DBTrait` or similar) that abstracts the underlying RocksDB implementation. This would allow different database backends to be swapped out, or for different storage strategies (like those needed for a light client) to implement the same interface.
    *   **Reusability:** If such a trait abstraction exists, it could indeed be reused by the light client. The light client could implement a subset of this trait or a specialized version that interacts with a different, more lightweight storage mechanism or a remote full node, while still adhering to the core data access patterns defined by the trait.

### Questions Answered

1.  **Which CKB version to build from source with debug symbols?**
    *   The `develop` branch of `nervosnetwork/ckb` is recommended for profiling the latest codebase, or the latest stable release tag for a production-representative build.

2.  **Cargo build flags for profiling (release with debug info)?**
    *   `cargo build --release -C debuginfo=2` is the primary flag set. Alternatively, `cargo build --profile=release-with-debug` if a custom profile exists.

3.  **How much disk space a full mainnet IBD requires in 2026?**
    *   This cannot be determined from the provided sources. It is a significant gap requiring external data or projection.

4.  **How to enable RocksDB compaction stats logging in CKB?**
    *   This requires configuring RocksDB options within CKB, either via `ckb.toml` (or similar config), environment variables, or by modifying the `ckb-db` crate's source to enable `RocksDB::Options::set_statistics(true)` and appropriate log levels.

5.  **How to use perf/flamegraph on a Rust binary?**
    *   Detailed steps provided in Key Findings, including building with debug info, using `perf record` with `-F 99 -g`, and piping `perf script` output through `stackcollapse-perf.pl`, `rust-unmangle.pl`, and `flamegraph.pl`.

6.  **What the ckb-db crate looks like - how tightly coupled is it to RocksDB, could the light client trait abstraction be reused?**
    *   `ckb-db` is the database layer, likely wrapping RocksDB. The `STORAGE_REFACTORING.md` document strongly suggests a trait-based abstraction exists or is being developed, which would reduce tight coupling to RocksDB and make the abstraction reusable by the light client.

7.  **Estimated IBD time on modern hardware (i7-14700K, NVMe)?**
    *   This cannot be determined from the provided sources. It is a significant gap requiring external benchmarks or empirical testing.

### Gaps / Follow-up

1.  **Access to Source Content:** The primary gap is the inability to access the actual content of the provided GitHub URLs due to "FETCH ERROR". This significantly limits the depth and accuracy of the findings. **Action:** Re-attempt access to the URLs or request direct content.
2.  **Current CKB Mainnet Database Size:** Obtain the current size of a fully synced CKB mainnet database. This is crucial for estimating future growth. **Action:** Query existing CKB full node operators or check official CKB documentation/community channels for current disk usage.
3.  **2026 Disk Space Projection:** Develop a methodology to project disk space requirements for 2026. This would involve analyzing historical growth rates of the CKB blockchain state and applying a reasonable growth model. **Action:** Research CKB blockchain growth metrics (block size, state size, transaction count over time).
4.  **Existing IBD Performance Benchmarks:** Search for any existing IBD performance benchmarks or community reports for CKB, especially on modern hardware. This would provide a baseline for the estimated IBD time. **Action:** Consult CKB official documentation, forum discussions, or research papers for IBD performance data.
5.  **`ckb-db` Trait Definition:** Without access to `ckb/db` source, the exact traits and their methods are unknown. **Action:** Review the `ckb/db` crate's source code, particularly `src/lib.rs` and any `traits.rs` or `interface.rs` files, to understand the database abstraction layer.
6.  **`STORAGE_REFACTORING.md` Details:** The content of this document is critical for understanding the current and planned storage architecture. **Action:** Obtain and analyze the content of `ckb-light-client/docs/STORAGE_REFACTORING.md`.
7.  **CKB-specific Profiling Features/Configuration:** Investigate if CKB has any built-in profiling features, logging levels, or specific `Cargo.toml` profiles designed for performance analysis beyond standard Rust practices. **Action:** Review CKB's `Cargo.toml`, `ckb.toml` configuration, and any developer documentation related to performance tuning.

### Relevant Code/API Snippets

*(Note: Due to "FETCH ERROR" for source content, these are illustrative snippets based on general Rust/RocksDB practices, not direct extracts from CKB's codebase.)*

**1. Cargo Build Command for Profiling:**
```bash
cargo build --release -C debuginfo=2
```

**2. RocksDB Statistics Configuration (Conceptual Rust Snippet):**
```rust
use rocksdb::{DB, Options, StatisticsLevel};

fn open_ckb_db(path: &str) -> Result<DB, rocksdb::Error> {
    let mut opts = Options::default();
    opts.create_if_missing(true);
    opts.set_statistics(true); // Enable RocksDB statistics
    opts.set_stats_dump_period_sec(600); // Dump stats every 10 minutes
    opts.set_log_level(rocksdb::LogLevel::Info); // Set log level for RocksDB internal logs

    // Further CKB-specific RocksDB options would be set here
    // e.g., column families, block cache size, write buffer size, etc.

    DB::open(&opts, path)
}
```

**3. `perf` and `flamegraph` Commands:**
```bash
# Step 1: Build CKB (as above)
cargo build --release -C debuginfo=2

# Step 2: Record performance data during IBD
sudo perf record -F 99 -g -- target/release/ckb run --config /path/to/ckb.toml

# Step 3: Generate flamegraph
# Ensure FlameGraph scripts are in your PATH or specify full paths
sudo perf script | stackcollapse-perf.pl | rust-unmangle.pl | flamegraph.pl > ckb_ibd_flamegraph.svg
```

**4. Conceptual `ckb-db` Trait Abstraction (Inferred):**
```rust
// In ckb-db/src/lib.rs or ckb-db/src/traits.rs
pub trait CkbStore {
    type Error;

    fn get_block(&self, hash: &H256) -> Result<Option<Block>, Self::Error>;
    fn insert_block(&self, block: &Block) -> Result<(), Self::Error>;
    // ... other core CKB data access methods
}

// In ckb-db/src/rocksdb_impl.rs
pub struct RocksdbStore {
    db: rocksdb::DB,
    // ... other RocksDB specific fields
}

impl CkbStore for RocksdbStore {
    type Error = rocksdb::Error;

    fn get_block(&self, hash: &H256) -> Result<Option<Block>, Self::Error> {
        // RocksDB specific implementation
        unimplemented!()
    }
    fn insert_block(&self, block: &Block) -> Result<(), Self::Error> {
        // RocksDB specific implementation
        unimplemented!()
    }
}

// In ckb-light-client/src/storage.rs (conceptual reuse)
pub struct LightClientStore<T: CkbStore> {
    inner: T,
    // ... light client specific fields
}

impl<T: CkbStore> LightClientStore<T> {
    pub fn new(store_impl: T) -> Self {
        LightClientStore { inner: store_impl }
    }
    // ... light client specific logic using inner.get_block(), etc.
}
```
