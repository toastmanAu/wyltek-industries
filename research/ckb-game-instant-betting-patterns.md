# Instant Bet Placement on CKB: Solving the Per-Transaction Signing Problem

**Audience:** CKB game developers  
**Problem:** On-chain games (crash, roulette, poker) require users to sign every transaction. At ~5–15 seconds per signing popup, users miss bet windows and the UX falls apart.  
**Goal:** One signature per session, instant bet placement for everything after.

---

## Why This Is Harder Than It Looks

In most chains, a "session key" lives entirely off-chain — a delegated key is handed to the backend, and the chain doesn't care. On CKB this approach leaks all security to the backend. If the backend is compromised, it can drain your wallet.

CKB's cell model gives us a better option: we can encode the delegation *constraints* directly into the lock script. The chain enforces that the backend can only move funds to the game contract — not anywhere else. The security guarantee is on-chain, not in your backend's goodwill.

---

## Two Patterns

### Pattern A — Game Wallet Cell (On-Chain Session Key)

Best for: games where bets settle on L1 (crash, jackpot, anything requiring a verifiable random result anchored to a block).

#### How It Works

**Step 1 — User signs once to create a Game Wallet Cell**

```
User clicks "Deposit to Game"
  → One wallet popup: "Sign to create Game Wallet Cell"
  → Transaction creates a new cell:
      capacity:    500 CKB (or whatever they deposit)
      lock_script: GameSessionLock { user_pubkey, backend_pubkey, game_contract_hash }
      type_script: null (or an accounting type script — optional)
      data:        <empty or metadata>
```

This is the only time the user sees a signing popup.

**Step 2 — Backend places bets instantly, no user interaction**

```
User clicks "Bet 10 CKB"
  → Frontend sends { amount, round_id } to backend API
  → Backend builds and signs the transaction:
      Inputs:  Game Wallet Cell (10 CKB slice)
      Outputs: Game Escrow Cell (10 CKB, locked to game contract)
               Game Wallet Cell remainder (490 CKB, same lock)
      Witness: backend_signature
  → Backend broadcasts → CKB nodes validate → confirmed in <500ms
```

No popup. The backend's signature is valid because the lock script allows it — but **only** when the output goes to the known game contract.

#### The Lock Script (This Is Where Security Lives)

The `GameSessionLock` script has exactly two spending paths:

```c
// Pseudocode — implement in C/Rust for CKB-VM

fn validate_tx() {
    let witness_sig = load_witness_signature();

    // Path 1: User always has full control (withdraw, close session)
    if secp256k1_verify(USER_PUBKEY, witness_sig) {
        return OK;
    }

    // Path 2: Backend can spend — but ONLY to the game contract
    if secp256k1_verify(BACKEND_PUBKEY, witness_sig) {
        for each output in tx.outputs {
            assert(output.lock.code_hash == GAME_CONTRACT_LOCK_HASH,
                   "backend can only send to game contract");
        }
        return OK;
    }

    return ERROR; // reject
}
```

**If this check is missing or wrong, the backend becomes a full custodian.** The output destination constraint is what makes this trustless.

#### Security Properties

| Property | Status |
|----------|--------|
| Backend can steal funds | ❌ No — lock script blocks non-game outputs |
| User can always withdraw | ✅ Yes — user key is always valid |
| Backend key compromise | ⚠️ Attacker can place bets but not withdraw (funds go to game contract, not attacker wallet) |
| Rotate backend key | ✅ Yes — create new Game Wallet Cell with new backend pubkey |

#### Practical Notes

- **Backend key rotation:** Generate an ephemeral keypair per user session or per day. Store it in your backend's secure enclave / HSM, not in plaintext config.
- **Multiple cells:** If you want to allow concurrent bets, create multiple Game Wallet Cells at deposit time. One cell = one UTXO, one active spend at a time (CKB has no double-spend within a single cell).
- **Withdrawal:** User signs a tx consuming their Game Wallet Cell → outputs to their own address. No backend needed, works anytime.
- **Minimum deposit UI:** Show the user what the Cell occupancy cost is (62 CKB minimum on CKB) so they know some capacity is "locked" as occupied capacity.

