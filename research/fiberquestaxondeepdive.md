# Executive Summary  
Axon is a **ready-to-use L2 appchain framework** for Nervos (see Axon docs【30†L411-L419】【21†L321-L329】), but it has not yet powered any major live network. The framework is deployable – one can **build and launch a private Axon chain** on Nervos Testnet – but doing so entails custom setup. Compared to Nervos’s existing L2 (Godwoken) or using CKB directly, Axon offers **high throughput and full EVM compatibility** (thousands TPS) with unique CKB integration【21†L321-L329】. It **anchors security to CKB** via staking Axon’s xUDT tokens on the CKB PoW layer【30†L384-L393】, and it can invoke CKB-VM for on-chain cell validation【21†L321-L329】.  

This report maps the **Fiberquest** application’s needs to Axon, proposes an Axon-chain architecture, and details a deployment and testing plan on Nervos Testnet. We include a mermaid diagram of the proposed architecture, step-by-step instructions (with commands/configs) to build and run an Axon testnet chain, and patterns for using CKB cells (e.g. for asset custody or identity). A risk analysis and alternatives comparison (Axon vs Godwoken vs pure CKB) are provided to guide decision-making.  

# Fiberquest Requirements  
Based on the Fiberquest code and architecture document (presumed **“tournament-v2-architecture.md”**), Fiberquest requires:  

- **On-chain tournament logic** – registering players, creating and updating tournament brackets, recording match results.  
- **Asset management** – allowing deposits/withdrawals of tokens (e.g. ERC-20 style) for entry fees and prizes, and custody of assets (possibly NFTs or UDTs).  
- **Identity and accounts** – unique player identities (e.g. linked to CKB accounts or external IDs like JoyID), possibly with permissions/roles (player, organizer, referee).  
- **Off-chain services integration** – support for external services (e.g. match scheduling, notifications, or streaming metadata) to interact with the chain.  
- **High performance and scalability** – fast transaction throughput for many simultaneous participants (e.g. real-time tournament updates).  
- **Cross-chain needs** – (optional) bridging or interoperability (e.g. if prizes or tickets come from other chains).  

Many of these features (accounts, tokens, events, off-chain oracles) are typical for an EVM chain. The arch doc likely lists tasks like “create game rooms,” “capture scores,” “distribute winnings,” etc. These map to smart contracts on Axon, plus use of CKB cells for persistence or verification.  

# Axon Capabilities vs Fiberquest Needs  

- **EVM Compatibility:** Axon is *100% EVM compatible*【21†L321-L329】. Fiberquest can reuse familiar Solidity toolchains and libraries. All standard Ethereum dev tools (Truffle/Hardhat, Metamask wallets, etc.) should work with Axon.  
- **Performance:** Axon’s Overlord consensus and Tentacle P2P support *thousands of TPS and hundreds of nodes*【30†L384-L393】【21†L321-L329】. This meets the scalability need for fast tournament transactions.  
- **Account Abstraction / CKB Integration:** Axon smart contracts can call a **special precompile** that invokes the CKB-VM, allowing contracts to load and verify *CKB cells* on-chain【21†L321-L329】. This enables advanced use-cases: Fiberquest can store data or assets in CKB cells and have Axon contracts validate them. For example, identity info or token balances kept on CKB can be securely referenced by the Axon chain. This is a unique Axon strength.  
- **Assets and Staking:** Each Axon appchain must issue an *xUDT (Axon Token, AT)* on CKB and use it for staking【30†L384-L393】. Fiberquest will need to create an AT token for its chain (e.g. “FQ-Token” on CKB) and use it for any native token logic. The advantage: staking on CKB leverages Nervos PoW security. The downside: it adds extra steps (issuing xUDT on CKB, managing it via wallets).  
- **Interoperability:** Axon supports **native IBC-style cross-chain messaging**【21†L327-L330】. In theory, Fiberquest contracts can send/receive messages to CKB or Cosmos/Ethereum. In practice, the IBC tooling is still in development, so initial scope may be limited to simple bridges. However, the design *anticipates* future multi-chain features.  
- **Security Trade-offs:** Axon does *not* fully inherit CKB’s security (unlike a rollup). Instead, it uses CKB as a **staking layer**【21†L314-L322】. Validators stake AT on CKB for PoW-level security, but Axon itself runs its own consensus. In other words, **data availability and execution are on Axon’s network**, not CKB. This means if Axon’s validator set is compromised, it could deviate. However, Axon’s design avoids some L1 PoS issues (e.g. long-range attacks) by keeping security on Nervos PoW【21†L314-L322】.  

