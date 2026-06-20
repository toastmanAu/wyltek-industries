# Pool Latency Tester — Design Spec

**Date:** 2026-06-21
**Status:** Approved, pre-implementation
**Repo:** `wyltek-industries` (static GitHub Pages site → wyltekindustries.com)

## Summary

A static, browser-only page on wyltekindustries.com that lets CKB/Nervos miners
measure their **direct connection latency** to mining-pool stratum endpoints.
Every measurement runs in the visitor's browser — no request routes through any
backend — so the number reflects the miner's own network path to each pool, not
the server's.

## Goals

- Show a curated list of CKB/Nervos pool endpoints (multiple endpoints per pool:
  regions / ports).
- Measure approximate latency to each endpoint **from the visitor's browser**.
- Rank endpoints by latency so a miner can pick the closest pool.
- Zero backend involvement in measurement. Pure static hosting.

## Non-Goals (YAGNI)

- No true stratum-handshake timing (would require a downloadable helper — explicitly
  out of scope; approximate connection latency is acceptable).
- No generic multi-coin support — CKB/Nervos pools only.
- No "paste any host:port" box in v1.
- No auto-refreshing backend/worker for the endpoint list — static JSON, refreshed
  on demand.
- No persistence, accounts, or history.

## Key Constraint That Shapes The Design

The site is served over **HTTPS** (GitHub Pages). Browsers block an HTTPS page from
opening a plaintext `ws://host:3333` connection (mixed content). Therefore the probe
cannot be a raw WebSocket to the stratum port. Instead we issue an
**`https://host:port` fetch** and time how long it takes to *fail*. The browser still
performs the TCP connect + TLS ClientHello round-trip before the connection fails on
protocol mismatch, and that failure timing approximates the round-trip time.

This is an **approximation** (TCP/TLS connect RTT, not a stratum exchange). It is good
enough for *ranking pools by proximity*, which is the stated purpose. The UI labels it
honestly as "connection latency", not "ping".

## Architecture

Three static files, no backend:

| File | Purpose |
|------|---------|
| `pool-latency.html` | The page. Matches `ckb-node-finder.html` conventions: `/js/member-guard.js`, shared `/js/site-header.js`, inline `<style>` using the site CSS variables, "Browser Tool" hero badge, card layout, footer. |
| `js/pool-latency.js` | Probe engine + table rendering + orchestration. |
| `js/ckb-pool-endpoints.json` | Curated endpoint data (see schema). |

### Endpoint data schema — `js/ckb-pool-endpoints.json`

```json
{
  "updated": "2026-06-21",
  "pools": [
    {
      "name": "ViaBTC",
      "site": "https://viabtc.com",
      "endpoints": [
        { "region": "EU", "host": "ckb.viabtc.io", "port": 3333, "blocked": false },
        { "region": "US", "host": "ckb-us.viabtc.io", "port": 3333, "blocked": false }
      ]
    }
  ]
}
```

- `region` — human label (EU / US / Asia / Global / etc.).
- `host`, `port` — the stratum endpoint host and port.
- `blocked` — set `true` at curation time if `port` is on Chrome's restricted-port
  list (browser will refuse the fetch); the row renders as "blocked" with a tooltip
  rather than firing a doomed probe.

### Data sourcing (build step, done now)

Firecrawl `https://miningpoolstats.stream/nervos` to enumerate CKB pools, then
firecrawl each pool's own site / docs to capture **all** stratum endpoints (multiple
regions and ports per pool). Hand-review the result, flag restricted ports, and commit
`ckb-pool-endpoints.json`. Refresh is manual: re-run the crawl when endpoints change
(every few months) and review the diff before it goes live.

## Probe Method

Chosen technique (option A of three considered):

```
fetch("https://" + host + ":" + port, { mode: "no-cors", signal: abortSignal })
```

- Time from just-before-fetch to rejection = the latency sample.
- `mode: "no-cors"` because we never read the response — only the failure timing.
  CORS does not block timing the failure.
- `AbortController` enforces a per-probe timeout (default 3000 ms). Timeout → the
  endpoint is reported "unreachable".
- Mixed-content-safe because the scheme is `https`.

### Sampling

- One throwaway **warm-up** probe per endpoint (absorbs DNS resolution + cold
  connection cost) — discarded.
- Then **5 measured probes**; report the **median** (robust against a single outlier).
- Probes across endpoints are **concurrency-capped** (default 6 in flight) so a long
  endpoint list doesn't open hundreds of sockets at once.

Rejected alternatives:
- `Image().onerror` timing — no clean timeout, no cap.
- `wss://host:port` WebSocket timing — allowed from HTTPS but some browsers
  batch/delay error events → noisier numbers.

## Data Flow

1. Page loads → fetch `js/ckb-pool-endpoints.json` (same-origin, static).
2. Render one table row per endpoint in "pending" state.
3. Probe every endpoint client-side (concurrency-capped), filling each row's latency
   as its median resolves.
4. Re-sort rows ascending by latency once measurements land.
5. "Re-test" button re-runs the whole measurement pass.

Everything after step 1 happens in the visitor's browser. The JSON fetch is the only
network call to our origin, and it carries no measurement.

## UI

- Hero: "Browser Tool" badge, title, honest disclaimer —
  *"Connection latency measured directly from your browser — approximate, for ranking
  pools by proximity. No data routes through our servers."*
- Sortable table: **Pool · Region · Endpoint · Latency (ms) · Status**.
- Latency color-coded by thresholds: green (fast) / orange (medium) / red (slow).
- Row states: pending → measuring → result | unreachable | blocked.
- "Re-test" button.
- Footer consistent with other pages.

## Error Handling

| Condition | Behavior |
|-----------|----------|
| Probe exceeds timeout | Row → "unreachable" |
| Port on browser restricted list (`blocked: true`) | Row → "blocked" with tooltip explaining the browser refuses that port |
| `fetch` throws synchronously (bad host) | Row → "unreachable" |
| JSON fails to load | Page shows a top-level error card with a retry button |

## Testing

- **Unit (pure functions):** median calculation, ascending sort with
  unreachable/blocked sinking to the bottom, row-state transitions, endpoint-list
  parsing/validation.
- **Probe function:** accepts an injected `fetch` so timing logic is testable with a
  mock that resolves/rejects on controlled timers.
- **Manual:** cross-browser smoke test (Chrome, Firefox) against the live endpoint
  list, since real timing requires a real network. Verify blocked-port rows render
  correctly and the warm-up discard works.

## Open Questions

None blocking. Endpoint list content is produced during implementation via firecrawl
and hand-reviewed before commit.
