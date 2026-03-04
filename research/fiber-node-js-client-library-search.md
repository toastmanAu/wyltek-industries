# Research: fiber-node-js-client-library-search

**Date:** 2026-03-05  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://github.com/nervosnetwork/fiber/issues?q=nodejs+client+sdk, https://github.com/nervosnetwork/fiber/issues?q=typescript+client+sdk, https://github.com/search?q=nervos+fiber+javascript&type=repositories, https://github.com/search?q=nervos+fiber+typescript&type=repositories

---

## Research Note: fiber-node-js-client-library-search

**Date:** 2026-03-05

### Summary

Based on the provided content, there is no explicit mention or evidence of an official or community-maintained Node.js/TypeScript client library for the Fiber Network RPC. The provided GitHub search results for "nodejs client sdk," "typescript client sdk," "nervos fiber javascript," and "nervos fiber typescript" did not yield any specific library or code examples within the provided text. Therefore, for interacting with the Fiber node's RPC (e.g., `open_channel`, `send_payment`), a custom client implementation using a standard HTTP client like `axios` or `fetch` within a wrapper class would be the recommended approach. No existing JavaScript/TypeScript examples of direct Fiber RPC interaction were found in the provided materials.

### 1. Is there an official or community-maintained Node.js/TypeScript client library for Fiber RPC?

Based *solely* on the provided source content, there is no explicit mention or evidence of an official or community-maintained Node.js/TypeScript client library for the Fiber RPC. The provided GitHub search links (e.g., `https://github.com/nervosnetwork/fiber/issues?q=nodejs+client+sdk`, `https://github.com/search?q=nervos+fiber+javascript&type=repositories`) only show the search query and generic GitHub navigation elements, not actual search results or repository listings that would indicate the existence of such a library.

### 2. If not, what are the recommended patterns for interacting with the Fiber RPC from Node.js (e.g., raw `axios`, a wrapper class)?

Given the absence of an identified client library in the provided content, the recommended pattern for interacting with the Fiber RPC from Node.js would be to implement a custom client. Since Fiber nodes expose RPC methods (e.g., `open_channel`, `send_payment`) and the Fiber node RPC is accessible via an address like `127.0.0.1:8227`, it is highly probable that it uses a standard HTTP-based JSON-RPC interface.

A robust approach would involve:

*   **HTTP Client:** Using a well-established HTTP client library like `axios` or the native `fetch` API (available in recent Node.js versions) to make POST requests to the Fiber node's RPC endpoint.
*   **Wrapper Class:** Encapsulating the RPC calls within a dedicated TypeScript/Node.js class (e.g., `FiberRpcClient`). This class would handle:
    *   **Endpoint Configuration:** Storing the Fiber node's RPC URL (e.g., `http://127.0.0.1:8227`).
    *   **Request Formatting:** Constructing JSON-RPC compliant request bodies (e.g., `{"jsonrpc": "2.0", "method": "open_channel", "params": [...], "id": 1}`).
    *   **Response Parsing:** Deserializing JSON responses and extracting the `result` or handling the `error` field.
    *   **Method Abstraction:** Providing clear, type-safe methods for each Fiber RPC call (e.g., `openChannel(params: OpenChannelParams): Promise<OpenChannelResult>`).
*   **Error Handling:** Implementing comprehensive error handling for network issues (connection refused, timeouts) and RPC-specific errors (e.g., invalid parameters, internal server errors returned by the Fiber node). This would involve `try-catch` blocks around HTTP requests and checking the `error` field in the JSON-RPC response.
*   **State Management:** While Fiber itself manages channel state, the client application (the Node.js sidecar) would need to manage its own state related to Fiber interactions, such as tracking active channel IDs, payment statuses, and potentially re-establishing connections or retrying payments.

### 3. Are there any existing examples of Fiber RPC interaction in JavaScript/TypeScript within the Nervos ecosystem?

Based *solely* on the provided content, there are no existing examples of direct Fiber RPC interaction in JavaScript/TypeScript within the Nervos ecosystem. The provided GitHub search results did not yield any specific code examples. The "Project Ground Truth" mentions `@ckb-ccc/core` as a JS SDK for building CKB transactions, but this is for Layer 1 on-chain interactions and not directly for the off-chain Fiber RPC.