**Gaps / Challenges:** Unlike a shared rollup (e.g. Godwoken), Axon chains are *sovereign*. Liquidity and network effects are fragmented – Fiberquest must bootstrap its own ecosystem. Cross-chain assets require bridging logic. Axon’s tooling and documentation are less mature than Ethereum L2s. We must manually configure chain parameters (no existing Testnet “fiberquest” network), and possibly build custom relayers.  

# Proposed Axon AppChain Architecture  

```mermaid
flowchart LR
    subgraph CKB Layer1
        CKB(CKB Layer 1 Blockchain)
        CKB_AT(AT Token (xUDT) on CKB)
        CKB --> CKB_AT
    end
    subgraph Axon_AppChain
        subgraph Validators
            N1(Axon Node 1)
            N2(Axon Node 2)
            N3(Axon Node 3)
        end
        N1 <--> N2
        N2 <--> N3
        N1 ---|Overlord Consensus| N3
        N1 -->|Tentacle P2P| N2
        subgraph Execution
            EVM[EVM Runtime (Solidity Contracts)]
        end
        N1 --> EVM
        N2 --> EVM
        N3 --> EVM
        subgraph CrossChain
            IBC_Relayer(IBC / Cross-Chain Relayer)
        end
        EVM -->|CKB Precompiles| CKB
        IBC_Relayer --> CKB
    end
    subgraph Users_and_Offchain
        Wallets(Wallets / Clients)
        Offchain(Off-Chain Services / Oracles)
        Wallets --> Axon_AppChain
        Offchain --> IBC_Relayer
        Offchain --> Axon_AppChain
    end
    CKB_AT -->|Stake AT Tokens| Validators
```

**Legend:** The diagram shows an *Axon-based appchain* (Fiberquest chain) with multiple validator nodes communicating via Overlord/Tentacle. These nodes each run an EVM execution environment for Fiberquest’s contracts. User wallets and apps send transactions to these nodes (via JSON-RPC), and off-chain services (e.g. tournament schedulers or relayers) connect as shown. Validators stake the chain’s Axon Token (AT) on CKB (the Nervos L1) to participate. The EVM runtime has a special precompile to invoke the CKB-VM (allowing contracts to load/verify CKB cells)【21†L321-L329】. An IBC/Cross-Chain relayer links the Axon chain to CKB or other chains for asset transfers or messages.  

# Step-by-Step Testnet Deployment Plan  

**1. Environment Setup:**  
- Choose a Linux host (e.g. Ubuntu 22.04) for nodes. Each validator needs moderate CPU and RAM (e.g. 4–8GB).  
- Install dependencies: Rust (latest stable, via `rustup`), Clang, OpenSSL, M4【30†L413-L420】. Also install Node.js (for scripts), Docker (optional), and any database (e.g. PostgreSQL) if analytics needed.  
- Ensure CKB testnet connectivity: set RPC endpoints to the official CKB Testnet (Pudge) at e.g. `https://testnet.ckb.dev`【41†L131-L139】. Get some test CKBytes from the Nervos faucet for any CKB operations (issuing xUDT, etc.)【41†L147-L150】.  

**2. Build Axon Node:**  
```bash
# Clone and build the Axon framework (v0.3)【30†L411-L420】
git clone --depth=1 https://github.com/axonweb3/axon.git && cd axon
cargo build --release
```  
This produces `axon/target/release/axon`. (Alternatively use the official Docker image or a provided binary for quick setup.)  

**3. Configure Chain-Spec and Genesis:**  
- The Axon repo provides example specs under `devtools/chain/specs/`. Copy `single_node/chain-spec.toml` as a starting point. Edit fields: set `id = "fiberquest-testnet"` or similar, initial timestamp, epoch length, block time, etc. Adjust consensus params if needed.  
- **Genesis accounts:** Under `genesis.toml` or similar (depending on spec format), include the initial accounts. Add the future validator key(s) as initial accounts (with some balance of the new AT token). Also add accounts for any pre-funded token holders.  
- **Key files:** Generate or obtain a key pair for each validator node. Axon’s `axon key` commands (or a custom script) can create key files. For example:  
  ```bash
  # From axon directory
  target/release/axon key generate --outfile node1.key
  target/release/axon key generate --outfile node2.key
  # ...
  ```  
  (Alternatively, the repository’s debug keys can be reused for prototyping.)  

