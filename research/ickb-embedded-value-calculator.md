# Research: ickb-embedded-value-calculator

**Date:** 2026-03-22  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://raw.githubusercontent.com/ickb/whitepaper/main/2024_overview.md, https://api.github.com/repos/ickb/v1-core/contents/, https://api.github.com/repos/ickb/v1-core/contents/src, https://raw.githubusercontent.com/ickb/v1-interface/main/src/utils/ickbValue.ts

---

Date: 2026-03-22

## Summary
Implementing an iCKB→CKB value calculator on ESP32 hardware requires fetching the current exchange rate and performing a simple calculation. Based on the provided content, the specific mathematical formula for iCKB conversion, details about the `@ickb/core-utils` package, and a dedicated public RPC endpoint for the rate are not available. However, the ESP32-P4 is highly capable of fetching data via HTTP/HTTPS (with ESP-IDF's mbedTLS) and performing calculations. The simplest implementation would involve the ESP32 making an HTTP request to a public API or a local proxy (e.g., on the existing Pi5 infrastructure) to retrieve the rate, then computing and displaying the CKB equivalent.

## Questions to Answer

### 1. What is the mathematical formula for iCKB→CKB conversion? What on-chain data does it need?
The provided content does not contain the mathematical formula for iCKB→CKB conversion or specify what on-chain data it needs. The `ickb/whitepaper` link resulted in a `[FETCH ERROR: HTTP Error 404: Not Found]`, and the `ickb/v1-core` repository listing only shows `LICENSE`, `README.md`, `schemas`, and `scripts`, none of which detail the conversion logic.

### 2. Does the @ickb/core-utils npm package expose a simple rate/value calculation function?
The provided content does not include any information about the `@ickb/core-utils` npm package. The `ickb/v1-interface` link, which might have contained such utilities, resulted in a `[FETCH ERROR: HTTP Error 404: Not Found]`. Therefore, it is not possible to determine from the given information whether this package exposes a simple rate/value calculation function.

### 3. Can the conversion rate be fetched from a single public RPC call? What endpoint/method?
The provided content does not specify a public RPC endpoint or method for fetching the iCKB/CKB conversion rate. While a CKB mainnet full node (`ckbnode` at `192.168.68.87:8114`) and a Fiber node (`ckbnode` at `127.0.0.1:8227`) are mentioned, there is no indication that these expose the iCKB conversion rate directly. Fiber is explicitly stated to be for payment channels and "CANNOT store arbitrary data or files."

### 4. Can an ESP32 (limited RAM, no TLS by default) feasibly fetch and compute this, or does it need a proxy?
An ESP32-P4 can feasibly fetch and compute the iCKB→CKB conversion rate.

*   **Fetching:** The ESP32-P4 has WiFi and TCP capabilities, as confirmed by the `ckb-light-esp` project. While ESP-IDF's default HTTP client might not include TLS, mbedTLS is available in ESP-IDF, allowing for secure HTTPS connections if required. Fetching a simple JSON response from an API endpoint is well within the network capabilities of the ESP32-P4.
*   **Computing:** The ESP32-P4 features a dual-core 400MHz RISC-V processor and 768KB SRAM (with PSRAM support). A simple mathematical conversion (e.g., multiplication or division) would require negligible CPU and RAM resources, especially given that `ckb-light-esp` runs with 79% flash free and negligible live tracking CPU usage (0.08-0.40ms).
*   **Proxy Option:** A proxy is not strictly *needed* for feasibility but could simplify implementation. Given Wyltek's existing infrastructure, a Node.js proxy running on the Pi5 (`192.168.68.82`) could:
    *   Handle TLS complexities if the upstream API is HTTPS.
    *   Cache the conversion rate to reduce external API calls.
    *   Provide a simple, unencrypted HTTP endpoint for the ESP32 to query, reducing the ESP32's code complexity and resource usage.
    *   This approach leverages existing assets like the Pi5, which already hosts `ckb-stratum-proxy` and `ckb-node-dashboard`.

### 5. What is the simplest possible implementation: fetch rate from public API → display CKB equivalent?
The simplest possible implementation for the ESP32, assuming a suitable rate source exists, would be:

1.  **ESP32 WiFi Connection:** The ESP32 connects to the local WiFi network.
2.  **HTTP Request:** The ESP32 makes an HTTP GET request to a predefined endpoint that provides the iCKB/CKB conversion rate.
    *   **Option A (Direct Public API):** If a simple, unauthenticated, and ideally HTTP (or HTTPS with mbedTLS) public API exists that returns the rate in a straightforward format (e.g., JSON), the ESP32 would query this directly.
    *   **Option B (Local Proxy):** If no such public API is readily available, or if it requires complex authentication/TLS, the simplest approach for the ESP32 would be to query a custom proxy running on the Pi5. This proxy would handle the complexities of fetching the rate from an upstream source (e.g., a CKB full node, a specific iCKB service, or a market data API) and expose it via a simple HTTP endpoint (e.g., `http://192.168.68.82:XXXX/ickb_rate`) that returns a minimal JSON or plain text value.
3.  **Parse Response:** The ESP32 parses the HTTP response to extract the current iCKB/CKB exchange rate.
4.  **Compute Value:** The ESP32 applies the fetched rate to the iCKB amount to calculate the equivalent CKB value (e.g., `CKB_Value = iCKB_Amount * Exchange_Rate`).
5.  **Display:** The calculated CKB value is displayed on the ESP32's output (e.g., an LCD screen, serial output).

This approach minimizes the on-chain interaction and complex protocol handling for the ESP32, relying instead on standard HTTP communication.

## Gaps / Follow-up
*   **iCKB Whitepaper/Documentation:** The primary gap is the lack of access to the iCKB whitepaper (`2024_overview.md`) and the `v1-interface` source code. These would likely contain the exact mathematical formula for conversion, details on how the rate is determined (e.g., on-chain contract state, oracle), and potentially official SDK functions or recommended RPC endpoints.
*   **Official iCKB Rate API:** There is no explicit mention of an official or recommended public API endpoint for fetching the iCKB/CKB conversion rate. Identifying such an endpoint is crucial for the simplest implementation.
*   **@ickb/core-utils Functionality:** Without access to the package documentation or source, it's unknown if `@ickb/core-utils` provides a ready-made function for rate calculation.
*   **On-chain Rate Source:** If the rate is derived from on-chain data (e.g., a specific CKB cell's data field), further research would be needed to identify the cell's `type_id` or `code_hash` and how to interpret its data. The `ckb-light-esp` could potentially fetch this cell's data, but the specific cell structure and interpretation are unknown.

## Relevant Code/API Snippets
No specific iCKB-related code or API snippets for rate calculation were found in the provided content due to fetch errors and limited repository listings. However, the existing `ckb-light-esp` project demonstrates the ESP32's capability for network communication:

*   **`ckb-light-esp`:** Implements `TCP → SecIO → Yamux → Identify → LightClient → GetLastState → SendLastState`. This confirms the ESP32's ability to establish TCP connections and handle complex network protocols, which would be a prerequisite for any HTTP/HTTPS fetching.
*   **`wyltek-embedded-builder`:** This C framework for ESP32 would be the ideal environment to integrate the HTTP client and calculation logic.