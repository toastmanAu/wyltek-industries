# Research: agentpay-openclaw-skill-integration

**Date:** 2026-03-21  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://raw.githubusercontent.com/toastmanAu/wyEspAgentPay/main/README.md, https://raw.githubusercontent.com/nervosnetwork/fiber/main/README.md, https://docs.openclaw.ai/skills/, https://raw.githubusercontent.com/toastmanAu/rag-system/master/README.md

---

Date: 2026-03-21

## Summary

This research investigates the integration of `agentPay` into an OpenClaw skill, focusing on architecture, OpenClaw framework, integration points, and security. A critical limitation is that the primary source for `agentPay`'s architecture (`wyEspAgentPay/main/README.md`) was unavailable (HTTP 404 error), preventing a detailed analysis of its internal workings. Consequently, specific answers regarding `agentPay`'s components, interface, and MVP path are inferred based on OpenClaw's skill structure and the known context of Fiber Network, rather than direct `agentPay` documentation. OpenClaw skills are directory-based, defined by a `SKILL.md` file, and can expose tools for agents. Security concerns, particularly around handling secrets and untrusted code, are explicitly addressed by OpenClaw.

---

## Questions to Answer

### 1. What is the current agentPay architecture and what components need to be exposed as a skill?

**Answer:**
The `README.md` for `wyEspAgentPay` (https://raw.githubusercontent.com/toastmanAu/wyEspAgentPay/main/README.md) could not be fetched (HTTP Error 404: Not Found). Therefore, I cannot describe the current `agentPay` architecture or specify its internal components that would need to be exposed as an OpenClaw skill based on the provided content.

However, given the project context (Nervos CKB, ESP32 hardware, Fiber Network, FiberQuest), if `agentPay` is intended to facilitate payments via the Fiber Network, it would likely involve:
*   **Payment initiation:** Methods to create and send payments (e.g., `send_payment`, `new_invoice` from Fiber FNN RPC).
*   **Channel management:** Methods to open/close channels (e.g., `open_channel`, `shutdown_channel`).
*   **State querying:** Methods to list channels or check invoice status (e.g., `list_channels`, `get_invoice`).
*   **Signing capabilities:** As Fiber nodes have "built-in wallet functionality to sign funding transactions", `agentPay` would need access to or an interface for signing CKB transactions. Given the `wyEspAgentPay` name, this might imply an ESP32-based signing module.

### 2. What is the OpenClaw skill framework and what contract must a skill fulfill?

**Answer:**
The OpenClaw skill framework uses "AgentSkills-compatible skill folders to teach the agent how to use tools" (docs.openclaw.ai/skills/).

A skill fulfills the following contract:
*   **Structure:** Each skill is a directory containing a `SKILL.md` file.
*   **Content:** The `SKILL.md` file must include YAML frontmatter and instructions. This file defines the skill's capabilities, how to use them, and potentially exposes "slash commands" or "tools" that the agent can invoke.
*   **Loading:** Skills are loaded from specific locations with precedence:
    1.  `<workspace>/skills` (highest precedence, per-agent)
    2.  `~/.openclaw/skills` (managed/local, shared across agents)
    3.  Bundled skills (shipped with OpenClaw install, lowest precedence)
    *   Plugins can also ship skills by listing directories in `openclaw.plugin.json`.
*   **Configuration:** Skills can be configured via `skills.load.extraDirs` in `~/.openclaw/openclaw.json` for additional skill folders. Environment variables and API keys can be injected per agent run via `skills.entries.*.env` and `skills.entries.*.apiKey`.

### 3. What are 2-3 examples of OpenClaw skills that deal with external systems (APIs, blockchains, etc.) and what patterns do they follow?

**Answer:**
The OpenClaw documentation lists various "Tools" that skills can leverage to interact with external systems, though it does not provide specific `SKILL.md` examples for these interactions. Based on the tool names, the following can be inferred to deal with external systems:

1.  **Browser Tool:** This tool inherently interacts with an external system (the internet/web) to fetch and process web content. The pattern would involve the agent invoking the `Browser` tool with a URL or query, and the tool returning parsed information or performing actions on a webpage.
2.  **Web and search Tool:** Similar to the Browser tool, this interacts with external search engines and web resources. The pattern would be an agent providing a search query, and the tool returning search results or summaries from external web services.
3.  **Exec Tool:** This tool allows the agent to execute arbitrary commands on the host system. This is a powerful pattern for interacting with *any* external system that can be controlled via command-line interfaces (e.g., calling external APIs via `curl`, interacting with blockchain CLIs, running custom scripts). The pattern involves the agent formulating a command string, and the `Exec Tool` executing it and returning stdout/stderr.

These tools follow a pattern where the skill defines an interface (e.g., a slash command or a tool invocation) that, when triggered by the agent, calls an underlying OpenClaw tool. This tool then performs the interaction with the external system (web, file system, command line, etc.) and returns the result to the agent.

### 4. What would the agentPay skill's interface look like (init, methods, error handling)?

**Answer:**
Without the `agentPay` architecture details, the exact interface cannot be specified. However, based on OpenClaw's skill framework and the known capabilities of the Fiber Network, a hypothetical `agentPay` skill interface would likely involve:

*   **Initialization (`init`):**
    *   The skill would be loaded by OpenClaw from its directory.
    *   Configuration parameters (e.g., Fiber node RPC endpoint, `FIBER_SECRET_KEY_PASSWORD` or other wallet access details, default payment amounts) would be injected via environment variables (`skills.entries.*.env`) or specified in the `SKILL.md`'s YAML frontmatter.
    *   It might establish a connection to the local Fiber Network Node (FNN) via its RPC interface (e.g., `127.0.0.1:8227` for the `ckbnode`'s FNN, or `192.168.68.91` for the N100's FNN).
    *   Given the "Key gap: no official Node.js Fiber client library exists — must build from Rust RPC source" for FiberQuest, the skill would likely need to either directly call the FNN RPC (e.g., using `Exec Tool` to run `curl` commands against the FNN RPC) or wrap a custom Node.js client that interacts with the FNN RPC.

*   **Methods (exposed as slash commands or tools):**
    *   `/agentpay open_channel <peer_id> <capacity_ckb> <push_amount_ckb>`: To open a payment channel.
    *   `/agentpay send_payment <invoice_string>`: To send a payment using a Fiber invoice.
    *   `/agentpay request_payment <amount_ckb> <description>`: To generate a new Fiber invoice.
    *   `/agentpay list_channels`: To list active Fiber channels.
    *   `/agentpay get_balance`: To query the balance of the Fiber node's wallet.
    *   `/agentpay close_channel <channel_id>`: To close a specific Fiber channel.

*   **Error Handling:**
    *   The skill's instructions in `SKILL.md` would describe expected errors (e.g., insufficient funds, channel not found, invalid invoice, network issues).
    *   When invoked, the skill (or the underlying tool/script it calls) would return error messages to the agent, allowing the agent to react (e.g., retry, inform the user, suggest alternative actions).
    *   For example, if `send_payment` fails due to insufficient channel liquidity, the skill might return an error message indicating this, which the agent could then interpret.

### 5. Are there any permission/security concerns with integrating agentPay directly into an agent?

**Answer:**
Yes, there are significant permission and security concerns, as explicitly highlighted in the OpenClaw documentation:

*   **Untrusted Code:** OpenClaw advises: "Treat third-party skills as untrusted code. Read them before enabling. Prefer sandboxed runs for untrusted inputs and risky tools." If `agentPay` is treated as a third-party skill, it must be thoroughly reviewed.
*   **Secrets Injection:** "skills.entries.*.env and skills.entries.*.apiKey inject secrets into the host process for that agent turn (not the sandbox). Keep secrets out of prompts and logs."
    *   The Fiber Network Node (FNN) requires `FIBER_SECRET_KEY_PASSWORD` to encrypt its wallet private key file. If `agentPay` wraps an FNN instance or directly accesses a wallet, this password (or the private key itself) would be a critical secret. Injecting such secrets directly into the agent's host process carries risk.
    *   Any private keys used for signing CKB transactions (e.g., for channel funding or settlement) would be highly sensitive.
*   **Financial Transactions:** `agentPay` deals with real-world value (CKB, UDTs). Unauthorized access or misuse of the skill could lead to financial loss.
*   **`Exec Tool` Risk:** If the `agentPay` skill relies on the `Exec Tool` to run commands (e.g., `curl` to FNN RPC, or a custom binary), this introduces the risk of arbitrary command execution if the agent or skill is compromised or poorly designed. OpenClaw has `Exec Approvals` to mitigate this, but it requires careful configuration.
*   **Access Control:** The skill would need permissions to interact with the Fiber Network Node (FNN) RPC, which might be running locally or on another machine (e.g., `ckbnode` at `192.168.68.87:8227`). Network access permissions would be required.

### 6. What is the MVP path to get agentPay available as a skill?

**Answer:**
Given the missing `agentPay` README, this path is conceptual. However, based on the OpenClaw skill framework and the stated "Key gap: no official Node.js Fiber client library exists — must build from Rust RPC source" for FiberQuest, the MVP path would involve:

1.  **Develop a Fiber RPC Wrapper (Node.js):** Since OpenClaw agents are likely Node.js-based and there's no official Node.js Fiber client, a minimal Node.js wrapper would need to be built. This wrapper would directly interact with the Fiber Network Node (FNN) RPC interface (e.g., `127.0.0.1:8227` or `192.168.68.87:8227`) using HTTP requests. This wrapper would expose core Fiber functionalities like `open_channel`, `send_payment`, `new_invoice`, and `list_channels`.
    *   *Consideration:* If `wyEspAgentPay` is an ESP32 device that *performs* the signing, the Node.js wrapper might instead communicate with the ESP32 device (e.g., via HTTP or BLE) to request signed transactions or payment actions, rather than directly calling FNN RPC for signing. However, the FNN itself has built-in wallet functionality. Without the `agentPay` README, this interaction model is speculative. For an MVP, directly interacting with FNN RPC from Node.js is simpler if signing can be handled by FNN.

2.  **Create an OpenClaw Skill Directory:**
    *   Create a new directory (e.g., `agentpay-skill`) in a location recognized by OpenClaw (e.g., `<workspace>/skills` or `~/.openclaw/skills`).

3.  **Define `SKILL.md`:**
    *   Inside `agentpay-skill`, create a `SKILL.md` file.
    *   Use YAML frontmatter to define metadata.
    *   Write clear instructions for the agent on how to use the `agentPay` functionalities.
    *   Define slash commands or tool invocations that map to the methods exposed by the Node.js Fiber RPC wrapper (e.g., `/agentpay send <invoice>`, `/agentpay balance`).

4.  **Integrate with `Exec Tool` (or similar):**
    *   The `SKILL.md` would instruct the agent to use the `Exec Tool` to run the Node.js Fiber RPC wrapper script. For example:
        ```markdown
        ---
        name: agentpay
        description: Facilitate payments via Fiber Network.
        tools:
          - name: agentpay_cli
            description: CLI for Fiber payments
            command: node /path/to/agentpay-wrapper.js
        ---
        ## How to use agentPay

        To send a payment:
        `{{tool_code agentpay_cli "send_payment --invoice <invoice_string>"}}`

        To list channels:
        `{{tool_code agentpay_cli "list_channels"}}`
        ```
    *   The Node.js wrapper script (`agentpay-wrapper.js`) would parse command-line arguments and make the appropriate HTTP RPC calls to the FNN.

5.  **Configure Environment Variables:**
    *   In `~/.openclaw/openclaw.json`, configure `skills.entries.agentpay-skill.env` to inject necessary environment variables, such as `FIBER_SECRET_KEY_PASSWORD` (if the wrapper needs it for FNN interaction) and the FNN RPC endpoint.
    *   Example:
        ```json
        {
          "skills": {
            "entries": {
              "agentpay-skill": {
                "env": {
                  "FIBER_SECRET_KEY_PASSWORD": "YOUR_FNN_PASSWORD",
                  "FNN_RPC_URL": "http://192.168.68.87:8227"
                }
              }
            }
          }
        }
        ```

6.  **Testing:**
    *   Thoroughly test the skill with an OpenClaw agent to ensure it can correctly initiate payments, manage channels, and handle errors.

---

## Gaps / Follow-up

1.  **`agentPay` Architecture:** The most significant gap is the complete lack of information regarding the `agentPay` architecture due to the missing `wyEspAgentPay/main/README.md`. Understanding if `agentPay` is an ESP32 application, a Node.js library, or a Rust binary is crucial for a precise integration path.
    *   **Follow-up:** Obtain the `wyEspAgentPay` README or equivalent documentation.
2.  **`agentPay` Signing Mechanism:** How `agentPay` handles cryptographic signing (e.g., using FNN's built-in wallet, an external signer like JoyID via CCC, or an ESP32-based signer) is unknown. This impacts security design and dependencies.
    *   **Follow-up:** Clarify `agentPay`'s signing strategy.
3.  **Specific OpenClaw Skill Examples:** While the OpenClaw documentation describes the framework and tools, concrete examples of `SKILL.md` files for skills interacting with complex external systems (like blockchains or payment networks) are not provided.
    *   **Follow-up:** Request or search for example `SKILL.md` files for OpenClaw skills that integrate with external APIs or blockchain services to understand best practices for interface design and error handling within the skill definition itself.
4.  **`agentPay`'s Relationship to FiberQuest's Node.js Sidecar:** The FiberQuest project mentions a "Node.js sidecar → Fiber micropayments" and an "ESP32-P4 stretch goal: runs emulator + light client + signer concurrently." It's unclear if `agentPay` *is* this Node.js sidecar, the ESP32 signer, or a separate component.
    *   **Follow-up:** Clarify the relationship between `agentPay`, the FiberQuest Node.js sidecar, and the ESP32-P4 signer.

---

## Relevant Code/API Snippets

**OpenClaw Skill Configuration (Conceptual `~/.openclaw/openclaw.json`):**
```json
{
  "skills": {
    "entries": {
      "agentpay-skill": {
        "env": {
          "FIBER_SECRET_KEY_PASSWORD": "YOUR_FNN_PASSWORD_HERE",
          "FNN_RPC_URL": "http://192.168.68.87:8227"
        },
        "apiKey": "OPTIONAL_API_KEY_FOR_EXTERNAL_SERVICE"
      }
    }
  }
}
```

**OpenClaw Skill `SKILL.md` (Conceptual):**
```markdown
---
name: agentpay
description: Facilitate payments and channel management on the Nervos Fiber Network.
tools:
  - name: fiber_cli
    description: Command-line interface for Fiber Network operations.
    command: node /path/to/your/fiber-rpc-wrapper.js
---

## How to use agentPay

This skill allows you to interact with the Nervos Fiber Network for micropayments.

### 1. Send a payment
To send a payment, you need a Fiber invoice.
`{{tool_code fiber_cli "send_payment --invoice <invoice_string>"}}`
Example: `{{tool_code fiber_cli "send_payment --invoice lnfb1q..."`

### 2. Request a payment
To generate an invoice for receiving payment:
`{{tool_code fiber_cli "new_invoice --amount <CKB_amount> --description <description_text>"}}`
Example: `{{tool_code fiber_cli "new_invoice --amount 1000 --description 'Coffee payment'"`

### 3. List active channels
To see your open Fiber channels:
`{{tool_code fiber_cli "list_channels"}}`

### 4. Open a new channel
To open a channel with a peer:
`{{tool_code fiber_cli "open_channel --peer_id <peer_public_key> --capacity <CKB_capacity> --push_amount <CKB_initial_push>"}}`
Example: `{{tool_code fiber_cli "open_channel --peer_id 0x... --capacity 10000 --push_amount 1000"`

### Error Handling
*   **Insufficient Funds:** If a payment fails due to insufficient channel capacity, the tool will return an error message indicating this.
*   **Invalid Invoice:** If the invoice string is malformed, an error will be returned.
*   **Network Issues:** Problems connecting to the Fiber Node will result in connection errors.
```

**Fiber Network Node (FNN) RPC Methods (from `nervosnetwork/fiber/main/README.md`):**
*   `open_channel`
*   `send_payment`
*   `list_channels`
*   `new_invoice`
*   `get_invoice`
*   `shutdown_channel` (for closing channels)

**Fiber Network Node (FNN) Environment Variable (from `nervosnetwork/fiber/main/README.md`):**
*   `FIBER_SECRET_KEY_PASSWORD='YOUR_PASSWORD'` (used to encrypt the wallet private key file)