**4. Initialize and Run Nodes:**  
For each validator node, create a config TOML (copy `devtools/chain/config.toml` as template) and a chain-spec. For example, for Node 1:  
```bash
target/release/axon init \
    --config devtools/chain/config_node1.toml \
    --chain-spec devtools/chain/specs/chain-spec.toml \
    --key-file node1.key
```  
This generates a data directory with `genesis.json`, wallet keystore, etc. Repeat for Node 2/3.  

Now start each node (in separate terminals or services):  
```bash
target/release/axon run --config devtools/chain/config_node1.toml --metrics 127.0.0.1:9000
```  
Add `--metrics <addr>` to expose Prometheus metrics. Do similarly for node2 (e.g. on port 8001) and node3 (8002). Nodes will form a P2P network via Tentacle (ensure TCP ports are open). You should see blocks being produced.  

**5. Validator Setup on CKB:**  
- **Issue Axon Token (xUDT) on CKB:** Using the Nervos CKB testnet, create a new *Extensible UDT* (xUDT) token for Fiberquest’s chain. Follow CKB docs: e.g. run `offckb tx create-token` with the xUDT script (or use Mercury library) to define the token’s symbol, supply, etc【24†L8-L10】. This creates a cell on CKB holding the token’s info.  
- **Stake AT on CKB:** Validators (the addresses derived from the node key pairs) must lock a stake of AT tokens on CKB. This likely involves sending some AT from a CKB wallet into a special staking lockscript (provided by Axon). If no standard script exists, one could approximate by sending AT to a multi-sig or special lock that the Axon appchain recognizes. (If no off-the-shelf tool is available, initially we can manually send AT to a deposit address and configure genesis so those keys are validator weights.)  
- **Chain Registration:** In Axon’s genesis, the validator public keys (and their weights/stakes) must be registered so they can propose blocks. Ensure the staked AT amounts meet the min-consensus requirements (e.g. >1 AT).  

**6. RPC Endpoints and Monitoring:**  
- Each node exposes an RPC port (default 8000+) for JSON-RPC (EVM calls) and possibly a GraphQL/WebSocket. Make sure these are accessible (firewall rules, etc.) for clients and off-chain services.  
- For monitoring, enable Prometheus metrics (`--metrics 127.0.0.1:9000`). Use Prometheus/Grafana to track blocks, CPU, memory, RPC errors, etc. Log levels can be set in the config. Consider log rotation.  
- Optionally, deploy Axon Explorer (open-source [Axon Explorer](/) or a custom block explorer) pointed at these RPC endpoints for debugging.  

**7. Deploy Fiberquest Contracts:**  
- Connect a wallet (e.g. Metamask pointed at Axon RPC) or use Hardhat with the new chain ID. Deploy Fiberquest’s Solidity contracts to the Axon chain.  
- Use the Axon faucet (if one exists) or mint AT tokens to fund transactions. (The Axon repo mentions an Axon Faucet【30†L442-L449】, though for testnet you may rely on the test token from step 5.)  

# CKB Cell Integration and Data Flows  

Axon allows contracts to **read/verify CKB cells** via a precompile to the CKB-VM【21†L321-L329】. Below we outline how Fiberquest might use CKB for assets, state, and identity:

- **Asset Custody (UDTs):** Suppose Fiberquest defines an ERC20-like game token or NFT. You can create this as an xUDT on CKB (using the xUDT contract) or as an ERC20 on Axon. To leverage CKB custody: store the *authoritative balances* in CKB cells (e.g. an Omnilock or specialized lock). The Axon contract calls the precompile to fetch a cell’s capacity and lock/type scripts, verifying the holder. For example (pseudo-Solidity):  
  ```solidity
  // Pseudocode: check CKB cell at a given outpoint for asset custody
  function verifyCKBAsset(bytes memory cellOutPoint, bytes memory expectedType) public view returns (bool) {
      // call the Axon CKB precompile (address 0x...) with outpoint and expected lock script
      (bool success, bytes memory cellData) = CKB_PRECOMPILE.call(abi.encodePacked(cellOutPoint, expectedType));
      require(success, "CKB cell fetch failed");
      // decode cellData: check lock script hash or data for holding asset
      return validateCell(cellData, expectedType);
  }
  ```  
  This way, Fiberquest can enforce that e.g. an entry fee was locked on CKB before admitting a player.  

