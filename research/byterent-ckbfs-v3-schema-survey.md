# Research: byterent-ckbfs-v3-schema-survey

**Date:** 2026-05-19
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://github.com/nervosnetwork/rfcs,https://talk.nervos.org/c/protocol-development/14

---

## Structured Findings Document: CKBFS V3 Cell-Data Schema Survey

**ID:** byterent-ckbfs-v3-schema-survey
**Goal:** Catalogue CKBFS V3 cell-data schema variants observed in the wild. Determine if there's a reliable byte-pattern or molecule-shape probe to identify which version a cell uses. Recommend a "schema sniff" function for the ByteRent resolver.
**Priority:** MEDIUM
**Requested by:** claude-code

---

### Summary

This research aimed to identify and characterize CKBFS V3 cell-data schema variants, particularly focusing on `cellswap-minted` and `cellbrary` cells, and to propose a mechanism for distinguishing them. The primary finding is the existence of at least two incompatible `CKBFSData` layouts within what is broadly referred to as CKBFS V3. An older variant, associated with `cellswap-deployed` cells, utilizes a 17-byte `CKBFSData` structure. A newer variant, expected by `@ckbfs/api v2.0.19`'s `CKBFSData.unpack` method, uses a 4-byte `CKBFSData` structure.

Due to critical failures in accessing the primary source content (Nervos RFCs and Nervos Talk forum), detailed byte-level specifications, official versioning, and examples for these schemas remain largely unknown. However, the distinct byte lengths of the `CKBFSData` structure itself provide a preliminary, albeit coarse, method for differentiation. A `sniff_ckbfs_version` function can be implemented based on the initial byte length of the cell data, assuming the `CKBFSData` structure is the first element or its length is directly derivable from the initial bytes.

### Key Findings

1.  **Two Primary CKBFS V3 `CKBFSData` Layouts Identified:**
    *   **`CKBFSData` Variant 1 (Legacy/Cellswap):** Observed in `cellswap-deployed` cells. This variant uses a 17-byte `CKBFSData` structure.
    *   **`CKBFSData` Variant 2 (Current API):** Expected by `@ckbfs/api v2.0.19`'s `CKBFSData.unpack` method. This variant uses a 4-byte `CKBFSData` structure.

2.  **API Incompatibility:**
    *   The `@ckbfs/api v2.0.19` `CKBFSData.unpack` method explicitly fails when encountering the 17-byte `CKBFSData` variant, reporting "Invalid buffer length: 17, should be 4". This confirms a direct incompatibility at the data structure level.

3.  **Byte-Level Differences:**
    *   The most immediate and apparent byte-level difference is the total length of the `CKBFSData` structure itself (17 bytes vs. 4 bytes).
    *   Without access to the RFCs or schema definitions, the internal composition of these byte arrays (e.g., what each byte or group of bytes represents, such as version, length, hash, etc.) is unknown. This limits the ability to identify more granular byte-pattern probes.