### Gaps / Follow-up

1.  **Actual GitHub Search Results:** The provided content only included the search queries for GitHub, not the actual results. A manual search on GitHub for "nervosnetwork/fiber nodejs client," "nervosnetwork/fiber typescript client," or similar terms would be necessary to definitively confirm the existence or absence of a client library or examples.
2.  **Fiber RPC Documentation:** Detailed documentation for the Fiber node's RPC interface (e.g., exact method names, parameter types, response structures, error codes) would be crucial for building a custom client. This information was not present in the provided content.
3.  **Community Forums/Discord:** Checking Nervos community forums or Discord channels might reveal ongoing efforts or discussions around a Fiber Node.js/TypeScript client that isn't yet publicly indexed or widely known.

### Relevant Code/API Snippets

Given the recommendation for a custom wrapper class, here's a conceptual TypeScript snippet demonstrating how such a client might be structured using `axios`:

```typescript
// Conceptual types based on Fiber RPC methods mentioned in Ground Truth
interface OpenChannelParams {
  peer_id: string;
  capacity: number; // CKBytes
  push_amount: number; // CKBytes
}

interface OpenChannelResult {
  channel_id: string;
}

interface SendPaymentParams {
  invoice: string; // BOLT11 or similar invoice
}

interface SendPaymentResult {
  payment_hash: string;
  status: 'pending' | 'complete' | 'failed';
}

interface RpcRequest<T> {
  jsonrpc: "2.0";
  method: string;
  params: T;
  id: number;
}

interface RpcResponse<T> {
  jsonrpc: "2.0";
  result?: T;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
  id: number;
}

class FiberRpcClient {
  private rpcUrl: string;
  private nextId: number = 1;

  constructor(rpcUrl: string) {
    this.rpcUrl = rpcUrl;
  }

  private async callRpc<P, R>(method: string, params: P): Promise<R> {
    const request: RpcRequest<P> = {
      jsonrpc: "2.0",
      method: method,
      params: params,
      id: this.nextId++,
    };

    try {
      // Using axios as an example HTTP client
      const response = await fetch(this.rpcUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const rpcResponse: RpcResponse<R> = await response.json();

      if (rpcResponse.error) {
        throw new Error(`Fiber RPC Error ${rpcResponse.error.code}: ${rpcResponse.error.message}`);
      }

      if (rpcResponse.result === undefined) {
          throw new Error("Fiber RPC response missing result field.");
      }

      return rpcResponse.result;

    } catch (error) {
      console.error(`Error calling Fiber RPC method ${method}:`, error);
      throw error; // Re-throw to allow calling code to handle
    }
  }

  public async openChannel(params: OpenChannelParams): Promise<OpenChannelResult> {
    return this.callRpc<OpenChannelParams, OpenChannelResult>("open_channel", params);
  }

  public async sendPayment(params: SendPaymentParams): Promise<SendPaymentResult> {
    return this.callRpc<SendPaymentParams, SendPaymentResult>("send_payment", params);
  }

  // Add other Fiber RPC methods here (e.g., list_channels, new_invoice)
  // public async listChannels(): Promise<ChannelInfo[]> { ... }
  // public async newInvoice(amount: number, description: string): Promise<string> { ... }
}

// Example Usage in the Node.js sidecar:
/*
import { FiberRpcClient } from './FiberRpcClient'; // Assuming the class is in a file

const fiberClient = new FiberRpcClient("http://127.0.0.1:8227"); // Or "http://N100:8237" via SSH tunnel

async function setupGamePayments() {
  try {
    // Open a channel at game start
    const channel = await fiberClient.openChannel({
      peer_id: "some_fiber_peer_id", // This would need to be known
      capacity: 1000000000, // 1 CKB
      push_amount: 100000000, // 0.1 CKB pushed to peer
    });
    console.log("Channel opened:", channel.channel_id);

    // Later, trigger a payment on game event
    const invoice = "lnbc1..."; // An invoice generated by the recipient
    const payment = await fiberClient.sendPayment({ invoice });
    console.log("Payment sent:", payment.payment_hash, "Status:", payment.status);

  } catch (error) {
    console.error("Failed to interact with Fiber:", error);
  }
}

setupGamePayments();
*/
```