- **Tournament State:** Critical tournament data (brackets, scores) can reside on Axon (fast access) or be anchored on CKB for auditability. For example, after a tournament round is finalized on Axon, a Merkle root or summary could be committed to a CKB cell (via a bridging transaction) to serve as a checkpoint. The Axon chain could use the precompile to *load* that CKB cell and prove the root when needed.  

- **Identity:** If Fiberquest wants decentralized identity, it could use CKB’s account abstraction (Omnilock/UDT) or existing solutions like JoyID on CKB. For instance, players register a unique identity cell on CKB. The Axon contract can verify ownership by loading the CKB cell (using the player’s Axon/Ethereum address converted to a CKB lock) and checking a signature. Example: a “registerPlayer” Axon tx includes a CKB cell outPoint and a signature; Axon contract precompiles the CKB-VM to run the lockscript and verify the sig. This links Axon addresses to CKB identity entries.  

**Example Data Flow:** A player deposits a tournament fee as an xUDT on CKB, then enters the tournament on Axon:  
1. Player sends AT tokens on Axon to a contract `enterTournament()`.  
2. The contract calls a precompile: it looks up a specific CKB cell to verify the player’s eligibility (e.g. a registered membership cell).  
3. If valid, the contract locks the player’s entry fee on Axon. Meanwhile, an off-chain relayer picks up an event and constructs a CKB tx to transfer an equivalent UDT from the player’s CKB wallet to a tournament fund (anchoring the deposit).  
4. After tournament ends, Axon contract emits an event for prize distribution. A relayer executes a CKB transaction sending UDT prizes to winners’ CKB addresses. Winners can then redeem prize on Axon by presenting the CKB cell.  

This pattern uses both Axon (fast execution) and CKB (secure asset custody). The key is that Axon contracts can *read* CKB state but do *not* spend CKB cells directly (the bridging is done via off-chain agents).  

# Testing Strategy and Migration Checklist  

**Unit Tests:** For all smart contracts (e.g. tournament logic, asset contracts), write comprehensive tests using a framework (Truffle/Hardhat). Mock the CKB precompile calls if possible (simulate cell data). Ensure edge cases (overflow, unauthorized access, incorrect cell data) are covered.  

**Integration Tests:**  
- **Axon Chain:** Spin up a local multi-node Axon network (as in step 4) and run end-to-end scenarios. For example, test end-to-end: deploy Fiberquest contracts, create tournaments, process results.  
- **CKB Integration:** Use a CKB testnet node or a local devnet. Issue test tokens, and simulate the relayer interactions: e.g. after an Axon event, perform the corresponding CKB tx. Validate that the Axon contract’s precompile correctly verifies CKB cells. Automate these with scripts.  
- **Bridge Tests:** If using IBC or a bridge (e.g. Force Bridge), test asset transfers between Axon and CKB (and possibly Ethereum). Make sure cross-chain messages are correctly received.  

**Security Audits:** Audit both the Axon chain configuration (genesis, keys, validator setup) and smart contract code. Focus on:  
- Precompile use – ensure data from CKB is validated fully before acting.  
- Economic rules – staking logic, reward distribution, fee handling.  
- Access control – only authorized roles (organizers) can create/close tournaments.  
- DoS resistance – e.g. unbounded loops in bracket updates.  

**Performance Testing:** Benchmark block times and throughput. Use a load-testing tool (e.g. generate many concurrent “enter” transactions) to ensure the chain can handle expected tournament load. Since Axon can do thousands TPS【30†L384-L393】, verify under load (e.g. 1000 tx/sec) that latency remains acceptable.  

**Anchoring to CKB:** Test that staking AT on CKB works end-to-end (issue xUDT, stake, make sure Axon nodes recognize it). Simulate chain resets and recovery: if Axon restarts, validators with staked AT should still be active.  

**Migration Checklist (Testnet→Mainnet):** Although we focus on Testnet, note steps for mainnet transition: ensure chain ID changes, system scripts on CKB mainnet are correct, and redeploy assets/identity on mainnet CKB. Plan for migrating user data (if needed).  

# Risks & Mitigations  

