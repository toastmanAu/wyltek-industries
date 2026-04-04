# FiberQuest v3 Architecture: Immutable Cell Model

## Problem Statement

The current architecture treats the Tournament Cell as a mutable database row, rewriting it on every state change. This causes OutPointAlreadySpent errors, retry loops, and serialized operations. ~20+ hours spent debugging a fundamentally flawed pattern.

**Root cause:** Ethereum-style shared mutable state forced onto CKB's UTXO model.

## Design Principles

1. **Write-once cells** — no cell is ever consumed and recreated to update state
2. **Derived state** — player count, scores, winner are computed by scanning cells, not stored
3. **Zero contention** — every participant writes their own cells, nobody touches anyone else's
4. **Cancelled tournaments reclaimable** — cells can be consumed to recover CKB
5. **Live tournaments immutable** — once ACTIVE, tournament cells are permanent on-chain record

---

## Cell Types

### 1. Tournament Cell (TC)

Created by the organizer. **Never rewritten.** Contains the immutable rules.

```
Lock:   organizer's secp256k1
Type:   Type ID (guarantees uniqueness)
Data:   FQTX magic + JSON
```

**Data payload:**
```json
{
  "v": 3,
  "id": "fq_abc_1234",
  "gameId": "mortal-kombat-snes",
  "modeId": "single_fight",
  "entryFee": 100,
  "currency": "Fibt",
  "playerCount": 4,
  "durationBlocks": 50,
  "submissionWindowBlocks": 10,
  "entryCutoffBlock": 185000,
  "romHash": "sha256:...",
  "approvedAgentHashes": [],
  "organizerAddress": "ckt1q...",
  "organizerFiberPeerId": "Qm...",
  "createdAtBlock": 184900
}
```

**No mutable fields.** No `state`, no `players[]`, no `registeredPlayers`, no `winner`, no `scores`. These are all derived from other cells.

**Capacity cost:** ~300 bytes data + 53 lock + 33 type + 32 args + 8 = ~426 bytes → **~42.6 CKB**

**Lifecycle:**
- If tournament reaches ACTIVE status (derived) → cell is **permanent, never consumed**
- If cancelled (not enough registrations by cutoff) → organizer can **consume to reclaim CKB**

---

### 2. Registration Cell (RC)

Created by each player. One per player per tournament. **Write-once.**

```
Lock:   player's secp256k1 (player owns it, can reclaim if cancelled)
Type:   always-success, args = tournamentId (for discovery)
Data:   FQRG magic + JSON
```

**Data payload:**
```json
{
  "tournamentId": "fq_abc_1234",
  "playerAddress": "ckt1q...",
  "fiberPeerId": "Qm...",
  "agentCodeHash": "sha256:...",
  "createdAtBlock": 184950
}
```

**Capacity cost:** ~200 bytes data + 53 lock + 33 type + args = ~310 bytes → **~31 CKB**

**Lifecycle:**
- Tournament goes ACTIVE → cell is **permanent** (proof of participation)
- Tournament cancelled → player **consumes to reclaim ~31 CKB**

**Discovery:** Scan all cells with type script args = tournamentId and FQRG magic. Count = registered players.

---

### 3. Score Cell (SC)

Created by each player's agent after the game ends. One per player. **Write-once.**

```
Lock:   player's secp256k1
Type:   always-success, args = tournamentId (for discovery)
Data:   FQSC magic + JSON
```

**Data payload:**
```json
{
  "tournamentId": "fq_abc_1234",
  "playerId": "player-0",
  "playerAddress": "ckt1q...",
  "score": 2450,
  "koCount": 3,
  "eventLogHash": "sha256:...",
  "submittedAtBlock": 185060
}
```

**Capacity cost:** ~220 bytes data + 53 lock + 33 type + args = ~330 bytes → **~33 CKB**

**Lifecycle:** Always **permanent** (immutable proof of game result).

---

### 4. Settlement Cell (optional, for on-chain proof of winner)

Created by organizer after submission window closes. **Write-once.**

```
Lock:   organizer's secp256k1
Type:   always-success, args = tournamentId
Data:   FQST magic + JSON
```

**Data payload:**
```json
{
  "tournamentId": "fq_abc_1234",
  "winner": "ckt1q...",
  "winnerScore": 2450,
  "allScores": {
    "player-0": 2450,
    "player-1": 1800,
    "player-2": 2100,
    "player-3": 950
  },
  "prizePool": 400,
  "settledAtBlock": 185075
}
```

**Capacity cost:** ~350 bytes → **~35 CKB**

**Lifecycle:** Always **permanent** (immutable tournament result record).

---

## Derived State (computed, never stored)

| State | How to derive |
|-------|---------------|
| **OPEN** | TC exists, currentBlock < entryCutoffBlock, RC count < playerCount |
| **FULL** | RC count == playerCount, currentBlock < entryCutoffBlock |
| **CANCELLED** | currentBlock >= entryCutoffBlock AND RC count < playerCount |
| **ACTIVE** | RC count == playerCount AND currentBlock >= startBlock* |
| **SETTLING** | currentBlock >= endBlock, SC count < playerCount |
| **COMPLETE** | Settlement cell exists OR all score cells present |

*startBlock = entryCutoffBlock + 5 (or derived from when playerCount reached)

The key insight: **startBlock can be derived too.** When the last registration cell is created, `startBlock = lastRC.createdAtBlock + confirmationBuffer`. No need to rewrite the TC.

Alternatively, the organizer can create a **Start Signal Cell** (FQSS) once playerCount registrations are confirmed, declaring the exact startBlock/endBlock. This is one more write-once cell, not a rewrite.