---

### Pattern B — Fiber Payment Channel

Best for: high-frequency micro-bet games (slots, dice, speed rounds) where the game result can be settled off-chain and only the final balance goes on-chain.

#### How It Works

```
User opens one Fiber channel with the game service — 1 on-chain tx, 1 signing event.

Every bet is an off-chain HTLC update:
  User says "bet 1 CKB on red"
  → Service sends HTLC: "I'll pay you 2 CKB if the result is red"
  → Result computed
  → Channel balance updated instantly, no chain interaction

When session ends, one cooperative close tx settles final balance on L1.
```

#### Why Fiber Works Here

Fiber payment channels are essentially a bilateral ledger. Both sides agree on balance updates in real-time. There's no block wait, no signing popup per bet — just signed off-chain messages at the speed of your network connection.

The on-chain footprint is just two transactions: open and close.

#### The Tradeoff vs Pattern A

| | Game Wallet Cell | Fiber Channel |
|-|-----------------|---------------|
| Latency per bet | <500ms (one on-chain tx) | <50ms (off-chain message) |
| Verifiable on-chain state mid-game | ✅ Yes | ❌ No — only final settlement |
| Infrastructure needed | Standard CKB node | Fiber node on both sides |
| Works with verifiable randomness anchored to block hash | ✅ Yes | ❌ Hard (result must be known before settlement) |
| Supports provably fair crash games | ✅ Yes | ⚠️ Requires additional commitment scheme |
| User locks funds on-chain | Session amount | Channel capacity |

**For crash games specifically:** Fiber is awkward because the multiplier is determined by a block hash (or a committed VRF seed) — the result isn't known until after the bet. This means you'd need an HTLC that resolves based on an external reveal, which complicates the protocol. Pattern A (Game Wallet Cell) is the cleaner fit for crash.

For simple high-frequency games where the game service generates results (dice, slots, cards), Fiber is the right choice — it's genuinely faster and the off-chain nature doesn't compromise the game logic.

---

## Handling Game Escrow On L1 (Relevant to Both Patterns)

Once bets land in the Game Contract, the escrow follows a standard CKB pattern:

### Accumulating Escrow Cell

Each bet registration consumes the existing escrow cell and produces a new one with updated capacity and state:

```
Registration Tx:
  Inputs:
    - Current escrow cell (N CKB)
    - Player's Game Wallet Cell slice (10 CKB)
  Outputs:
    - New escrow cell (N+10 CKB)
        data: { round_id, player_count++, player_address[] }
    - Player's receipt cell (optional, proves registration)
```

The escrow's Type Script enforces:
- `new_capacity = old_capacity + entry_fee`
- `player_count` incremented exactly by 1
- `player_address` appended to the list
- `max_players` not exceeded

### Batch Payout

One transaction distributes the prize pool to all winners:

```
Payout Tx:
  Inputs:
    - Escrow cell (full prize pool)
  Outputs:
    - Winner 1 cell (70 CKB)
    - Winner 2 cell (20 CKB)
    - Fee/house cell (10 CKB)
```

The Type Script verifies: `sum(outputs.capacity) == escrow.capacity` (minus tx fee). The agent (your backend) builds and submits this tx — the Type Script enforces correctness, so the agent can't steal by crafting a malicious payout.

### Refunds If Round Cancelled

```
Refund Tx:
  Inputs:
    - Escrow cell
  Outputs:
    - Player 1 gets 10 CKB back
    - Player 2 gets 10 CKB back
    - ...
```

Type Script checks deadline passed AND player_count < min_players before allowing this path. An on-chain timer is a block number comparison — `since` field in the CKB input structure is exactly the primitive for this.

---

## Recommended Architecture for a Crash Game