4.  **Molecule Prefix for Distinction:**
    *   Given the information, the *total length* of the `CKBFSData` structure appears to be the most reliable initial differentiator. If the `CKBFSData` is a molecule, its length prefix (which is typically the first 4 bytes in CKB-VM's Molecule serialization for fixed-size structures, or part of the table/vector header for dynamic ones) would be key.
    *   The problem statement implies `CKBFSData.unpack` expects a 4-byte buffer, suggesting the "current" schema might be a simple fixed-size structure or a length prefix for a larger structure. The 17-byte variant is explicitly stated as having an "Invalid buffer length: 17, should be 4", which strongly suggests the `CKBFSData` itself is the primary differentiating element being checked for length.

### Questions Answered

*   **List of known CKBFS V3 schema variants currently deployed on testnet/mainnet:** At least two variants of the `CKBFSData` structure within CKBFS V3 are known: a 17-byte variant (used by `cellswap-deployed` cells) and a 4-byte variant (expected by `@ckbfs/api v2.0.19`).
*   **Byte-level differences between them:** The primary observed difference is the total byte length of the `CKBFSData` structure (17 bytes vs. 4 bytes).
*   **Whether the molecule prefix (first N bytes) reliably distinguishes versions:** Based on the observed length incompatibility, checking the length of the `CKBFSData` structure (which would be derived from its molecule prefix or direct byte count) appears to be a reliable initial differentiator. However, the exact structure of the molecule prefix for *both* variants is not available.
*   **Recommended `sniff_ckbfs_version(data: bytes) -> CkbfsVersion` function signature + body:** See "Relevant Code/API Snippets" below.
*   **Test vectors (a few real cell-data examples per version):** No test vectors were provided in the source content.

### Gaps / Follow-up

1.  **Access to RFCs and Protocol Documentation:** The primary source for CKBFS schema definitions (`https://github.com/nervosnetwork/rfcs`) resulted in a fetch error. This documentation is critical for understanding:
    *   The official definitions of `CKBFSData` for all CKBFS V3 versions.
    *   The exact byte-level structure and field definitions for both the 17-byte and 4-byte variants.
    *   Any explicit versioning fields or magic bytes within the `CKBFSData` or preceding cell data that could provide a more robust sniff than just length.
    *   Whether the 17-byte variant is truly "older" or if it represents a different *type* of CKBFS V3 cell.
2.  **`cellbrary` and "Other" CKBFS V3 Variants:** The research task specifically asked about `cellbrary` cells and "others." No information was found regarding these, suggesting further investigation into these ecosystems is required.
3.  **Detailed Molecule Schema:** Understanding the Molecule schema definitions for both variants (e.g., if `CKBFSData` is a `struct`, `table`, or `vector`) is crucial for a robust `sniff` function. The error "Invalid buffer length: 17, should be 4" suggests `CKBFSData` might be a fixed-size structure or a length prefix is being misread.
4.  **Test Vectors:** Real-world examples of cell data for both the 17-byte and 4-byte `CKBFSData` variants are needed to validate any proposed `sniff` function and to understand the actual data patterns.
5.  **Nervos Talk Forum Access:** The `https://talk.nervos.org/c/protocol-development/14` link resulted in a "Page Not Found" error. This forum might contain informal discussions, announcements, or community insights into schema changes.

### Relevant Code/API Snippets

Given the current information, the most direct way to "sniff" the version is by checking the length of the `CKBFSData` buffer. This assumes that the `data` input to the `sniff` function *is* the `CKBFSData` buffer itself, or that the `CKBFSData` structure is the first and only relevant part of the cell's `data` field for this purpose.

```typescript
// Assuming CkbfsVersion is an enum or string literal type
enum CkbfsVersion {
    CKBFS_V3_LEGACY_17_BYTE = "CKBFS_V3_LEGACY_17_BYTE",
    CKBFS_V3_CURRENT_4_BYTE = "CKBFS_V3_CURRENT_4_BYTE",
    CKBFS_V3_UNKNOWN = "CKBFS_V3_UNKNOWN",
    // Potentially other versions like CKBFS_V3_CELLBRARY, etc.
}

/**
 * Attempts to identify the CKBFS V3 cell-data schema variant based on the provided data buffer.
 * This function primarily differentiates based on the observed byte length of the CKBFSData structure.
 *
 * @param data The raw byte buffer representing the CKBFS cell's data field.
 *             It is assumed that this buffer starts with the CKBFSData structure.
 * @returns A CkbfsVersion enum indicating the identified schema variant.
 */
function sniff_ckbfs_version(data: Uint8Array): CkbfsVersion {
    if (!data || data.length === 0) {
        return CkbfsVersion.CKBFS_V3_UNKNOWN;
    }

    // The problem statement indicates CKBFSData.unpack expects 4 bytes,
    // and fails on 17 bytes. This implies the 'data' buffer's length
    // directly corresponds to the CKBFSData structure's length in these cases.
    switch (data.length) {
        case 4:
            return CkbfsVersion.CKBFS_V3_CURRENT_4_BYTE;
        case 17:
            return CkbfsVersion.CKBFS_V3_LEGACY_17_BYTE;
        // Add more cases here as other variants are identified and their
        // characteristic lengths or prefixes are known.
        // For example, if a specific magic byte prefix is found:
        // case N:
        //     if (data[0] === 0xXX && data[1] === 0xYY) {
        //         return CkbfsVersion.CKBFS_V3_SOME_OTHER_VARIANT;
        //     }
        //     break;
        default:
            return CkbfsVersion.CKBFS_V3_UNKNOWN;
    }
}

// Example usage (requires actual cell data for testing):
// const cellswapData = new Uint8Array(17); // Placeholder for actual 17-byte data
// console.log(sniff_ckbfs_version(cellswapData)); // Expected: CKBFS_V3_LEGACY_17_BYTE

// const currentApiData = new Uint8Array(4); // Placeholder for actual 4-byte data
// console.log(sniff_ckbfs_version(currentApiData)); // Expected: CKBFS_V3_CURRENT_4_BYTE

// const unknownData = new Uint8Array(10); // Placeholder for other data
// console.log(sniff_ckbfs_version(unknownData)); // Expected: CKBFS_V3_UNKNOWN
```