- **Security of CKB Precompile:** The CKB precompile runs arbitrary CKB-VM scripts inside Axon. If misused, a contract could lock up (Denial-of-Service) or misread data. *Mitigation:* Careful validation of inputs (only trusted scripts, gas limits on precompiles). Audit the precompile mechanism.  
- **Fragmentation & Liquidity:** As a standalone appchain, Fiberquest token liquidity may be low. *Mitigation:* Use Axon’s IBC to link to other chains (e.g. Bridge Axon AT ↔ CKB xUDT ↔ Ethereum tokens via Force Bridge【21†L327-L330】). Consider integrating with a DEX or multi-chain liquidity pool.  
- **Upgradeability:** If the chain needs a protocol upgrade, there is no live governance layer built-in yet. *Mitigation:* Plan for manual upgrades (stop-the-world genesis migrations) or use proxy patterns in contracts. Keep chain parameters simple.  
- **Validator Collusion:** A small validator set can collude. Though AT is staked on CKB (PoW)【30†L384-L393】, Axon itself relies on its own PoS. *Mitigation:* Recruit independent validators, set high staking requirements, and monitor for unusual signatures.  
- **Testnet Parachain Dependency:** As a testnet deployment, downtime of CKB testnet or a hard fork might affect staking or CKB cell access. *Mitigation:* Use stable CKB RPC endpoints, and keep CKB testnet client updated. For production, coordinate with Nervos upgrade schedules.  

# Effort, Resources & Alternatives  

**Team & Timeline:** For a moderately complex appchain deployment, expect:  
- *Blockchain Engineers (2–3)* – to set up Axon nodes, write/augment contracts with CKB calls, and develop relayers.  
- *DevOps Engineer (1)* – to manage node infrastructure (servers, monitoring, backups).  
- *Backend/Web Dev (1)* – for tournament UI and off-chain services.  
- *QA/Testers (1)* – for writing automated tests, security audits.  
- Estimated timeline: ~2–3 months for a basic testnet launch (assuming existing Fiberquest code). Adjust up if learning Axon or building new CKB integrations.  

**Infrastructure Needs:** Cloud or on-prem servers for 3–5 Axon nodes (VMs/containers), CKB full node (or use remote RPC), load balancers for RPC, a database for off-chain indexing (e.g. PostgreSQL + CKB-Indexer), monitoring (Prometheus/Grafana). Wallets for CKB and Axon.  

**Alternative Platforms (Comparison):**

| Option              | Security                             | Dev Effort                    | Performance        | Composability / Features                         |
|---------------------|--------------------------------------|-------------------------------|--------------------|--------------------------------------------------|
| **Axon Appchain**   | Moderate-high – PoS anchors to CKB PoW【30†L384-L393】; *data kept off-chain*【55†L16-L23】. Fraud proofs not standard. | Moderate – Must configure custom chain; use Rust-based nodes + Solidity. Some custom bridging code. | Very high – Thousands TPS (Overlord/Tentacle)【30†L384-L393】. | EVM+CKB hybrid: unique CKB cell access, planned IBC support【21†L327-L330】. Independent economy (liquidity limited). |
| **Godwoken (Rollup)** | High – optimistic rollup on CKB; data/witness stored on CKB【55†L16-L23】, inherits CKB PoW finality. | High – Uses Nervos SDKs, but bridge fraud-proof R&D needed. All EVM dev tools supported. | Medium-high – EVM throughput limited by CKB blocks; optimistic delays possible. | EVM-native; no native CKB cell reads (needs special oracles). More shared state (connected to CKB assets) but may struggle with fraud-proof for custom scripts. |
| **CKB Direct (Layer1)** | Very high – uses CKB PoW; full decentralization. | Very high – Must write lock/type scripts in RISC-V languages (Rust/C), not typical Solidity. | Low-moderate – ~10s block times, single-workchain. | UTXO-based composability; supports custom scripts (Omnilock, xUDT)【41†L131-L139】. No native EVM (though Cell+CKB-VM can simulate). |

**Notes:** If Fiberquest needs maximum security and is willing to forgo EVM ease, building directly on CKB (with e.g. Polyjuice compatibility) is an option, but would be a large effort. Godwoken offers a true rollup on Nervos but has had slower development on CKB integration; it is more like Ethereum L2. Axon offers ease-of-use (EVM, fast) and novel features (CKB-VM precompiles) at the cost of bespoke chain maintenance.  

*Sources:* Axon design and staking【30†L384-L393】【21†L321-L329】【55†L16-L23】; Nervos testnet info【41†L131-L139】. Fiberquest-specific features are from the provided repo/docs.  