```
┌─────────────────────────────────────────────────────┐
│  Browser / App                                      │
│                                                     │
│  1. Connect wallet (JoyID / MetaMask CKB)           │
│  2. "Deposit 500 CKB" → sign once → Game Wallet Cell│
│  3. Each round: click "Bet" → instant (no popup)    │
│  4. Cashout button → user-signed withdrawal any time│
└──────────────────────────┬──────────────────────────┘
                           │ HTTP/WS
┌──────────────────────────▼──────────────────────────┐
│  Game Backend                                       │
│                                                     │
│  - Manages ephemeral backend keypairs per user      │
│  - Builds + signs bet txs from Game Wallet Cells    │
│  - Submits to CKB node, monitors confirmation       │
│  - Runs crash multiplier loop (VRF or block hash)   │
│  - Builds + submits payout tx on round close        │
└──────────────────────────┬──────────────────────────┘
                           │ RPC
┌──────────────────────────▼──────────────────────────┐
│  CKB Node                                           │
│                                                     │
│  GameSessionLock script: enforces output constraint │
│  GameContract script: holds bet escrow, enforces    │
│    payout rules, verifies round result proof        │
└─────────────────────────────────────────────────────┘
```

---

## Provably Fair Crash

The hardest part of a crash game is convincing players the multiplier isn't manipulated. Two options that work with Pattern A:

**Option 1 — Block hash commitment**
- Before round opens, publish `H(secret_seed || future_block_hash)` on-chain
- After the target block is mined, reveal `secret_seed`
- Multiplier = `derive_multiplier(secret_seed XOR block_hash)`
- Anyone can verify post-round. No trust required.

**Option 2 — VRF (Verifiable Random Function)**
- Backend commits to a VRF public key in the game contract
- Before each round, publishes VRF output + proof
- Multiplier derived from VRF output
- CKB Type Script can optionally verify the VRF proof on-chain (expensive but fully trustless)

Block hash is simpler to implement; VRF is more flexible (you control timing, not block production).

---

## Implementation Checklist

- [ ] Write `GameSessionLock` script (C or Rust → RISC-V target for CKB-VM)
- [ ] Unit test lock script: user sig allows any output, backend sig blocked if output != game contract
- [ ] Deploy lock script to testnet, note `code_hash`
- [ ] Backend: generate ephemeral keypair per user deposit session
- [ ] Backend: `POST /bet` endpoint builds tx from Game Wallet Cell, signs, broadcasts
- [ ] Backend: `GET /session` endpoint returns session status and Game Wallet Cell balance
- [ ] Frontend: deposit flow → JoyID sign once → session active state
- [ ] Frontend: bet flow → no popup, just loading spinner until tx confirmed
- [ ] Frontend: cashout flow → JoyID sign (user key, unconditional)
- [ ] Write `GameContract` Type Script with escrow accumulation + payout rules
- [ ] Implement round result proof (block hash or VRF)
- [ ] Testnet end-to-end: deposit → 5 bets → cashout → verify all balances

---

## SDK / Tools

| Task | Tool |
|------|------|
| CKB transaction building (JS) | `@ckb-ccc/core` |
| Script development | `ckb-script-templates` (Rust) or C with `ckb-c-stdlib` |
| Local devnet | `offckb` (instant CKB devnet, no mining) |
| Wallet integration | JoyID SDK (redirect signing) or CCC signers |
| Fiber channel management | Fiber RPC (open_channel, send_payment, shutdown_channel) |
| Testing | `ckb-testtool` (Rust) for script unit tests |

---

## Summary

For a **crash game on CKB**:
- Use **Pattern A (Game Wallet Cell)** — it fits naturally with block-hash-derived multipliers
- One sign → unlimited instant bets
- Security is enforced on-chain by the lock script, not by your backend
- The output-destination constraint is the critical piece — don't ship without it

For **high-frequency micro-bet games** (slots, dice, faster-than-block games):
- Use **Pattern B (Fiber)** — off-chain settlement, sub-100ms per bet
- Requires Fiber node infrastructure but eliminates on-chain latency entirely

Both patterns are buildable today with existing CKB tooling on testnet.