---

## Cost Analysis

### Per Tournament (4 players)

| Cell | Count | CKB each | Total CKB | Who pays |
|------|-------|----------|-----------|----------|
| Tournament Cell | 1 | 42.6 | 42.6 | Organizer |
| Registration Cells | 4 | 31.0 | 124.0 | Each player |
| Score Cells | 4 | 33.0 | 132.0 | Each player |
| Settlement Cell | 1 | 35.0 | 35.0 | Organizer |
| **Total** | **10** | | **333.6 CKB** | |

**Per player cost:** ~64 CKB (registration + score) locked in cells, plus entry fee via Fiber.

At current testnet rates this is negligible. On mainnet at ~$0.005/CKB = ~$0.32 per player in locked capacity (reclaimable from cancelled tournaments).

### Cancelled Tournament Recovery

| Cell | Reclaimable? | By whom |
|------|-------------|---------|
| Tournament Cell | Yes | Organizer |
| Registration Cells | Yes | Each player |
| Score Cells | N/A (never created) | — |
| Settlement Cell | N/A (never created) | — |

Total recoverable: 42.6 + (N × 31) CKB. Players get their own registration cells back.

### Live Tournament (permanent on-chain record)

Once a tournament reaches ACTIVE:
- TC, all RCs, all SCs, and Settlement cell remain on-chain forever
- This is the **immutable proof** that the tournament happened
- ~334 CKB locked permanently per 4-player tournament
- This is a feature, not a bug — it's the on-chain tournament history

---

## Operation Flow

### Creating a Tournament
```
Organizer → createTournamentCell(rules)
  Creates: 1 TC (Type ID, ~43 CKB)
  Rewrites: nothing
```

### Player Registration
```
Player → createRegistrationCell(tournamentId, playerInfo)
  Creates: 1 RC (~31 CKB from player's wallet)
  Rewrites: nothing
  Contention: ZERO — player only touches their own UTXOs
```

### Checking Registration Status
```
Anyone → scanRegistrationCells(tournamentId)
  Returns: list of RCs with that type script args
  Player count = RC count
  No cell consumption, just a read
```

### Game Start Detection
```
Agent polls each block:
  1. Scan RCs for tournamentId → count
  2. If count == playerCount:
     startBlock = max(RC.createdAtBlock) + confirmationBuffer
     endBlock = startBlock + durationBlocks
  3. If currentBlock >= startBlock → start game
```

### Score Submission
```
Player agent → createScoreCell(tournamentId, score)
  Creates: 1 SC (~33 CKB from player's wallet)
  Rewrites: nothing
  Contention: ZERO
```

### Settlement
```
Organizer → scanScoreCells(tournamentId)
  Collects all SCs, applies deterministic winner formula
  Creates: 1 Settlement Cell (~35 CKB)
  Triggers: Fiber payout to winner
```

### Cancellation Recovery
```
If currentBlock > entryCutoffBlock AND RC count < playerCount:
  Organizer consumes TC → recovers ~43 CKB
  Each player consumes own RC → recovers ~31 CKB
  No coordination needed — each party reclaims independently
```

---

## What This Eliminates

| Current problem | v3 solution |
|----------------|-------------|
| OutPointAlreadySpent on TC rewrite | TC is never rewritten |
| Retry loops with exponential backoff | No retries needed — write-once |
| Batch registration consuming TC | No batch rewrite — RCs are independent |
| Indexer lag causing stale outpoints | No outpoint dependency between operations |
| Race conditions between agents | Each agent writes only their own cells |
| 20+ hours debugging cell contention | Zero contention by design |

## What Stays the Same

- Fiber payment channels for entry fees and payouts
- Block-based timing (cutoff, start, end blocks)
- RetroArch UDP polling for game state
- Deterministic winner calculation
- Agent code hash verification (in RC data)
- Type script args = tournamentId for discovery

## Migration Path

1. Keep existing chain-store.js scanning logic (already scans by type script)
2. Remove `updateCell()` / `safeUpdateCell()` — no longer needed
3. Remove `batchRegisterPlayers()` — RCs replace this
4. Derive tournament state from cell scans instead of reading TC.state field
5. Tournament-manager becomes stateless — all state is on-chain and derived

---

## Over-Registration: First N Wins

If more players register than `playerCount`, the first N by chain ordering are accepted:

1. All agents scan RCs for the tournament, sorted by:
   - `createdAtBlock` ascending (earliest block first)
   - Transaction index within block (deterministic tiebreak)
2. First `playerCount` RCs are **accepted** — these players are in
3. Remaining RCs are **overflow** — these players are not in the tournament
4. Overflow players can **consume their RC** to reclaim ~31 CKB at any time

This is deterministic — every agent independently computes the same accepted set with no coordination. No organizer approval needed.

**Spam mitigation:** Creating an RC costs ~31 CKB in locked capacity. Griefing a 4-player tournament with fake registrations costs 4 × 31 = 124 CKB locked until consumed. Not free, but not hugely expensive either. If spam becomes an issue, the type script can enforce a higher minimum capacity per RC.

---

## Open Questions

1. **Start signal:** Should startBlock be derived (max accepted RC block + buffer) or declared by organizer in a separate cell? Derived is simpler but organizer has less control.
2. **Player CKB balance:** Players need ~64 CKB available for RC + SC cells, separate from entry fee. UI should show this requirement.
3. **Score cell timing:** What if a player's agent crashes and never submits? Current: default to zero after window. Same here — absence of SC = score of zero.
