# Research: fiber-rpc-api-reference

**Date:** 2026-03-05  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://raw.githubusercontent.com/nervosnetwork/fiber/main/docs/en/rpc.md, https://raw.githubusercontent.com/nervosnetwork/fiber/main/src/rpc/mod.rs

---

## Research Note: fiber-rpc-api-reference

**Date:** 2026-03-05

### Summary
This research aimed to extract the complete Fiber RPC API, including methods, parameters, return types, and examples, with a specific focus on channel management, payments, peer management, and node information. The goal was to build a mental model for a JavaScript/TypeScript agent client interacting with this API. Unfortunately, both provided source URLs (`https://raw.githubusercontent.com/nervosnetwork/fiber/main/docs/en/rpc.md` and `https://raw.githubusercontent.com/nervosnetwork/fiber/main/src/rpc/mod.rs`) returned HTTP 404 Not Found errors. As a result, no content was available for analysis, and therefore, no API details could be extracted or described.

### Channel Management (open_channel, accept_channel, list_channels)
The provided source content was not accessible due to HTTP 404 errors. Therefore, no information regarding `open_channel`, `accept_channel`, `list_channels` methods, their parameters, return types, or examples could be found.

### Payments (send_payment, get_invoice, list_payments)
The provided source content was not accessible due to HTTP 404 errors. Therefore, no information regarding `send_payment`, `get_invoice`, `list_payments` methods, their parameters, return types, or examples could be found.

### Peer Management (connect_peer, list_peers)
The provided source content was not accessible due to HTTP 404 errors. Therefore, no information regarding `connect_peer`, `list_peers` methods, their parameters, return types, or examples could be found.

### Node Info
The provided source content was not accessible due to HTTP 404 errors. Therefore, no information regarding methods to retrieve node information, their parameters, return types, or examples could be found.

### Mental Model of a JS/TS Agent Client
Due to the complete absence of API details from the provided sources, it is not possible to build a mental model of what a JS/TS agent client would look like against this API. The fundamental structure of requests (e.g., JSON-RPC), method names, and data structures are unknown.

### Gaps / Follow-up
The primary gap is the complete lack of source content. To fulfill the research goal, the following follow-up actions are necessary:
1.  **Obtain Correct Source URLs:** Identify and provide correct, accessible URLs for the Fiber RPC documentation (e.g., `rpc.md`) and/or the relevant Rust source code defining the RPC interface (e.g., `src/rpc/mod.rs` or similar files within the `rpc` module).
2.  **Re-run Analysis:** Once valid content is available, re-run the analysis to extract all requested API details.
3.  **Build Mental Model:** With the API details, construct the mental model for a JS/TS client, including potential client library structure, request/response patterns, and data serialization/deserialization.

### Relevant Code/API Snippets
No relevant code or API snippets could be extracted as the provided source content was inaccessible.