# Research: fiber-rpc-api-verification

**Date:** 2026-03-05  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://github.com/nervosnetwork/fiber/tree/main/crates/fiber-lib/src/rpc, https://github.com/nervosnetwork/fiber/tree/main/tests/bruno/fiber, https://github.com/nervosnetwork/fiber/issues

---

Date: 2026-03-05

## Research Note: fiber-rpc-api-verification

### Summary
The primary goal of obtaining concrete, verifiable documentation or examples of the Fiber Network Node's RPC API for channel management and payments could not be fully achieved based on the provided web content. The GitHub link to `fiber/crates/fiber-lib/src/rpc` provided only the HTML structure of a directory listing, not the actual Rust source code files that define the RPC methods, parameters, and return types. Furthermore, the link to `tests/bruno/fiber` resulted in a 404 error, preventing access to potential API examples. Consequently, the specific JSON-RPC structures, authentication requirements, and supported protocols (HTTP/WebSocket) remain unverified from the given sources.

### Questions to Answer

#### 1. What is the exact JSON-RPC request and response structure for `open_channel`? What parameters are mandatory/optional?
The exact JSON-RPC request and response structure for `open_channel`, including its mandatory and optional parameters, cannot be determined from the provided web content. The link `https://github.com/nervosnetwork/fiber/tree/main/crates/fiber-lib/src/rpc` points to the directory where the RPC implementation code resides, but the actual contents of the Rust source files defining these structures are not accessible in the provided text.

#### 2. What is the exact JSON-RPC request and response structure for `send_payment`? Can it take a `recipient_node_id` directly, or is an invoice always required?
The exact JSON-RPC request and response structure for `send_payment` is not available in the provided web content. Therefore, it cannot be determined whether `send_payment` can take a `recipient_node_id` directly or if an invoice is always required. The relevant source code files containing this definition were not provided.

#### 3. What is the exact JSON-RPC request and response structure for `close_channel`? What parameters are needed to initiate settlement?
The exact JSON-RPC request and response structure for `close_channel`, along with the specific parameters required to initiate settlement, cannot be found in the provided web content. The necessary details would typically be defined within the Rust source files in the `fiber-lib/src/rpc` directory, which were not accessible.

#### 4. Is there any form of authentication (e.g., API key, token) required for local RPC access (127.0.0.1)?
The provided web content does not contain any information regarding authentication requirements (e.g., API key, token) for local RPC access to the Fiber node (127.0.0.1). This detail would typically be found in documentation or configuration files, neither of which were accessible or provided.

#### 5. Are there any WebSocket RPC endpoints available, or is it purely HTTP POST?
The provided web content does not indicate whether Fiber offers WebSocket RPC endpoints or if it is purely HTTP POST. The directory listing for `fiber-lib/src/rpc` does not reveal this implementation detail, and no other documentation was available to confirm the supported RPC transport protocols.

### Gaps / Follow-Up
The primary gap in this research is the inability to access the actual content of the Rust source files within the `fiber/crates/fiber-lib/src/rpc` directory. Without direct access to these files (e.g., `mod.rs`, `api.rs`, `types.rs`, or specific method files), it is impossible to verify the precise JSON-RPC structures, parameters, and return types for `open_channel`, `send_payment`, and `close_channel`.

**Follow-up actions required:**
1.  **Direct Source Code Review:** Access the actual Rust source code files within `https://github.com/nervosnetwork/fiber/tree/main/crates/fiber-lib/src/rpc` to extract the RPC definitions. Look for structs or enums defining request/response payloads and method signatures.
2.  **Investigate `fiber/crates/fiber-rpc`:** There might be a separate crate specifically for the RPC server/client which could contain more explicit definitions or examples.
3.  **Check for other documentation:** Search the `nervosnetwork/fiber` repository for any other documentation files (e.g., in a `docs` folder, even if not explicitly named `rpc.md`) that might describe the RPC interface.
4.  **Examine `fiber-node` binary:** If possible, inspect the `fiber-node` binary's help output or configuration options for clues about RPC authentication or WebSocket support.
5.  **Community/Issue Tracker:** Review the `nervosnetwork/fiber/issues` for discussions or requests related to RPC documentation or usage examples, although the provided link to issues did not yield specific API details.

### Relevant Code/API Snippets
No relevant code or API snippets could be extracted from the provided web content, as it consisted solely of GitHub directory listing HTML and a 404 error for the `tests/bruno/fiber` directory.